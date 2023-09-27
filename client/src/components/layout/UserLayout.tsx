import React from 'react'
import UserHeader from '../headers/UserHeader'
import Footer from '../footer/Footer'
import {Outlet} from 'react-router-dom'

const UserLayout = () => {
  return (
    <div>
        <UserHeader/>
        <div className='w-full'>
          <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default UserLayout