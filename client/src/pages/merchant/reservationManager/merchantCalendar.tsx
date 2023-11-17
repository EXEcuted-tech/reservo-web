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
  const cell = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];

  const [ndx, setInd] = useState(new Date().getMonth());
  let day = 1;
  const [year, setYear] = useState(new Date().getFullYear())
  const [monthN, setMonth] = useState(month[ndx]);

  console.log(ndx)

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const [dEnd, setEnd] = useState(new Date(year, ndx + 1, 0).getDate())
  const [dStart, setStart] = useState(new Date(year, ndx, 1).getDay());


  useEffect(() => {

    day = 1;
    setStart(getFirstDayOfMonth(year, ndx));
    setEnd(getDaysInMonth(year, ndx));


  }, [ndx])


  return (
    <>
      <div className="calMerch grid gap-1 bg-zinc-200 p-1  w-full animate-fade-in">
        <div className='w-full flex justify-center items-center bg-blue-300'>
          <div className='flex justify-center gap-2 h-20 items-center'>
            <Button onClick={(e) => {
              e.preventDefault();

              setInd((prev) => prev - 1);

              if (ndx <= 0) {
                setInd(11);
                setYear((prev) => prev - 1);
              }

            }} className='flex-none p-2 hover:bg-blue-400'>
              <GrPrevious />
            </Button>
            <span className='flex-1 text-center text-2xl '>{month[ndx]} , {year}</span>

            <button onClick={(e) => {
              e.preventDefault();

              if (ndx >= 11) {
                setInd(0);
                setYear((y) => y + 1)
              }
              else {
                setInd((prev) => prev + 1)
              }
            }}
              className='flex-none bg-transparent p-2 hover:bg-blue-400'
            > <GrNext /></button>
          </div>
        </div>
        <div className='bg-white p-2'>
          <div className="WeekDate grid grid-cols-7 gap-2 place-items-center">
            {/* weeks*/}
            <span>Sunday</span>
            <span>Monday</span>
            <span>Tuesday</span>
            <span>Wednesday</span>
            <span>Thursday</span>
            <span>Friday</span>
            <span>Saturday</span>

          </div>
          <div className="weekDay grid grid-cols-7 place-items-start gap-1 overflow-hidden">

            {cell.map((e, index) => {
              return (
                <div
                  key={index}
                  className={index >= dStart && day <= dEnd ? `h-32 w-full bg-red-100 hover:bg-red-200  min:h-24` : `h-24 w-full min:h-24`}
                  onClick={() => { alert("here") }}
                > <span className='m-2'>{index >= dStart && day <= dEnd ? day++ : ''}</span></div>
              )

            })}

            {/* {[...Array(dEnd),].map((e, index) => {
  return (<div className={index === 0 ? colStart : ''}>
    <button key={index} className={index === 0 ? colStart : ''}>{index + 1}</button>
  </div>)
})} */}

          </div>
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