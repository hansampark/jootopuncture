import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, ListItem, Button } from '@material-ui/core';

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

export default function PatientList(props) {
  const classes = useStyles();
  const { _id, firstName, lastName, email, dob, phone } = props.data;

  return (
    <ListItem className={classes.root}>
      <Grid item xs={5}>
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
        <Button onClick={() => props.onClick(_id)}>Chart</Button>
      </Grid>
    </ListItem>
  );
}
