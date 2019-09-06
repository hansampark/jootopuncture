import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormGroup, TextField } from '@material-ui/core';
import Canvas from '../Canvas';
import NewCanvas from '../NewCanvas';

const useStyles = makeStyles(theme => ({
  row: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 10,
    width: '100%'
  },
  column: {
    flexDirection: 'column',
    flex: 1,
    paddingRight: theme.spacing(3)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  canvas: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: `${theme.spacing(5)}px auto 0 `
  }
}));

export default function SystemicReviewFormGroup(props) {
  const classes = useStyles();
  const { onChange, review, disabled } = props;
  const {
    head,
    eent,
    skin,
    chest,
    respiratory,
    cardio,
    gas,
    muscle,
    neuro,
    spine,
    extremities,
    dtr,
    other,
    drawings
  } = review;
  const [values, setValues] = useState({
    head: head || '',
    eent: eent || '',
    skin: skin || '',
    chest: chest || '',
    respiratory: respiratory || '',
    cardio: cardio || '',
    gas: gas || '',
    muscle: muscle || '',
    neuro: neuro || '',
    spine: spine || '',
    extremities: extremities || '',
    dtr: dtr || '',
    other: other || '',
    drawings: drawings || { objects: [] }
  });
  console.log('[review drawing[', drawings);

  const handleChangeValues = name => event => {
    setValues({ ...values, [name]: event.target.value });

    if (onChange) {
      onChange({ ...values, [name]: event.target.value });
    }
  };

  const handleSave = data => {
    setValues({ ...values, drawings: { objects: data } });
    onChange({ ...values, drawings: { objects: data } });
  };

  return (
    <FormGroup id="review-container" className={classes.row}>
      <div className={classes.column}>
        <TextField
          className={classes.textField}
          id="head"
          label={'Head / Face'}
          value={values.head}
          onChange={handleChangeValues('head')}
          disabled={disabled}
          margin="normal"
          fullWidth
        />

        <TextField
          className={classes.textField}
          id="eent"
          label={'EENT'}
          value={values.eent}
          onChange={handleChangeValues('eent')}
          disabled={disabled}
          margin="normal"
          fullWidth
        />

        <TextField
          className={classes.textField}
          id="skin"
          label={'Skin'}
          value={values.skin}
          onChange={handleChangeValues('skin')}
          disabled={disabled}
          margin="normal"
          fullWidth
        />

        <TextField
          className={classes.textField}
          id="chest"
          label={'Chest / Breast'}
          value={values.chest}
          onChange={handleChangeValues('chest')}
          disabled={disabled}
          margin="normal"
          fullWidth
        />

        <TextField
          className={classes.textField}
          id="respiratory"
          label={'Respiratory'}
          value={values.respiratory}
          onChange={handleChangeValues('respiratory')}
          disabled={disabled}
          margin="normal"
          fullWidth
        />

        <TextField
          className={classes.textField}
          id="cardio"
          label={'Cardiovascular'}
          value={values.cardio}
          onChange={handleChangeValues('cardio')}
          disabled={disabled}
          margin="normal"
          fullWidth
        />
      </div>

      <div className={classes.column}>
        <TextField
          className={classes.textField}
          id="gas"
          label={'Gastrointerstinal'}
          value={values.gas}
          onChange={handleChangeValues('gas')}
          disabled={disabled}
          margin="normal"
          fullWidth
        />

        <TextField
          className={classes.textField}
          id="muscle"
          label={'Musculoskeletal'}
          value={values.muscle}
          onChange={handleChangeValues('muscle')}
          disabled={disabled}
          margin="normal"
          fullWidth
        />
        <TextField
          className={classes.textField}
          id="neuro"
          label={'Neurological'}
          value={values.neuro}
          onChange={handleChangeValues('neuro')}
          disabled={disabled}
          margin="normal"
          fullWidth
        />

        <TextField
          className={classes.textField}
          id="spine"
          label={'Spine'}
          value={values.spine}
          onChange={handleChangeValues('spine')}
          disabled={disabled}
          margin="normal"
          fullWidth
        />

        <TextField
          className={classes.textField}
          id="extremities"
          label={'Extremities'}
          value={values.extremities}
          onChange={handleChangeValues('extremities')}
          disabled={disabled}
          margin="normal"
          fullWidth
        />

        <TextField
          className={classes.textField}
          id="dtr"
          label={'DTR / Sensory'}
          value={values.dtr}
          onChange={handleChangeValues('dtr')}
          disabled={disabled}
          margin="normal"
          fullWidth
        />
      </div>

      <TextField
        className={classes.textField}
        id="other"
        label={'Muscle tones, MMT, ROM, Activities of Daily Living, etc.'}
        value={values.other}
        onChange={handleChangeValues('other')}
        disabled={disabled}
        margin="normal"
        helperText={'Other / Describe the abnormalities'}
        fullWidth
        multiline
        rowsMax={8}
        InputLabelProps={{
          shrink: true
        }}
      />

      <div className={classes.canvas}>
        <NewCanvas
          src="/images/body-diagram.jpg"
          data={drawings}
          width={918}
          height={440}
          opacity={0.5}
          onSave={handleSave}
          isDrawing
          disabled={disabled}
        />
      </div>
    </FormGroup>
  );
}
