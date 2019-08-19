import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Paper,
  Tabs,
  Tab,
  Button,
  CircularProgress
} from '@material-ui/core';
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
  flexContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  flexBox: {
    flex: 1
  },
  tabsContainer: {
    maxWidth: 1200,
    minWidth: 500
  },
  tabs: {
    backgroundColor: '#3f51b5',
    color: '#ffffff'
  },
  tab: {
    // maxWidth: 150
  },
  progress: {
    width: '100%',
    color: '#cccccc'
  }
}));

export default function PatientChartPage(props) {
  const classes = useStyles();
  const { patientId } = props.match.params;
  const [patient, setPatient] = useState({});
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.get(`/patients/${patientId}`);

      setPatient(data);
      setLoading(false);
    };
    fetchData();
  }, [patientId]);

  return (
    <div className={classes.center}>
      <Paper className={classes.paper}>
        <div>
          <Typography align="center" variant="h4" component="h1">
            {'Patient Information'}
          </Typography>
        </div>

        <div className={classes.container}>
          <PatientForm patient={patient} disabled={true} />

          {patient && patient.charts && patient.charts.length > 0 && (
            <div className={classes.tabsContainer}>
              <Tabs
                value={index}
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
                      value={ix}
                    />
                  );
                })}
              </Tabs>
              <ChartForm chart={patient.charts[index]} disabled />
            </div>
          )}
        </div>
      </Paper>
    </div>
  );

  function handleCreateChart() {
    props.history.push(`/patients/${patientId}/create-chart`);
  }

  function handleChartChange(e, value) {
    setIndex(value);
  }
}
