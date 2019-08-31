import React, { useState, useEffect } from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
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

// Search Bar
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles(theme => ({
  center: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'auto',
    minHeight: 'min-content'
  },
  paper: {
    width: '800px',
    boxSizing: 'border-box',
    padding: theme.spacing(3, 2),
    paddingBottom: 0,
    margin: theme.spacing(3, 2),
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 992
  },
  list: {
    width: '100%',
    paddingBottom: 0,
    backgroundColor: theme.palette.background.paper
  },

  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  },
  buttonIcon: {
    position: 'absolute',
    right: 10
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
      <div className={classes.center}>
        <Paper className={classes.paper}>
          <List className={classes.list}>
            <ListItem>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>

              <Button
                variant="contained"
                color="primary"
                onClick={handleRedirect}
                className={classes.buttonIcon}
              >
                <Add />
              </Button>
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
      </div>
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
