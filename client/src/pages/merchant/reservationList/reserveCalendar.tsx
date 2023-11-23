import React from 'react'
import Calendar2 from '../../../components/calendar/Calendar2'


interface details {
  id: number,
  date: Date;
  eventSize: number;
  time: string;
  email: string;
  organizer: string;
  contactN: string;
  clientN: string;
  status: string;
  remarks: string;
};

const ReserveCalendar = () => {
  return (
    <div className = "animate-fade-in">
      <Calendar2 />
    </div>
  )
}

export default ReserveCalendar