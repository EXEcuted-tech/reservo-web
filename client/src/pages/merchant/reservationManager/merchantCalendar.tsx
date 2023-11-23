import { useEffect, useState } from 'react'
import { Fragment, useRef } from "react";
import MerchAdHeader from '../../../components/headers/MerchAdHeader'
import { RiReservedFill } from 'react-icons/ri'
import MerchantLayout from '../../../components/layout/MerchantLayout';
import ButtonC from '../../../components/calendar/ButtonC';
import { GrNext, GrPrevious } from 'react-icons/gr';
import Button from './Component/Button';
import Calendar from 'react-calendar';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

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

  const [isModalOpen, setModalOpen] = useState(false);
  const [valuedate, onChange] = useState<Value>(new Date());

  useEffect(() => {
    setEnd(getDaysInMonth(year, ndx));
    setStart(getFirstDayOfMonth(year, ndx));

  }, [ndx])

  console.log("year: " + year + " monthNDX: " + ndx);
  console.log("startDate: " + dStart + "endDate:" + dEnd)

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>(''); // Add state for time

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(e.target.value);
  };

  return (
    <>
    <div className='flex justify-end mb-2'>
        <button onClick={handleOpenModal} className='bg-red-700 text-white py-2 px-4 rounded'>Set Schedule</button>
        {isModalOpen && (
          <div>
          <div className='fixed top-0 left-0 w-full h-full bg-black opacity-50'></div>
          <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center'>
            <div className='bg-white p-8 rounded shadow-lg'>
              <div className='my-4'>
                <p className='text-2xl font-bold'>Select date range for unavailability.</p>
                <div className='p-1'>
                  <label>Date Start:</label>
                  <input type="date" onChange={(e) => handleDateChange(new Date(e.target.value))} />
                </div>
                <div className='p-1'>
                  <label>Date End:</label>
                  <input type="date" onChange={(e) => handleDateChange(new Date(e.target.value))} />
                </div>
              </div>
              <div className='mb-2'>
                <p className='text-2xl font-bold'>Select time range for unavailability.</p>
                <div className='p-1'>
                  <label>Time Start:</label>
                  <input type="time" value={selectedTime} onChange={handleTimeChange} />
                </div>
                <div className='p-1'>
                  <label>Time End:</label>
                  <input type="time" value={selectedTime} onChange={handleTimeChange} />
                </div>
              </div>
              <div className='flex justify-end col-span-2'>
                <button className='mt-4 mr-2 bg-blue-500 text-white py-2 px-4 rounded'>Save</button>
                <button onClick={handleCloseModal} className='mt-4 bg-red-500 text-white py-2 px-4 rounded'>Close</button>
              </div>
            </div>
          </div>
        </div>
        
        )}
      </div>
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