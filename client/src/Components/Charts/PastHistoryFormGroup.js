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

export default function PastHistoryFormGroup(props) {
  const classes = useStyles();
  const { onChange, info, disabled } = props;
  const { pastHx, medication, familyHx, allergy } = info || {};
  const [values, setValues] = useState({
    pastHx: pastHx || '',
    medication: medication || '',
    familyHx: familyHx || '',
    allergy: allergy || ''
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
        id="pastHx"
        label={'Significant Disease, Surgical History, Trauma, Other'}
        value={values.pastHx}
        onChange={handleChangeValues('pastHx')}
        disabled={disabled}
        margin="normal"
        fullWidth
      />

      <TextField
        className={classes.fullWidth}
        id="medication"
        label={'Medication'}
        value={values.medication}
        onChange={handleChangeValues('medication')}
        disabled={disabled}
        margin="normal"
        fullWidth
      />

      <TextField
        className={classes.fullWidth}
        id="familyHx"
        label={'Family Hx'}
        value={values.familyHx}
        onChange={handleChangeValues('familyHx')}
        disabled={disabled}
        margin="normal"
        fullWidth
      />

      <TextField
        className={classes.fullWidth}
        id="allergy"
        label={'Allergy'}
        value={values.allergy}
        onChange={handleChangeValues('allergy')}
        disabled={disabled}
        margin="normal"
        fullWidth
      />
    </FormGroup>
  );
}
