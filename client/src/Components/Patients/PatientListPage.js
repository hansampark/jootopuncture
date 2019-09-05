import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  List,
  ListItem,
  Divider,
  Paper,
  Button
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import api from '../../lib/api';
import PatientList from './PatientList';

const useStyles = makeStyles(theme => ({
  paper: {
    boxSizing: 'border-box',
    padding: theme.spacing(3, 2),
    margin: theme.spacing(3, 2),
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 992
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },

  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

export default function PatientListPage(props) {
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.get('/patients');
        setData(result.patients);
      } catch (err) {}
    };
    fetchData();
  }, []);

  if (data.length > 0) {
    return (
      <Paper className={classes.paper}>
        <List className={classes.list}>
          <ListItem>
            <Grid item xs={5}>
              {'Name/Email'}
            </Grid>

            <Grid item xs={2}>
              {'DOB'}
            </Grid>
            <Grid item xs={2}>
              {'Phone'}
            </Grid>
            <Grid item xs={1}>
              {'Chart'}
            </Grid>
            <Grid item xs={1}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleRedirect}
              >
                <Add />
              </Button>
            </Grid>
          </ListItem>
          <Divider />
          {data.map((patient, index) => (
            <PatientList
              key={index}
              data={patient}
              onClick={handleChartClick}
            />
          ))}
        </List>
      </Paper>
    );
  }

  return <div>No patients found</div>;

  function handleRedirect() {
    props.history.push('/create-patient');
  }

  function handleChartClick(patientId) {
    const charts = data.find(patient => patient._id === patientId).charts;
    props.history.push(`/patients/${patientId}/charts/${charts[0]._id}`);
  }
}
