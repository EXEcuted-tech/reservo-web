import React, { useState, useEffect } from 'react'
import MerchAdHeader from '../../../components/headers/MerchAdHeader'
import {RiDashboard3Line} from 'react-icons/ri'
import Chart from 'react-google-charts'
import config from '../../../common/config'
import axios from 'axios'

const AdminDashboard = () => {
  const [adgraphList, setadgraphList] = useState([{}])

  const fetchGraphInfo = async() => {
    try {
      const responseAccounts = await axios.get(`${config.API}/user/retrieve_accounts`,{
        params: {
          year: "2023",
        }
      })
      setadgraphList(responseAccounts.data.acctCount)
    } catch (error) {
      console.log(error);
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
    fetchGraphInfo();
  }, []);
  return (
    <div className='flex-col'>
      {/* Header Section */}
        <MerchAdHeader icon={RiDashboard3Line} title="Dashboard"/>
        {/* Welcome Section */}
        <div className='bg-[#F3F3F3] h-[30vh] flex'>
           <div className='w-[35%] p-[1%] items-center'>
              <div className='align-center text-left p-[3%] h-[100%] rounded-3xl bg-gradient-to-b from-[#EC0000] to-black pl-10 pt-7'>
                <h1 className='text-[1.8em] text-white xl:max-2xl:'>
                  Welcome, Kathea Marie!
                </h1>
                <p className='text-[1.3em] text-white'><br/>Lorem ipsum dolor sit amet, <br/>consectetur adipiscing elit!</p>
              </div>
            </div>
            <div className='w-[65%] p-[1%] text-center'>
              <div className='p-[3%] h-[100%] rounded-3xl bg-gradient-to-t from-[#660605] to-[#7e0806] grid-cols-2 grid-rows-2 gap-1 flex'>
                <div className='w-[33%]'>
                <p className='text-white mt-[-5%] text-[8em] font-bold flex-col'>35</p>
                    <p className='text-white text-[2em] flex-col mt-[-10%]'>Merchants</p>
                </div>
                <div className='w-[33%]'>
                <p className='text-white mt-[-5%] text-[8em] font-bold flex-col'>100</p>
                    <p className='text-white text-[2em] flex-col mt-[-10%]'>Users</p>
                </div>
                <div className='w-[33%]'>
                <p className='text-white mt-[-5%] text-[8em] font-bold flex-col'>120</p>
                    <p className='text-white text-[2em] flex-col mt-[-10%]'>Active</p>
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
          loader={<div>Loading Chart</div>}
          // data={LineData}
          options={LineChartOptions}
          rootProps={{ 'data-testid': '2' }}
          />
           </div>
        </div>
        {/* Reservation Section */}
        <div className='bg-[#F3F3F3] h-[30vh] flex'>
            <div className='w-[75%] m-[1%] text-center bg-white rounded-3xl flex-col pt-0 p-[1%]'>
              <div className='text-left border-b-2 border-black'>
                <p className='font-bold text-[1.5em]'>Recent Sign Ups<br/></p>
              </div>
              <table className='flex-col w-[100%] text-left bg-white rounded-3xl'>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>User Type</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
              <tr className='border-t-2 border-black'>
                {/* Input Data from Database here */}
              </tr>
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

export default AdminDashboard