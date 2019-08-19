import React from 'react';
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
  const { onChange, disabled, patient } = props;
  const { firstName, lastName, middleName, email, dob, phone, sex } = patient;

  return (
    <FormGroup className={classes.row}>
      <TextField
        id="firstName"
        label="First Name"
        className={classes.nameField}
        value={firstName}
        onChange={onChange('firstName')}
        autoFocus
        disabled={disabled}
        margin="normal"
      />

      <TextField
        id="middleName"
        label="Middle Name"
        className={classes.nameField}
        value={middleName}
        onChange={onChange('middleName')}
        disabled={disabled}
        margin="normal"
      />

      <TextField
        id="lastName"
        label="Last Name"
        className={classes.nameField}
        value={lastName}
        onChange={onChange('lastName')}
        disabled={disabled}
        margin="normal"
      />

      <TextField
        id="email"
        label="Email"
        className={classes.textField}
        value={email}
        onChange={onChange('email')}
        disabled={disabled}
        margin="normal"
      />

      <TextField
        id="dob"
        label="Date of Birth"
        type="date"
        className={classes.nameField}
        value={dob}
        onChange={onChange('dob')}
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
        value={phone}
        onChange={onChange('phone')}
        disabled={disabled}
        margin="normal"
      />
      <FormControl margin="normal" className={classes.formGroup}>
        <FormLabel className={classes.label} component="legend">
          {'Gender'}
        </FormLabel>
        <RadioGroup
          row
          className={classes.radioGroup}
          value={sex}
          onChange={onChange('sex')}
          disabled={disabled}
        >
          <FormControlLabel
            value="Female"
            checked={sex === 'Female'}
            control={<Radio color="primary" />}
            label={'Female'}
            disabled={disabled}
          />
          <FormControlLabel
            value="Male"
            checked={sex === 'Male'}
            control={<Radio color="primary" />}
            label={'Male'}
            disabled={disabled}
          />
          <FormControlLabel
            value="Other"
            checked={sex === 'Other'}
            control={<Radio color="primary" />}
            label={'Other'}
            disabled={disabled}
          />
        </RadioGroup>
      </FormControl>
    </FormGroup>
  );
}
