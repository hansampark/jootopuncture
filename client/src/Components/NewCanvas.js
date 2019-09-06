import React from 'react';
import { Button } from '@material-ui/core';
import { Undo, Redo, Clear } from '@material-ui/icons';
import { SketchField, Tools } from 'react-sketch';
import { HuePicker } from 'react-color';

const styles = {
  root: {
    margin: 10
  },
  canvas: {
    border: '1px solid #cccccc',
    boxSizing: 'border-box',
    padding: 10,
    boxShadow: '0px 2px 3px -1px #ADADAD'
  },
  toolWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },
  label: {
    display: 'block',
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: 12,
    fontWeight: 400,
    marginBottom: 5
  },
  inputField: {
    width: 100,
    cursor: 'text',
    border: 'none',
    outline: 'none',
    font: 'inherit',
    borderBottom: '1px solid rgba(0, 0, 0, 0.42)'
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: 250,
    marginTop: 5
  },
  button: {
    width: 50
  }
};

export default class NewCanvas extends React.Component {
  static defaultProps = {
    width: 980,
    height: 400,
    tool: Tools.pencil
  };

  constructor(props) {
    super(props);

    this.state = {
      width: props.width,
      height: props.height,
      lineColor: props.lineColor || { r: 0, g: 0, b: 0, a: props.opacity },
      lineWidth: 3,
      opacity: props.opacity || 1,
      canUndo: false,
      canRedo: false
    };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  render() {
    const { data, isDrawing } = this.props;
    const {
      width,
      height,
      lineColor,
      lineWidth,
      opacity,
      canUndo
    } = this.state;

    return (
      <div ref={this.setWrapperRef} style={styles.root}>
        <div style={styles.canvas}>
          <SketchField
            ref={c => (this.sketch = c)}
            canUndo={canUndo}
            width={width}
            height={height}
            undoSteps={100}
            tool={Tools.pencil}
            lineColor={`rgba(${lineColor.r}, ${lineColor.g}, ${lineColor.b}, ${opacity})`}
            lineWidth={lineWidth}
            value={data}
            onChange={this.handleChangeValue}
          />
        </div>

        {isDrawing && (
          <div style={styles.toolWrapper}>
            <div>
              <label style={styles.label}>{'Line Width'}</label>
              <input
                style={styles.inputField}
                id="line-width"
                label={'Line Width'}
                type="number"
                value={lineWidth}
                onChange={this.handleLineWidthChange}
              />
            </div>

            <div>
              <label style={styles.label}>{'Opacity'}</label>
              <input
                style={styles.inputField}
                id="opacity"
                label={'Opacity'}
                type="number"
                step={0.1}
                min={0}
                max={1}
                value={opacity}
                onChange={this.handleOpacityChange}
              />
            </div>

            <div>
              <label style={{ ...styles.label, marginBottom: 10 }}>
                {'Line Color'}
              </label>
              <HuePicker
                color={lineColor}
                onChangeComplete={this.handleColorChange}
              />
            </div>

            <div style={styles.buttonWrapper}>
              <Button
                variant="contained"
                type="button"
                color="primary"
                disabled={!canUndo}
                style={styles.button}
                onClick={this.handleUndo}
              >
                <Undo />
              </Button>

              <Button
                variant="contained"
                type="button"
                color="primary"
                style={styles.button}
                onClick={this.handleRedo}
              >
                <Redo />
              </Button>

              <Button
                variant="contained"
                type="button"
                color="secondary"
                style={styles.button}
                disabled={!canUndo}
                onClick={this.handleClear}
              >
                <Clear />
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
    this.handleScaleImage();
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    const { onSave } = this.props;

    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      onSave(this.sketch.toJSON().objects);
    }
  }

  handleScaleImage = () => {
    const sketch = this.sketch;
    const { src } = this.props;
    const img = new Image();
    img.onload = () => {
      let newHeight = this.state.height;
      let newScale = 1;
      const height = img.height;
      const width = img.width;

      newHeight = Math.round((height * sketch.props.width) / width);
      newScale = newHeight / height;
      this.setState({ height: newHeight });

      sketch.clear();
      let opts = { left: 0, top: 0, scale: newScale };
      sketch.addImg(src, opts);
    };
    img.src = src;
  };

  handleColorChange = color => {
    this.setState(state => ({
      lineColor: { ...color.rgb, a: state.opacity }
    }));
  };

  handleLineWidthChange = e => {
    this.setState({
      lineWidth: e.target.value
    });
  };

  handleOpacityChange = e => {
    this.setState({
      opacity: e.target.value
    });
  };

  handleUndo = () => {
    if (this.sketch.toJSON().objects.length === 1) {
      this.setState({
        canUndo: false,
        canRedo: this.sketch.canRedo()
      });
    } else {
      this.setState({
        canUndo: this.sketch.canUndo(),
        canRedo: this.sketch.canRedo()
      });
    }
    this.sketch.undo();
  };

  handleRedo = () => {
    this.sketch.redo();
    this.setState({
      canUndo: this.sketch.canUndo(),
      canRedo: this.sketch.canRedo()
    });
  };

  handleClear = () => {
    this.sketch.clear();
    this.handleScaleImage();
    this.setState({
      canUndo: this.sketch.canUndo(),
      canRedo: this.sketch.canRedo()
    });
  };

  handleChangeValue = () => {
    const sketch = this.sketch;

    this.setState({
      canUndo: sketch.toJSON().objects.length === 1 ? false : true,
      canRedo: sketch.toJSON().objects.length === 1 ? false : true
    });
  };
}
