import React from 'react'
import MerchAdHeader from '../../../components/headers/MerchAdHeader'
import Calendar from '../../../components/calendar/Calendar'
import {BiSolidBookAlt} from 'react-icons/bi'

const ReserveList = () => {
  return (
    <div>
      <MerchAdHeader icon={BiSolidBookAlt} title={'All Bookings'}/>
      <div className='h-[10vh] bg-green-300'>
        Yawa Period
      </div>
      <Calendar/>
    </div>
  )
}

export default ReserveList