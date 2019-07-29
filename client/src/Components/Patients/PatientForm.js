// Currently not used.
// might be used in future
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
  const { onChange, patient } = props;
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
        margin="normal"
      />

      <TextField
        id="middleName"
        label="Middle Name"
        className={classes.nameField}
        value={middleName}
        onChange={onChange('middleName')}
        margin="normal"
      />

      <TextField
        id="lastName"
        label="Last Name"
        className={classes.nameField}
        value={lastName}
        onChange={onChange('lastName')}
        margin="normal"
      />

      <TextField
        id="email"
        label="Email"
        className={classes.textField}
        value={email}
        onChange={onChange('email')}
        margin="normal"
      />

      <TextField
        id="dob"
        label="Date of Birth"
        type="date"
        className={classes.nameField}
        value={dob}
        onChange={onChange('dob')}
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
        margin="normal"
      />
      <FormControl margin="normal" className={classes.formGroup}>
        <FormLabel className={classes.label} component="legend">
          {'Gender'}
        </FormLabel>
        <RadioGroup
          row
          className={classes.radioGroup}
          onChange={onChange('sex')}
        >
          <FormControlLabel
            value="Female"
            control={<Radio />}
            label={'Female'}
          />
          <FormControlLabel value="Male" control={<Radio />} label={'Male'} />
          <FormControlLabel value="Other" control={<Radio />} label={'Other'} />
        </RadioGroup>
      </FormControl>
    </FormGroup>
  );
}
