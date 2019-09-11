import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormGroup,
  FormControlLabel,
  TextField,
  InputAdornment,
  Checkbox
} from '@material-ui/core';
import SignatureField from '../SignatureField';

const useStyles = makeStyles(theme => ({
  row: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 10,
    width: '100%'
  },
  container: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  fullWidth: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      width: 200
    },
    [theme.breakpoints.up('sm')]: {
      width: 300
    }
  },
  label: {
    marginBottom: theme.spacing(1)
  }
}));

export default function DiagnosisFormGroup(props) {
  const classes = useStyles();
  const { onChange, diagnosis, disabled } = props;
  const {
    etiology,
    tcm,
    treatment,
    acPoints,
    herbalTrt,
    assessments,
    otherTrt,
    auricular,
    condition,
    icd,
    cpt,
    comments,
    pain,
    heart,
    pulse,
    signature
  } = diagnosis || {};
  const [values, setValues] = useState({
    etiology: etiology || '',
    tcm: tcm || '',
    treatment: treatment || '',
    acPoints: acPoints || '',
    herbalTrt: herbalTrt || '',
    assessments: assessments || '',
    otherTrt: otherTrt || {
      tuina: false,
      acupressure: false,
      moxa: false,
      cupping: false,
      electroAc: false,
      heatpack: false,
      other: false
    },
    auricular: auricular || '',
    condition: condition || '',
    icd: icd || '',
    cpt: cpt || '',
    comments: comments || '',
    pain: pain || '',
    heart: heart || '',
    pulse: pulse || '',
    signature: signature || { objects: [] }
  });

  const handleChangeValues = name => event => {
    setValues({ ...values, [name]: event.target.value });

    if (onChange) {
      onChange({ ...values, [name]: event.target.value });
    }
  };

  const handleChangeTreatment = name => event => {
    setValues({
      ...values,
      otherTrt: {
        ...values.otherTrt,
        [name]: event.target.checked
      }
    });

    if (onChange) {
      onChange({
        ...values,
        otherTrt: {
          ...values.otherTrt,
          [name]: event.target.checked
        }
      });
    }
  };

  const handleSave = data => {
    setValues({ ...values, signature: { objects: data } });
    onChange({ ...values, signature: { objects: data } });
  };

  return (
    <FormGroup className={classes.row}>
      <TextField
        className={classes.fullWidth}
        id="etiology"
        label={'Etiology'}
        value={values.etiology}
        onChange={handleChangeValues('etiology')}
        disabled={disabled}
        margin="normal"
        fullWidth
      />

      <TextField
        className={classes.textField}
        id="tcm"
        label={'TCM Diagnosis'}
        value={values.tcm}
        onChange={handleChangeValues('tcm')}
        disabled={disabled}
        margin="normal"
        InputLabelProps={{
          shrink: true
        }}
        helperText={'Syndrome / Differentiation'}
      />

      <TextField
        className={classes.textField}
        id="treatment"
        label={'Treatment Principle'}
        value={values.treatment}
        onChange={handleChangeValues('treatment')}
        disabled={disabled}
        margin="normal"
      />

      <TextField
        className={classes.textField}
        id="acPoints"
        label={'Acupuncture Points'}
        value={values.acPoints}
        onChange={handleChangeValues('acPoints')}
        disabled={disabled}
        margin="normal"
        InputLabelProps={{
          shrink: true
        }}
        helperText={
          'Tonify(⊤), Sedating(⊥), Even(l), Electro Acupuncture(E), Moxa(Δ)'
        }
      />

      <TextField
        className={classes.textField}
        id="herbalTrt"
        label={'Herbal Treatment Formula Herbs Modification'}
        value={values.herbalTrt}
        onChange={handleChangeValues('herbalTrt')}
        disabled={disabled}
        margin="normal"
        InputLabelProps={{
          shrink: true
        }}
      />

      <TextField
        className={classes.fullWidth}
        id="assessments"
        label={'Pharmacological Assessments'}
        value={values.assessments}
        onChange={handleChangeValues('assessments')}
        disabled={disabled}
        margin="normal"
        fullWidth
        InputLabelProps={{
          shrink: true
        }}
        helperText={'Herb-Drug Interactions, etc.'}
      />

      <div
        className={classes.container}
        style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.42)' }}
      >
        <div className={classes.label}>{'Other Treatment'}</div>

        <FormControlLabel
          control={
            <Checkbox
              checked={values.otherTrt.tuina}
              onChange={handleChangeTreatment('tuina')}
              color="primary"
              value="tuina"
              disabled={disabled}
            />
          }
          label="Tui-Na"
          disabled={disabled}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={values.otherTrt.acupressure}
              onChange={handleChangeTreatment('acupressure')}
              color="primary"
              value="acupressure"
              disabled={disabled}
            />
          }
          label="Acupressure"
          disabled={disabled}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={values.otherTrt.moxa}
              onChange={handleChangeTreatment('moxa')}
              color="primary"
              value="moxa"
              disabled={disabled}
            />
          }
          label="Moxa"
          disabled={disabled}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={values.otherTrt.cupping}
              onChange={handleChangeTreatment('cupping')}
              color="primary"
              value="cupping"
              disabled={disabled}
            />
          }
          label="Cupping"
          disabled={disabled}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={values.otherTrt.electroAc}
              onChange={handleChangeTreatment('electroAc')}
              color="primary"
              value="electroAc"
              disabled={disabled}
            />
          }
          label="Electro Acupuncture"
          disabled={disabled}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={values.otherTrt.heatpack}
              onChange={handleChangeTreatment('heatpack')}
              color="primary"
              value="heatpack"
              disabled={disabled}
            />
          }
          label="Heat Pack"
          disabled={disabled}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={values.otherTrt.other}
              onChange={handleChangeTreatment('other')}
              color="primary"
              value="other"
              disabled={disabled}
            />
          }
          label="Other"
          disabled={disabled}
        />
      </div>

      <TextField
        className={classes.fullWidth}
        id="auricular"
        label={'Auricular Acupuncture / Ear Seeds'}
        value={values.auricular}
        onChange={handleChangeValues('auricular')}
        disabled={disabled}
        margin="normal"
        fullWidth
      />

      <TextField
        className={classes.textField}
        id="condition"
        label={'Condition Treated'}
        value={values.condition}
        onChange={handleChangeValues('condition')}
        disabled={disabled}
        margin="normal"
      />

      <TextField
        className={classes.textField}
        id="icd"
        label={'ICD'}
        value={values.icd}
        onChange={handleChangeValues('icd')}
        disabled={disabled}
        margin="normal"
      />

      <TextField
        className={classes.textField}
        id="cpt"
        label={'CPT'}
        value={values.cpt}
        onChange={handleChangeValues('cpt')}
        disabled={disabled}
        margin="normal"
      />

      <TextField
        className={classes.fullWidth}
        id="comments"
        label={'Prognosis / Recommendations / Comments'}
        value={values.comments}
        onChange={handleChangeValues('comments')}
        disabled={disabled}
        margin="normal"
        fullWidth
      />

      <div
        className={classes.container}
        style={{ marginLeft: 0, marginRight: 0 }}
      >
        <div style={{ marginLeft: 8, marginRight: 8 }}>
          {'Patient condition immediately after treatment'}
        </div>

        <TextField
          className={classes.textField}
          id="pain"
          label={'Pain Level'}
          value={values.pain}
          onChange={handleChangeValues('pain')}
          disabled={disabled}
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment className={classes.adornment} position="end">
                {'/10'}
              </InputAdornment>
            )
          }}
        />

        <TextField
          className={classes.textField}
          id="heart"
          label={'Heart Rate'}
          value={values.heart}
          onChange={handleChangeValues('heart')}
          disabled={disabled}
          margin="normal"
        />

        <TextField
          className={classes.textField}
          id="pulse"
          label={'Pulse'}
          value={values.pulse}
          onChange={handleChangeValues('pulse')}
          disabled={disabled}
          margin="normal"
        />
      </div>

      <div>
        <SignatureField
          data={signature}
          onSave={handleSave}
          disabled={disabled}
        />
      </div>
    </FormGroup>
  );
}
