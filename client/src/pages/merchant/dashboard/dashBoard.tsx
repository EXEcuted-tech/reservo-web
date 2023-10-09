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

const MerchDashboard = () => {
  const storedAcc = localStorage.getItem('admerchDetails')

  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<any[]>([]);
  const userDetails = localStorage.getItem('userDetails');
  const userID = userDetails ? JSON.parse(userDetails).userID : "0";
  const userName = userDetails ? JSON.parse(userDetails).user: "UNDEFINED";
  const [reservationCount, setReservationCount] = useState(0);
  const [cateredCount, setCateredCount] = useState(0);
  const [cancelledCount, setCancelledCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [graphList, setgraphList] = useState([{}]);
  
  const fetchGraphInfo = async() => {
    try {
      const responseBooks = await axios.get(`${config.API}/reserve/retrievebooks`,{
        params: {
          year: "2023",
          merchID: 2
        }
      })
      setgraphList(responseBooks.data.count)
    } catch (error) {
      console.log(error);
    }
  }

  const formattedData = graphList.map(item => [new Date(2023,item.month-1 ), item.books])
  const LineData = [
    [
      { type: "date", label: 'Day'},
      'Bookings'
    ],
    ...formattedData
  ]
  const LineChartOptions = {
    title: 'Rervations Graph',
    linewidth: 12,
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
    console.log(localStorage.userDetails)
    try{
      const responseCount = await axios.get(`${config.API}/reserve/retrievecount`, {
        params: {
          col: "merchant_id",
          val: "1" //needs to be changed to get through loc storage
        }
      })
      setReservationCount(responseCount.data.count);

      const responseCatered = await axios.get(`${config.API}/reserve/retrievecountparams`,{
        params:{
          col1: "merchant_id",
          val1: "1", //needs to be changed to get through loc storage
          col2: "status",
          val2: "Finished"
        }
      });
      setCateredCount(responseCatered.data.count);

      const responseCancelled = await axios.get(`${config.API}/reserve/retrievecountparams`,{
        params:{
          col1: "merchant_id",
          val1: "1", //needs to be changed to get through loc storage
          col2: "status",
          val2: "Cancelled"
        }
      });
      setCancelledCount(responseCancelled.data.count);

      
      const responseToday = await axios.get(`${config.API}/reserve/retrievecount3params`,{
        params:{
          col1: "merchant_id",
          val1: "1", //needs to be changed to get through loc storage
          col2: "status",
          val2: "Cancelled",
          col3: "res_date",
          val3: getTodaysDate() //todays date
        }
      });
      setTodayCount(responseToday.data.count);
    }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    fetchInfo();
    fetchGraphInfo();
  }, []);
  

  return (
    <div className='flex-col animate-fade-in'>
      {/* Header Section */}
        <MerchAdHeader icon={RiDashboard3Line} title="Dashboard"/>
        {/* Welcome Section */}
        <div className='bg-[#F3F3F3] h-[30vh] flex '>
           <div className='w-[60%] p-[1%] text-center'>
              <div className='align-center text-center p-[3%] h-[100%] rounded-3xl bg-gradient-to-b from-[#9a1a00] to-black'>
                <h1 className='text-[1.8em] text-white'>
                  Welcome, {userName}!
                </h1>
                <p className='text-[1.3em] text-white'><br/>Lorem ipsum dolor sit amet, <br/>consectetur adipiscing elit!</p>
              </div>
            </div>
            <div className='w-[40%] p-[1%] text-center'>
              <div className='p-[0.5%] h-[100%] rounded-3xl bg-black grid-cols-2 grid-rows-2 grid gap-1'>
                <div className='bg-[#660605] rounded-tl-2xl flex'>
                  <div className='w-[70%]'>
                    <p className="text-white mt-[-5%] text-[5em] font-bold display">{reservationCount}</p>
                    <p className='text-white text-[1.2em] mt-[-13%]'>RESERVATION</p>
                  </div>
                  <div className='w-[30%] pt-[10%] text-center'>
                      <IoCalendarSharp className='text-white text-[4em]'/>
                  </div>
                </div>
                <div className='bg-[#660605] rounded-tr-2xl flex'>
                <div className='w-[70%]'>
                    <p className='text-white mt-[-5%] text-[5em] font-bold display'>{todayCount}</p>
                    <p className='text-white text-[1.2em] mt-[-13%]'>TODAY'S TABLE</p>
                  </div>
                  <div className='w-[30%] pt-[10%] text-center'>
                      <MdGroups2 className='text-white text-[4em]'/>
                  </div>
                </div>
                <div className='bg-[#660605] rounded-bl-2xl flex'>
                <div className='w-[70%]'>
                    <p className='text-white mt-[-5%] text-[5em] font-bold display'>{cateredCount}</p>
                    <p className='text-white text-[1.2em] mt-[-13%]'>CATERED</p>
                  </div>
                  <div className='w-[30%] pt-[10%] text-center'>
                      <GiJuggler className='text-white text-[4em]'/>
                  </div>
                </div>
                <div className='bg-[#660605] rounded-br-2xl flex'>
                <div className='w-[70%]'>
                    <p className='text-white mt-[-5%] text-[5em] font-bold display'>{cancelledCount}</p>
                    <p className='text-white text-[1.2em] mt-[-13%]'>CANCELLED</p>
                  </div>
                  <div className='w-[30%] pt-[10%] text-center'>
                      <AiFillCloseCircle className='text-white text-[4em]'/>
                  </div>
                </div>
              </div>
            </div> 
        </div>
        {/* Graph Section */}
        <div className='bg-[#F3F3F3] h-[30vh] flex p-[1%]'>
           <div className='align-center text-center w-[100%] rounded-3xl bg-[#F0E5D8]'>
            <Chart
          width={'100%'}
          height={'100%'}
          chartType="LineChart"
          loader={<div>Loading Chart...</div>}
          data={LineData}
          options={LineChartOptions}
          rootProps={{ 'data-testid': '2' }}
          />
           </div>
        </div>
        {/* Reservation Section */}
        <div className='bg-[#F3F3F3] h-[30vh] flex overflow-auto'>
            <div className='w-[75%] m-[1%] text-center bg-white rounded-3xl flex-col pt-0 p-[1%] overflow-auto'>
              <div className='text-left border-b-2 border-black'>
              <p className='flex font-bold text-[1.5em]'> Recent Reservation <br/></p>
              </div>
              <table className='flex-col w-[100%] text-left bg-white rounded-3xl overflow-auto'>
              <tr>
                <th>Client Name</th>
                <th>Event</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
              <tbody id="data-table-row">
              </tbody>
              </table> 
            </div>
            <div className='w-[35%] m-[1%] text-center bg-white rounded-3xl px-[1%]'>
              <table className='flex-col w-[100%] text-center bg-white rounded-3xl'>
                <tr className='border-b-2 border-black text-[1.5em]'>
                  <th>Time In</th>
                  <th>Time Out</th>
                </tr>
                <tr>
                  <td className='h-[100%] border-black border-r-2'>Time In</td>
                  <td className='h-[100%]'>Time Out</td>
                </tr>
              </table>
            </div> 
        </div>
    </div>
  )
}

export default MerchDashboard