import React, { useState, useEffect } from 'react';
import UserHeader from '../headers/UserHeader';
import logo from '../../assets/temp-logo-2w.png';
import MerchSide from '../sidebar/MerchantSide';
import  { BiSolidFoodMenu } from 'react-icons/bi';
import { Outlet } from 'react-router-dom';

const MerchantLayout = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    setIsButtonClicked(!isButtonClicked);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth >= 300 && window.innerWidth <= 640);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex">
      {isMobile && (
        <div className="w-full h-[3rem] fixed z-[101] bg-[#840705]"> 
          <button onClick={toggleSidebar} 
            className={`text-white p-2 ml-3 rounded-2xl fixed mt-1 ${
              isButtonClicked ? 'bg-[#840705]' : 'bg-[#660605]'
               }`} >
            <BiSolidFoodMenu className="text-[1.5rem] mt-[0.1rem]" />
            {showSidebar ? '' : ''}
          </button>
           <img src={logo} alt="Reservo Logo" className="w-[28%] mt-[1%] ml-[38%] h-[75%]" />
        </div>
      )}

      {showSidebar && (
        <div className=" bg-[#840705] h-[100vh] w-[20vw] rounded-xl ml-[-0.5%] xs:max-sm:fixed xs:max-sm:w-[50vw] xs:max-sm:h-full xs:max-sm:z-[100] xs:max-sm:mt-[0.6rem] xs:max-sm:animate-slide-left">
          <MerchSide showSidebar={showSidebar} />
        </div>
      )}

     {/* PAGE CONTENT */}
      <div className={`w-full h-[100vh] overflow-y-auto ${showSidebar ? 'ml-20vw xs:max-sm:mt-[3.5rem]' : ' xs:max-sm:mt-[3.5rem]'}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default MerchantLayout;
