import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  FormControl,
  FormLabel,
  InputLabel,
  Select,
  TextField,
  MenuItem,
} from '@material-ui/core';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import api from '../../lib/api';
import { fullName } from '../../lib/strings';
import SelectOptions from '../Select';

// import moment-range package
import { extendMoment } from 'moment-range';

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: 'center',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 4),
    outline: 'none',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 10,
    marginBottom: 20,
    maxWidth: '400px',
  },
  toggleContainer: {
    margin: theme.spacing(2, 0),
    width: '100%',
  },
  toggleButton: {
    width: '50%',
    cursor: 'pointer',
  },
  selected: {
    backgroundColor: '#3f51b5',
    color: '#ffffff',
  },

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 180,
  },
  timeField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 150,
  },
  button: {
    width: 120,
  },
}));

export default function AppointmentFormModal(props) {
  const { open, onClick, onClose, events } = props;
  const classes = useStyles();
  const [appointment, setAppointment] = useState({
    title: '',
    date: '',
    allDay: false,
    start: '',
    end: '',
    patientId: '',
  });
  const [toggle, setToggle] = useState('NEW');
  const [patient, setPatient] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  const [data, setData] = useState(null);

  // To compare times
  const [overlap, setOverlap] = useState(false);

  // Using moment-range
  const time = extendMoment(moment);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get('/patients');
      setData(result.patients);
    };
    fetchData();
  }, []);

  const selectOptions = (data || []).map((patient, index) => {
    return {
      value: patient._id,
      label: fullName(patient.firstName, patient.lastName),
    };
  });

  const handleAppointmentChange = name => event => {
    setAppointment({ ...appointment, [name]: event.target.value });
  };

  const handleToggleChange = (e, value) => {
    setToggle(value);
    setAppointment({
      ...appointment,
      patientId: '',
      title: '',
    });
    setPatient({
      firstName: '',
      lastName: '',
      phone: '',
    });
  };

  const handlePatientChange = name => event => {
    setPatient({ ...patient, [name]: event.target.value });
  };

  const handleSelectPatient = value => {
    setAppointment({
      ...appointment,
      patientId: value.value,
      title: value.label,
    });
  };

  // Appointment Validation
  const handleSubmit = (e, appointment, patient) => {
    e.preventDefault();

    // Make moment-range variable for new appointment
    const startTime = time(`${appointment.date}T${appointment.start}`);
    const endTime = time(`${appointment.date}T${appointment.end}`);
    const newRange = time.range(startTime, endTime);

    // Make moment-range array for pre-exist appointment
    const ranges = events.map(e => {
      const start = time(e.start, 'YYYY-MM-DDTHH:mm');
      const end = time(e.end, 'YYYY-MM-DDTHH:mm');
      return time.range(start, end);
    });

    // Compare new appointment to original appointment
    const validate = ranges.filter(function(n) {
      return n.overlaps(newRange);
    });
    if (validate && validate.length) {
      setOverlap(true);
    } else {
      onClick(e, appointment, patient);
    }
  };

  // Show errorMessage for overlapping appointment
  const errorMessageDiv = () => {
    if (overlap) {
      return (
        <div style={{ color: 'red' }}>
          You can't make appointment overlapped. Please select different time.
        </div>
      );
    }
    return null;
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="appointment-form-modal"
      aria-describedby="appointment-form"
    >
      <DialogTitle id="appointment-form-title" className={classes.title}>
        {'Make an appointment'}
      </DialogTitle>
      <DialogContent>
        <form className={classes.container}>
          <FormGroup className={classes.formGroup}>
            <TextField
              id="date"
              label="Date"
              type="date"
              className={classes.textField}
              value={appointment.date}
              onChange={handleAppointmentChange('date')}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />

            <TextField
              id="start"
              label="Start Time"
              type="time"
              className={classes.timeField}
              value={appointment.start}
              onChange={handleAppointmentChange('start')}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 600,
              }}
              margin="normal"
            />

            <TextField
              id="end"
              label="End Time"
              type="time"
              className={classes.timeField}
              value={appointment.end}
              onChange={handleAppointmentChange('end')}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 600,
              }}
              margin="normal"
            />
          </FormGroup>

          {errorMessageDiv()}

          <div className={classes.toggleContainer}>
            <ToggleButtonGroup
              value={toggle}
              exclusive
              onChange={handleToggleChange}
              classes={{ root: classes.toggleContainer }}
            >
              <ToggleButton
                classes={{
                  root: classes.toggleButton,
                }}
                value="NEW"
              >
                {'New Patient'}
              </ToggleButton>
              <ToggleButton
                classes={{
                  root: classes.toggleButton,
                }}
                value="EXISTING"
              >
                {'Existing Patient'}
              </ToggleButton>
            </ToggleButtonGroup>
          </div>

          {toggle === 'NEW' ? (
            <FormGroup className={classes.formGroup}>
              <TextField
                id="firstName"
                label="First Name"
                className={classes.textField}
                value={patient.firstName}
                onChange={handlePatientChange('firstName')}
                autoFocus
                margin="normal"
              />

              <TextField
                id="lastName"
                label="Last Name"
                className={classes.textField}
                value={patient.lastName}
                onChange={handlePatientChange('lastName')}
                margin="normal"
              />
              <TextField
                id="phone"
                label="Phone"
                className={classes.textField}
                value={patient.phone}
                onChange={handlePatientChange('phone')}
                margin="normal"
              />
            </FormGroup>
          ) : (
            <FormGroup style={{ width: '100%' }}>
              <SelectOptions
                label={'Patient'}
                name={'patientId'}
                placeholder={'Select a patient'}
                options={selectOptions}
                singleOption={true}
                onChange={handleSelectPatient}
              />
            </FormGroup>
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
          onClick={e => handleSubmit(e, appointment, patient)}
          autoFocus
        >
          {'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
