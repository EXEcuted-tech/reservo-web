import React from 'react'
import {RiDashboard3Line} from 'react-icons/ri'
import {IoCalendarSharp} from 'react-icons/io5'
import {GiJuggler} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
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

const MerchDashboard = () => {
  return (
    <div className='flex-col'>
      {/* Header Section */}
      <div className='flex bg-green-600 items-center h-[10vh] align-items text-center'>
            <div className='w-[40%] pl-[4%]'>
              <h1 className='flex items-center text-[2.5em] w-[100%] font-bold'><RiDashboard3Line className='text-[2em]'/>Dashboard</h1>
            </div>
            <div className='w-[60%] flex text-[1.5em]'>
                <div className='w-12 h-12 bg-orange-600 text-xl text-white rounded-[50%] ml-auto pt-[1%]'>
                  <p>KK</p>
                </div>
                <div className='flex items-center mr-[10%] ml-[1%]'>
                  <p>Manager</p>
                </div>
            </div> 
        </div>
        {/* Welcome Section */}
        <div className='bg-yellow-100 h-[30vh] flex'>
           <div className='w-[60%] p-[1%] text-center'>
              <div className='align-center text-center p-[3%] h-[100%] rounded-3xl bg-gradient-to-r from-[#912D2C] to-black'>
                <h1 className='text-[1.8em] text-white'>
                  Welcome, Kathea Marie!
                </h1>
                <p className='text-[1.3em] text-white'><br/>Lorem ipsum dolor sit amet, <br/>consectetur adipiscing elit!</p>
              </div>
            </div>
            <div className='w-[40%] p-[1%] text-center'>
              <div className='p-[0.5%] h-[100%] rounded-3xl bg-black grid-cols-2 grid-rows-2 grid gap-1'>
                <div className='bg-[#660605] rounded-tl-2xl flex'>
                  <div className='w-[70%]'>
                    <p className='text-white mt-[-5%] text-[5em] font-bold display'>32</p>
                    <p className='text-white text-[1.2em] mt-[-13%]'>RESERVATION</p>
                  </div>
                  <div className='w-[30%] pt-[10%] text-center'>
                      <IoCalendarSharp className='text-white text-[4em]'/>
                  </div>
                </div>
                <div className='bg-[#660605] rounded-tr-2xl flex'>
                <div className='w-[70%]'>
                    <p className='text-white mt-[-5%] text-[5em] font-bold display'>4</p>
                    <p className='text-white text-[1.2em] mt-[-13%]'>TODAY'S TABLE</p>
                  </div>
                  <div className='w-[30%] pt-[10%] text-center'>
                      <IoCalendarSharp className='text-white text-[4em]'/>
                  </div>
                </div>
                <div className='bg-[#660605] rounded-bl-2xl flex'>
                <div className='w-[70%]'>
                    <p className='text-white mt-[-5%] text-[5em] font-bold display'>25</p>
                    <p className='text-white text-[1.2em] mt-[-13%]'>CATERED</p>
                  </div>
                  <div className='w-[30%] pt-[10%] text-center'>
                      <GiJuggler className='text-white text-[4em]'/>
                  </div>
                </div>
                <div className='bg-[#660605] rounded-br-2xl flex'>
                <div className='w-[70%]'>
                    <p className='text-white mt-[-5%] text-[5em] font-bold display'>3</p>
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
        <div className='bg-red-200 h-[30vh] flex p-[1%]'>
           <div className='align-center text-center p-[1%] w-[100%] rounded-3xl bg-slate-500'>
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
        <div className='bg-blue-200 h-[30vh] flex'>
           
        </div>
    </div>
  )
}

export default MerchDashboard