import { isEmpty } from 'lodash';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, Button, CircularProgress } from '@material-ui/core';
import api from '../../lib/api';
import PatientForm from '../Patients/PatientForm';
import ChartForm from '../Charts/ChartForm';

const useStyles = makeStyles(theme => ({
  center: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'auto',
    minHeight: 'min-content'
  },
  paper: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(3, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%'
  },
  button: {
    margin: theme.spacing(10),
    width: 200
  },
  progress: {
    color: '#cccccc'
  }
}));

export default function CreateChartPage(props) {
  const classes = useStyles();
  const { patientId } = props.match.params;
  const [patient, setPatient] = useState({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [chart, setChart] = useState({
    date: '',
    height: '',
    weight: '',
    temp: '',
    bp: '',
    heart: '',
    rhythm: '',
    lung: '',
    sound: '',
    complaint: '',
    location: '',
    onset: '',
    provocation: '',
    palliation: '',
    quality: '',
    region: '',
    severity: '',
    frequency: '',
    timing: '',
    cause: '',
    remarks: '',
    illness: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.get(`/patients/${patientId}`);

      setPatient(data);
      setLoading(false);
    };
    fetchData();
  }, [patientId]);

  const handleChartChange = name => event => {
    setChart({ ...chart, [name]: event.target.value });
  };

  return (
    <div className={classes.center}>
      <Paper className={classes.paper}>
        <Typography align="center" variant="h4" component="h1">
          {'Patient Information'}
        </Typography>
        {loading && isEmpty(patient) ? (
          <CircularProgress className={classes.progress} />
        ) : (
          <div>
            <PatientForm
              patient={patient}
              disabled={true}
              onChange={() => {}}
            />

            <form className={classes.container}>
              <Paper className={classes.paper}>
                <Typography align="center" variant="h4" component="h1">
                  {'Create Chart'}
                </Typography>

                <ChartForm chart={chart} onChange={handleChartChange} />

                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  disabled={!!errors}
                  onClick={e => handleSubmit(e, chart)}
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
              </Paper>
            </form>
          </div>
        )}
      </Paper>
    </div>
  );

  async function handleSubmit(e, chart) {
    e.preventDefault();
    setLoading(true);
    setErrors(null);
    console.log('[chart]', chart);

    try {
      const data = await api.post(`/patients/${patientId}/charts`, { chart });
      setLoading(false);
      props.history.push(`/patients/${patientId}/charts`);
      return data;
    } catch (err) {
      setLoading(false);
      setErrors(err);
    }
  }
}
