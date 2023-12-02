import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ButtonC from './ButtonC';
import ReservationDetails from './ReservationDetail';
import axios from 'axios';
import config from '../../common/config'
import { PiMoneyThin } from 'react-icons/pi';
import colors from '../../common/colors';
import TileMerchSched from './TileMerchSched';
import MerchSchedList from './MerchSchedList';
import ViewModal from '../modals/reserveModal/viewModal';
import EditModal from '../modals/reserveModal/editModal';
import { GrNext, GrPrevious } from 'react-icons/gr';

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

function CalendarMerchSched() {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDay, setSelectedDay] = useState(1);
    const [openModalView, setOpenModalView] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
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
    const [errMsg, setErrMsg] = useState('');
    const [errTitle, setErrTitle] = useState('');
    const [reservationCounts, setReservationCounts] = useState({});
    const calendarDates = new Date();
    // For Mobile
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

    const [unavailableDoW,setUnavailableDoW] = useState<any[]>([]);

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay();
    };

    function numberOfDays(year: number, month: number) {
        return new Date(year, month + 1, 0).getDate();
    }

    const [showReservations, setShowReservations] = useState(false);
    const currentReservations = () => {
        if (showReservations === false) {
            setShowReservations(true)
        } else {
            setShowReservations(false)
        }
    }

    const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekly = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const abbreviatedDays = ["S", "M", "T", "W", "TH", "F", "S"];

    const [length, setLength] = useState(numberOfDays(year, monthNdx));
    const [start, getStart] = useState(new Date(year, monthNdx, 1).getDay());

    let count = 1;
    const [cell, setCell] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31])


    const fetchData = async () => {
        try {
            const yy = String(year);
            const mm = String(monthNdx + 1).padStart(2, '0'); // Ensure two digits for month
            const urlPart = window.location.pathname.split("/");
            var filter: string = '%';
            switch (urlPart[2]) {
                case 'upcoming':
                    filter = 'Ongoing%'
                    break
                case 'finished':
                    filter = 'Finished%';
                    break;
                default:
                    break;
            }

            const response = await axios.get(`${config.API}/reserve/retrievecountnparams`, {
                params: {
                    cols: 'res_date as res_date, COUNT(*) as count',
                    condition: `merchant_id = ${merchant_id} AND res_date LIKE '${yy}-${mm}-%' AND status LIKE '${filter}' GROUP BY res_date`
                },
            });

            // Inside your fetchData function
            var data: any = {};

            for (const record of response.data.data) {
                if (response.data.data.length > 0) {
                    const resDate: any = record.res_date;
                    const count = record.count;

                    data[resDate] = count;

                }
            }

            setReservationCounts(data);


            setDataSet(data.tempData);
        } catch (err: any) {
            setErrTitle('Server Error');
            setErrMsg(err.body);
        }
    }


    const handleMonthChange = (action: any) => {
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
            })
            .catch((error) => {
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

    useEffect(() => {
        setIsLoading(true);
        fetchData().then(() => {
            setIsLoading(false);
        }).catch((error) => {

            setIsLoading(false);
        });
    }, [year, monthNdx, window.location.pathname])

    const handleDayClick = (day: number) => {
        setSelectedDay(day);
    }

    const checkToday = (day: number) => {
        var retval

        retval = day === calendarDates.getDate() && year === calendarDates.getFullYear() && monthNdx === calendarDates.getMonth() ? true : false;
        //console.log(year, "-", monthNdx,"-", day, "===", retval)
        return retval
    }

    useEffect(() => {
        const timer = setTimeout(() => {getUnavailableDays()}, 500);
        return () => clearTimeout(timer);
      }, [year, monthNdx, window.location.pathname]);

    const availableDate = (dOw: any[], day: number) => {
        console.log("DOW: ",dOw);
        let retval;
        const date = new Date(year, monthNdx, day);
        const dayOfWeek = date.getDay();
    
        const dayOfWeekName = weekly[dayOfWeek];
    
        if(dOw!=undefined){
            const notAvailable = mapAbbreviatedToFull(dOw);
            console.log("Not Available: ",notAvailable);
            retval = notAvailable.includes(dayOfWeekName);
        }else{
            retval=false;
        }
        console.log("Retval: ",retval);
        return retval;
    };

    const mapAbbreviatedToFull = (daysOfWeek: any[]) => {
        console.log("Hello?!",daysOfWeek);
        const dayMapping:any = {
          Mon: 'Monday',
          Tue: 'Tuesday',
          Wed: 'Wednesday',
          Thu: 'Thursday',
          Fri: 'Friday',
          Sat: 'Saturday',
          Sun: 'Sunday',
        };
      
        console.log("Here",daysOfWeek.map((abbreviatedDay) => dayMapping[abbreviatedDay]))
        return daysOfWeek.map((abbreviatedDay) => dayMapping[abbreviatedDay]);
      };

    const getUnavailableDays = () =>{
        axios.get(`${config.API}/merchantsched/retrieve?col=${merchant_id}`)
        .then((res)=>{
            if(res.data.success==true){
                if (res.data.message[0]?.merchant_sched_settings) {
                    const merchantSchedSettings = JSON.parse(res.data.message[0]?.merchant_sched_settings);
                
                    if (merchantSchedSettings && merchantSchedSettings.merchsched.settings.cases) {
                        const newSettings = merchantSchedSettings.merchsched.settings;
                        const unavailableDoW = newSettings?.cases
                            .map((caseItem: { Unavailable_DoW: any }) => caseItem.Unavailable_DoW)
                            .flatMap((dayString: string) => dayString.split(',').map((day) => day.trim()));
                
                        console.log(unavailableDoW);
                        setUnavailableDoW(unavailableDoW);
                    }
                } else {
                    setUnavailableDoW([]);
                }
            }
        })
    }

    const updateSelected = async (year: number, month: number, day: number) => {
        let retval = -1; // Assign a default value
        setIsLoading(true);
        try {
            const urlPart = window.location.pathname.split("/");
            var filter: string = '%';
            switch (urlPart[2]) {
                case 'upcoming':
                    filter = 'Ongoing%'
                    break
                case 'finished':
                    filter = 'Finished%';
                    break;
                default:
                    break;
            }
            const yy = String(year);
            const mm = String(month + 1).padStart(2, '0'); // Ensure two digits for month
            const dd = String(day).padStart(2, '0'); //ensure two digits for day
            axios.get(`${config.API}/reserve/retrievecountnparams`, {
                params: {
                    cols: `res_date AS res_date, COUNT(*) as count`,
                    condition: `merchant_id = ${merchant_id} AND status LIKE '${filter}' AND res_date = '${yy}-${mm}-${dd}' `
                }
            }).then((response) => {

                retval = response.data.data[0].count;
            });

        } catch (err: any) {
            setErrTitle('Server Error');
            setErrMsg(err.message);
        }

        const obj = {
            year: year,
            month: month + 1,
            day: day,
            count: Number(retval),
        };
        setSelected(obj);
        setIsLoading(false);
    };

    const styleToday = ' bg-[#f9dcc5]'

    //For Mobile
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function getDaysInAMonth(year: number, month: number): number {
        if (month < 1 || month > 12) {
            return 31;
        }

        // Create a Date object for the first day of the next month
        const nextMonthFirstDay = new Date(year, month, 1);

        // Subtract one day to get the last day of the current month
        nextMonthFirstDay.setDate(nextMonthFirstDay.getDate() - 1);

        // Return the day component, which gives the number of days in the month
        return nextMonthFirstDay.getDate();
    }

    useEffect(() => {
        const dayCount: number = getDaysInAMonth(year, monthNdx + 1);
        var tempCells = []
        for (var x: number = 1; x <= dayCount; x++) {
            tempCells.push(x);
        }
        setCell(tempCells)

    }, [monthNdx, year])

    //merch Sched 
    const merchWeek = [1, 0, 0, 0, 0, 0, 1];


    return (
        <div className='px-[3%] pb-[3%] pt-[1.5%] '>
            <div className='flex flex-col font-poppins w-[100%] h-[100%] p-[1%] bg-[#840705] rounded-3xl'>
                <div>
                    <div className='flex justify-center my-[1%] mb-[2%]' >
                        <div></div>
                        <div></div>
                        <div className='flex justify-center items-center mr-[3%]'>
                            <button onClick={(event) => {
                                event.preventDefault();
                                handleMonthChange("back");
                            }} className='w-[2vw] h-[2vw] border-solid border-black border-2 flex justify-center bg-[white] items-center rounded-full duration-100 hover:border-[rgba(0,0,0,0.5)]  xs:max-sm:w-[4vw] xs:max-sm:h-[3vh] '>
                                <GrPrevious color='light' className="xs:max-sm:text-[0.8em]" /></button>
                        </div>

                        <div className='flex justify-center items-center text-[1.5rem] font-bold text-white mr-[3%] xs:max-sm:text-[1.2rem] xl:max-2xl:text-[1.1em]'>
                            <span>{months[monthNdx]}</span>
                            <p> - </p>
                            <span>{String(year)}</span>
                        </div>

                        <div className='flex justify-center items-center'>
                            <button onClick={(event) => {
                                event.preventDefault();
                                handleMonthChange("next");
                            }} className='w-[2vw] h-[2vw] border-solid bg-[white] border-black border-2 flex justify-center items-center rounded-full duration-100 hover:border-[rgba(0,0,0,0.5)]  xs:max-sm:w-[4vw] xs:max-sm:h-[3vh]'>
                                <GrNext className="xs:max-sm:text-[0.8em]" /></button>
                        </div>
                        <div></div>
                        <div></div>
                    </div>

                    <div className='grid grid-cols-7 gap-4 mx-5 place-items-center xs:max-sm:mx-3 xs:max-sm:my-3 xs:max-sm:gap-2' >
                        {isMobile
                            ? abbreviatedDays.map((day, index) => (
                                <div
                                    className=' w-[7vw] text-center font-poppins rounded-lg bg-[#FFFFFF] border-solid border-black border-2 xs:max-sm:text-[2.5vw] xs:max-sm:w-[100%] xs:max-sm:h-[3vh] xl:max-2xl:text-[0.8em]'
                                    key={index}
                                >
                                    {day}
                                </div>
                            ))
                            : Array.from({ length: 7 }).map((_, indx) => {
                                const dayOfWeek = (indx) % 7; // Adjusting for Sunday as the start of the week
                                return (
                                    <div
                                        className=' w-[7vw] text-center font-poppins rounded-lg bg-[#FFFFFF] border-solid border-black border-2 xl:max-2xl:text-[0.8em]'
                                        key={indx}
                                    >
                                        {weekly[dayOfWeek]}
                                    </div>
                                );
                            })}

                        {Array.from({ length: getFirstDayOfMonth(year, monthNdx) }).map((_, index) => (
                            <span key={index} ></span>
                        ))}
                        {cell.map((day) => (
                            <div
                                key={day}
                                className={`h-[5vw] w-[5vw] flex justify-center cursor-pointer p-2 rounded-xl border-black border-2 border-solid xs:max-sm:w-[100%] xs:max-sm:h-[100%] xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.9em]
                                ${checkToday(day) === true ? styleToday : availableDate(unavailableDoW,day) == true ? 'bg-[#FA8072]':'bg-white'} 
                                hover:bg-slate-300 duration-300`}
                                onClick={() => handleDayClick(day)}
                            >
                                <div 
                                    onClick={() => updateSelected(year, monthNdx, day)}>
                                    <TileMerchSched
                                        showReservations={currentReservations}
                                        year={year}
                                        day={day}
                                        month={monthNdx}
                                        today={checkToday(day)}
                                        setIsLoading={setIsLoading}
                                        isLoading={isLoading}
                                    />
                                </div>
                            </div>
                        ))}

                        {showReservations ? <MerchSchedList year={selected.year} month={selected.month} day={selected.day} count={selected.count} close={currentReservations} openView={setOpenModalView} openEdit={setOpenModalEdit} /> : <></>}
                        {(openModalView || openModalEdit) &&
                            <>
                                <div className='fixed top-0 left-0 w-full h-full bg-[rgb(0,0,0,0.5)] opacity-0.5 z-100'></div>
                                {openModalView && <ViewModal setOpenModalView={setOpenModalView} />}
                                {openModalEdit && <EditModal setOpenModalEdit={setOpenModalEdit} />}
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CalendarMerchSched