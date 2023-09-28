import React, { useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router'
import starleft from '../../../assets/starleft.png'
import starright from '../../../assets/starright.png'
import {SiReacthookform, SiGoogleforms} from 'react-icons/si'

const ReserveForm = () => {
  const navigate = useNavigate();

  const [clickOne,setClickOne] = useState(false);
  const [clickTwo,setClickTwo] = useState(false);
  const [clickThree,setClickThree] = useState(false);
  const [clickFour,setClickFour] = useState(false);
  
  return (
    <div className='animate-slide-right font-poppins bg-[#F9F2EA] h-[100%]'>
       <div className='text-[#DD2803] ml-[2%]'>
         <h1 className='text-[2.5em] py-[1%] font-bold flex items-center'>
            <AiOutlineArrowLeft className='text-black mr-[1%] hover:text-[#DD2803]'
            onClick={()=>{navigate('/eaterychoice')}}/>
            Reservation Form
        </h1>
       </div>
       <div className='bg-white py-[1.5%]'>
        <div className='flex justify-center items-center'>
                <img src={starleft}/>
                <h1 className='text-[2em] font-bold mx-[1%]'>Derf's Grill and Restaurant</h1>
                <img src={starright}/>
        </div>
        <p className='italic text-center text-[1.1em]'>Fill the form to book for Derf’s Grill and Restaurant.</p>
       </div>
       <div className='flex items-center bg-[#840705] pl-[4%] py-[1%]'>
        <SiGoogleforms className='text-white text-[2.5em]'/>
        <h1 className='ml-[0.5%] text-[2.5em] text-white font-semibold'>GENERAL SECTION</h1>
       </div>
       {/* General Form */}
       <div className='bg-white'>

         {/* First Row */}
         <div className='flex px-[4%] py-[2%]'>
            <div className='w-[20%] pl-[0.5%] mr-[6%]'>
                {clickOne && <label className='absolute mt-[-1%] text-[#838383]'>Date</label>}
                <input 
                className='text-[#B7B7B7] text-[1.1em] w-[100%] border-b-2 border-[#B7B7B7]
                mb-[3%] '
                type="text"
                placeholder='Date'
                onFocus={(e) => {
                    e.target.type = 'date';
                    e.target.style.outline = 'none';
                    setClickOne(true)
                }}
                />
            </div>

            <div className='w-[20%] pl-[0.5%] mr-[6%]'>
                {clickTwo && <label className='absolute mt-[-1%] text-[#838383]'>Time Start</label>}
                <input 
                    className='text-[#B7B7B7] text-[1.1em] w-[100%] border-b-2 border-[#B7B7B7]
                    mb-[3%] pl-[0.5%] mr-[6%]'
                    type="text"
                    placeholder='Time Start'
                    onFocus={(e) => {
                        e.target.type = 'time';
                        e.target.style.outline = 'none';
                        setClickTwo(true)
                    }}
                />
            </div>

            <div className='w-[20%] pl-[0.5%] mr-[6%]'>
                {clickThree && <label className='absolute mt-[-1%] text-[#838383]'>Time End</label>}
                <input 
                    className='text-[#B7B7B7] text-[1.1em] w-[100%] border-b-2 border-[#B7B7B7]
                    mb-[3%] pl-[0.5%] mr-[6%]'
                    type="text"
                    placeholder='Time End'
                    onFocus={(e) => {
                        e.target.type = 'time';
                        e.target.style.outline = 'none';
                        setClickThree(true)
                    }}
                />    
            </div>

            <div className='w-[20%] pl-[0.5%] mr-[3%]'>
                {clickFour && <label className='absolute mt-[-1%] text-[#838383]'>Event Size</label>}
                <input 
                    className='text-[#B7B7B7] text-[1.1em] w-[100%] border-b-2 border-[#B7B7B7]
                    mb-[3%] pl-[0.5%]'
                    type="number"
                    placeholder='Event Size'
                    onFocus={(e) => {
                        e.target.style.outline = 'none';
                        e.target.placeholder = '';
                        setClickFour(true)
                }}
            />    
            </div>
         </div>

          {/* Second Row */}
          <div className='flex px-[4%] py-[2%]'>
            <div className='w-[20%] pl-[0.5%] mr-[3%]'>
                {clickFour && <label className='absolute mt-[-1%] text-[#838383]'>Event Size</label>}
                <input 
                    className='text-[#B7B7B7] text-[1.1em] w-[100%] border-b-2 border-[#B7B7B7]
                    mb-[3%] pl-[0.5%]'
                    type="number"
                    placeholder='Event Size'
                    onFocus={(e) => {
                        e.target.style.outline = 'none';
                        e.target.placeholder = '';
                        setClickFour(true)
                }}
            />    
            </div>
         </div>

         
       </div>
       <div className='flex items-center bg-[#840705] pl-[4%] py-[1%]'>
        <SiReacthookform className='text-white text-[2.5em]'/>
        <h1 className='ml-[0.5%] text-[2.5em] text-white font-semibold'>ADDITIONAL DETAILS</h1>
       </div>
    </div>
  )
}

export default ReserveForm