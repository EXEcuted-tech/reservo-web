import React from 'react'
import {BsCalendarDate} from 'react-icons/bs'
import {FiClock} from 'react-icons/fi'
import {BiEdit} from 'react-icons/bi'

const reservationManager = () => {
  return (
    <div className='h-screen font-poppins bg-[#F3F3F3] '>

        <nav className="flex sm:justify-left space-x-4 mt-5 ml-5 gap-x-8">
            {[
              ['Reservation Form', 'reservationManager'],
              ['Merchant Calendar', 'merchantCalendar'],
            ].map(([title, url]) => (
              <a href={url} className="font-xl text-[1.5em] font-semibold hover:underline cursor: pointer ">{title}</a>
            ))} 
        </nav>

        <div className='flex items-center flex-col  h-full '>
            <div className='rounded-lg bg-[#FFFFFF] mt-40 h-2/5 w-3/5 p-2'>
                <table className='w-full'>
                    <tbody> 
                      <tr>
                        <td>
                          <h1 className='text-[1.5em] font-bold m-2 mr-2'>Current Reservation Form</h1>
                        </td>
                        <td className='items-end p-0 m-0'>
                          <BiEdit size= {40} className='text-black p-0 cursor: pointer'/>
                        </td>
                      </tr>
                    </tbody>
                </table>
                <div className='flex items-center mx-3.5'>
                  <div className='bg-[#F0E5D8] h-72 w-full pt-5 rounded-lg font-bold '>

                      <div className="  ml-10 grid grid-cols-2 gap-4  text-xl content-center ...">
                        <div>
                          <table>
                              <tbody> 
                                <tr>
                                  <td><BsCalendarDate className='text-black'/></td>
                                  <td><h3>Date:</h3></td>
                                </tr>
                              </tbody>
                          </table>
                        </div>
                        <div><h3>Client Name:</h3></div>
                        <div>
                          <table>
                              <tbody>
                                <tr>
                                  <td><FiClock className='text-black'/></td>
                                  <td><h3>Time:</h3></td>
                                </tr>
                              </tbody>
                          </table>
                        </div>
                        <div><h3>Event Size:</h3></div>
                        <div><h3>Email:</h3></div>
                        <div><h3>Contact Number</h3></div>
                      </div>
                      <div className='m-10 text-xl h-[500]'><h3>Remarks:</h3></div>
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default reservationManager