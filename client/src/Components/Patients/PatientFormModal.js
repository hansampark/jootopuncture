import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormGroup,
  FormControl,
  FormLabel,
  InputLabel,
  Select,
  TextField,
  MenuItem
} from '@material-ui/core';
import api from '../../lib/api';
import PatientForm from './PatientForm';
import ChartForm from './ChartForm';

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%'
  },
  button: {
    width: 120
  }
}));

export default function PatientFormModal(props) {
  const { open, onClose } = props;
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [chart, setChart] = useState(false);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="patient-form-modal"
      aria-describedby="patient-form"
    >
      <DialogTitle id="appointment-form-title" className={classes.title}>
        {'Patient Form'}
      </DialogTitle>
      <DialogContent>
        <form className={classes.form}>
          <PatientForm />

          {chart && (
            <React.Fragment>
              <Divider /> <ChartForm />
            </React.Fragment>
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.button}
          variant="contained"
          onClick={onClose}
        >
          {'Cancel'}
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          autoFocus
        >
          {'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );

  function createChart() {
    setChart(true);
  }

  async function handleSubmit(e, patient, chart) {
    e.preventDefault();
    setLoading(true);
    setErrors(null);

    try {
      const data = await api.post('/patients', { patient, chart });
      setLoading(false);

      return data;
    } catch (err) {
      setLoading(false);
      setErrors(err);
    }
  }
}
