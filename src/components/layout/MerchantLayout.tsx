import React from 'react'
import UserHeader from '../headers/UserHeader'
import { Outlet } from 'react-router-dom'

const MerchantLayout = () => {
  return (
    <div>
        <UserHeader/>
        <div className='w-full h-[100vh]'>
          <Outlet/>
        </div>

    </div>
  )
}

export default MerchantLayout