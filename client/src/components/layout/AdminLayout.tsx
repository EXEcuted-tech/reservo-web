import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSide from '../sidebar/AdminSide'

const AdminLayout = () => {
  return (
    <div className='flex'>
        <div className='bg-[#840705] h-[100vh] w-[20vw] rounded-r-3xl'>
          <AdminSide/>
        </div>
        <div className='w-full h-[100vh]'>
          <Outlet/>
        </div>

    </div>
  )
}

export default AdminLayout