import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  FormGroup,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  InputAdornment
} from '@material-ui/core';
import { removeSpecialChars } from '../../lib/strings';
import MaskedInput from '../MaskedInput';

const useStyles = makeStyles(theme => ({
  row: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 10,
    width: '100%'
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
    fontSize: 12
  }
}));

export default function VitalFormGroup(props) {
  const classes = useStyles();
  const { onChange, vitals } = props;
  const { date, height, weight, temp, bp, heart, rhythm, lung, sound } = vitals;
  const [ft, inch] = removeSpecialChars(height);
  const [bp1, bp2] = removeSpecialChars(bp);

  const [values, setValues] = useState({
    date: date || '',
    ft: ft || '',
    inch: inch || '',
    weight: weight || '',
    temp: temp || '',
    bp1: bp1 || '',
    bp2: bp2 || '',
    heart: heart || '',
    rhythm: rhythm || '',
    lung: lung || '',
    sound: sound || ''
  });

  const handleChangeValues = name => event => {
    setValues({ ...values, [name]: event.target.value });

    if (onChange) {
      onChange({ ...values, [name]: event.target.value });
    }
  };

  return (
    <FormGroup className={classes.row}>
      <TextField
        className={classes.textField}
        id="date"
        label="Date"
        type="date"
        value={values.date}
        onChange={handleChangeValues('date')}
        InputLabelProps={{
          shrink: true
        }}
        margin="normal"
      />

      <MaskedInput
        inputType={'HEIGHT'}
        label={'Height'}
        type="number"
        min="0"
        max="11"
        value={{ ft: values.ft, inch: values.inch }}
        onChange={handleChangeValues}
      />

      <TextField
        className={classes.textField}
        id="weight"
        label="Weight"
        type="number"
        value={values.weight}
        onChange={handleChangeValues('weight')}
        InputProps={{
          endAdornment: (
            <InputAdornment className={classes.adornment} position="end">
              {'lb'}
            </InputAdornment>
          )
        }}
        margin="normal"
      />

      <TextField
        className={classes.textField}
        id="temp"
        label="Temperature"
        type="number"
        onChange={handleChangeValues('temp')}
        InputLabelProps={{
          shrink: true
        }}
        InputProps={{
          value: values.temp,
          endAdornment: (
            <InputAdornment className={classes.adornment} position="end">
              &deg;F
            </InputAdornment>
          )
        }}
        margin="normal"
      />

      <MaskedInput
        inputType={'BLOOD_PRESSURE'}
        label={'Blood Pressure'}
        type="number"
        mask="/"
        min="0"
        max="999"
        value={{ bp1: values.bp1, bp2: values.bp2 }}
        onChange={handleChangeValues}
      />

      <TextField
        className={classes.textField}
        id="heart"
        label="Heart"
        placeholder="Rate"
        type="number"
        onChange={handleChangeValues('heart')}
        InputLabelProps={{
          shrink: true
        }}
        InputProps={{
          value: values.heart,
          endAdornment: (
            <InputAdornment className={classes.adornment} position="end">
              {'BPM'}
            </InputAdornment>
          )
        }}
        margin="normal"
      />

      <FormControl
        className={classes.textField}
        style={{ marginTop: 16, marginBottom: 8 }}
      >
        <InputLabel htmlFor="rhythm">{'Rhythm'}</InputLabel>
        <Select
          value={values.rhythm}
          onChange={handleChangeValues('rhythm')}
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

      <TextField
        className={classes.textField}
        id="lung"
        label="Lung"
        placeholder="Rate"
        onChange={handleChangeValues('lung')}
        InputLabelProps={{
          shrink: true
        }}
        InputProps={{
          value: values.lung,
          endAdornment: (
            <InputAdornment className={classes.adornment} position="end">
              {'BPM'}
            </InputAdornment>
          )
        }}
        margin="normal"
      />

      <TextField
        className={classes.textField}
        id="sound"
        label="Sound"
        value={values.sound}
        onChange={handleChangeValues('sound')}
        margin="normal"
      />
    </FormGroup>
  );
}
