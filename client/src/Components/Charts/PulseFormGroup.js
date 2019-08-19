import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  FormGroup,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  row: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 10,
    width: '100%'
  },
  container: {
    width: '100%'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      width: 300
    },
    [theme.breakpoints.up('sm')]: {
      width: 300
    },
    [theme.breakpoints.up('lg')]: {
      width: 380
    }
  },
  label: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));

const options = [
  'SUPERFICIAL',
  'RAPID',
  'EXCESS',
  'SURGING',
  'WIRY',
  'ROLLING',
  'MODERATE',
  'TENSE',
  'KNOTTED',
  'DEEP',
  'SLOW',
  'DEFICIENT',
  'CHOPPY',
  'THERADY',
  'SOGGY',
  'WEAK',
  'HURRIED',
  'INTERMITTENT'
];

export default function PulseFormGroup(props) {
  const classes = useStyles();
  const { onChange, pulse } = props;
  const { right, left } = pulse;
  const [values, setValues] = useState({
    right: right || {
      first: '',
      second: '',
      third: ''
    },
    left: left || {
      first: '',
      second: '',
      third: ''
    }
  });

  const handleRightPulseChange = name => event => {
    setValues({
      ...values,
      right: { ...values.right, [name]: event.target.value }
    });
    if (onChange) {
      onChange({
        ...values,
        right: { ...values.right, [name]: event.target.value }
      });
    }
  };

  const handleLeftPulseChange = name => event => {
    setValues({
      ...values,
      left: { ...values.left, [name]: event.target.value }
    });
    if (onChange) {
      onChange({
        ...values,
        left: { ...values.left, [name]: event.target.value }
      });
    }
  };

  return (
    <FormGroup className={classes.row}>
      <div className={classes.container}>
        <div className={classes.label}>{'Right Hand'}</div>
        <FormControl
          className={classes.textField}
          style={{ marginTop: 16, marginBottom: 8 }}
        >
          <InputLabel htmlFor="first">{'Right 1st'}</InputLabel>
          <Select
            value={values.right.first}
            onChange={handleRightPulseChange('first')}
            inputProps={{
              id: 'first',
              name: 'first'
            }}
          >
            {options.map((option, ix) => (
              <MenuItem key={ix} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          className={classes.textField}
          style={{ marginTop: 16, marginBottom: 8 }}
        >
          <InputLabel htmlFor="first">{'Right 2nd'}</InputLabel>
          <Select
            value={values.right.second}
            onChange={handleRightPulseChange('second')}
            inputProps={{
              id: 'second',
              name: 'second'
            }}
          >
            {options.map((option, ix) => (
              <MenuItem key={ix} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          className={classes.textField}
          style={{ marginTop: 16, marginBottom: 8 }}
        >
          <InputLabel htmlFor="first">{'Right 3rd'}</InputLabel>
          <Select
            value={values.right.third}
            onChange={handleRightPulseChange('third')}
            inputProps={{
              id: 'third',
              name: 'third'
            }}
          >
            {options.map((option, ix) => (
              <MenuItem key={ix} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className={classes.container}>
        <div className={classes.label}>{'Left Hand'}</div>
        <FormControl
          className={classes.textField}
          style={{ marginTop: 16, marginBottom: 8 }}
        >
          <InputLabel htmlFor="first">{'Left 1st'}</InputLabel>
          <Select
            value={values.left.first}
            onChange={handleLeftPulseChange('first')}
            inputProps={{
              id: 'first',
              name: 'first'
            }}
          >
            {options.map((option, ix) => (
              <MenuItem key={ix} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          className={classes.textField}
          style={{ marginTop: 16, marginBottom: 8 }}
        >
          <InputLabel htmlFor="second">{'Left 2nd'}</InputLabel>
          <Select
            value={values.left.second}
            onChange={handleLeftPulseChange('second')}
            inputProps={{
              id: 'second',
              name: 'second'
            }}
          >
            {options.map((option, ix) => (
              <MenuItem key={ix} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          className={classes.textField}
          style={{ marginTop: 16, marginBottom: 8 }}
        >
          <InputLabel htmlFor="third">{'Left 3rd'}</InputLabel>
          <Select
            value={values.left.third}
            onChange={handleLeftPulseChange('third')}
            inputProps={{
              id: 'third',
              name: 'third'
            }}
          >
            {options.map((option, ix) => (
              <MenuItem key={ix} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </FormGroup>
  );
}
