import React, { useEffect, useState } from 'react'
import MerchAdHeader from '../../../components/headers/MerchAdHeader'
import Calendar from '../../../components/calendar/Calendar'
import {BiSolidBookAlt} from 'react-icons/bi'
import {FaList} from 'react-icons/fa'
import {BsCalendar4Week,BsFillClipboardCheckFill} from 'react-icons/bs'
import AllBookings from './modules/allBookings'
import ReserveCalendar from './reserveCalendar'
import CompleteList from './modules/complete'
import UpcomingList from './modules/upcoming'
import {MdUpcoming} from 'react-icons/md'
import ViewModal from '../../../components/modals/reserveModal/viewModal'
import EditModal from '../../../components/modals/reserveModal/editModal'

const ReserveList = () => {

  const [urlPart, setUrlPart] = useState('');
  const [normalView,setNormalView] = useState(true);
  const [calendarView,setCalendarView] = useState(false);

  const [openModalView,setOpenModalView] = useState(false);
  const [openModalEdit,setOpenModalEdit] = useState(false);

  const reservations = [{id:3322114425522 ,date: new Date("October 25 , 2023"), 
  eventSize: 100, 
  time : "10:00:00 AM- 5:00 PM",
  email : "abc@def.com",
  organizer : "juan Dela zz",     
  contactN : "09919191912",     
  clientN : "juan D Cruz",     
  status : "Ongoing",
  remarks : ""}]

  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    if (pathParts.length >= 3) {
      setUrlPart(pathParts[2]);
    }
  }, [window.location.pathname]);

  return (
    <div className="animate-fade-in ">
      {(openModalView || openModalEdit) &&
        <>
         <div className='fixed top-0 left-0 w-full h-full bg-[rgb(0,0,0,0.5)] opacity-0.5 z-100'></div>
          {openModalView && <ViewModal setOpenModalView={setOpenModalView}/>}
          {openModalEdit && <EditModal setOpenModalEdit={setOpenModalEdit}/>}
        </>
      }
      <MerchAdHeader 
      icon={urlPart=='all' ? BiSolidBookAlt : urlPart=='upcoming' ? MdUpcoming : BsFillClipboardCheckFill} 
      title={urlPart=='all' ? 'All Bookings' : urlPart=='upcoming' ? 'Upcoming' : 'Finished'}
      />
    
      <div className='flex items-center bg-[#F0E5D8]'>
        <div className='w-[80%] py-[1%] pl-[2%]'>
            <label className={`font-bold mx-2 w-[4vw] text-[1.1em]`}>Period: </label>
            <select id="sortDropdown" name="sortDropdown" className={`bg-transparent rounded-md h-10 w-[21vw]  hover:bg-white transition duration-150 ease-out hover:ease-in`}>
              <option value="option1">1 Week (September 23, 2023 - September 30, 2023) </option>                
              <option value="option2">1 Month (September 1, 2023 - September 30, 2023) </option>
            </select>
        </div>
        <div className='w-[20%] flex items-center'>
          <p className='font-bold text-[1.1em]'>View Mode: </p>
          <FaList className={`ml-[5%] text-[2em] hover:bg-[#E6C8A5]
             ${normalView && 'bg-[#E6C8A5] px-[0.5%] py-[1%] rounded-lg'}`}
             onClick={()=>{
              setCalendarView(false)
              setNormalView(true)
            }}/>
          <BsCalendar4Week className={`ml-[5%] text-[2.1em] hover:bg-[#E6C8A5]
            ${calendarView && 'bg-[#E6C8A5] px-[0.5%] py-[1%] rounded-lg'}`}
            onClick={()=>{
              setNormalView(false)
              setCalendarView(true)
            }}/>
        </div>
      </div>

      {/* Content */}
      <div>
        {normalView 
        ?
          <div>
            {urlPart=='all' && <AllBookings 
                                setOpenModalView={setOpenModalView}
                                setOpenModalEdit={setOpenModalEdit}
                                openModalView={openModalView}
                                openModalEdit={openModalEdit}
                                />}
            {urlPart=='upcoming' && <UpcomingList
                                setOpenModalView={setOpenModalView}
                                setOpenModalEdit={setOpenModalEdit}
                                openModalView={openModalView}
                                openModalEdit={openModalEdit}
                                />}
            {urlPart=='finished' && <CompleteList
                                setOpenModalView={setOpenModalView}
                                setOpenModalEdit={setOpenModalEdit}
                                openModalView={openModalView}
                                openModalEdit={openModalEdit}
                                />}
          </div>
        : 
          <div>
            <ReserveCalendar />
          </div>
        }
      </div>
    </div>
  )
}

export default ReserveList