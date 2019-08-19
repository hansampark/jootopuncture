import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormGroup,
  FormControl,
  FormLabel,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  row: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 10,
    marginBottom: 20,
    borderBottom: '1px solid #cccccc'
  },
  nameField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      width: 100
    },
    [theme.breakpoints.up('sm')]: {
      width: 150
    }
  },
  label: {
    fontSize: 12
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250
  },
  formGroup: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.42)'
  },
  radioGroup: {
    marginBottom: -3,
    marginTop: -4
  },
  button: {
    margin: theme.spacing(10),
    width: 200
  }
}));

export default function PatientForm(props) {
  const classes = useStyles();
  const { onChange, patient, disabled } = props;
  const { firstName, lastName, middleName, email, dob, phone, sex } = patient;
  const [values, setValues] = useState({
    firstName: firstName || '',
    lastName: lastName || '',
    middleName: middleName || '',
    email: email || '',
    dob: dob || '',
    phone: phone || '',
    sex: sex || ''
  });

  const handleValueChange = name => event => {
    setValues({ ...values, [name]: event.target.value });

    if (onChange) {
      onChange({ ...values, [name]: event.target.value });
    }
  };

  return (
    <FormGroup className={classes.row}>
      <TextField
        id="firstName"
        label="First Name"
        className={classes.nameField}
        value={values.firstName}
        onChange={handleValueChange('firstName')}
        autoFocus
        disabled={disabled}
        margin="normal"
      />

      <TextField
        id="middleName"
        label="Middle Name"
        className={classes.nameField}
        value={values.middleName}
        onChange={handleValueChange('middleName')}
        disabled={disabled}
        margin="normal"
      />

      <TextField
        id="lastName"
        label="Last Name"
        className={classes.nameField}
        value={values.lastName}
        onChange={handleValueChange('lastName')}
        disabled={disabled}
        margin="normal"
      />

      <TextField
        id="email"
        label="Email"
        className={classes.textField}
        value={values.email}
        onChange={handleValueChange('email')}
        disabled={disabled}
        margin="normal"
      />

      <TextField
        id="dob"
        label="Date of Birth"
        type="date"
        className={classes.nameField}
        value={values.dob}
        onChange={handleValueChange('dob')}
        disabled={disabled}
        margin="normal"
        InputLabelProps={{
          shrink: true
        }}
      />

      <TextField
        id="phone"
        label="Phone"
        className={classes.nameField}
        value={values.phone}
        onChange={handleValueChange('phone')}
        disabled={disabled}
        margin="normal"
      />
      <FormControl
        margin="normal"
        className={classes.formGroup}
        disabled={disabled}
      >
        <FormLabel className={classes.label} component="legend">
          {'Gender'}
        </FormLabel>
        <RadioGroup
          row
          className={classes.radioGroup}
          value={values.sex}
          onChange={handleValueChange('sex')}
          disabled={disabled}
        >
          <FormControlLabel
            value="Female"
            checked={values.sex === 'Female'}
            control={<Radio color="primary" disabled={disabled} />}
            label={'Female'}
            disabled={disabled}
          />
          <FormControlLabel
            value="Male"
            checked={values.sex === 'Male'}
            control={<Radio color="primary" disabled={disabled} />}
            label={'Male'}
            disabled={disabled}
          />
          <FormControlLabel
            value="Other"
            checked={values.sex === 'Other'}
            control={<Radio color="primary" disabled={disabled} />}
            label={'Other'}
            disabled={disabled}
          />
        </RadioGroup>
      </FormControl>
    </FormGroup>
  );
}
