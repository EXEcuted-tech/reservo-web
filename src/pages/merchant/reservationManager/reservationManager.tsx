import React from 'react'
import {GrNotes} from 'react-icons/gr'

const reservationManager = () => {
  return (
    <div className='font-poppins bg-[#F3F3F3]'>

        <nav className="flex sm:justify-left space-x-4 mt-5 ml-5 gap-x-8">
            {[
              ['Reservation Form', 'reservationManager'],
              ['Merchant Calendar', 'merchantCalendar'],
            ].map(([title, url]) => (
              <a href={url} className="font-xl font-semibold hover:underline decoration-red cursor: pointer ">{title}</a>
            ))}
        </nav>
        <div className='bg-[#FFFFF]'>
            <h1 className='font-medium mt-5 ml-5'>Current Reservation Form</h1>
            <div>
                <div className=" bg-[#F0E5D8] ml-10 h-40 grid grid-cols-2 gap-4 content-center ...">
                  <div><h3>Date:</h3></div>
                  <div><h3>Time:</h3></div>
                  <div><h3>Client Name:</h3></div>
                  <div><h3>Event Size:</h3></div>
                  <div><h3>Email:</h3></div>
                  <div><h3>Contact Number</h3></div>
                </div>
                <div className="ml-10">
                  <h3>Remarks:</h3>
                </div>
            </div>
        </div>
    </div>
  )
}

export default reservationManager