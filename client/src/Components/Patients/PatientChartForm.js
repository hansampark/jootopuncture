import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
  FormGroup,
  FormControl,
  FormLabel,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
  Button,
  CircularProgress
} from '@material-ui/core';
import api from '../../lib/api';
import PatientForm from './PatientForm';
import ChartForm from './ChartForm';

const useStyles = makeStyles(theme => ({
  center: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'auto',
    minHeight: 'min-content'
  },
  root: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(3, 2),
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 10,
    marginBottom: 20,
    borderBottom: '1px solid #cccccc'
  },
  nameField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      width: 100
    },
    [theme.breakpoints.up('sm')]: {
      width: 150
    }
  },
  label: {
    fontSize: 12
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250
  },

  formGroup: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.42)'
  },
  radioGroup: {
    marginBottom: -3,
    marginTop: -4
  },
  button: {
    margin: theme.spacing(10),
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  progress: {
    color: '#ffffff'
  }
}));

export default function Patient(props) {
  const classes = useStyles();
  const [patient, setPatient] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    dob: '',
    phone: '',
    sex: ''
  });
  const [chart, setChart] = useState({
    height: '',
    weight: '',
    temp: '',
    bp: '',
    heart: '',
    rhythm: '',
    lung: '',
    sound: ''
  });
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePatientChange = name => event => {
    setPatient({ ...patient, [name]: event.target.value });
  };

  const handleChartChange = name => event => {
    setChart({ ...chart, [name]: event.target.value });
  };

  return (
    <Grid item>
      <div className={classes.center}>
        <Paper className={classes.root}>
          <div>
            <Typography align="center" variant="h4" component="h1">
              {'Patient Form'}
            </Typography>
          </div>

          <form className={classes.container}>
            <PatientForm onChange={handlePatientChange} patient={patient} />

            <Button color="primary" onClick={handleToggle}>
              {'Create Chart'}
            </Button>

            {toggle && <ChartForm onChange={handleChartChange} chart={chart} />}

            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={!!error}
              onClick={e => handleSubmit(e, patient, chart)}
            >
              {loading ? (
                <CircularProgress
                  style={{ width: 24, height: 24 }}
                  className={classes.progress}
                />
              ) : (
                'Create Patient'
              )}
            </Button>
          </form>
        </Paper>
      </div>
    </Grid>
  );

  function handleToggle() {
    setToggle(!toggle);
  }

  async function handleSubmit(e, patient, chart) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await api.post('/patients', { patient, chart });
      setLoading(false);
      props.history.push('/patients');
      return data;
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  }
}
