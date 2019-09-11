import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormGroup, TextField, InputAdornment } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  row: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 10,
    width: '100%'
  },
  subField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    flex: 1
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
  }
}));

export default function QuestionaireFormGroup(props) {
  const classes = useStyles();
  const { onChange, questionaire, disabled } = props;
  const {
    fever,
    perspiration,
    thirst,
    appetite,
    digestion,
    taste,
    bowel,
    urine,
    sleep,
    pain,
    consciousness,
    energy,
    stress
  } = questionaire || {};

  const [values, setValues] = useState({
    fever: fever || '',
    perspiration: perspiration || '',
    thirst: thirst || '',
    appetite: appetite || '',
    digestion: digestion || '',
    taste: taste || '',
    bowel: bowel || { frequency: '', quality: '', color: '', smell: '' },
    urine: urine || { frequency: '', amount: '', color: '', smell: '' },
    sleep: sleep || '',
    pain: pain || '',
    consciousness: consciousness || '',
    energy: energy || '',
    stress: stress || ''
  });

  const handleChangeValues = name => event => {
    switch (name) {
      case 'bowelFrequency': {
        setValues({
          ...values,
          bowel: {
            ...values.bowel,
            frequency: event.target.value
          }
        });
        break;
      }
      case 'bowelQuality': {
        setValues({
          ...values,
          bowel: {
            ...values.bowel,
            quality: event.target.value
          }
        });
        break;
      }
      case 'bowelColor': {
        setValues({
          ...values,
          bowel: {
            ...values.bowel,
            color: event.target.value
          }
        });
        break;
      }
      case 'bowelSmell': {
        setValues({
          ...values,
          bowel: {
            ...values.bowel,
            smell: event.target.value
          }
        });
        break;
      }
      case 'urineFrequency': {
        setValues({
          ...values,
          urine: {
            ...values.urine,
            frequency: event.target.value
          }
        });
        break;
      }
      case 'urineAmount': {
        setValues({
          ...values,
          urine: {
            ...values.urine,
            amount: event.target.value
          }
        });
        break;
      }
      case 'urineColor': {
        setValues({
          ...values,
          urine: {
            ...values.urine,
            color: event.target.value
          }
        });
        break;
      }
      case 'urineSmell': {
        setValues({
          ...values,
          urine: {
            ...values.urine,
            smell: event.target.value
          }
        });
        break;
      }
      default:
        setValues({ ...values, [name]: event.target.value });
        break;
    }

    if (onChange) {
      onChange({ ...values, [name]: event.target.value });
    }
  };

  return (
    <FormGroup className={classes.row}>
      <TextField
        className={classes.textField}
        id="fever"
        label={'Fever & Chills'}
        value={values.fever}
        onChange={handleChangeValues('fever')}
        disabled={disabled}
        margin="normal"
      />

      <TextField
        className={classes.textField}
        id="perspiration"
        label={'Perspiration'}
        value={values.perspiration}
        onChange={handleChangeValues('perspiration')}
        disabled={disabled}
        margin="normal"
      />

      <TextField
        className={classes.textField}
        id="thirst"
        label={'Thirst'}
        value={values.thirst}
        onChange={handleChangeValues('thirst')}
        disabled={disabled}
        margin="normal"
      />

      <TextField
        className={classes.textField}
        id="appetite"
        label={'Appetite'}
        value={values.appetite}
        onChange={handleChangeValues('appetite')}
        disabled={disabled}
        margin="normal"
      />

      <TextField
        className={classes.textField}
        id="digestion"
        label={'Digestion'}
        value={values.digestion}
        onChange={handleChangeValues('digestion')}
        disabled={disabled}
        margin="normal"
      />

      <TextField
        className={classes.textField}
        id="taste"
        label={'Taste'}
        value={values.taste}
        onChange={handleChangeValues('taste')}
        disabled={disabled}
        margin="normal"
      />

      <div className={classes.row}>
        <TextField
          className={classes.subField}
          id="bowelFrequency"
          label={'Bowel Frequency'}
          value={values.bowel.frequency}
          onChange={handleChangeValues('bowelFrequency')}
          disabled={disabled}
          margin="normal"
        />

        <TextField
          className={classes.subField}
          id="bowelQuality"
          label={'Bowel Quality'}
          value={values.bowel.quality}
          onChange={handleChangeValues('bowelQuality')}
          disabled={disabled}
          margin="normal"
        />

        <TextField
          className={classes.subField}
          id="bowelColor"
          label={'Bowel Color'}
          value={values.bowel.color}
          onChange={handleChangeValues('bowelColor')}
          disabled={disabled}
          margin="normal"
        />

        <TextField
          className={classes.subField}
          id="bowelSmell"
          label={'Bowel Smell'}
          value={values.bowel.smell}
          onChange={handleChangeValues('bowelSmell')}
          disabled={disabled}
          margin="normal"
        />
      </div>

      <div className={classes.row}>
        <TextField
          className={classes.subField}
          id="urineFrequency"
          label={'Urine Frequency'}
          value={values.urine.frequency}
          onChange={handleChangeValues('urineFrequency')}
          disabled={disabled}
          margin="normal"
        />

        <TextField
          className={classes.subField}
          id="urineAmount"
          label={'Urine Amount'}
          value={values.urine.amount}
          onChange={handleChangeValues('urineAmount')}
          disabled={disabled}
          margin="normal"
        />

        <TextField
          className={classes.subField}
          id="urineColor"
          label={'Urine Color'}
          value={values.urine.color}
          onChange={handleChangeValues('urineColor')}
          disabled={disabled}
          margin="normal"
        />

        <TextField
          className={classes.subField}
          id="urineSmell"
          label={'Urine Smell'}
          value={values.urine.smell}
          onChange={handleChangeValues('urineSmell')}
          disabled={disabled}
          margin="normal"
        />
      </div>

      <TextField
        className={classes.fullWidth}
        id="sleep"
        label={'Sleep'}
        value={values.sleep}
        onChange={handleChangeValues('sleep')}
        disabled={disabled}
        margin="normal"
        fullWidth
      />

      <TextField
        className={classes.fullWidth}
        id="pain"
        label={'Pain'}
        value={values.pain}
        onChange={handleChangeValues('pain')}
        disabled={disabled}
        margin="normal"
        fullWidth
      />

      <TextField
        className={classes.textField}
        id="consciousness"
        label={'Consciousness'}
        value={values.consciousness}
        onChange={handleChangeValues('consciousness')}
        disabled={disabled}
        margin="normal"
      />

      <TextField
        className={classes.textField}
        id="energy"
        label={'Energy Level'}
        value={values.energy}
        onChange={handleChangeValues('energy')}
        disabled={disabled}
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
        margin="normal"
      />

      <TextField
        className={classes.textField}
        id="stress"
        label={'Stress'}
        value={values.stress}
        onChange={handleChangeValues('stress')}
        disabled={disabled}
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
        margin="normal"
      />
    </FormGroup>
  );
}
