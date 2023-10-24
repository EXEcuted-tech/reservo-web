import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ButtonC from './ButtonC';
import ReservationDetails from './ReservationDetail';



interface details  {
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

function Calendar2(props?: {dataSet?:details[]}) {

    const calendarDates = new Date();

    function numberOfDays(year: number, month: number) {
        return new Date(year, month + 1, 0).getDate();
    }

    const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekly = ["Sunday", "Monday", "Tueday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const [year, setYear] = useState(calendarDates.getFullYear());
    const [monthNdx, setMonthNdx] = useState(calendarDates.getMonth());
    const [length, setLength] = useState(numberOfDays(year, monthNdx));
    const [start ,getStart] = useState(new Date(year , monthNdx , 1).getDay()); 
    let count = 1;
    const cell = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42];

    const dataSet  = props?.dataSet || [{id:0 ,date: new Date(), 
    eventSize: 0, 
    time : "00:00 AM - 00:00 PM",
    email : "xxxxxx@dxxxxx.com",
    organizer : "xxxxx xxxxx xxx",     
    contactN : "xxxxxxxxxxx",     
    clientN : "xxxxxxxxxx",     
    status : "xxxxxxxxx",
    remarks : "xxxxxxxxxxxx"}]

    const handlerClicker = (action :string) => {
        if(action === "next"){
            setMonthNdx(monthNdx + 1);
        }
        else{
            setMonthNdx(monthNdx -1);
        }
    }

    useEffect(()=>{
        if(monthNdx > 11){
            setYear(year + 1);
            setMonthNdx(0);
        }
        else if(monthNdx < 0){
            setYear(year - 1);
            setMonthNdx(11);
        }
    },[monthNdx]);

    useEffect(()=>{
        setLength(numberOfDays(year, monthNdx));
        getStart(new Date(year , monthNdx , 1).getDay());
        count = 1;
    } , [monthNdx])

    const [today, setDateToday] = useState(false);

    useEffect(() => {
        calendarDates.getFullYear() === year && calendarDates.getMonth() === monthNdx && calendarDates.getDate() === count ? setDateToday(true) : setDateToday(false);
      }, [count])
    const styleToday = {
        backgroundColor: today ? "red" : "none",
        color: today ? "white" : "",
    } 

    return (
        <div className='flex flex-col text-center font-poppins w-[100%] h-[80vh] bg-red-200'>
            <div>
                <div className='flex flex-cols justify-center' >
                    <span>
                        <ButtonC title='prev' isDisable={false} onClick={(event) => {
                        event.preventDefault();
                        handlerClicker("back");
                    }} />  </span>

                    <div className=''>
                        <span>{months[monthNdx]}</span>
                        <span>{year}</span>
                    </div>
                    <span>
                        <ButtonC title='next' isDisable={false} onClick={(event) => {
                        event.preventDefault();
                        handlerClicker("next");
                    }} />  </span>
                </div>
                <div className='grid grid-cols-7 gap-4'>
                    {weekly.map((weekName, indx) => {
                        return (
                            <span className='text-center font-poppins' key={indx}>{weekName}</span>
                        )
                    })}
                    {cell && cell.map((cellDay)=>{
                        return(
                            cellDay >= start && count <= length ? 
                            //reservation Details per Days
                            props?.dataSet ? <ReservationDetails key={cellDay} dataSet = {dataSet} today ={calendarDates} year = {year} monthName ={months[monthNdx]} monthNdx={monthNdx} day={count++}/> : <Button sx={styleToday}>{count++}</Button>
                                    : 
                                <span key={cellDay}></span>
                                
                        )
                    })}
                </div>
            </div>
        </div>

    )
}

export default Calendar2