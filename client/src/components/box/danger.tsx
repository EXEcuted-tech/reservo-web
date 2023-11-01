import React from 'react'
import {CgDanger} from 'react-icons/cg'

const Danger = ({message}:{message:string}) => {
  return (
    <div>
        <div className='animate-shake absolute w-[50%] z-10 top-[7%] left-[25%] xl:max-2xl:w-[57%] xl:max-2xl:left-[21.5%]'>
            <div className="flex items-center w-full p-5 rounded-lg border border-red-400 bg-red-300 text-red-900 xl:max-2xl:p-2 xl:max-2xl:text-[0.9em]">
                <CgDanger className='mr-[1%]'/>
                {message}
            </div>
        </div>
    </div>
  )
}

export default Danger