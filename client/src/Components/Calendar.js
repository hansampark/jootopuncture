import React, { useState, useEffect, useContext } from 'react';
import { useStore } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Fab, Paper, Typography, Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import api from '../lib/api';
import { dateTime } from '../lib/strings';
// import { PatientContext } from '../context';
import AppointmentFormModal from './Appointments/AppointmentFormModal';

const useStyles = makeStyles(theme => ({
  titleWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    margin: theme.spacing(2)
  },
  paper: {
    margin: theme.spacing(5),
    display: 'flex',
    justifyContent: 'center'
  },
  buttonWrapper: {
    textAlign: 'right'
  },
  button: {
    margin: theme.spacing(1)
  }
}));

moment.locale('en');

const localizer = momentLocalizer(moment);
const allViews = Object.keys(Views).map(k => Views[k]);

export default function MyCalendar(props) {
  const classes = useStyles();
  const { session } = useStore().getState();
  const [view, setView] = useState('month');
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());
  // const [test, setTest] = useContext(PatientContext);
  // console.log('[test]', test);

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await api.get('/appointments');

        const e = data.map(e => {
          return {
            ...e,
            title: e.title,
            start: new Date(e.start),
            end: new Date(e.end)
          };
        });

        setEvents(e);
      } catch (err) {}
    };
    fetchEvents();
  }, []);

  const handleViewChange = view => {
    setView(view);
  };
  const handleSelectEvent = event => {
    setView('day');
    setDate(new Date(event.start));
  };
  const handleNavigate = event => {
    console.log('[navigate]', event);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <div className={classes.titleWrapper}>
        <Typography
          className={classes.title}
          align="center"
          variant="h4"
          component="h4"
        >
          {'Schedule'}
        </Typography>
        <div className={classes.buttonWrapper}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => handleModalOpen()}
          >
            {'Appointment'}
          </Button>
        </div>
      </div>

      <Paper className={classes.paper}>
        <Calendar
          style={{ minHeight: 500, width: '100%' }}
          events={events}
          step={60}
          date={date}
          views={allViews}
          view={view}
          startAccessor="start"
          endAccessor="end"
          titleAccessor="title"
          onView={handleViewChange}
          onSelectEvent={handleSelectEvent}
          onNavigate={handleNavigate}
          localizer={localizer}
        />
      </Paper>

      {open && (
        <AppointmentFormModal
          open={open}
          onClick={handleCreateAppointment}
          onClose={() => handleModalClose()}
          events={events}
        />
      )}
    </div>
  );

  function handleModalOpen() {
    setOpen(true);
  }

  function handleModalClose() {
    setOpen(false);
  }

  async function handleCreateAppointment(e, appointment, patient) {
    e.preventDefault();
    const { title, date, allDay, start, end, patientId } = appointment;
    const event = {
      title,
      allDay,
      start: new Date(dateTime(date, start)),
      end: new Date(dateTime(date, end)),
      patientId
    };

    setLoading(true);
    setErrors(null);
    try {
      const data = await api.post('/appointments', { event, patient });

      setLoading(false);
      setOpen(false);
      setEvents([
        ...events,
        {
          ...data,
          title: data.title,
          start: new Date(data.start),
          end: new Date(data.end)
        }
      ]);
      return data;
    } catch (err) {
      setLoading(false);
      setErrors(err);
    }
  }
}
