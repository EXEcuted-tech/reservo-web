import React from 'react'
import Calendar from '../../../components/calendar/Calendar'
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

const ReserveCalendar = (props?:{dataResv?:details[]}) => {
  return (
    <div className = "animate-fade-in">
      {/* <Calendar/> */}
      <Calendar2 dataSet={props?.dataResv}/>
      {/* <Calendar3 /> */}
    </div>
  )
}

export default ReserveCalendar