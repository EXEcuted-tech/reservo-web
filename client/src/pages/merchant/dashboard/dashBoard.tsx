import React from 'react'
import MerchAdHeader from '../../../components/headers/MerchAdHeader'
import { RiDashboard3Line } from 'react-icons/ri';

const MerchDashboard = () => {
  return (
    <div className='w-[100%]'>
      <MerchAdHeader icon={RiDashboard3Line} title="Dashboard"/>
    </div>
  )
}

export default MerchDashboard