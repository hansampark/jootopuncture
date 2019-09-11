import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  InputAdornment,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  row: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 10,
    width: '100%'
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
  margin: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  label: {
    fontSize: 12
  },
  formGroup: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    borderBottom: '1px solid rgba(0, 0, 0, 0.42)'
  },
  radioGroup: {
    marginBottom: -3,
    marginTop: -4
  },
  adornment: {
    fontSize: 12
  }
}));

export default function WomenFormGroup(props) {
  const classes = useStyles();
  const { onChange, women, disabled } = props;
  const {
    menarche,
    menopause,
    pregnancy,
    child,
    miscarriage,
    leukorrhea,
    birthControl,
    bcUsage,
    menstruation
  } = women;
  const [values, setValues] = useState({
    menarche: menarche || '',
    menopause: menopause || '',
    pregnancy: pregnancy || '',
    child: child || '',
    miscarriage: miscarriage || '',
    leukorrhea: leukorrhea || '',
    birthControl: birthControl || null,
    bcUsage: bcUsage || '',
    menstruation: menstruation || {
      lmp: '',
      cycle: '',
      quantity: '',
      duration: '',
      color: '',
      clots: '',
      dysmenorrhea: ''
    }
  });

  const handleChangeValues = name => event => {
    switch (name) {
      case 'lmp': {
        setValues({
          ...values,
          menstruation: {
            ...values.menstruation,
            lmp: event.target.value
          }
        });
        break;
      }
      case 'cycle': {
        setValues({
          ...values,
          menstruation: {
            ...values.menstruation,
            cycle: event.target.value
          }
        });
        break;
      }
      case 'quantity': {
        setValues({
          ...values,
          menstruation: {
            ...values.menstruation,
            quantity: event.target.value
          }
        });
        break;
      }
      case 'duration': {
        setValues({
          ...values,
          menstruation: {
            ...values.menstruation,
            duration: event.target.value
          }
        });
        break;
      }
      case 'color': {
        setValues({
          ...values,
          menstruation: {
            ...values.menstruation,
            color: event.target.value
          }
        });
        break;
      }
      case 'clots': {
        setValues({
          ...values,
          menstruation: {
            ...values.menstruation,
            clots: event.target.value
          }
        });
        break;
      }
      case 'dysmenorrhea': {
        setValues({
          ...values,
          menstruation: {
            ...values.menstruation,
            dysmenorrhea: event.target.value
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
        id="menarche"
        label={'Menarche'}
        type="number"
        value={values.menarche}
        onChange={handleChangeValues('menarche')}
        disabled={disabled}
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment className={classes.adornment} position="end">
              {'yrs.'}
            </InputAdornment>
          )
        }}
      />

      <TextField
        className={classes.textField}
        id="menopause"
        label={'Menopause'}
        type="number"
        value={values.menopause}
        onChange={handleChangeValues('menopause')}
        disabled={disabled}
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment className={classes.adornment} position="end">
              {'yrs.'}
            </InputAdornment>
          )
        }}
      />

      <TextField
        className={classes.textField}
        id="pregnancy"
        label={'# of Pregnancy'}
        type="number"
        value={values.pregnancy}
        onChange={handleChangeValues('pregnancy')}
        disabled={disabled}
        margin="normal"
      />

      <TextField
        className={classes.textField}
        id="child"
        label={'# of Child'}
        type="number"
        value={values.child}
        onChange={handleChangeValues('child')}
        disabled={disabled}
        margin="normal"
      />

      <TextField
        className={classes.textField}
        id="miscarriage"
        label={'Miscarriage'}
        value={values.miscarriage}
        onChange={handleChangeValues('miscarriage')}
        disabled={disabled}
        margin="normal"
      />

      <TextField
        className={classes.textField}
        id="leukorrhea"
        label={'Leukorrhea'}
        value={values.leukorrhea}
        onChange={handleChangeValues('leukorrhea')}
        disabled={disabled}
        margin="normal"
      />

      <div>
        <FormControl
          margin="normal"
          className={classes.formGroup}
          disabled={disabled}
        >
          <FormLabel className={classes.label} component="legend">
            {'Birth Control'}
          </FormLabel>
          <RadioGroup
            row
            className={classes.radioGroup}
            value={values.birthControl}
            onChange={handleChangeValues('birthControl')}
            disabled={disabled}
          >
            <FormControlLabel
              value="YES"
              checked={values.birthControl === 'YES'}
              control={<Radio color="primary" />}
              label={'Yes'}
              disabled={disabled}
            />
            <FormControlLabel
              value="NO"
              checked={values.birthControl === 'NO'}
              control={<Radio color="primary" />}
              label={'No'}
              disabled={disabled}
            />
          </RadioGroup>
        </FormControl>

        <TextField
          className={classes.textField}
          id="bcUsage"
          label={'Years of Usage'}
          type="number"
          value={values.bcUsage}
          onChange={handleChangeValues('bcUsage')}
          disabled={disabled}
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment className={classes.adornment} position="end">
                {'yrs.'}
              </InputAdornment>
            )
          }}
        />
      </div>

      <div>
        <FormLabel style={{ margin: '16px 8px 0' }} component="legend">
          {'Menstruation'}
        </FormLabel>

        <TextField
          className={classes.textField}
          id="lmp"
          label={'LMP'}
          value={values.menstruation.lmp}
          onChange={handleChangeValues('lmp')}
          disabled={disabled}
          margin="normal"
        />

        <TextField
          className={classes.textField}
          id="cycle"
          label={'Cycle'}
          value={values.menstruation.cycle}
          onChange={handleChangeValues('cycle')}
          disabled={disabled}
          margin="normal"
        />

        <TextField
          className={classes.textField}
          id="quantity"
          label={'Quantity'}
          value={values.menstruation.quantity}
          onChange={handleChangeValues('quantity')}
          disabled={disabled}
          margin="normal"
        />

        <TextField
          className={classes.textField}
          id="duration"
          label={'Duration'}
          value={values.menstruation.duration}
          onChange={handleChangeValues('duration')}
          disabled={disabled}
          margin="normal"
        />

        <TextField
          className={classes.textField}
          id="color"
          label={'Color'}
          value={values.menstruation.color}
          onChange={handleChangeValues('color')}
          disabled={disabled}
          margin="normal"
        />

        <TextField
          className={classes.textField}
          id="clots"
          label={'Clots'}
          value={values.menstruation.clots}
          onChange={handleChangeValues('clots')}
          disabled={disabled}
          margin="normal"
        />

        <TextField
          className={classes.textField}
          id="dysmenorrhea"
          label={'Dysmenorrhea'}
          value={values.menstruation.dysmenorrhea}
          onChange={handleChangeValues('dysmenorrhea')}
          disabled={disabled}
          margin="normal"
        />
      </div>
    </FormGroup>
  );
}
