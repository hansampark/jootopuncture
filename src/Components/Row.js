import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, ListItem } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto'
  },
  listSection: {
    backgroundColor: 'inherit'
  }
}));

export default function Row(props) {
  const classes = useStyles();
  const { firstName, lastName, email, dob, phone } = props.data;

  return (
    <ListItem className={classes.root}>
      <Grid item xs={4}>
        <div>{`${lastName}, ${firstName}`}</div>
        <div>{`${email}`}</div>
      </Grid>

      <Grid item xs={2}>
        {dob}
      </Grid>
      <Grid item xs={2}>
        {phone}
      </Grid>
      <Grid item xs={1}>
        <Link to={'/:patientId/charts'}>Chart</Link>
      </Grid>
    </ListItem>
  );
}
