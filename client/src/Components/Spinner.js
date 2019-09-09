import React from 'react';
import { CircularProgress } from '@material-ui/core';

const styles = {
  mask: {
    position: 'absolute',
    zIndex: 1000,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  },
  spinner: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default function Spinner(props) {
  return (
    <div style={styles.mask}>
      <div style={{ ...styles.spinner, ...props.style }}>
        <CircularProgress size={props.size} style={{ color: '#787878' }} />
      </div>
    </div>
  );
}
