import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/temp-logo-2w.png';
import { RiDashboard3Line, RiMegaphoneFill, RiReservedFill } from 'react-icons/ri';
import { IoCalendar, IoBusiness } from 'react-icons/io5';
import { LuPackage2 } from 'react-icons/lu';
import { FiLogOut } from 'react-icons/fi';

interface MerchantSideProps {
  showSidebar: boolean;
}

const MerchantSide: React.FC<MerchantSideProps> = ({ showSidebar }) => {
  const [showMore, setShowMore] = useState(false);
  const [urlPart, setUrlPart] = useState('');
  const [urlSecPart, setUrlSecPart] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    if (pathParts.length >= 2) {
      setUrlPart(pathParts[1]);
    }

    if (pathParts.length >= 3) {
      setUrlSecPart(pathParts[2]);
    }
  }, [window.location.pathname]);

  const handleMenuItemClick = (path: string, status: boolean) => {
    navigate(path);
    setShowMore(status);
  };

  return (
    <div className={`font-poppins ${showSidebar ? '' : 'hidden'}`}>
      <div className="text-center xs:max-sm:mt-[20%]">
        <img src={logo} alt="Reservo Logo" className="mx-[18%] my-[5%] w-[60%] xs:max-sm:hidden" />
      </div>
      <hr className="mx-[6%]" />
      <div className='text-white mx-[8%] my-[8%]'>
            <ul>
                <li className={`flex items-center text-[1.4em] mb-[11%] hover:bg-[#660605] hover:px-[3%] hover:py-[4%] hover:ml-[-3%] hover:rounded-xl 
                    hover:cursor-pointer hover:animate-small-fade-in-down hover:mb-[3%] xs:max-sm:text-[1.1em] xl:max-2xl:text-[0.95em]
                    ${urlPart === 'merchdash' ? 'bg-[#660605] px-[3%] py-[4%] ml-[-3%] rounded-xl mb-[3%]' : ''}`}
                    onClick={()=>{ handleMenuItemClick('/merchdash',false)}}>
                    <RiDashboard3Line className='mr-[4%] text-[1.5em] '/> Dashboard</li>
                    
                <li className={`flex items-center text-[1.4em] hover:cursor-pointer xs:max-sm:text-[1.1em] xl:max-2xl:text-[0.95em]
                    ${urlPart !== 'reservationlist' && showMore===false ? 'mb-[11%] hover:mb-[3%] hover:bg-[#660605] hover:px-[3%] hover:py-[4%] hover:ml-[-3%] hover:rounded-xl hover:animate-small-fade-in-down ' 
                : 'bg-[#660605] rounded-xl px-[3%] py-[4%] hover:mb-[0] ml-[-3%]'}`}
                    onClick={()=>{handleMenuItemClick('/reservationlist/all',false)}}>
                    <IoCalendar className='mr-[4%] text-[1.5em]'/> Reservations List</li>
                { showMore || urlPart==='reservationlist'  &&
                   <ul className='text-white ml-[15%] mr-[5%] mb-[10%] text-[1.2em] bg-[#912D2C] pl-[10%] py-[5%] rounded-b-2xl xs:max-sm:text-[0.9em] xl:max-2xl:text-[0.9em]'>
                    <li className={`my-[5%] hover:cursor-pointer hover:bg-[#660605] hover:ml-[-15%] hover:pl-[15%] hover:py-[1%]
                        ${ urlSecPart ==='all' ? 'bg-[#660605] ml-[-15%] pl-[15%]': ''}`}
                        onClick={()=>{navigate('/reservationlist/all')}}>All Bookings</li>
                    <li className={`mb-[5%] hover:cursor-pointer hover:bg-[#660605] hover:ml-[-15%] hover:pl-[15%] hover:py-[1%]
                       ${ urlSecPart ==='upcoming' ? 'bg-[#660605] ml-[-15%] pl-[15%]': ''}`}
                       onClick={()=>{navigate('/reservationlist/upcoming')}}>Upcoming</li>
                    <li className={`mb-[5%] hover:cursor-pointer hover:bg-[#660605] hover:ml-[-15%] hover:pl-[15%] hover:py-[1%]
                      ${ urlSecPart ==='finished' ? 'bg-[#660605] ml-[-15%] pl-[15%]': ''}`}
                       onClick={()=>{navigate('/reservationlist/finished')}}>Finished</li>
                   </ul>
                }
                <li className={`flex items-center text-[1.4em] mb-[11%] hover:bg-[#660605] hover:px-[3%] hover:py-[4%] hover:ml-[-3%] hover:rounded-xl 
                    hover:cursor-pointer hover:animate-small-fade-in-down hover:mb-[3%] xs:max-sm:text-[1.1em] xl:max-2xl:text-[0.95em] ${urlPart === 'feedbacklist' ? 'bg-[#660605] px-[3%] py-[4%] ml-[-3%] rounded-xl mb-[3%]' : ''}`}
                    onClick={()=>{handleMenuItemClick('/feedbacklist',false)}}>
                    <RiMegaphoneFill className='mr-[4%] text-[1.5em]'/> Feedback List</li>
                    <li className={`flex items-center text-[1.4em] mb-[11%] hover:bg-[#660605] hover:px-[3%] hover:py-[4%] hover:ml-[-3%] hover:rounded-xl 
                    hover:cursor-pointer hover:animate-small-fade-in-down hover:mb-[3%] xs:max-sm:text-[1.1em] xl:max-2xl:text-[0.95em] ${urlPart === 'reservationmanager' ? 'bg-[#660605] px-[3%] py-[4%] ml-[-3%] rounded-xl mb-[3%]' : ''}`}
                    onClick={()=>{handleMenuItemClick('/reservationmanager',false)}}>
                    <RiReservedFill className='mr-[4%] text-[1.4em]'/> Reserve Manager</li>
                <li className={`flex items-center text-[1.4em] mb-[11%] hover:bg-[#660605] hover:px-[3%] hover:py-[4%] hover:ml-[-3%] hover:rounded-xl 
                    hover:cursor-pointer hover:animate-small-fade-in-down hover:mb-[3%] xs:max-sm:text-[1.1em] xl:max-2xl:text-[0.95em] ${urlPart === 'packagemanager' ? 'bg-[#660605] px-[3%] py-[4%] ml-[-3%] rounded-xl mb-[3%]' : ''}`}
                    onClick={()=>{handleMenuItemClick('/packagemanager',false)}}>
                    <LuPackage2 className='mr-[4%] text-[1.5em]'/> Package Manager</li>
                <li className={`flex items-center text-[1.4em] mb-[11%] hover:bg-[#660605] hover:px-[3%] hover:py-[4%] hover:ml-[-3%] hover:rounded-xl 
                    hover:cursor-pointer hover:animate-small-fade-in-down hover:mb-[3%] xs:max-sm:text-[1.1em] xl:max-2xl:text-[0.95em] ${urlPart === 'merchsettings' ? 'bg-[#660605] px-[3%] py-[4%] ml-[-3%] rounded-xl mb-[3%]' : ''}`}
                    onClick={()=>{handleMenuItemClick('/merchsettings',false)}}>
                    <IoBusiness className='mr-[4%] text-[1.5em]'/> Merchant Settings</li>
            </ul>
        </div>
      <div className={`fixed top-[90%] ml-[1.5%] w-[8%] p-2 text-[0.9em] hover:bg-[#660605] hover:rounded-xl 
                    hover:cursor-pointer hover:animate-small-fade-in-down hover:mb-[3%]  xs:max-sm:text-[1.1em] xs:max-sm:w-[40%] xs:max-sm:top-[90%] xl:max-2xl:text-[0.6em] `}>
        <button onClick={() => navigate('/logout')}>
        <p className='flex items-center ml-[3%] text-[1.5em] text-white w-[10rem] xs:max-sm:text-[1.1em] xs:max-sm:top-[90%] xs:max-sm:ml-[10%]'>
          <FiLogOut className="mr-[3%] text-[1.3em] xs:max-sm:text-[1.1em] xs:max-sm:mr-[5%]" /> Log Out </p>
        </button>
      </div>
    </div>
  );
};

export default MerchantSide;
