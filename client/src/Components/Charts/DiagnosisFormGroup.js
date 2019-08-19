import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormGroup,
  FormControlLabel,
  TextField,
  InputAdornment,
  Checkbox
} from '@material-ui/core';

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
  const { onChange, diagnosis } = props;
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
    sign
  } = diagnosis;
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
    sign: sign || ''
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

  return (
    <FormGroup className={classes.row}>
      <TextField
        className={classes.fullWidth}
        id="etiology"
        label={'Etiology'}
        value={values.etiology}
        onChange={handleChangeValues('etiology')}
        margin="normal"
        fullWidth
      />

      <TextField
        className={classes.textField}
        id="tcm"
        label={'TCM Diagnosis'}
        value={values.tcm}
        onChange={handleChangeValues('tcm')}
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
        margin="normal"
      />

      <TextField
        className={classes.textField}
        id="acPoints"
        label={'Acupuncture Points'}
        value={values.acPoints}
        onChange={handleChangeValues('acPoints')}
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
            />
          }
          label="Tui-Na"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={values.otherTrt.acupressure}
              onChange={handleChangeTreatment('acupressure')}
              color="primary"
              value="acupressure"
            />
          }
          label="Acupressure"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={values.otherTrt.moxa}
              onChange={handleChangeTreatment('moxa')}
              color="primary"
              value="moxa"
            />
          }
          label="Moxa"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={values.otherTrt.cupping}
              onChange={handleChangeTreatment('cupping')}
              color="primary"
              value="cupping"
            />
          }
          label="Cupping"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={values.otherTrt.electroAc}
              onChange={handleChangeTreatment('electroAc')}
              color="primary"
              value="electroAc"
            />
          }
          label="Electro Acupuncture"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={values.otherTrt.heatpack}
              onChange={handleChangeTreatment('heatpack')}
              color="primary"
              value="heatpack"
            />
          }
          label="Heat Pack"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={values.otherTrt.other}
              onChange={handleChangeTreatment('other')}
              color="primary"
              value="other"
            />
          }
          label="Other"
        />
      </div>

      <TextField
        className={classes.fullWidth}
        id="auricular"
        label={'Auricular Acupuncture / Ear Seeds'}
        value={values.auricular}
        onChange={handleChangeValues('auricular')}
        margin="normal"
        fullWidth
      />

      <TextField
        className={classes.textField}
        id="condition"
        label={'Condition Treated'}
        value={values.condition}
        onChange={handleChangeValues('condition')}
        margin="normal"
      />

      <TextField
        className={classes.textField}
        id="icd"
        label={'ICD'}
        value={values.icd}
        onChange={handleChangeValues('icd')}
        margin="normal"
      />

      <TextField
        className={classes.textField}
        id="cpt"
        label={'CPT'}
        value={values.cpt}
        onChange={handleChangeValues('cpt')}
        margin="normal"
      />

      <TextField
        className={classes.fullWidth}
        id="comments"
        label={'Prognosis / Recommendations / Comments'}
        value={values.comments}
        onChange={handleChangeValues('comments')}
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
          margin="normal"
        />

        <TextField
          className={classes.textField}
          id="pulse"
          label={'Pulse'}
          value={values.pulse}
          onChange={handleChangeValues('pulse')}
          margin="normal"
        />
      </div>

      <TextField
        className={classes.textField}
        id="sign"
        label={'DAOM Intern'}
        value={values.sign}
        onChange={handleChangeValues('sign')}
        margin="normal"
        fullWidth
      />
    </FormGroup>
  );
}
