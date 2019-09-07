import React from 'react';
import { SketchField, Tools } from 'react-sketch';

const styles = {
  root: {
    boxSizing: 'border-box',
    margin: '16px 8px 8px',
    height: 89,
    borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
    outline: 'none'
  },
  label: {
    position: 'absolute',
    fontWeight: 400,
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '12px'
  }
};

export default class SignatureField extends React.Component {
  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  render() {
    const { data } = this.props;
    return (
      <div ref={this.setWrapperRef} style={styles.root}>
        <label style={styles.label}>{'Signature'}</label>

        <SketchField
          ref={c => (this.sketch = c)}
          width={944}
          height={89}
          tool={Tools.pencil}
          lineColor={'black'}
          lineWidth={3}
          value={data}
        />
      </div>
    );
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);

    // for tablet use
    document.addEventListener('touchstart', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
    // for tablet use
    document.removeEventListener('touchend', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    event.preventDefault();
    const { onSave } = this.props;

    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      onSave(this.sketch.toJSON().objects);
    }
  }
}
