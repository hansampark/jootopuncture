import React, { useState, useEffect, useContext } from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  Divider,
  Paper,
  Button,
  InputBase
} from '@material-ui/core';
import { Add, Search } from '@material-ui/icons';
import api from '../../lib/api';
import { PatientContext } from '../../context';
import PatientList from './PatientList';
import Spinner from '../Spinner';

const useStyles = makeStyles(theme => ({
  center: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'auto',
    minHeight: 'min-content'
  },
  paper: {
    width: '100%',
    boxSizing: 'border-box',
    padding: theme.spacing(3, 2),
    paddingBottom: 0,
    margin: theme.spacing(3, 2),
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 992,
    minHeight: '700px'
  },
  list: {
    width: '100%',
    height: '100%',
    paddingBottom: 0,
    backgroundColor: theme.palette.background.paper
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
  empty: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    fontSize: 30,
    fontWeight: 400
  },
  buttonIcon: {
    position: 'absolute',
    right: 10
  }
}));

export default function PatientListPage(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [patients, setPatient] = useContext(PatientContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setErrors(null);
      try {
        const data = await api.get('/patients');
        const indexes = data.map(patient => patient._id);
        const table = data.reduce(
          (result, patient) => ({ ...result, [patient._id]: patient }),
          {}
        );

        setPatient({ indexes, table });
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setErrors(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={classes.center}>
      <Paper className={classes.paper}>
        <List className={classes.list}>
          <ListItem>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <Search />
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

          {loading && patients.indexes.length === 0 && <Spinner />}

          {!loading && patients.indexes.length === 0 && (
            <div className={classes.empty}>{'No patients found.'}</div>
          )}

          {!loading &&
            patients.indexes.length > 0 &&
            patients.indexes.map((_id, index) => {
              const patient = patients.table[_id];
              return (
                <PatientList
                  key={index}
                  data={patient}
                  onClick={handleListClick}
                />
              );
            })}
        </List>
      </Paper>
    </div>
  );

  function handleRedirect() {
    props.history.push('/create-patient');
  }

  function handleListClick(patientId) {
    const charts = patients.table[patientId].charts;
    props.history.push(`/patients/${patientId}/charts/${charts[0]._id}`);
  }
}
