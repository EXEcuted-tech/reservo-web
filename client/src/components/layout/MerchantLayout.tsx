import React from 'react'
import UserHeader from '../headers/UserHeader'
import MerchSide from '../sidebar/MerchantSide'
import { Outlet } from 'react-router-dom'

const MerchantLayout = () => {
  return (
    <div className='flex'>
        <div className='bg-[#840705] h-[100vh] w-[20vw] rounded-r-3xl'>
          <MerchSide/>
        </div>
        <div className='w-full h-[100vh]'>
          <Outlet/>
        </div>

    </div>
  )
}

export default MerchantLayout