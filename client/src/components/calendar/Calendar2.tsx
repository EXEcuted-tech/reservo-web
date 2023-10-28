import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ButtonC from './ButtonC';
import ReservationDetails from './ReservationDetail';
import axios from 'axios';
import config from '../../common/config'
import { PiMoneyThin } from 'react-icons/pi';
import colors from '../../common/colors';
import Tile from './Tile';
import ReservationsList from './ReservationsList';

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

function Calendar2() {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDay ,setSelectedDay] = useState(1);
    const [selected, setSelected] = useState({
        day: 1,
        month: 1,
        year: 2000,
        count: 0,
    })
    const [year, setYear] = useState(new Date().getFullYear());
    const [monthNdx, setMonthNdx] = useState(new Date().getMonth());
    const merchant_id = localStorage.getItem('merch_id');
    const [dataSet, setDataSet] = useState();
    const calendarDates = new Date();

    const getDaysInMonth = (year:number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year:number, month:number) => {
        return new Date(year, month, 1).getDay();
    };
    
    function numberOfDays(year: number, month: number) {
        return new Date(year, month + 1, 0).getDate();
    }

    const [showReservations, setShowReservations] = useState(false);
    const currentReservations = ()=>{
        if(showReservations === false){
            setShowReservations(true)
        }else{
            setShowReservations(false)
        }
        console.log("RESERVATION MODAL STATUS: ", showReservations);
    }

    const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekly = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const [length, setLength] = useState(numberOfDays(year, monthNdx));
    const [start, getStart] = useState(new Date(year, monthNdx, 1).getDay());

    let count = 1;
    const cell = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

        const fetchData = async () => {
            try {
              const yy = String(year);
              const mm = String(monthNdx+1).padStart(2, '0'); // Ensure two digits for month
              const response = await axios.get(`${config.API}/reserve/retrieveCountLikeTwo`, {
                params: {
                  col1: 'res_date',
                  val1: yy + '-' + mm + "-",
                  col2: 'merchant_id',
                  val2: merchant_id,
                  orderVal: 'res_time',
                  order: 'ASC'
                }
              });
              //console.log("RES DATAAA ==> ", response.data.records);
              var data:any = { tempData: [] };
                for (const record in response.data.records) {
                if (response.data.records.hasOwnProperty(record)) {
                    const resDate = response.data.records[record].res_date;
                    const count = response.data.records[record]['COUNT(*)'];

                    const dateParts = resDate.split("T");
                    const date = dateParts[0];

                    data.tempData[date] = count;
                }
                }

                console.log("DATA=======>", response.data);
                //console.log("DATA=======>", data.tempData);
                setDataSet(data.tempData);
                //console.log("FETCHED DATA ==>", setDataSet);
              } catch (err) {
              console.log("AXIOS ERROR!!: ", err);
            }
          }
   

    const handleMonthChange = (action:any) => {
        if (action === "next") {
            if (monthNdx === 11) {
                setYear(year + 1);
                setMonthNdx(0);
            } else {
                setMonthNdx(monthNdx + 1);
            }
        } else {
            if (monthNdx === 0) {
                setYear(year - 1);
                setMonthNdx(11);
            } else {
                setMonthNdx(monthNdx - 1);
            }
        }
    };

    useEffect(() => {
        setIsLoading(true);
        fetchData()
            .then(() => {
                setIsLoading(false);
                //console.log("FETCHED DATA ==>", dataSet);
            })
            .catch((error) => {
                console.log("ERROR FETCHING DATA ==>", error);
                setIsLoading(false);
            });
    
        // Update the "today" flag
        const currentDate = new Date();
        setDateToday(
            currentDate.getFullYear() === year &&
            currentDate.getMonth() === monthNdx &&
            currentDate.getDate() === count
        );
    }, [year, monthNdx]);

    const [today, setDateToday] = useState(false);

    useEffect(() => {
        calendarDates.getFullYear() === year && calendarDates.getMonth() === monthNdx && calendarDates.getDate() === count ? setDateToday(true) : setDateToday(false);
        
    }, [count])

    useEffect(()=>{
        setIsLoading(true);
        fetchData().then(()=>{
            setIsLoading(false);
        }).catch((error)=>{
            console.log("ERROR FETCHING DATA ==>", error);
            setIsLoading(false);
        });
        
        
        // console.log("DATA ==> ", dataSet[0]);
        
    }, [year, monthNdx])

    const handleDayClick = (day:number) => {
        setSelectedDay(day);
    }

    const updateSelected = async (year: number, month: number, day: number) => {
        let retval = -1; // Assign a default value
      
        try {
          const yy = String(year);
          const mm = String(month + 1).padStart(2, '0'); // Ensure two digits for month
          const dd = String(day).padStart(2, '0'); // Ensure two digits for day
          const response = await axios.get(`${config.API}/reserve/retrievecountparams`, {
            params: {
              col1: 'res_date',
              val1: `${yy}-${mm}-${dd}`,
              col2: 'merchant_id',
              val2: merchant_id,
              orderVal: 'res_time',
              order: 'ASC',
            },
          });
          retval = response.data.count;
        } catch (err) {
          console.log("AXIOS ERROR!!: ", err);
        }   
      
        const obj = {
          year: year,
          month: month + 1,
          day: day,
          count: Number(retval),
        };
        setSelected(obj);
        console.log("OBJECT CLICKED ===> ", obj);
      };
      


    const styleToday = `bg-[${colors.beige}]`

    return (
        <div className='flex flex-col text-center font-poppins w-[100%] h-[80vh] bg-red-200'>
            <div>
                <div className='flex flex-cols justify-center' >
                    <span>
                        <ButtonC title='prev' isDisable={false} onClick={(event) => {
                            event.preventDefault();
                            handleMonthChange("back");
                        }} />  </span>

                    <div className=''>
                        <span>{months[monthNdx]}</span>
                        <span>{year}</span>
                    </div>
                    <span>
                        <ButtonC title='next' isDisable={false} onClick={(event) => {
                            event.preventDefault();
                            handleMonthChange("next");
                        }} />  </span>
                </div>
                <div className='grid grid-cols-7 gap-4 mx-5'>
                    {Array.from({ length: 7 }).map((_, indx) => {
                        const dayOfWeek = (indx + 1) % 7; // Adjusting for Sunday as the start of the week
                        return (
                            <span className='text-center font-poppins' key={indx}>{weekly[dayOfWeek]}</span>
                        );
                    })}
                    {Array.from({ length: getFirstDayOfMonth(year, monthNdx) }).map((_, index) => (
                        <div key={index}></div>
                    ))}
                    {Array.from({ length: getFirstDayOfMonth(year, monthNdx) }).map((_, index) => (
                        <div key={index}></div>
                    ))}
                    {cell.map((day) => (
                        <div
                            key={day}
                            className={`h-[12vh] w-[10vw] cursor-pointer p-2 rounded-lg ${day === calendarDates.getDate() ? styleToday : 'bg-[#FFFFFF]'} hover:bg-slate-300 duration-300`}
                            onClick={() => handleDayClick(day)}
                        >
                            {/* <ReservationDetails
                                today={new Date()}
                                year={year}
                                monthName={months[monthNdx]}
                                monthNdx={monthNdx}
                                day={day}
                            /> */}
                            <div onClick={() => updateSelected(year, monthNdx, day)}><Tile showReservations={currentReservations} year={year} day={day} month={monthNdx} today={day===calendarDates.getDate()? true:false}/></div>

                            
                        </div>
                    ))}
                    {showReservations? <ReservationsList year={selected.year} month={selected.month} day={selected.day} count={selected.count} close={currentReservations}/>: <></>}

                </div>
            </div>
        </div>

    )
}

export default Calendar2