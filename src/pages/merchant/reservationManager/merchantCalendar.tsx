import React from 'react'


const reservationManager = () => {
  return (
    <div>
        <nav className="flex sm:justify-center space-x-4">
            {[
              ['Reservation Form', 'reservationManager'],
              ['Merchant Calendar', 'merchantCalendar'],
            ].map(([title, url]) => (
              <a href={url} className="text-slate-700 font-medium hover:underline cursor: pointer;">{title}</a>
            ))}
        </nav>
                <h1 >BIG CALENDAR</h1>

    </div>
  )
}

export default reservationManager