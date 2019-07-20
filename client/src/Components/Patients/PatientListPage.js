import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, List, ListItem, Divider } from '@material-ui/core';
import api from '../../lib/api';
import Row from '../Row';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
}));

export default function PatientListPage(props) {
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get('/patients');
      setData(result.patients);
    };
    fetchData();
  }, []);

  if (data.length > 0) {
    return (
      <List className={classes.root}>
        <ListItem>
          <Grid item xs={4}>
            Name/Email
          </Grid>

          <Grid item xs={2}>
            DOB
          </Grid>
          <Grid item xs={2}>
            Phone
          </Grid>
          <Grid item xs={1}>
            Chart
          </Grid>
        </ListItem>
        <Divider />
        {data.map((patient, index) => (
          <Row key={index} data={patient} />
        ))}
      </List>
    );
  }

  return <div>No patients found</div>;
}
