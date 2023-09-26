import React,{useState} from 'react'
import colors from '../../common/colors'
import logo from '../../assets/temp-logo-2w.png'
import {RiDashboard3Line,RiMegaphoneFill} from 'react-icons/ri'
import {IoCalendar, IoBusiness} from 'react-icons/io5'
import {LuPackage2} from 'react-icons/lu'
import {FiLogOut} from 'react-icons/fi'

const MerchantSide = () => {
  const [showMore,setShowMore] = useState(false)
  const [selectAllBook,setSelectAllBook] = useState(false)
  const [selectUpcoming,setSelectUpcoming] = useState(false)
  const [selectFinished,setSelectFinished] = useState(false)
  const [selectDash,setSelectDash] = useState(false)
  const [selectFeed,setSelectFeed] = useState(false)
  const [selectPack,setSelectPack] = useState(false)
  const [selectSettings,setSelectSettings] = useState(false)

  return (
    <div className='font-poppins'>
        <div className='text-center'>
            <img src={logo} alt='Reservo Logo' className='mx-[18%] my-[5%] w-[60%]'/>
        </div>
        <hr className='mx-[6%]'/>   
        <div className='text-white mx-[8%] my-[8%]'>
            <ul>
                <li className='flex items-center text-[1.4em] mb-[11%] hover:bg-[#660605] hover:px-[3%] hover:py-[4%] hover:ml-[-3%] hover:rounded-xl 
                    hover:cursor-pointer hover:animate-small-fade-in-down hover:mb-[3%]'
                    onClick={()=>{setShowMore(false)}}>
                    <RiDashboard3Line className='mr-[4%] text-[1.5em] '/> Dashboard</li>
                <li className={`flex items-center text-[1.4em] hover:cursor-pointer  ${showMore==false 
                ? 'mb-[11%] hover:mb-[3%] hover:bg-[#660605] hover:px-[3%] hover:py-[4%] hover:ml-[-3%] hover:rounded-xl hover:animate-small-fade-in-down ' 
                : 'bg-[#660605] rounded-xl px-[3%] py-[4%] hover:mb-[0] ml-[-3%]'}`}
                    onClick={()=>{setShowMore(!showMore)}}>
                    <IoCalendar className='mr-[4%] text-[1.5em]'/> Reservations List</li>
                { showMore &&
                   <ul className='text-white ml-[15%] mr-[5%] text-[1.2em] bg-[#912D2C] pl-[10%] py-[5%] rounded-b-2xl'>
                    <li className='my-[5%] hover:cursor-pointer hover:bg-[#660605] hover:ml-[-15%] hover:pl-[15%] hover:py-[1%]'>All Bookings</li>
                    <li className='mb-[5%] hover:cursor-pointer hover:bg-[#660605] hover:ml-[-15%] hover:pl-[15%] hover:py-[1%]'>Upcoming</li>
                    <li className='mb-[5%] hover:cursor-pointer hover:bg-[#660605] hover:ml-[-15%] hover:pl-[15%] hover:py-[1%]'>Finished</li>
                   </ul>
                }
                <li className='flex items-center text-[1.4em] mb-[11%] hover:bg-[#660605] hover:px-[3%] hover:py-[4%] hover:ml-[-3%] hover:rounded-xl 
                    hover:cursor-pointer hover:animate-small-fade-in-down hover:mb-[3%]'
                    onClick={()=>{setShowMore(false)}}>
                    <RiMegaphoneFill className='mr-[4%] text-[1.5em]'/> Feedback List</li>
                <li className='flex items-center text-[1.4em] mb-[11%] hover:bg-[#660605] hover:px-[3%] hover:py-[4%] hover:ml-[-3%] hover:rounded-xl 
                    hover:cursor-pointer hover:animate-small-fade-in-down hover:mb-[3%]'
                    onClick={()=>{setShowMore(false)}}>
                    <LuPackage2 className='mr-[4%] text-[1.5em]'/> Package Manager</li>
                <li className='flex items-center text-[1.4em] mb-[11%] hover:bg-[#660605] hover:px-[3%] hover:py-[4%] hover:ml-[-3%] hover:rounded-xl 
                    hover:cursor-pointer hover:animate-small-fade-in-down hover:mb-[3%]'
                    onClick={()=>{setShowMore(false)}}>
                    <IoBusiness className='mr-[4%] text-[1.5em]'/> Merchant Settings</li>
            </ul>
        </div>
        <div className='fixed bottom-[5%] ml-[1.8%] w-full'>
            <p className='flex items-center text-[1.3em] text-white hover:text-[#D9D9D9] hover:cursor-pointer'><FiLogOut className='mr-[1%] text-[1.5em]'/> Log Out</p>
        </div>
    </div>
  )
}

export default MerchantSide