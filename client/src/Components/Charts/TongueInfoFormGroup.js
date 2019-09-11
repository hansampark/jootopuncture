import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormGroup,
  FormLabel,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import Canvas from '../Canvas';

const useStyles = makeStyles(theme => ({
  row: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 10,
    width: '100%'
  },
  column: {
    flexDirection: 'column',
    flex: 1
  },
  container: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  label: {
    marginTop: theme.spacing(2)
  },
  formGroup: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
    // borderBottom: '1px solid rgba(0, 0, 0, 0.42)'
  },
  radioGroup: {
    marginBottom: -3,
    marginTop: -4
  }
}));

export default function TongueInfoFormGroup(props) {
  const classes = useStyles();
  const { onChange, tongue, disabled } = props;
  const { body, coat, drawings } = tongue || {};
  const [values, setValues] = useState({
    body: body || {
      color: {
        pale: false,
        pink: false,
        red: false,
        darkRed: false,
        purple: false,
        reddishPurple: false,
        bluishPurple: false,
        redTip: false,
        redder: false,
        orange: false,
        purpleSide: false
      },
      shape: {
        stiff: false,
        long: false,
        flaccid: false,
        cracked: false,
        swollen: false,
        short: false,
        rollUp: false,
        rollDown: false,
        ulcerate: false,
        tooth: false,
        halfSwollen: false,
        thin: false,
        thick: false,
        narrow: false,
        deviation: false,
        trembling: false,
        normal: false
      }
    },
    coat: coat || {
      color: {
        white: false,
        yellow: false,
        gray: false,
        black: false,
        greenish: false,
        half: false,
        center: false
      },
      quality: {
        thin: false,
        thick: false,
        scanty: false,
        none: false,
        dry: false,
        wet: false,
        slippery: false,
        greasy: false,
        rough: false,
        sticky: false,
        graphic: false,
        mirror: false
      }
    },
    drawings: drawings || { objects: [] }
  });

  const handleBodyColorChange = name => event => {
    setValues({
      ...values,
      body: {
        ...values.body,
        color: {
          ...values.body.color,
          [name]: event.target.checked
        }
      }
    });

    if (onChange) {
      onChange({
        ...values,
        body: {
          ...values.body,
          color: {
            ...values.body.color,
            [name]: event.target.checked
          }
        }
      });
    }
  };

  const handleBodyShapeChange = name => event => {
    setValues({
      ...values,
      body: {
        ...values.body,
        shape: {
          ...values.body.shape,
          [name]: event.target.checked
        }
      }
    });

    if (onChange) {
      onChange({
        ...values,
        body: {
          ...values.body,
          shape: {
            ...values.body.shape,
            [name]: event.target.checked
          }
        }
      });
    }
  };

  const handleCoatColorChange = name => event => {
    setValues({
      ...values,
      coat: {
        ...values.coat,
        color: {
          ...values.coat.color,
          [name]: event.target.checked
        }
      }
    });

    if (onChange) {
      onChange({
        ...values,
        coat: {
          ...values.coat,
          color: {
            ...values.coat.color,
            [name]: event.target.checked
          }
        }
      });
    }
  };

  const handleCoatQualityChange = name => event => {
    setValues({
      ...values,
      coat: {
        ...values.coat,
        quality: {
          ...values.coat.quality,
          [name]: event.target.checked
        }
      }
    });

    if (onChange) {
      onChange({
        ...values,
        coat: {
          ...values.coat,
          quality: {
            ...values.coat.quality,
            [name]: event.target.checked
          }
        }
      });
    }
  };

  const handleSave = data => {
    setValues({ ...values, ddrawings: { objects: data } });
    onChange({ ...values, drawings: { objects: data } });
  };

  return (
    <FormGroup className={classes.row}>
      <div style={{ flex: 2 }} className={classes.column}>
        <div className={classes.container}>
          <div>{'Body'}</div>

          <FormLabel className={classes.label} component="legend">
            {'Color'}
          </FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.color.pale}
                onChange={handleBodyColorChange('pale')}
                color="primary"
                value="pale"
              />
            }
            label="Pale"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.color.pink}
                onChange={handleBodyColorChange('pink')}
                color="primary"
                value="pink"
                disabled={disabled}
              />
            }
            label="Pink"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.color.red}
                onChange={handleBodyColorChange('red')}
                color="primary"
                value="red"
                disabled={disabled}
              />
            }
            label="Red"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.color.darkRed}
                onChange={handleBodyColorChange('darkRed')}
                color="primary"
                value="darkRed"
                disabled={disabled}
              />
            }
            label="Dark Red"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.color.purple}
                onChange={handleBodyColorChange('purple')}
                color="primary"
                value="purple"
                disabled={disabled}
              />
            }
            label="Purple"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.color.reddishPurple}
                onChange={handleBodyColorChange('reddishPurple')}
                color="primary"
                value="reddishPurple"
                disabled={disabled}
              />
            }
            label="Reddish Purple"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.color.bluishPurple}
                onChange={handleBodyColorChange('bluishPurple')}
                color="primary"
                value="bluishPurple"
                disabled={disabled}
              />
            }
            label="Bluish Purple"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.color.redTip}
                onChange={handleBodyColorChange('redTip')}
                color="primary"
                value="redTip"
                disabled={disabled}
              />
            }
            label="Red Tip"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.color.redder}
                onChange={handleBodyColorChange('redder')}
                color="primary"
                value="redder"
                disabled={disabled}
              />
            }
            label="Redder Side"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.color.orange}
                onChange={handleBodyColorChange('orange')}
                color="primary"
                value="orange"
                disabled={disabled}
              />
            }
            label="Orange Side"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.color.purpleSide}
                onChange={handleBodyColorChange('purpleSide')}
                color="primary"
                value="purpleSide"
                disabled={disabled}
              />
            }
            label="Purple Side"
            disabled={disabled}
          />

          <FormLabel className={classes.label} component="legend">
            {'Shape'}
          </FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.shape.stiff}
                onChange={handleBodyShapeChange('stiff')}
                color="primary"
                value="stiff"
                disabled={disabled}
              />
            }
            label="Stiff"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.shape.long}
                onChange={handleBodyShapeChange('long')}
                color="primary"
                value="long"
                disabled={disabled}
              />
            }
            label="Long"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.shape.flaccid}
                onChange={handleBodyShapeChange('flaccid')}
                color="primary"
                value="flaccid"
                disabled={disabled}
              />
            }
            label="Flaccid"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.shape.cracked}
                onChange={handleBodyShapeChange('cracked')}
                color="primary"
                value="cracked"
                disabled={disabled}
              />
            }
            label="Cracked"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.shape.swollen}
                onChange={handleBodyShapeChange('swollen')}
                color="primary"
                value="swollen"
                disabled={disabled}
              />
            }
            label="Swollen in SIdes or Tip or Center"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.shape.short}
                onChange={handleBodyShapeChange('short')}
                color="primary"
                value="short"
                disabled={disabled}
              />
            }
            label="Short"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.shape.rollUp}
                onChange={handleBodyShapeChange('rollUp')}
                color="primary"
                value="rollUp"
                disabled={disabled}
              />
            }
            label="Rolled Up"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.shape.rollDown}
                onChange={handleBodyShapeChange('rollDown')}
                color="primary"
                value="rollDown"
                disabled={disabled}
              />
            }
            label="Rolled Down"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.shape.ulcerate}
                onChange={handleBodyShapeChange('ulcerate')}
                color="primary"
                value="ulcerate"
                disabled={disabled}
              />
            }
            label="Ulcerate"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.shape.tooth}
                onChange={handleBodyShapeChange('tooth')}
                color="primary"
                value="tooth"
                disabled={disabled}
              />
            }
            label="Tooth-marked"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.shape.halfSwollen}
                onChange={handleBodyShapeChange('halfSwollen')}
                color="primary"
                value="halfSwollen"
                disabled={disabled}
              />
            }
            label="Half Swollen"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.shape.thin}
                onChange={handleBodyShapeChange('thin')}
                color="primary"
                value="thin"
                disabled={disabled}
              />
            }
            label="Thin"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.shape.thick}
                onChange={handleBodyShapeChange('thick')}
                color="primary"
                value="thick"
                disabled={disabled}
              />
            }
            label="Thick"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.shape.narrow}
                onChange={handleBodyShapeChange('narrow')}
                color="primary"
                value="narrow"
                disabled={disabled}
              />
            }
            label="Narrow"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.shape.deviation}
                onChange={handleBodyShapeChange('deviation')}
                color="primary"
                value="deviation"
                disabled={disabled}
              />
            }
            label="Deviation"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.shape.trembling}
                onChange={handleBodyShapeChange('trembling')}
                color="primary"
                value="trembling"
                disabled={disabled}
              />
            }
            label="Trembling"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.shape.normal}
                onChange={handleBodyShapeChange('normal')}
                color="primary"
                value="normal"
                disabled={disabled}
              />
            }
            label="Normal"
            disabled={disabled}
          />
        </div>

        <div className={classes.container}>
          <div className={classes.label}>{'Coating'}</div>

          <FormLabel className={classes.label} component="legend">
            {'Color'}
          </FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                checked={values.coat.color.white}
                onChange={handleCoatColorChange('white')}
                color="primary"
                value="white"
                disabled={disabled}
              />
            }
            label="White"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.coat.color.yellow}
                onChange={handleCoatColorChange('yellow')}
                color="primary"
                value="yellow"
                disabled={disabled}
              />
            }
            label="Yellow"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.coat.color.gray}
                onChange={handleCoatColorChange('gray')}
                color="primary"
                value="gray"
                disabled={disabled}
              />
            }
            label="Gray"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.coat.color.black}
                onChange={handleCoatColorChange('black')}
                color="primary"
                value="black"
                disabled={disabled}
              />
            }
            label="Black"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.coat.color.greenish}
                onChange={handleCoatColorChange('greenish')}
                color="primary"
                value="greenish"
                disabled={disabled}
              />
            }
            label="Greenish"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.coat.color.half}
                onChange={handleCoatColorChange('half')}
                color="primary"
                value="half"
                disabled={disabled}
              />
            }
            label="Half White or Yellow"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.coat.color.center}
                onChange={handleCoatColorChange('center')}
                color="primary"
                value="center"
                disabled={disabled}
              />
            }
            label="Center or Side or Central Surface or Root"
            disabled={disabled}
          />

          <FormLabel className={classes.label} component="legend">
            {'Quality'}
          </FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                checked={values.coat.quality.thin}
                onChange={handleCoatQualityChange('thin')}
                color="primary"
                value="thin"
                disabled={disabled}
              />
            }
            label="Thin"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.coat.quality.thick}
                onChange={handleCoatQualityChange('thick')}
                color="primary"
                value="thick"
                disabled={disabled}
              />
            }
            label="Thick"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.coat.quality.scanty}
                onChange={handleCoatQualityChange('scanty')}
                color="primary"
                value="scanty"
                disabled={disabled}
              />
            }
            label="Scanty"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.coat.quality.none}
                onChange={handleCoatQualityChange('none')}
                color="primary"
                value="none"
                disabled={disabled}
              />
            }
            label="None"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.coat.quality.dry}
                onChange={handleCoatQualityChange('dry')}
                color="primary"
                value="dry"
                disabled={disabled}
              />
            }
            label="Dry"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.coat.quality.wet}
                onChange={handleCoatQualityChange('wet')}
                color="primary"
                value="wet"
                disabled={disabled}
              />
            }
            label="Wet"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.coat.quality.slippery}
                onChange={handleCoatQualityChange('slippery')}
                color="primary"
                value="slippery"
                disabled={disabled}
              />
            }
            label="Slippery"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.coat.quality.greasy}
                onChange={handleCoatQualityChange('greasy')}
                color="primary"
                value="greasy"
                disabled={disabled}
              />
            }
            label="Greasy"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.coat.quality.rough}
                onChange={handleCoatQualityChange('rough')}
                color="primary"
                value="rough"
                disabled={disabled}
              />
            }
            label="Rough"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.coat.quality.sticky}
                onChange={handleCoatQualityChange('sticky')}
                color="primary"
                value="sticky"
                disabled={disabled}
              />
            }
            label="Sticky"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.coat.quality.graphic}
                onChange={handleCoatQualityChange('graphic')}
                color="primary"
                value="graphic"
                disabled={disabled}
              />
            }
            label="Graphic"
            disabled={disabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.coat.quality.mirror}
                onChange={handleCoatQualityChange('mirror')}
                color="primary"
                value="mirror"
                disabled={disabled}
              />
            }
            label="Mirror"
            disabled={disabled}
          />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        className={classes.column}
      >
        <Canvas
          src="/images/tongue-chart.jpg"
          data={drawings}
          width={314}
          height={300}
          opacity={0.5}
          onSave={handleSave}
          wrapperStyle={{ flexWrap: 'wrap' }}
          inputWrapperStyle={{ marginBottom: 10 }}
          pickerWrapperStyle={{ marginBottom: 10 }}
          buttonWrapperStyle={{
            width: '100%',
            justifyContent: 'space-around'
          }}
          disabled={disabled}
        />
      </div>
    </FormGroup>
  );
}
