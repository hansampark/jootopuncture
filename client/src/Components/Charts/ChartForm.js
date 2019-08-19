import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaskedInput from 'react-text-mask';
import {
  Typography,
  FormControl,
  FormGroup,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  InputAdornment
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  row: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 10,
    borderBottom: '1px solid #cccccc'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      width: 100
    },
    [theme.breakpoints.up('sm')]: {
      width: 150
    }
  },
  adornment: {
    color: 'red',
    fontSize: 12
  }
}));

const TextMaskCustom = props => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/[1-9]/, /[1-9]/, /[1-9]/, '/', /[1-9]/, /[1-9]/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
};

export default function ChartForm(props) {
  const classes = useStyles();
  const { onChange, chart } = props;
  const { height, weight, temp, bp, heart, rhythm, lung, sound } = chart;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom color="primary">
        {'Vital Sign'}
      </Typography>

      <FormGroup className={classes.row}>
        <TextField
          className={classes.textField}
          id="height"
          label="Height"
          value={height}
          onChange={onChange('height')}
        />
        <TextField
          className={classes.textField}
          id="weight"
          label="Weight"
          value={weight}
          onChange={onChange('weight')}
          InputProps={{
            endAdornment: (
              <InputAdornment className={classes.adornment} position="end">
                {'lb'}
              </InputAdornment>
            )
          }}
        />
        <TextField
          className={classes.textField}
          id="temp"
          label="Temperature"
          onChange={onChange('temp')}
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            value: temp,
            endAdornment: (
              <InputAdornment className={classes.adornment} position="end">
                &deg;F
              </InputAdornment>
            )
          }}
        />
        <TextField
          className={classes.textField}
          id="bp"
          label="Blood Pressure"
          onChange={onChange('bp')}
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            inputComponent: TextMaskCustom,
            value: bp,
            endAdornment: (
              <InputAdornment className={classes.adornment} position="end">
                {'mmHg'}
              </InputAdornment>
            )
          }}
        />
        <TextField
          className={classes.textField}
          id="heart"
          label="Heart"
          placeholder="Rate"
          type="number"
          onChange={onChange('heart')}
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            value: heart,
            endAdornment: (
              <InputAdornment className={classes.adornment} position="end">
                {'BPM'}
              </InputAdornment>
            )
          }}
        />
        <FormControl className={classes.textField}>
          <InputLabel htmlFor="rhythm">{'Rhythm'}</InputLabel>
          <Select
            value={rhythm}
            onChange={onChange('rhythm')}
            inputProps={{
              id: 'rhythm',
              name: 'rhythm'
            }}
          >
            <MenuItem value={'LOW'}>{'Low'}</MenuItem>
            <MenuItem value={'REGULAR'}>{'Regular'}</MenuItem>
            <MenuItem value={'HIGH'}>{'High'}</MenuItem>
          </Select>
        </FormControl>
        <div />

        <TextField
          className={classes.textField}
          id="lung"
          label="Lung"
          placeholder="Rate"
          onChange={onChange('lung')}
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            value: lung,
            endAdornment: (
              <InputAdornment className={classes.adornment} position="end">
                {'BPM'}
              </InputAdornment>
            )
          }}
        />

        <TextField
          className={classes.textField}
          id="sound"
          label="Sound"
          value={sound}
          onChange={onChange('sound')}
        />
      </FormGroup>
    </React.Fragment>
  );
}
