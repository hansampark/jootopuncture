import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Fab,
  Typography,
  Paper,
  Tabs,
  Tab,
  Button,
  CircularProgress
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import api from '../../lib/api';
import PatientFormModal from '../Patients/PatientFormModal';
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
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fab: {
    margin: theme.spacing(1),
    width: 36,
    height: 36
  },
  icon: {
    width: 24,
    height: 24
  },
  tabsContainer: {
    width: 960
  },
  tabs: {
    backgroundColor: '#3f51b5',
    color: '#ffffff'
  },
  tab: {
    // maxWidth: 150
  },
  button: {
    margin: theme.spacing(10),
    width: 200
  },
  progress: {
    width: '100%',
    color: '#cccccc'
  }
}));

export default function PatientChartPage(props) {
  const classes = useStyles();
  const { patientId, chartId } = props.match.params;
  const [patient, setPatient] = useState({});
  const [selectedChart, setSelectedChart] = useState({});

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

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [errors, setErrors] = useState(null);

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
      const chart = data.charts.find(c => c._id === chartId);

      setPatient(data);
      setSelectedChart(chart);
      setFetching(false);
    };

    fetchData();
  }, [patientId]);

  const expanded = {
    vitalField: true,
    complaintField: false,
    illnessField: false,
    infoField: false,
    questionaireField: true,
    reviewField: false,
    womenField: false,
    tongueField: true,
    pulseField: false,
    diagnosisField: false
  };

  return (
    <div className={classes.center}>
      <Paper className={classes.paper}>
        <div className={classes.title}>
          <Typography align="center" variant="h4" component="h1">
            {'Patient Information'}
          </Typography>

          <Fab
            color="primary"
            aria-label="edit"
            className={classes.fab}
            size="small"
            onClick={handleModalOpen}
          >
            <Edit style={{ width: 16, height: 16 }} />
          </Fab>
        </div>

        <form className={classes.container}>
          <PatientForm patient={patient} disabled={true} />

          {patient && patient.charts && patient.charts.length > 0 && (
            <div className={classes.tabsContainer}>
              <Tabs
                value={selectedChart._id}
                indicatorColor="primary"
                className={classes.tabs}
                scrollButtons="auto"
                variant="scrollable"
                onChange={handleChartChange}
              >
                {patient.charts.map((chart, ix) => {
                  const dateLabel = moment(chart.date).format('l');

                  return (
                    <Tab
                      key={chart._id}
                      className={classes.tab}
                      label={dateLabel}
                      value={chart._id}
                    />
                  );
                })}
                <Tab
                  key="create"
                  className={classes.tab}
                  label={'New Chart'}
                  value="create"
                />
              </Tabs>
            </div>
          )}

          {!isEmpty(selectedChart) && (
            <Route
              path={'/patients/:patientId/charts/:chartId'}
              render={props => (
                <ChartForm
                  key={selectedChart._id}
                  {...props}
                  chart={selectedChart}
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
              )}
            />
          )}

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
              'Update Chart'
            )}
          </Button>
        </form>

        {open && (
          <PatientFormModal
            open={open}
            patient={patient}
            onSubmit={handleModalSubmit}
            onClose={handleModalClose}
          />
        )}
      </Paper>
    </div>
  );

  function handleModalOpen() {
    setOpen(true);
  }

  function handleModalClose() {
    setOpen(false);
  }

  function handleChartChange(e, chartId) {
    const { match, history } = props;

    if (chartId === 'create') {
      history.push(`/patients/${patientId}/charts`);
    } else {
      const newChart = patient.charts.find(chart => chart._id === chartId);

      if (chartId !== match.params.chartId) {
        setSelectedChart(newChart);
        history.push(`/patients/${selectedChart.patientId}/charts/${chartId}`);
      }
    }
  }

  async function handleModalSubmit(updatedPatient) {
    setPatient(updatedPatient);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrors(null);

    const selectedChartVitals = {
      date: selectedChart.date,
      height: selectedChart.height,
      weight: selectedChart.weight,
      temp: selectedChart.temp,
      bp: selectedChart.bp,
      heart: selectedChart.heart,
      rhythm: selectedChart.rhythm,
      lung: selectedChart.lung,
      sound: selectedChart.sound
    };

    const params = {
      vitals: {
        ...selectedChartVitals,
        ...vitals,
        height:
          vitals && vitals.ft && vitals.inch
            ? `${vitals.ft}-${vitals.inch}`
            : selectedChartVitals.height,
        bp:
          vitals && vitals.bp1 && vitals.bp2
            ? `${vitals.bp1}/${vitals.bp2}`
            : selectedChartVitals.bp
      },
      complaints: {
        ...selectedChart.complaints,
        ...complaints
      },
      illnesses: {
        ...selectedChart.illnesses,
        ...illnesses
      },
      info: {
        ...selectedChart.info,
        ...info
      },
      questionaire: {
        ...selectedChart.questionaire,
        ...questionaire
      },
      review: {
        ...selectedChart.review,
        ...review
      },
      women: {
        ...selectedChart.women,
        ...women
      },
      tongue: {
        ...selectedChart.tongue,
        ...tongue
      },
      pulse: {
        ...selectedChart.pulse,
        ...pulse
      },
      diagnosis: {
        ...selectedChart.diagnosis,
        ...diagnosis
      }
    };
    // Add validation check for update chart method
    const validationErrors = {};
    if (!isEmpty(validationErrors)) {
      setErrors(validationErrors);
      setLoading(false);
    } else {
      try {
        const data = await api.put(`/patients/${patientId}/charts/${chartId}`, {
          chart: params
        });
        setLoading(false);
        setSelectedChart(data);
      } catch (err) {
        setLoading(false);
        setErrors(err);
      }
    }
  }
}
