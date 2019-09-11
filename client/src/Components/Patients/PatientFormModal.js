import { isEmpty } from 'lodash';
import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress
} from '@material-ui/core';
import { PatientContext } from '../../context';
import api from '../../lib/api';
import PatientForm from './PatientForm';

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
  },
  progress: {
    color: '#ffffff'
  }
}));

export default function PatientFormModal(props) {
  const { open, patient, onClose } = props;
  const classes = useStyles();

  const [updatedPatient, setPatient] = useState(props.patient);
  const [patients, setPatients] = useContext(PatientContext);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handlePatientChange = patient => {
    setPatient(patient);
    setErrors(null);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="patient-form-modal"
      aria-describedby="patient-form"
    >
      <DialogTitle id="appointment-form-title" className={classes.title}>
        {'Edit Patient'}
      </DialogTitle>
      <DialogContent>
        <form className={classes.form}>
          <PatientForm
            patient={patient}
            errors={errors}
            onChange={handlePatientChange}
            disabled={false}
          />
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
          type="submit"
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={errors}
          autoFocus
        >
          {loading ? (
            <CircularProgress
              style={{ width: 24, height: 24 }}
              className={classes.progress}
            />
          ) : (
            'Save'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const { onSubmit, onClose } = props;
    setLoading(true);
    setErrors(null);

    const validationErrors = {};

    if (updatedPatient.firstName.length === 0) {
      validationErrors.firstName = 'First Name is required.';
    }
    if (updatedPatient.lastName.length === 0) {
      validationErrors.lastName = 'Last Name is required.';
    }
    if (updatedPatient.phone.length === 0) {
      validationErrors.phone = 'Phone number is required.';
    }

    if (!isEmpty(validationErrors)) {
      setErrors(validationErrors);
      setLoading(false);
    } else {
      try {
        const data = await api.put(`/patients/${props.patient._id}`, {
          patient: updatedPatient
        });
        setLoading(false);
        onSubmit(data);
        setPatients(state => ({
          ...state,
          table: {
            ...state.table,
            [props.patient._id]: {
              ...state.table[props.patient._id],
              ...updatedPatient
            }
          }
        }));
        onClose();
      } catch (err) {
        setLoading(false);
        setErrors(err);
      }
    }
  }
}
