import React, { useState, useEffect } from 'react'
import MerchAdHeader from '../../../components/headers/MerchAdHeader'
import {RiDashboard3Line} from 'react-icons/ri'
import Chart from 'react-google-charts'
import config from '../../../common/config'
import axios from 'axios'

const AdminDashboard = () => {
  const [adgraphList, setadgraphList] = useState([{signup_year: 0, signup_month:1, count_merchant: 1, count_user: 0}])
  const [isLoading, setIsLoading] = useState(false);

  const userDetails = localStorage.getItem('admerchDetails');
  const userName = userDetails ? JSON.parse(userDetails).user: "UNDEFINED";

  const [merchCount,setMerchCount] = useState(0);
  const [userCount,setUserCount] = useState(0);
  const [activeCount,setActiveCount] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {getMerchCount();}, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {getUserCount();}, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {getActiveCount();}, 500);
    return () => clearTimeout(timer);
  }, []);

  const fetchGraphInfo = async() => {
    try {
      const responseAccounts = await axios.get(`${config.API}/user/retrieve_accounts`,{
        params: {
          year: "2023",
        }
      })
      setadgraphList(responseAccounts.data.acctCount)
    } catch (error) {
      //PUT ERROR NOTIF 
    }
  }

  const formattedAccountsData = adgraphList.map(item => [new Date(item.signup_year,item.signup_month),item.count_merchant,item.count_user])

  const LineData = [
    ['x', 'Merchants', 'Users'],
    ...formattedAccountsData
  ]
  const LineChartOptions = {
    chart: {
      title: 'Average Temperatures and Daylight in Iceland Throughout the Year'
    },
    hAxis: {
      title: 'Monthly',
      format: "MMM yyyy",
      gridlines: {
        color: 'transparent',
      },
    },
    vAxis: {
      title: 'New Accounts',
      gridlines: {
        color: 'transparent'
      }
    },
    backgroundColor: 'transparent',
    colors:['#660605','#EC0000'],
    titleTextStyle: {

    }
  }

  useEffect(() => {
    setIsLoading(true);
    fetchGraphInfo();
    setIsLoading(false);
  }, []);

  const getMerchCount = () =>{
      axios.get(`${config.API}/merchant/retrieve_count?col=merch_status&val=Active`)
      .then((res)=>{
         if(res.data.success === true){
          setMerchCount(res.data.merchCount);
         }
      })
  }

  const getUserCount = () =>{
    axios.get(`${config.API}/user/retrieve_count?col=account_type&val=1`)
    .then((res)=>{
       if(res.data.success === true){
        setUserCount(res.data.acctCount);
       }
    })
  }

  const getActiveCount = () =>{
    axios.get(`${config.API}/user/retrieve_count?col=account_status&val=active`)
    .then((res)=>{
       if(res.data.success === true){
        setActiveCount(res.data.acctCount);
       }
    })
  }

  return (
    <div className='flex-col animate-fade-in overflow-y-auto overflow-x-hidden'>
      {/* Header Section */}
        <MerchAdHeader icon={RiDashboard3Line} title="Dashboard"/>
        {/* Welcome Section */}
        <div className='bg-[#F3F3F3] h-[30vh] flex overflow-y-auto overflow-x-hidden xs:max-sm:mt-[3%] xs:max-sm:mb-[3%]'>
           <div className='w-[35%] p-[1%] items-center xs:max-sm:w-[40%] xs:max-sm:p-[0.5%]'>
           <div className='animate-slide-right align-center text-center p-[3%] h-[100%] rounded-3xl bg-gradient-to-r from-[#660605] via-[#ae1313] to-[#9a1a00] xs:max-sm:overflow-y-auto'>
                <h1 className='animate-up-down text-[2.5em] font-extrabold text-white xs:max-sm:text-[1.3em] xl:max-2xl:text-[1.5em]'>
                  Welcome, {userName}!
                </h1>
                <p className='font-extralight text-[1.3em] mt-[-3%] text-white xs:max-sm:text-[0.7em] xl:max-2xl:text-[1em]'>
                  <br/>System is currently running, <br/>time to go back to work!</p>
                <p className='hover:animate-shake hover:cursor-pointer mt-[5%] italic font-light text-[1em] text-white xs:max-sm:text-[0.7em] xs:max-sm:mt-[5%]'>
                  Check further updates now!</p>
              </div>
            </div>
            <div className='w-[65%] p-[1%] text-center'>
              <div className='p-[3%] h-[100%] rounded-3xl bg-gradient-to-t from-[#930a08] to-[#600403] grid-cols-2 grid-rows-2 gap-1 flex'>
                <div className='w-[33%] mt-[-1%] xs:max-sm:w-[50%] xs:max-sm:h-[35%] xs:max-sm:mt-[13%] xl:max-2xl:mt-[1%]'>
                <p className='text-white mt-[-5%] text-[8em] font-bold flex-col xs:max-sm:text-[3em]  xl:max-2xl:text-[4em]'>{merchCount}</p>
                    <p className='text-white text-[2em] flex-col mt-[-10%] xs:max-sm:text-[0.9em] xs:max-sm:ml-[2%] xl:max-2xl:text-[2em]'>Merchants</p>
                </div>
                <div className='w-[33%] mt-[-1%] xs:max-sm:w-[50%] xs:max-sm:h-[35%] xs:max-sm:mt-[13%] xl:max-2xl:mt-[1%]'>
                <p className='text-white mt-[-5%] text-[8em] font-bold flex-col xs:max-sm:text-[3em]  xl:max-2xl:text-[4em]'>{userCount}</p>
                    <p className='text-white text-[2em] flex-col mt-[-10%] xs:max-sm:text-[0.9em] xs:max-sm:ml-[20%] xl:max-2xl:text-[2em]'>Users</p>
                </div>
                <div className='w-[33%] mt-[-1%] xs:max-sm:w-[50%] xs:max-sm:h-[35%] xs:max-sm:mt-[55%] xs:max-sm:ml-[-80%]'>
                <p className='text-white mt-[-5%] text-[8em] font-bold flex-col xs:max-sm:text-[3em] xl:max-2xl:text-[4em]'>{activeCount}</p>
                    <p className='text-white text-[2em] flex-col mt-[-10%] xs:max-sm:text-[0.9em] xs:max-sm:ml-[2%] xl:max-2xl:text-[2em]'>Active</p>
                </div>
              </div>
            </div> 
        </div>
        {/* Graph Section */}
        <div className='bg-[#F3F3F3] h-[30vh] flex p-[1%]'>
           <div className='align-center text-center w-[100%] rounded-3xl bg-[#F0E5D8]'>
            {isLoading? <></>:
            <>
            <Chart
          width={'100%'}
          height={'100%'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={LineData}
          options={LineChartOptions}
          rootProps={{ 'data-testid': '2' }}
          />
          </>
            }
           </div>
        </div>
        {/* Reservation Section */}
        <div className='bg-[#F3F3F3] h-[30vh] flex overflow-auto xs:max-sm:h-[35vh]'>
            <div className='w-[75%] m-[1%] text-center bg-white rounded-3xl flex-col pt-0 p-[1%] overflow-auto'>
              <div className='text-left border-b-2 border-black'>
                <p className='font-bold text-[1.5em] xs:max-sm:text-[1.2em] xl:max-2xl:text-[1em]'>Recent Sign Ups<br/></p>
              </div>
              <table className='flex-col w-[100%] text-left bg-white rounded-3xl overflow-auto xs:max-sm:text-[0.7em] xl:max-2xl:text-[0.8em]'>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>User Type</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
              <tr className='border-t-2 '>
                {/* Input Data from Database here */}
              </tr>
              </table> 
            </div>
            <div className='w-[35%] m-[1%] text-center bg-white rounded-3xl px-[1%]'>
              <table className='flex-col w-[100%] text-center bg-white rounded-3xl'>
                <tr className='border-b-2 border-black text-[1.5em] xs:max-sm:text-[0.85em] xl:max-2xl:text-[1.2em]'>
                  <th>Time In</th>
                  <th>Time Out</th>
                </tr>
                <tr>
                  <td className='h-[100%] border-black border-r-2 xs:max-sm:text-[0.75em] xl:max-2xl:text-[0.8em]'>
                    Time In</td>
                  <td className='h-[100%] xs:max-sm:text-[0.75em]  xl:max-2xl:text-[0.8em]'>
                    Time Out</td>
                </tr>
              </table>
            </div> 
        </div>
    </div>
  )
}

export default AdminDashboard