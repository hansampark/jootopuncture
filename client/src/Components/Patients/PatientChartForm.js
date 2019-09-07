import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Button, CircularProgress } from '@material-ui/core';
import api from '../../lib/api';
import PatientForm from './PatientForm';
import ChartForm from '../Charts/ChartForm';

const useStyles = makeStyles(theme => ({
  center: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'auto',
    minHeight: 'min-content'
  },
  paper: {
    boxSizing: 'border-box',
    padding: theme.spacing(3, 2),
    margin: theme.spacing(3, 2),
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 992
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
    color: '#ffffff'
  }
}));

export default function Patient(props) {
  const classes = useStyles();
  const [patient, setPatient] = useState({});

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
  const [errors, setErrors] = useState(null);

  const handlePatientChange = patient => {
    setPatient(patient);
    setErrors(null);
  };

  const handleVitalChange = vitals => {
    setVitals(vitals);
    setErrors(null);
  };

  const handleComplaintChange = complaints => {
    setComplaints(complaints);
    setErrors(null);
  };

  const handleIllnessChange = illnesses => {
    setIllnesses(illnesses);
    setErrors(null);
  };

  const handleInfoChange = info => {
    setInfo(info);
    setErrors(null);
  };

  const handleQuestionaireChange = questionaire => {
    setQuestionaire(questionaire);
    setErrors(null);
  };

  const handleReviewChange = review => {
    setReview(review);
    setErrors(null);
  };

  const handleWomenChange = women => {
    setWomen(women);
    setErrors(null);
  };

  const handleTongueChange = tongue => {
    setTongue(tongue);
    setErrors(null);
  };

  const handlePulseChange = pulse => {
    setPulse(pulse);
    setErrors(null);
  };

  const handleDiagnosisChange = diagnosis => {
    setDiagnosis(diagnosis);
    setErrors(null);
  };

  const expanded = {
    vitalField: false, // return to true
    complaintField: false,
    illnessField: false,
    infoField: false,
    questionaireField: false,
    reviewField: true, // return to false
    womenField: false,
    tongueField: true, // return to false
    pulseField: false,
    diagnosisField: true
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
            errors={errors}
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
            expanded={expanded}
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
            disabled={false}
          />

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={!!errors}
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
    setErrors(null);

    const params = {
      vitals: {
        ...vitals,
        height: vitals.feet && vitals.inch ? `${vitals.ft}-${vitals.inch}` : '',
        bp: vitals.bp1 && vitals.bp2 ? `${vitals.bp1}/${vitals.bp2}` : ''
      },
      complaints,
      illnesses,
      info,
      questionaire,
      review,
      women,
      tongue,
      pulse,
      diagnosis
    };
    const validationErrors = {};

    if (isEmpty(patient)) {
      validationErrors.firstName = 'First Name is required.';
      validationErrors.lastName = 'Last Name is required.';
      validationErrors.phone = 'Phone number is required.';
    } else {
      if (!patient.firstName) {
        validationErrors.firstName = 'First Name is required.';
      }
      if (!patient.lastName) {
        validationErrors.lastName = 'Last Name is required.';
      }
      if (!patient.phone) {
        validationErrors.phone = 'Phone number is required.';
      }
    }
    // Add validation check for new chart creation

    if (!isEmpty(validationErrors)) {
      setErrors(validationErrors);
      setLoading(false);
    } else {
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
        setErrors(err);
      }
    }
  }
}
