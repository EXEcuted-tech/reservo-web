import React, { useEffect } from 'react'
import { Fragment, useRef, useState } from "react";
import MerchAdHeader from '../../../components/headers/MerchAdHeader'
import { RiReservedFill } from 'react-icons/ri'
import MerchantLayout from '../../../components/layout/MerchantLayout';
import ButtonC from '../../../components/calendar/ButtonC';
import { GrNext, GrPrevious } from 'react-icons/gr';
import Button from './Component/Button';


const CalendarMerchant = () => {


  const month = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const [ndx, setInd] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear())
  const [monthN, setMonth] = useState(month[ndx]);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const [dEnd, setEnd] = useState(getDaysInMonth(year, ndx))
  const [dStart, setStart] = useState(getFirstDayOfMonth(year, ndx))


  useEffect(() => {
    setEnd(getDaysInMonth(year, ndx));
    setStart(getFirstDayOfMonth(year, ndx));

  }, [ndx])

  console.log("year: " + year + " monthNDX: " + ndx);
  console.log("startDate: " + dStart + "endDate:" + dEnd)

  return (
    <>
      <div className="calMerch grid w-full">
        <div className='flex flex-cols justify-center items-center bg-sky-500'>
          <button onClick={(e) => {
            e.preventDefault();
            setInd(ndx - 1)
            if (ndx <= 0) {
              setInd(11);
              setYear(new Date().getFullYear())

            }
            setMonth((e) => e = month[ndx])

          }}
            className='w-[2vw] h-[2vw] border-solid flex justify-center items-center rounded-full duration-100 hover:border-[rgba(0,0,0,0.5)]'
          > <GrPrevious /></button>
          <span>{monthN}</span>

          <button onClick={(e) => {
            e.preventDefault();
            setInd((x) => x + 1)
            if (ndx > 11) {
              setInd(0)
              setYear((y) => y + 1)
            }
            else {
            }

            setMonth(month[ndx])
          }}
            className='w-[2vw] h-[2vw] border-soli flex justify-center items-center rounded-full duration-100 hover:border-[rgba(0,0,0,0.5)]'
          > <GrNext /></button>
        </div>
        <div className="WeekDate grid grid-cols-7 col">
          {/* weeks*/}
          <span>Sunday</span>
          <span>Monday</span>
          <span>Tuesday</span>
          <span>Wednesday</span>
          <span>Thursday</span>
          <span>Friday</span>
          <span>Saturday</span>

        </div>
        <div className={`weekDay grid grid-cols-7`}>

          {[...Array(dEnd),].map((val: undefined, index: number) => { console.log("index :%d bool: %d", index, index === 0 ? 1 : 0); return (<Button key={index} className={index === 0 ? `col-start-${dStart + 1}` : ''}>{index + 1}</Button>) })}
        </div>



      </div>
    </>
  )
}

const merchantCalendar = () => {
  return (
    <div className="animate-fade-in">
      <div className="h-[90vh] font-poppins bg-[#F3F3F3] p-8">
        <CalendarMerchant />

      </div>
    </div>

  )
}

export default merchantCalendar