import React from 'react';
import { HuePicker } from 'react-color';
import CanvasDraw from 'react-canvas-draw';

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
  padding: {
    padding: 10
  },
  label: {
    width: 'inherit',
    textAlign: 'center',
    fontSize: '1rem',
    color: 'rgba(0, 0, 0, 0.54)',
    padding: 10
  },
  textField: {
    marginRight: 10,
    width: 100
  }
};

export default class Canvas extends React.Component {
  static defaultProps = {
    loadTimeOffset: 1,
    lazyRadius: 0,
    brushRadius: 1,
    brushColor: {
      r: 255,
      g: 0,
      b: 0,
      a: 0.3
    },
    catenaryColor: '#0a0302',
    gridColor: 'rgba(150,150,150,0.17)',
    hideGrid: false,
    disabled: false,
    saveData: null,
    immediateLoading: false
  };

  constructor(props) {
    super(props);

    this.state = {
      lineWidth: props.brushRadius || 0,
      color: props.brushColor,
      opacity: 3
    };
  }

  render() {
    const {
      loadTimeOffset,
      lazyRadius,
      brushRadius,
      brushColor,
      catenaryColor,
      gridColor,
      hideGrid,
      canvasWidth,
      canvasHeight,
      disabled,
      imgSrc,
      saveData,
      immediateLoading,
      width,
      height,
      src
    } = this.props;

    const { lineWidth, color, opacity } = this.state;

    return (
      <div style={styles.root}>
        <div style={styles.canvas}>
          <CanvasDraw
            ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
            canvasWidth={width}
            canvasHeight={height}
            brushRadius={lineWidth}
            brushColor={`rgba(${color.r},${color.g},${color.b},${color.a})`}
            lazyRadius={lazyRadius}
            imgSrc={src}
          />
        </div>

        <div style={styles.padding}>
          <div style={styles.label}>{'Color Picker'}</div>
          <HuePicker color={color} onChangeComplete={this.handleColorChange} />
        </div>

        <div style={styles.padding}>
          <input
            style={styles.textField}
            id="radius"
            label={'Brush Radius'}
            type="number"
            value={lineWidth}
            onChange={this.handleLineWidthChange}
          />
          <input
            style={styles.textField}
            id="opacity"
            label={'Opacity'}
            type="number"
            value={opacity}
            onChange={this.handleOpacityChange}
          />
          <button type="button" onClick={this.handleSave}>
            {'Save'}
          </button>
          <button type="button" onClick={this.handleUndo}>
            {'Undo'}
          </button>
          <button type="button" onClick={this.handleClear}>
            {'Clear'}
          </button>
        </div>
      </div>
    );
  }

  handleLineWidthChange = e => {
    this.setState({
      lineWidth: parseInt(e.target.value, 10) || 0
    });
    // setValues({ ...values, brushRadius: parseInt(e.target.value, 10) || '0' });
  };

  handleOpacityChange = e => {
    const updatedOpacity = parseInt(e.target.value, 10);
    // this.setState(state => ({
    //   opacity: parseInt(e.target.value, 10) || 0
    // }));
    this.setState(state => ({
      opacity: updatedOpacity,
      color: {
        ...state.color,
        a: updatedOpacity / 10
      }
    }));
  };

  handleColorChange = color => {
    this.setState(state => ({
      color: { ...color.rgb, a: state.opacity / 10 }
    }));
  };

  handleSave = () => {
    const { onSave } = this.props;
    const savedData = this.saveableCanvas.getSaveData();
    onSave(savedData);
  };

  handleUndo = () => {
    this.saveableCanvas.undo();
  };

  handleClear = () => {
    this.saveableCanvas.clear();
  };
}
