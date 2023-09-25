import React from 'react'
import UserHeader from '../headers/UserHeader'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div>
        <UserHeader/>
        <div>
          <Outlet/>
        </div>

    </div>
  )
}

export default AdminLayout