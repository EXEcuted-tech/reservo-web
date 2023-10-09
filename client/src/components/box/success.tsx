import React from 'react'
import {AiFillCheckCircle} from 'react-icons/ai'

const Success = ({message}:{message:string}) => {
  return (
    <div>
        <div className='animate-shake absolute w-[50%] z-10 top-[7%] left-[25%]'>
            <div className="flex items-center w-full p-5 rounded-lg border border-green-400 bg-green-300 text-green-900">
                <AiFillCheckCircle className='mr-[1%]'/>
                {message}
            </div>
        </div>
    </div>
  )
}

export default Success