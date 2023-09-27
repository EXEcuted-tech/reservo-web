import React from 'react'


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
                <h1 >BIG CALENDAR</h1>

    </div>
  )
}

export default reservationManager