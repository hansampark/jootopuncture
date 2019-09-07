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
    color: '#cccccc'
  }
}));

export default function CreateChartPage(props) {
  const classes = useStyles();
  const { patientId } = props.match.params;
  const [patient, setPatient] = useState({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
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

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.get(`/patients/${patientId}`);

      setPatient(data);
      setLoading(false);
    };
    fetchData();
  }, [patientId]);

  const expanded = {
    vitalField: true,
    complaintField: false,
    illnessField: false,
    infoField: false,
    questionaireField: false,
    reviewField: false,
    womenField: false,
    tongueField: false,
    pulseField: false,
    diagnosisField: false
  };

  return (
    <div className={classes.center}>
      <Paper className={classes.paper}>
        <div>
          <Typography align="center" variant="h4" component="h1">
            {'Patient Information'}
          </Typography>
        </div>

        <div>
          <PatientForm patient={patient} disabled={true} />

          <form className={classes.container}>
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
        </div>
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
    // Add validation check for new chart creation
    if (!isEmpty(validationErrors)) {
      setErrors(validationErrors);
      setLoading(false);
    } else {
      try {
        const data = await api.post(`/patients/${patientId}/charts`, {
          chart: params
        });

        setLoading(false);
        props.history.push(`/patients/${patientId}/charts/${data._id}`);
        return data;
      } catch (err) {
        setLoading(false);
        setErrors(err);
      }
    }
  }
}
