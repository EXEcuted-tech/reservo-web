import React from 'react'
import { Fragment, useRef, useState } from "react";
import MerchAdHeader from '../../../components/headers/MerchAdHeader'
import { RiReservedFill } from 'react-icons/ri'
import MerchantLayout from '../../../components/layout/MerchantLayout';

const NAV_BAR = [
  { title: "Reservation Form", url: "reservationmanager" },
  { title: "Merchant Calendar", url: "merchantcalendar" },
];

const reservationManager = () => {
  return (
    <div className="animate-fade-in">
      <MerchAdHeader icon={RiReservedFill} title="Reservation Manager"/>
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
      <MerchantLayout/>
    </div>

  )
}

export default reservationManager