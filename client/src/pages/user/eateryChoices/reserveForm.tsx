import React, { useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router'
import starleft from '../../../assets/starleft.png'
import starright from '../../../assets/starright.png'
import {SiFormstack, SiGoogleforms} from 'react-icons/si'

const ReserveForm = () => {
  const navigate = useNavigate();

  const [clickOne,setClickOne] = useState(false);
  const [clickTwo,setClickTwo] = useState(false);
  const [clickThree,setClickThree] = useState(false);
  const [clickFour,setClickFour] = useState(false);
  const [clickFive,setClickFive] = useState(false);
  const [clickSix,setClickSix] = useState(false);
  const [clickSeven,setClickSeven] = useState(false);
  const [clickEight,setClickEight] = useState(false);
  const [clickNine,setClickNine] = useState(false);

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
                {clickOne && <label className='animate-slide-up absolute mt-[-1%] text-[#838383]'>Date</label>}
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
                {clickTwo && <label className='animate-slide-up absolute mt-[-1%] text-[#838383]'>Time Start</label>}
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
                {clickThree && <label className='animate-slide-up absolute mt-[-1%] text-[#838383]'>Time End</label>}
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
                {clickFour && <label className='animate-slide-up absolute mt-[-1%] text-[#838383]'>Event Size</label>}
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
            <div className='w-[20%] pl-[0.5%] mr-[6%]'>
                {clickFive && <label className='animate-slide-up absolute mt-[-1%] text-[#838383]'>Package</label>}
                <select 
                    className='text-[#B7B7B7] text-[1.1em] w-[100%] border-b-2 border-[#B7B7B7]
                    mb-[3%] pl-[0.5%]'
                    placeholder='Package'
                    onFocus={(e) => {
                        e.target.style.outline = 'none';
                        setClickFive(true)
                    }}>
                    <option value="">Package A</option>
                    <option value="package1">Package B</option>
                </select>
                
                
            </div>
            <div className='w-[20%] pl-[0.5%] mr-[6%]'>
                {clickSix && <label className='animate-slide-up absolute mt-[-1%] text-[#838383]'>Customer Name</label>}
                <input 
                    className='text-[#B7B7B7] text-[1.1em] w-[100%] border-b-2 border-[#B7B7B7]
                    mb-[3%] pl-[0.5%]'
                    type="Text"
                    placeholder='Customer Name'
                    onFocus={(e) => {
                        e.target.style.outline = 'none';
                        e.target.placeholder = '';
                        setClickSix(true)
                }}
            />    
            </div>
            <div className='w-[20%] pl-[0.5%] mr-[6%]'>
                {clickSeven && <label className='animate-slide-up absolute mt-[-1%] text-[#838383]'>Email Address</label>}
                <input 
                    className='text-[#B7B7B7] text-[1.1em] w-[100%] border-b-2 border-[#B7B7B7]
                    mb-[3%] pl-[0.5%]'
                    type="email"
                    placeholder='Email Address'
                    onFocus={(e) => {
                        e.target.style.outline = 'none';
                        e.target.placeholder = '';
                        setClickSeven(true)
                }}
            />    
            </div>
            <div className='w-[20%] pl-[0.5%] mr-[3%]'>
                {clickEight && <label className='animate-slide-up absolute mt-[-1%] text-[#838383]'>Amount Payment</label>}
                <input 
                    className='text-[#B7B7B7] text-[1.1em] w-[100%] border-b-2 border-[#B7B7B7]
                    mb-[3%] pl-[0.5%]'
                    type="number"
                    placeholder='Amount Payment'
                    onFocus={(e) => {
                        e.target.style.outline = 'none';
                        e.target.placeholder = '';
                        setClickEight(true)
                }}
            />    
            </div>
         </div>

          {/* Third Row */}
          <div className='flex px-[4%] py-[2%]'>
            <div className='w-[100%] pl-[0.5%] mr-[3%]'>
                {clickNine && <label className='animate-slide-up absolute mt-[-1%] text-[#838383]'>Additional Requests</label>}
                <input 
                    className='text-[#B7B7B7] text-[1.1em] w-[100%] border-b-2 border-[#B7B7B7]
                    mb-[3%] pl-[0.5%]'
                    type="text"
                    placeholder='Additional Requests'
                    onFocus={(e) => {
                        e.target.style.outline = 'none';
                        e.target.placeholder = '';
                        setClickNine(true)
                }}
            />    
            </div>
         </div>

         
       </div>
       <div className='flex items-center bg-[#840705] pl-[4%] py-[1%]'>
            <SiFormstack className='text-white text-[2.5em]'/>
            <h1 className='ml-[0.5%] text-[2.5em] text-white font-semibold'>ADDITIONAL DETAILS</h1>
        </div>
        {/* Additional Form */}
        <div className='bg-white'>
            <div className='flex px-[4%] py-[2%]'>
                <div className='w-[20%] pl-[0.5%] mr-[3%]'>
                <label className='absolute mt-[-1%] text-[#838383]'>Number of Tables</label>
                    <input 
                        className='text-[#B7B7B7] text-[1.1em] w-[100%] border-b-2 border-[#B7B7B7]
                        mb-[3%] pl-[0.5%]'
                        type="text"
                        placeholder=''
                        onFocus={(e) => {
                            e.target.style.outline = 'none';
                    }}
                />    
                </div>
            </div>
        </div>

        <div className='bg-white text-center'>
            <button className='w-[14%] bg-[#840705] text-white rounded-3xl py-[0.5%] mb-[2%] text-[1.3em]
                hover:bg-[#DD2803]'>Book Now</button>
        </div>
    </div>
  )
}

export default ReserveForm