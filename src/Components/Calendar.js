import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

moment.locale('en');

const localizer = momentLocalizer(moment);

export default function MyCalendar(props) {
  // const data = api.get('/patients');
  // console.log('[data]', data);

  useEffect(() => {
    window.addEventListener('resize', () => {
      // SetState
    });
  });
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={[
          {
            title: 'Some event',
            start: Date.now(),
            end: Date.now() + 100,
            allDay: true
          }
        ]}
      />
    </div>
  );
}
