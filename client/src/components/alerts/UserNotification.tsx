import React, { ReactNode, useEffect, useState } from 'react'

const UserNotification: React.FC<{
    icon?: ReactNode;
    logocolor?: string;
    title?: string;
    message?: string;
  }> = ({ icon, logocolor,title, message }) => {    
    return (
      <div className='animate-shake z-[100] fixed top-0 right-0 m-3 w-2/3 md:w-1/3'>
        <div className="bg-white border-gray-300 border p-3 flex items-start shadow-lg rounded-md space-x-2">
          <div className="flex-1 space-y-1">
            <div className="flex items-center">
              {icon && <div className='mr-[1%]' style={{color: logocolor && logocolor}}>{icon}</div>}
              {title && <p className="text-base leading-6 font-medium text-gray-700">{title}</p>}
            </div>
            {message && <p className="text-sm leading-5 text-gray-600">{message}</p>}
          </div>
        </div>
      </div>
    );
  }

export default UserNotification