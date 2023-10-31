import React, { useState, useEffect } from 'react'
import MerchAdHeader from '../../../components/headers/MerchAdHeader'
import {RiDashboard3Line} from 'react-icons/ri'
import Chart from 'react-google-charts'
import config from '../../../common/config'
import axios from 'axios'

const AdminDashboard = () => {
  const [adgraphList, setadgraphList] = useState([{}])
  const [isLoading, setIsLoading] = useState(false);

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

  // const formattedAccountsData = adgraphList.map(item => [new Date(item.signup_year,item.signup_month),item.count_merchant,item.count_user])

  // const LineData = [
  //   ['x', 'Merchants', 'Users'],
  //   ...formattedAccountsData
  // ]
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
  return (
    <div className='flex-col animate-fade-in overflow-y-auto overflow-x-hidden'>
      {/* Header Section */}
        <MerchAdHeader icon={RiDashboard3Line} title="Dashboard"/>
        {/* Welcome Section */}
        <div className='bg-[#F3F3F3] h-[30vh] flex overflow-y-auto overflow-x-hidden xs:max-sm:mt-[3%] xs:max-sm:mb-[3%]'>
           <div className='w-[35%] p-[1%] items-center xs:max-sm:w-[40%] xs:max-sm:p-[0.5%]'>
              <div className='align-center text-left p-[3%] h-[100%] rounded-3xl bg-gradient-to-b from-[#EC0000] to-black pl-10 pt-7 xs:max-sm:p-6'>
                <h1 className='text-[1.8em] text-white xs:max-sm:text-[1em] xl:max-2xl:text-[1.3em]'>
                  Welcome, Kathea Marie!
                </h1>
                <p className='text-[1.3em] text-white xs:max-sm:text-[0.9em] xl:max-2xl:text-[1em'>
                  <br/>Lorem ipsum dolor sit amet, <br/>consectetur adipiscing elit!</p>
              </div>
            </div>
            <div className='w-[65%] p-[1%] text-center'>
              <div className='p-[3%] h-[100%] rounded-3xl bg-gradient-to-t from-[#930a08] to-[#600403] grid-cols-2 grid-rows-2 gap-1 flex'>
                <div className='w-[33%] mt-[-1%] xs:max-sm:w-[50%] xs:max-sm:h-[35%] xs:max-sm:mt-[13%] xl:max-2xl:mt-[1%]'>
                <p className='text-white mt-[-5%] text-[8em] font-bold flex-col xs:max-sm:text-[3em]  xl:max-2xl:text-[4em]'>35</p>
                    <p className='text-white text-[2em] flex-col mt-[-10%] xs:max-sm:text-[0.9em] xs:max-sm:ml-[2%] xl:max-2xl:text-[2em]'>Merchants</p>
                </div>
                <div className='w-[33%] mt-[-1%] xs:max-sm:w-[50%] xs:max-sm:h-[35%] xs:max-sm:mt-[13%] xl:max-2xl:mt-[1%]'>
                <p className='text-white mt-[-5%] text-[8em] font-bold flex-col xs:max-sm:text-[3em]  xl:max-2xl:text-[4em]'>100</p>
                    <p className='text-white text-[2em] flex-col mt-[-10%] xs:max-sm:text-[0.9em] xs:max-sm:ml-[20%] xl:max-2xl:text-[2em]'>Users</p>
                </div>
                <div className='w-[33%] mt-[-1%] xs:max-sm:w-[50%] xs:max-sm:h-[35%] xs:max-sm:mt-[55%] xs:max-sm:ml-[-80%]'>
                <p className='text-white mt-[-5%] text-[8em] font-bold flex-col xs:max-sm:text-[3em] xl:max-2xl:text-[4em]'>120</p>
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
          // data={LineData}
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