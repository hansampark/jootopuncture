import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    boxSizing: 'border-box',
    margin: '16px 8px 8px',
    height: 49,
    borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
    outline: 'none'
  },
  label: {
    position: 'absolute',
    fontWeight: 400,
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '12px'
  },
  input: {
    marginTop: 15,
    padding: '6px 0 7px',
    font: 'inherit',
    textAlign: 'center',
    cursor: 'text',
    color: 'currentColor',
    height: '1.1875rem',
    border: 'none',
    outline: 'none',
    width: 50
  },
  adornment: {
    color: 'rgba(0, 0, 0, 0.54)'
  },
  mask: {
    paddingRight: theme.spacing(1)
  }
}));

function InputTypes(props) {
  const classes = useStyles();

  switch (props.inputType) {
    case 'HEIGHT': {
      const { ft, inch } = props.value;

      return (
        <div>
          <input
            autoFocus={props.isSelected}
            type={props.type}
            min={props.min}
            max={props.max}
            style={{ textAlign: 'center' }}
            className={classes.input}
            value={ft}
            onChange={props.onChange('ft')}
          />
          <label className={classes.adornment}>{'ft'}</label>

          <input
            type={props.type}
            min={props.min}
            max={props.max}
            style={{ textAlign: 'center' }}
            className={classes.input}
            value={inch}
            onChange={props.onChange('inch')}
          />
          <label className={classes.adornment}>{'in'}</label>
        </div>
      );
    }
    case 'BLOOD_PRESSURE': {
      const { bp1, bp2 } = props.value;
      return (
        <div>
          <input
            autoFocus={props.isSelected}
            type={props.type}
            min={props.min}
            max={props.max}
            style={{ textAlign: 'center' }}
            className={classes.input}
            value={bp1}
            onChange={props.onChange('bp1')}
          />
          <label className={classes.mask}>{props.mask}</label>
          <input
            type={props.type}
            min={props.min}
            max={props.max}
            style={{ textAlign: 'center' }}
            className={classes.input}
            value={bp2}
            onChange={props.onChange('bp2')}
          />
          <label className={classes.adornment}>{'mmHg'}</label>
        </div>
      );
    }
    case 'SEVERITY': {
      return (
        <div>
          <input
            autoFocus={props.isSelected}
            type={props.type}
            min={props.min}
            max={props.max}
            style={{ textAlign: 'end' }}
            className={classes.input}
            onChange={props.onChange('bp1')}
          />
          <label>{props.mask}</label>
          <input
            type={props.type}
            min={props.min}
            max={props.max}
            style={{ textAlign: 'end' }}
            className={classes.input}
            onChange={props.onChange('bp2')}
          />
          <label className={classes.adornment}>{'mmHg'}</label>
        </div>
      );
    }
    default:
      break;
  }
}

export default function MaskedInput(props) {
  const classes = useStyles();
  const wrapperRef = useRef();
  const [isSelected, setSelected] = useState(false);
  const [onHover, setHover] = useState(false);

  const {
    inputType,
    label,
    type,
    mask,
    minLength,
    maxLength,
    min,
    max,
    value,
    onChange
  } = props;

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div
      ref={wrapperRef}
      style={{
        borderBottom: isSelected
          ? '2px solid #303f9f'
          : onHover
          ? '2px solid rgba(0, 0, 0, 0.42)'
          : '1px solid rgba(0, 0, 0, 0.42)',
        transition:
          (isSelected || onHover) &&
          'transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms'
      }}
      className={classes.root}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <label
        style={{ color: isSelected && '#303f9f' }}
        className={classes.label}
      >
        {label}
      </label>

      <InputTypes
        inputType={inputType}
        isSelected={isSelected}
        type={type}
        minLength={minLength}
        maxLength={maxLength}
        min={min}
        max={max}
        mask={mask}
        value={value}
        onChange={onChange}
      />
    </div>
  );

  function handleClickOutside(e) {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setSelected(false);
    }
  }

  function handleMouseEnter() {
    setHover(true);
  }

  function handleMouseLeave() {
    setHover(false);
  }

  function handleClick() {
    setSelected(true);
  }
}
