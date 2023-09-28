import React from 'react'
import { Fragment, useRef, useState } from "react";

const NAV_BAR = [
  { title: "Reservation Form", url: "reservationManager" },
  { title: "Merchant Calendar", url: "merchantCalendar" },
];

const reservationManager = () => {
  return (
    <div className="h-screen font-poppins bg-[#F3F3F3] p-8">
    <nav className="flex gap-8 border-b-2 border-black">
      {NAV_BAR.map(({ title, url }, index) => (
        <Fragment key={index}>
          <a href={url} className={`font-xl text-[1.5em] font-semibold p-2 cursor:pointer ${index === 1 && `border-b-4 border-red-900`}`}>
            {title}
          </a>
        </Fragment>
      ))}
    </nav>
    </div>
  )
}

export default reservationManager