import React from 'react'
import MerchAdHeader from '../../../components/headers/MerchAdHeader'
import {RiDashboard3Line} from 'react-icons/ri'
import {IoCalendarSharp} from 'react-icons/io5'
import {GiJuggler} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {MdGroups2} from 'react-icons/md'
import Chart from 'react-google-charts'

const LineData = [
  ['x', 'Bookings'],
  [0, 0,],
  [1, 10],
  [2, 23],
  [3, 17],
  [4, 18],
  [5, 9],
  [6, 11],
  [7, 27],
]
const LineChartOptions = {
  chart: {
    title: 'Average Temperatures and Daylight in Iceland Throughout the Year'
  },
  hAxis: {
    title: 'Time',
    gridlines: {
      color: 'transparent'
    }
  },
  vAxis: {
    title: 'Popularity',
    gridlines: {
      color: 'transparent'
    }
  },
  backgroundColor: 'transparent',
  colors:['#660605'],
  titleTextStyle: {

  }
}

const AdminDashboard = () => {
  return (
    <div className='flex-col'>
      {/* Header Section */}
        <MerchAdHeader icon={RiDashboard3Line} title="Dashboard"/>
        {/* Welcome Section */}
        <div className='bg-[#F3F3F3] h-[30vh] flex'>
           <div className='w-[35%] p-[1%] items-center'>
              <div className='align-center text-left p-[3%] h-[100%] rounded-3xl bg-gradient-to-b from-[#EC0000] to-black'>
                <h1 className='text-[1.8em] text-white'>
                  Welcome, Kathea Marie!
                </h1>
                <p className='text-[1.3em] text-white'><br/>Lorem ipsum dolor sit amet, <br/>consectetur adipiscing elit!</p>
              </div>
            </div>
            <div className='w-[65%] p-[1%] text-center'>
              <div className='p-[0.5%] h-[100%] rounded-3xl bg-[#660605] grid-cols-2 grid-rows-2 grid gap-1'>
                
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
          data={LineData}
          options={LineChartOptions}
          rootProps={{ 'data-testid': '2' }}
          />
           </div>
        </div>
        {/* Reservation Section */}
        <div className='bg-[#F3F3F3] h-[30vh] flex'>
            <div className='w-[75%] m-[1%] text-center bg-white rounded-3xl flex-col pt-0 p-[1%]'>
              <div className='text-left border-b-2 border-black'>
                <p className='font-bold text-[1.5em]'>Recent Reservation <br/></p>
              </div>
              <table className='flex-col w-[100%] text-left bg-white rounded-3xl'>
              <tr>
                <th>Client Name</th>
                <th>Event</th>
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