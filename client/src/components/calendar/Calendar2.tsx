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

function Calendar2() {

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

    const dataSet : details[] = [{id:3322114425522 ,date: new Date("October 25 , 2023"), 
    eventSize: 100, 
    time : "10:00:00 AM- 5:00 PM",
    email : "abc@def.com",
    organizer : "juan Dela zz",     
    contactN : "09919191912",     
    clientN : "juan D Cruz",     
    status : "Ongoing",
    remarks : ""}]

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
                            <ReservationDetails key={cellDay} dataSet = {dataSet} today ={calendarDates} year = {year} monthName ={months[monthNdx]} monthNdx={monthNdx} day={count++}/>
                                    : 
                                <span key={cellDay}></span>
                                
                    

                            // <ButtonC key={cellDay} title= {cellDay >= start && count <= length ? count++: undefined} onClick={(event) => {
                            //     event.preventDefault();
                            //     daysButton(cellDay + 1);
                            // }} isDisable={cellDay >= start && cellDay < length ? false : true} />
                            // <Button key={cellDay} style={{textAlign:"left", height:'9vh'} onclick}>{cellDay >= start && count <= length ? count++: undefined}</Button>
                        )
                    })}
                </div>
            </div>
        </div>

    )
}

export default Calendar2