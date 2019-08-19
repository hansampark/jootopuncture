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
  const { onChange, tongue } = props;
  const { body, coat, tongueData } = tongue;
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
    tongueData: tongueData || ''
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
    setValues({ ...values, tongueData: JSON.parse(data) });
    onChange({ ...values, tongueData: JSON.parse(data) });
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
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.color.pink}
                onChange={handleBodyColorChange('pink')}
                color="primary"
                value="pink"
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
              />
            }
            label="Red"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.color.darkRed}
                onChange={handleBodyColorChange('darkRed')}
                color="primary"
                value="darkRed"
              />
            }
            label="Dark Red"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.color.purple}
                onChange={handleBodyColorChange('purple')}
                color="primary"
                value="purple"
              />
            }
            label="Purple"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.color.reddishPurple}
                onChange={handleBodyColorChange('reddishPurple')}
                color="primary"
                value="reddishPurple"
              />
            }
            label="Reddish Purple"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.color.bluishPurple}
                onChange={handleBodyColorChange('bluishPurple')}
                color="primary"
                value="bluishPurple"
              />
            }
            label="Bluish Purple"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.color.redTip}
                onChange={handleBodyColorChange('redTip')}
                color="primary"
                value="redTip"
              />
            }
            label="Red Tip"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.color.redder}
                onChange={handleBodyColorChange('redder')}
                color="primary"
                value="redder"
              />
            }
            label="Redder Side"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.color.orange}
                onChange={handleBodyColorChange('orange')}
                color="primary"
                value="orange"
              />
            }
            label="Orange Side"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.color.purpleSide}
                onChange={handleBodyColorChange('purpleSide')}
                color="primary"
                value="purpleSide"
              />
            }
            label="Purple Side"
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
              />
            }
            label="Stiff"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.shape.long}
                onChange={handleBodyShapeChange('long')}
                color="primary"
                value="long"
              />
            }
            label="Long"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.shape.flaccid}
                onChange={handleBodyShapeChange('flaccid')}
                color="primary"
                value="flaccid"
              />
            }
            label="Flaccid"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.shape.cracked}
                onChange={handleBodyShapeChange('cracked')}
                color="primary"
                value="cracked"
              />
            }
            label="Cracked"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.shape.swollen}
                onChange={handleBodyShapeChange('swollen')}
                color="primary"
                value="swollen"
              />
            }
            label="Swollen in SIdes or Tip or Center"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.shape.short}
                onChange={handleBodyShapeChange('short')}
                color="primary"
                value="short"
              />
            }
            label="Short"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.shape.rollUp}
                onChange={handleBodyShapeChange('rollUp')}
                color="primary"
                value="rollUp"
              />
            }
            label="Rolled Up"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.shape.rollDown}
                onChange={handleBodyShapeChange('rollDown')}
                color="primary"
                value="rollDown"
              />
            }
            label="Rolled Down"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.shape.ulcerate}
                onChange={handleBodyShapeChange('ulcerate')}
                color="primary"
                value="ulcerate"
              />
            }
            label="Ulcerate"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.shape.tooth}
                onChange={handleBodyShapeChange('tooth')}
                color="primary"
                value="tooth"
              />
            }
            label="Tooth-marked"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.shape.halfSwollen}
                onChange={handleBodyShapeChange('halfSwollen')}
                color="primary"
                value="halfSwollen"
              />
            }
            label="Half Swollen"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.shape.thin}
                onChange={handleBodyShapeChange('thin')}
                color="primary"
                value="thin"
              />
            }
            label="Thin"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.shape.thick}
                onChange={handleBodyShapeChange('thick')}
                color="primary"
                value="thick"
              />
            }
            label="Thick"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.shape.narrow}
                onChange={handleBodyShapeChange('narrow')}
                color="primary"
                value="narrow"
              />
            }
            label="Narrow"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.shape.deviation}
                onChange={handleBodyShapeChange('deviation')}
                color="primary"
                value="deviation"
              />
            }
            label="Deviation"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.shape.trembling}
                onChange={handleBodyShapeChange('trembling')}
                color="primary"
                value="trembling"
              />
            }
            label="Trembling"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.body.shape.normal}
                onChange={handleBodyShapeChange('normal')}
                color="primary"
                value="normal"
              />
            }
            label="Normal"
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
              />
            }
            label="White"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.coat.color.yellow}
                onChange={handleCoatColorChange('yellow')}
                color="primary"
                value="yellow"
              />
            }
            label="Yellow"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.coat.color.gray}
                onChange={handleCoatColorChange('gray')}
                color="primary"
                value="gray"
              />
            }
            label="Gray"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.coat.color.black}
                onChange={handleCoatColorChange('black')}
                color="primary"
                value="black"
              />
            }
            label="Black"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.coat.color.greenish}
                onChange={handleCoatColorChange('greenish')}
                color="primary"
                value="greenish"
              />
            }
            label="Greenish"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.coat.color.half}
                onChange={handleCoatColorChange('half')}
                color="primary"
                value="half"
              />
            }
            label="Half White or Yellow"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.coat.color.center}
                onChange={handleCoatColorChange('center')}
                color="primary"
                value="center"
              />
            }
            label="Center or Side or Central Surface or Root"
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
              />
            }
            label="Thin"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.coat.quality.thick}
                onChange={handleCoatQualityChange('thick')}
                color="primary"
                value="thick"
              />
            }
            label="Thick"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.coat.quality.scanty}
                onChange={handleCoatQualityChange('scanty')}
                color="primary"
                value="scanty"
              />
            }
            label="Scanty"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.coat.quality.none}
                onChange={handleCoatQualityChange('none')}
                color="primary"
                value="none"
              />
            }
            label="None"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.coat.quality.dry}
                onChange={handleCoatQualityChange('dry')}
                color="primary"
                value="dry"
              />
            }
            label="Dry"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.coat.quality.wet}
                onChange={handleCoatQualityChange('wet')}
                color="primary"
                value="wet"
              />
            }
            label="Wet"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.coat.quality.slippery}
                onChange={handleCoatQualityChange('slippery')}
                color="primary"
                value="slippery"
              />
            }
            label="Slippery"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.coat.quality.greasy}
                onChange={handleCoatQualityChange('greasy')}
                color="primary"
                value="greasy"
              />
            }
            label="Greasy"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.coat.quality.rough}
                onChange={handleCoatQualityChange('rough')}
                color="primary"
                value="rough"
              />
            }
            label="Rough"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.coat.quality.sticky}
                onChange={handleCoatQualityChange('sticky')}
                color="primary"
                value="sticky"
              />
            }
            label="Sticky"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.coat.quality.graphic}
                onChange={handleCoatQualityChange('graphic')}
                color="primary"
                value="graphic"
              />
            }
            label="Graphic"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.coat.quality.mirror}
                onChange={handleCoatQualityChange('mirror')}
                color="primary"
                value="mirror"
              />
            }
            label="Mirror"
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
          width={300}
          height={300}
          onSave={handleSave}
        />
      </div>
    </FormGroup>
  );
}
