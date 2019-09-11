import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Button } from '@material-ui/core';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import api from '../lib/api';
import { dateTime } from '../lib/strings';
import { AppointmentContext } from '../context';
import AppointmentFormModal from './Appointments/AppointmentFormModal';
import Spinner from './Spinner';

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
  const [view, setView] = useState('month');
  const [events, setEvents] = useContext(AppointmentContext);
  const [date, setDate] = useState(new Date());

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setErrors(null);
      try {
        const data = await api.get('/appointments');
        const indexes = data.map(event => event._id);
        const table = data
          .map(e => ({
            ...e,
            title: e.title,
            start: new Date(e.start),
            end: new Date(e.end)
          }))
          .reduce((result, event) => ({ ...result, [event._id]: event }), {});

        setEvents({ indexes, table });
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setErrors(err);
      }
    };
    fetchEvents();
  }, []);

  const handleViewChange = view => {
    setView(view);
  };
  const handleSelectEvent = event => {
    setView('day');
    // console.log('[event]', event);

    setDate(new Date(event.start));
  };
  const handleNavigate = event => {
    setDate(new Date(event));
  };
  // const handleTooltip = event => {
  //   console.log('[tooltip]', event);
  // };
  // const handleDrilldownView = (
  //   targetDate,
  //   currentViewName,
  //   configuredViewName
  // ) => {
  //   console.log('[targetDate]', targetDate);
  //   console.log('[currentViewName]', currentViewName);
  //   console.log('[configuredViewName]', configuredViewName);
  // };

  // controls event prop
  const handleEventPropGetter = (event, start, end, isSelected) => {
    // console.log(event);

    var backgroundColor = event.patientId ? '#3174ad' : '#90EE90';
    var style = {
      backgroundColor: backgroundColor
      //  borderRadius: '0px',
      //  opacity: 0.8,
      //  color: 'white',
      //  border: '0px',
      //  display: 'block'
    };
    return {
      style: style
    };
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
            onClick={handleModalOpen}
          >
            {'Appointment'}
          </Button>
        </div>
      </div>

      <Paper className={classes.paper}>
        {loading && events.indexes.length === 0 && <Spinner />}

        <Calendar
          style={{ minHeight: 500, width: '100%' }}
          events={events.indexes.map(id => events.table[id])}
          step={60}
          date={date}
          views={allViews}
          view={view}
          startAccessor="start"
          endAccessor="end"
          titleAccessor="title"
          onView={handleViewChange}
          popup={true}
          // tooltipAccessor={handleTooltip}
          onSelectEvent={handleSelectEvent}
          // getDrilldownView={handleDrilldownView}
          onNavigate={handleNavigate}
          eventPropGetter={handleEventPropGetter}
          localizer={localizer}
        />
      </Paper>

      {open && (
        <AppointmentFormModal
          open={open}
          onSubmit={handleSubmit}
          onClose={handleModalClose}
          events={events.indexes.map(id => events.table[id])}
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

  async function handleSubmit(e, appointment, patient) {
    e.preventDefault();
    console.log('[event]', appointment);
    console.log('[patient]', patient);
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
      setEvents({
        indexes: [...events.indexes, data._id],
        table: {
          ...events.table,
          [data._id]: {
            ...data,
            title: data.title,
            start: new Date(data.start),
            end: new Date(data.end)
          }
        }
      });
      return data;
    } catch (err) {
      setLoading(false);
      setErrors(err);
    }
  }
}
