import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormGroup, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  row: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 10,
    width: '100%'
  },
  fullWidth: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));

export default function IllnessFormGroup(props) {
  const classes = useStyles();
  const { onChange, illnesses, disabled } = props;
  const { illness, diagnosis } = illnesses || {};
  const [values, setValues] = useState({
    illness: illness || '',
    diagnosis: diagnosis || ''
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
        className={classes.fullWidth}
        id="illness"
        label={
          'Description, location, onset, severity, duration, provocative/palliative factor, associated symtoms, X-ray or MRI report, past treatments for the complaint, social factors, other complaints'
        }
        value={values.illness}
        onChange={handleChangeValues('illness')}
        disabled={disabled}
        margin="normal"
        fullWidth
        multiline
        rowsMax={8}
        InputLabelProps={{
          shrink: true
        }}
      />

      <TextField
        className={classes.fullWidth}
        id="diagnosis"
        label={'Western Medical Diagnosis (Only if the patient brings in):'}
        value={values.diagnosis}
        onChange={handleChangeValues('diagnosis')}
        disabled={disabled}
        margin="normal"
        fullWidth
        InputLabelProps={{
          shrink: true
        }}
      />
    </FormGroup>
  );
}
