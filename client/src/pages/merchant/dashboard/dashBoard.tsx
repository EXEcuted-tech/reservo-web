import React, { useEffect, useState } from 'react'
import {RiDashboard3Line} from 'react-icons/ri'
import {IoCalendarSharp} from 'react-icons/io5'
import {GiJuggler} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {MdGroups2} from 'react-icons/md'
import {MdRecentActors} from 'react-icons/md'
import Chart from 'react-google-charts'
import MerchAdHeader from '../../../components/headers/MerchAdHeader'
import axios from 'axios'
import config from '../../../common/config'
import GenSpinner from '../../../components/loaders/genSpinner'

interface GraphItem {
  year: number;
  month: number;
  books: number;
}

interface reservationList {
  reservation_id: number;
  location: string;
  res_date: string;
  res_time: string;
  merchant_id: number;
  account_id: number;
  account_name: string;
}


const MerchDashboard = () => {
  const storedAcc = localStorage.getItem('admerchDetails')

  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<any[]>([]);
  const userDetails = localStorage.getItem('admerchDetails');
  const userID = userDetails ? JSON.parse(userDetails).userID : "0";
  const userName = userDetails ? JSON.parse(userDetails).user: "UNDEFINED";
  const merchant_id = localStorage.getItem("merch_id");
  const [reservationCount, setReservationCount] = useState(0);
  const [cateredCount, setCateredCount] = useState(0);
  const [cancelledCount, setCancelledCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [mess1, setMess1] = useState('');
  const [mess2,setMess2] = useState('')
  const [graphList, setgraphList] = useState([{}]);
  const [recentReservations, setRecentReservations] = useState<Array<{reservation: reservationList, clientName: String}>>([]);
  const fetchGraphInfo = async() => {
    try {
      const responseBooks = await axios.get(`${config.API}/reserve/retrievebooks`,{
        params: {
          year: "2023",
          merchID: Number(localStorage.getItem('merch_ID'))
        }
      })
     
      setgraphList(responseBooks.data.count)
    } catch (error) {
      //PUT ERROR NOTIF 
    }
  }

  const formattedData = (graphList as GraphItem[]).map(item => [new Date(item.year, item.month - 1), item.books]);

  const LineData = [
    [
      { type: "date", label: 'Day' },
      'Bookings',
    ],
    ...formattedData,
  ];
  const LineChartOptions = {
    title: 'Reservations Graph',
    linewidth: graphList.length,
    hAxis: {
      title: 'Monthly',
      format: "MMM yyyy",
      gridlines: {
        color: 'transparent',
      },
    },
    vAxis: {
      title: 'Caters',
      gridlines: {
        color: 'transparent'
      }
    },
    backgroundColor: 'transparent',
    colors:['#660605'],
    titleTextStyle: {
  
    }
  }

  function getTodaysDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Add 1 because months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  const fetchInfo = async() =>{
    try{
      const responseCount = await axios.get(`${config.API}/reserve/retrievecount`, {
        params: {
          col: "merchant_id",
          val: merchant_id
        }
      })
      setReservationCount(responseCount.data.count);

      const responseCatered = await axios.get(`${config.API}/reserve/retrievecountparams`,{
        params:{
          col1: "merchant_id",
          val1: merchant_id,
          col2: "status",
          val2: "Finished"
        }
      });
      setCateredCount(responseCatered.data.count);

      const responseCancelled = await axios.get(`${config.API}/reserve/retrievecountparams`,{
        params:{
          col1: "merchant_id",
          val1: merchant_id,
          col2: "status",
          val2: "Cancelled"
        }
      });
      setCancelledCount(responseCancelled.data.count);

      
      const responseToday = await axios.get(`${config.API}/reserve/retrievecount3params`,{
        params:{
          col1: "merchant_id",
          val1: merchant_id,
          col2: "status",
          val2: "Ongoing",
          col3: "res_date",
          val3: getTodaysDate() //todays date
        }
      });
      setTodayCount(responseToday.data.count);

      const resStatus = await axios.get(`${config.API}/reserve/retrievecountparams`,{
        params:{
          col1: "merchant_id",
          val1: merchant_id,
          col2: "date_received",
          val2: getTodaysDate()
        }
      });
      if(resStatus.data.count > 0){
        setMess1('As of the moment,')
        setMess2('everything looks great!')
      }else{
        setMess1('Hmmm... Unfortunately,')
        setMess2('Looks like we are in a rut today!')
      }
    }catch(error){
      //PUT ERROR NOTIF 
    }
  }

  const getClient = async (id: number) => {
    try {
      const col = 'account_id';
      const val = id;
      
      const response = await axios.get(`${config.API}/user/retrieve?col=${col}&val=${val}`);

      if(response.data.status === 200) {
        return response.data.users[0].account_name;
      }
      return '';
    }catch (error){
      //PUT ERROR NOTIF 
      return '';
    }
  }

    const fetchRecentReservations = async () => {
      try {
        const todayDate = getTodaysDate();
        const col = 'merchant_id';
        const val = merchant_id;
        const resReservations = await axios.get(`${config.API}/reserve/retrieve?col=${col}&val=${val}`);
        const reservationsData = resReservations.data.records;
        const recentReservations = reservationsData;
        const reservationsRec = [];
  
        for (const reservation of recentReservations) {
          const clientName = await getClient(reservation.account_id);

           // Convert 24-hour time to 12-hour time
          const timeParts = reservation.res_time.split(':');
          const hours = parseInt(timeParts[0]);
          const minutes = parseInt(timeParts[1]);
          const ampm = hours >= 12 ? 'PM' : 'AM';
          const formattedHours = hours % 12 || 12;
          const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

         // Remove the time part from the date
          const formattedDate = new Date(reservation.res_date).toLocaleDateString();

          reservationsRec.push({
            reservation: { ...reservation, res_time: formattedTime, res_date: formattedDate }, clientName,
      });
    }
        setRecentReservations(reservationsRec);
      } catch (error) {
        // Handle error
      }
    };


  useEffect(() => {
    setIsLoading(true);
    fetchInfo();
    fetchGraphInfo();
    fetchRecentReservations();
    setIsLoading(false);
  }, []);
  

  return (
    <div className='animate-fade-in flex-col'>
      {/* Header Section */}
        <MerchAdHeader icon={RiDashboard3Line} title="Dashboard"/>
        {/* Welcome Section */}
        <div className='bg-[#F3F3F3] h-[30vh] flex overflow-y-auto overflow-x-hidden xs:max-sm:mt-[3%] xs:max-sm:mb-[3%]'>
           <div className='font-poppins w-[60%] p-[1%] text-center xs:max-sm:w-[40%] xs:max-sm:p-[0.5%] '>
              <div className='animate-slide-right align-center text-center p-[3%] h-[100%] rounded-3xl bg-gradient-to-r from-[#660605] via-[#ae1313] to-[#9a1a00] xs:max-sm:overflow-y-auto'>
                <h1 className='animate-up-down text-[2.5em] font-extrabold text-white xs:max-sm:text-[1.3em] xl:max-2xl:text-[1.5em]'>
                  Welcome, {userName}!
                </h1>
                <p className='font-extralight text-[1.3em] mt-[-3%] text-white xs:max-sm:text-[0.7em] xl:max-2xl:text-[1em] '>
                  <br/>{mess1}<br/>{mess2}</p>
                <p className='hover:animate-shake hover:cursor-pointer mt-[3%] italic font-light text-[1em] text-white xs:max-sm:text-[0.7em] xs:max-sm:mt-[5%]'>
                  Check further updates now!</p>
              </div>
            </div>

            <div className='w-[40%] p-[1%] text-center xs:max-sm:w-[60%]'>
              <div className='p-[0.5%] h-[100%] rounded-3xl bg-black grid-cols-2 grid-rows-2 grid gap-1'>
                <div className='bg-[#660605] rounded-tl-2xl flex'>

                  <div className='w-[70%] xs:max-sm:mt-[7%] xs:max-sm:ml-[13%]'>
                    <p className="text-white mt-[-5%] text-[5em] font-bold display xs:max-sm:text-[3em]  xl:max-2xl:text-[3em]">{reservationCount}</p>
                    <p className='text-white text-[1.2em] mt-[-13%] xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.8em] xl:max-2xl:mt-[-11%]'>RESERVATION</p>
                  </div>
                  <div className='w-[30%] pt-[10%] text-center xs:max-sm:pt-[25%] xs:max-sm:ml-[-6%]'>
                      <IoCalendarSharp className='text-white text-[4em] xs:max-sm:text-[1.0em] xl:max-2xl:text-[2.5em]'/>
                  </div>
                </div>
                <div className='bg-[#660605] rounded-tr-2xl flex'>
                <div className='w-[100%] xs:max-sm:mt-[7%] xs:max-sm:ml-[13%]'>
                    <p className='text-white mt-[-5%] text-[5em] font-bold display xs:max-sm:text-[3em] xl:max-2xl:text-[3em]'>{todayCount}</p>
                    <p className='text-white text-[1.2em] mt-[-13%] xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.8em] xl:max-2xl:mt-[-11%]'>TODAY'S TABLE</p>
                  </div>
                  <div className='w-[30%] pt-[10%] text-center  xs:max-sm:pt-[25%] xs:max-sm:ml-[-16%]'>
                      <MdGroups2 className='text-white text-[4em] ml-[-30%] xs:max-sm:text-[1.0em] xl:max-2xl:text-[2.5em]'/>
                  </div>
                </div>
                <div className='bg-[#660605] rounded-bl-2xl flex'>
                <div className='w-[70%] xs:max-sm:mt-[7%] xs:max-sm:ml-[13%]'>
                    <p className='text-white mt-[-5%] text-[5em] font-bold display xs:max-sm:text-[3em] xl:max-2xl:text-[3em]'>{cateredCount}</p>
                    <p className='text-white text-[1.2em] mt-[-13%] xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.8em] xl:max-2xl:mt-[-11%]'>CATERED</p>
                  </div>
                  <div className='w-[30%] pt-[10%] text-center xs:max-sm:pt-[25%] xs:max-sm:ml-[-18%]'>
                      <GiJuggler className='text-white text-[4em] xs:max-sm:text-[1.0em] xl:max-2xl:text-[2.5em]'/>
                  </div>
                </div>
                <div className='bg-[#660605] rounded-br-2xl flex'>
                <div className='w-[70%] xs:max-sm:mt-[7%] xs:max-sm:ml-[13%]'>
                    <p className='text-white mt-[-5%] text-[5em] font-bold display xs:max-sm:text-[3em] xl:max-2xl:text-[3em]'>{cancelledCount}</p>
                    <p className='text-white text-[1.2em] mt-[-13%] xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.8em] xl:max-2xl:mt-[-11%]'>CANCELLED</p>
                  </div>
                  <div className='w-[30%] pt-[10%] text-center xs:max-sm:pt-[25%] xs:max-sm:ml-[-18%]'>
                      <AiFillCloseCircle className='text-white text-[4em] xs:max-sm:text-[1.0em] xl:max-2xl:text-[2.5em]'/>
                  </div>
                </div>
              </div>
            </div> 
        </div>
        {/* Graph Section */}
        <div className='bg-[#F3F3F3] h-[30vh] flex p-[1%] xs:max-sm:mb-[3%]'>
           <div className='align-center text-center w-[100%] rounded-3xl bg-[#F0E5D8]'>
            {isLoading? <div className='flex items-center justify-center mt-[5vh]'><GenSpinner/></div>:
            <Chart
          width={'100%'}
          height={'100%'}
          chartType="LineChart"
          loader={<div>Loading Chart...</div>}
           data={LineData}
          options={LineChartOptions}
          rootProps={{ 'data-testid': '2' }}
          />
            }
           </div>
        </div>
        {/* Reservation Section */}
        <div className='bg-[#F3F3F3] h-[30vh] flex overflow-auto xs:max-sm:h-[35vh]'>
            <div className='w-[75%] m-[1%] text-center bg-white rounded-3xl flex-col pt-0 p-[1%] overflow-auto'>
              <div className='text-left border-b-2 border-black'>
              <p className='flex font-bold text-[1.5em] xs:max-sm:text-[1.2em] xl:max-2xl:text-[1.2em]'> Recent Reservations <br/></p>
              </div>
              <table className='flex-col w-[100%] text-left bg-white rounded-3xl overflow-auto xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.8em]'>
              <tr>
                <th>Client Name</th>
                <th>Event</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
              <tbody id="data-table-row">
              {recentReservations.length === 0 ? (
                  <tr>
                    <td colSpan={4} className='animate-pulse text-center mt-[5vh]'>
                      Loading...
                    </td>
                  </tr>
                ) : (
                  recentReservations.map(({ reservation, clientName }) => (
                    <tr key={reservation.reservation_id}>
                      <td>{clientName}</td>
                      <td>{reservation.location}</td>
                      <td>{reservation.res_date}</td>
                      <td>{reservation.res_time}</td>
                    </tr>
                  ))
                )}
              </tbody>
              </table> 
            </div>

            <div className='w-[35%] m-[1%] text-center bg-white rounded-3xl px-[1%]'>
              <table className='flex-col w-[100%] text-center bg-white rounded-3xl'>
                <tr className='border-b-2 border-black text-[1.5em] xs:max-sm:text-[0.85em] xl:max-2xl:text-[1.2em]'>
                  <th>Time In</th>
                  <th>Time Out</th>
                </tr>
                <tr>
                  <td className='h-[100%] border-black border-r-2 xs:max-sm:text-[0.85em]  xl:max-2xl:text-[0.8em]'>
                    Time In</td>
                  <td className='h-[100%] xs:max-sm:text-[0.85em] xl:max-2xl:text-[0.8em]'>
                    Time Out</td>
                </tr>
                <tbody>
                  {isLoading? <td colSpan={2} className='animate-pulse text-center mt-[5vh]'> Loading... </td>:
                  <p>DATA LOADED</p>}
                </tbody>
              </table>
            </div> 
        </div>
    </div>
  )
}

export default MerchDashboard