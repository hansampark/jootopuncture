import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Button, CircularProgress } from '@material-ui/core';
import api from '../../lib/api';
import PatientForm from './PatientForm';
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
    maxWidth: 1200
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

  const [vitals, setVitals] = useState({});
  const [complaints, setComplaints] = useState({});
  const [illnesses, setIllnesses] = useState({});
  const [info, setInfo] = useState({});
  const [questionaire, setQuestionaire] = useState({});
  const [review, setReview] = useState({});
  const [women, setWomen] = useState({});
  const [tongue, setTongue] = useState({});
  const [pulse, setPulse] = useState({});
  const [diagnosis, setDiagnosis] = useState({});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePatientChange = name => event => {
    setPatient({ ...patient, [name]: event.target.value });
  };

  const handleVitalChange = vitals => {
    setVitals(vitals);
  };

  const handleComplaintChange = complaints => {
    setComplaints(complaints);
  };

  const handleIllnessChange = illnesses => {
    setIllnesses(illnesses);
  };

  const handleInfoChange = info => {
    setInfo(info);
  };

  const handleQuestionaireChange = questionaire => {
    setQuestionaire(questionaire);
  };

  const handleReviewChange = review => {
    setReview(review);
  };

  const handleWomenChange = women => {
    setWomen(women);
  };

  const handleTongueChange = tongue => {
    setTongue(tongue);
  };

  const handlePulseChange = pulse => {
    setPulse(pulse);
  };

  const handleDiagnosisChange = diagnosis => {
    setDiagnosis(diagnosis);
  };

  return (
    <div className={classes.center}>
      <Paper className={classes.paper}>
        <div>
          <Typography align="center" variant="h4" component="h1">
            {'Patient Form'}
          </Typography>
        </div>

        <form className={classes.container}>
          <PatientForm
            onChange={handlePatientChange}
            patient={patient}
            disabled={false}
          />

          <ChartForm
            chart={{
              vitals,
              complaints,
              illnesses,
              info,
              questionaire,
              review,
              women,
              tongue,
              pulse,
              diagnosis
            }}
            onVitalChange={handleVitalChange}
            onComplaintChange={handleComplaintChange}
            onIllnessChange={handleIllnessChange}
            onInfoChange={handleInfoChange}
            onQuestionaireChange={handleQuestionaireChange}
            onReviewChange={handleReviewChange}
            onWomenChange={handleWomenChange}
            onTongueChange={handleTongueChange}
            onPulseChange={handlePulseChange}
            onDiagnosisChange={handleDiagnosisChange}
          />

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={!!error}
            onClick={handleSubmit}
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
  );

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const params = {
      vitals: {
        ...vitals,
        height: `${vitals.ft}-${vitals.inch}`,
        bp: `${vitals.bp1}/${vitals.bp2}`
      },
      complaints,
      illnesses,
      info,
      questionaire,
      review,
      women,
      tongue,
      pulse
    };

    try {
      const data = await api.post('/patients', {
        patient,
        chart: params
      });
      setLoading(false);
      props.history.push('/patients');
      return data;
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  }
}
