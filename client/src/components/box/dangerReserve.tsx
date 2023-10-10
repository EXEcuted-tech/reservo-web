import React from 'react'
import {CgDanger} from 'react-icons/cg'

const DangerReserve = ({message}:{message:string}) => {
  return (
    <div className='flex justify-center'>
        <div className='animate-shake w-[50%] mt-[1%] z-10'>
            <div className="flex justify-center items-center w-full p-5 rounded-lg border border-red-400 bg-red-300 text-red-900">
                <CgDanger className='mr-[1%]'/>
                {message}
            </div>
        </div>
    </div>
  )
}

export default DangerReserve