import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormGroup,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  TextField,
  InputAdornment
} from '@material-ui/core';

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
  formGroup: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    borderBottom: '1px solid rgba(0, 0, 0, 0.42)'
  },
  label: {
    fontSize: 12
  },
  radioGroup: {
    marginBottom: -3,
    marginTop: -4
  }
}));

export default function ComplaintFormGroup(props) {
  const classes = useStyles();
  const { onChange, complaints, disabled } = props;
  const {
    complaint,
    location,
    onset,
    provocation,
    palliation,
    quality,
    region,
    pain,
    intensity,
    frequency,
    timing,
    cause,
    remarks
  } = complaints;

  const [values, setValues] = useState({
    complaint: complaint || '',
    location: location || '',
    onset: onset || '',
    provocation: provocation || '',
    palliation: palliation || '',
    quality: quality || '',
    region: region || '',
    pain: pain || '',
    intensity: intensity || null,
    frequency: frequency || null,
    timing: timing || '',
    cause: cause || '',
    remarks: remarks || ''
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
        id="complaint"
        label="Chief Complaint"
        value={values.complaint}
        onChange={handleChangeValues('complaint')}
        disabled={disabled}
        margin="normal"
        fullWidth
      />

      <TextField
        className={classes.textField}
        id="location"
        label="Location"
        value={values.ocation}
        onChange={handleChangeValues('location')}
        disabled={disabled}
        margin="normal"
      />

      <TextField
        className={classes.textField}
        id="onset"
        label="Onset"
        value={values.onset}
        onChange={handleChangeValues('onset')}
        disabled={disabled}
        margin="normal"
      />

      <TextField
        className={classes.textField}
        id="provocation"
        label="Provocation/Aggravate F."
        value={values.provocation}
        onChange={handleChangeValues('provocation')}
        disabled={disabled}
        margin="normal"
      />

      <TextField
        className={classes.textField}
        id="palliation"
        label="Palliation/Alleviate F."
        value={values.palliation}
        onChange={handleChangeValues('palliation')}
        disabled={disabled}
        margin="normal"
      />

      <TextField
        className={classes.textField}
        id="quality"
        label="Qaulity"
        value={values.quality}
        onChange={handleChangeValues('quality')}
        disabled={disabled}
        margin="normal"
      />

      <TextField
        className={classes.textField}
        id="region"
        label="Region/Radiation"
        value={values.region}
        onChange={handleChangeValues('region')}
        disabled={disabled}
        margin="normal"
      />

      <TextField
        style={{ width: 100 }}
        className={classes.textField}
        id="pain"
        label="Pain Level"
        type="number"
        value={values.pain}
        onChange={handleChangeValues('pain')}
        InputLabelProps={{
          shrink: true
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment className={classes.adornment} position="end">
              {'/10'}
            </InputAdornment>
          )
        }}
        disabled={disabled}
        margin="normal"
      />

      <FormControl
        margin="normal"
        className={classes.formGroup}
        disabled={disabled}
      >
        <FormLabel className={classes.label} component="legend">
          {'Pain Intesnity'}
        </FormLabel>
        <RadioGroup
          row
          className={classes.radioGroup}
          value={values.intensity}
          onChange={handleChangeValues('intensity')}
          disabled={disabled}
        >
          <FormControlLabel
            value="MINIMAL"
            checked={values.intensity === 'MINIMAL'}
            control={<Radio color="primary" />}
            label={'Minimal'}
            disabled={disabled}
          />
          <FormControlLabel
            value="SLIGHT"
            checked={values.intensity === 'SLIGHT'}
            control={<Radio color="primary" />}
            label={'Slight'}
            disabled={disabled}
          />
          <FormControlLabel
            value="MODERATE"
            checked={values.intensity === 'MODERATE'}
            control={<Radio color="primary" />}
            label={'Moderate'}
            disabled={disabled}
          />
          <FormControlLabel
            value="SEVERE"
            checked={values.intensity === 'SEVERE'}
            control={<Radio color="primary" />}
            label={'Severe'}
            disabled={disabled}
          />
        </RadioGroup>
      </FormControl>

      <TextField
        className={classes.textField}
        id="timing"
        label="Timing"
        value={values.timing}
        onChange={handleChangeValues('timing')}
        disabled={disabled}
        margin="normal"
      />

      <FormControl
        margin="normal"
        className={classes.formGroup}
        disabled={disabled}
      >
        <FormLabel className={classes.label} component="legend">
          {'Frequency'}
        </FormLabel>
        <RadioGroup
          row
          className={classes.radioGroup}
          value={values.frequency}
          onChange={handleChangeValues('frequency')}
          disabled={disabled}
        >
          <FormControlLabel
            value="OCCASIONAL"
            checked={values.frequency === 'OCCASIONAL'}
            control={<Radio color="primary" />}
            label={'Occasional'}
            disabled={disabled}
          />
          <FormControlLabel
            value="INTERMITTENT"
            checked={values.frequency === 'INTERMITTENT'}
            control={<Radio color="primary" />}
            label={'Intermittent'}
            disabled={disabled}
          />
          <FormControlLabel
            value="FREQUENT"
            checked={values.frequency === 'FREQUENT'}
            control={<Radio color="primary" />}
            label={'Frequent'}
            disabled={disabled}
          />
          <FormControlLabel
            value="CONSTANT"
            checked={values.frequency === 'CONSTANT'}
            control={<Radio color="primary" />}
            label={'Constant'}
            disabled={disabled}
          />
        </RadioGroup>
      </FormControl>

      <TextField
        className={classes.textField}
        id="cause"
        label="Possible Cause"
        value={values.cause}
        onChange={handleChangeValues('cause')}
        disabled={disabled}
        margin="normal"
      />

      <TextField
        className={classes.fullWidth}
        id="remarks"
        label="Remarks"
        value={values.remarks}
        onChange={handleChangeValues('remarks')}
        disabled={disabled}
        margin="normal"
        fullWidth
      />
    </FormGroup>
  );
}
