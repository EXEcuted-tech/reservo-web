import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import logo from '../../assets/temp-logo-2w.png'
import {RiDashboard3Line} from 'react-icons/ri'
import {MdAccountBox, MdRateReview} from 'react-icons/md'
import { FiLogOut } from 'react-icons/fi';

interface MerchantSideProps {
    showSidebar: boolean;
  }
  
  const AdminSide: React.FC<MerchantSideProps> = ({ showSidebar }) => {
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
          <div className='text-center'>
              <img src={logo} alt='Reservo Logo' className='mx-[18%] my-[5%] w-[60%] xs:max-sm:w-[50%] xs:max-sm:ml-[35%]'/>
          </div>
          <hr className='mx-[6%]'/>   
          <div className='text-white mx-[8%] my-[8%]'>
              <ul>
                  <li className={`flex items-center text-[1.4em] mb-[11%] hover:bg-[#660605] hover:px-[3%] hover:py-[4%] hover:ml-[-3%] hover:rounded-xl 
                      hover:cursor-pointer hover:animate-small-fade-in-down hover:mb-[3%] xs:max-sm:text-[1.1em] xl:max-2xl:text-[0.95em]
                      ${urlPart === 'admindash' ? 'bg-[#660605] px-[3%] py-[4%] ml-[-3%] rounded-xl mb-[3%]' : ''}`}
                      onClick={()=>{ navigate('/admindash')}}>
                      <RiDashboard3Line className='mr-[4%] text-[1.5em] '/> Dashboard</li>
                  
                  <li className={`flex items-center text-[1.4em] mb-[11%] hover:bg-[#660605] hover:px-[3%] hover:py-[4%] hover:ml-[-3%] hover:rounded-xl 
                      hover:cursor-pointer hover:animate-small-fade-in-down hover:mb-[3%] xs:max-sm:text-[1.1em] xl:max-2xl:text-[0.95em]
                      ${urlPart === 'accountlist' ? 'bg-[#660605] px-[3%] py-[4%] ml-[-3%] rounded-xl mb-[3%]' : ''}`}
                      onClick={()=>{navigate('/accountlist')}}>
                      <MdAccountBox className='mr-[4%] text-[1.5em]'/> Accounts List</li>
                  
                  <li className={`flex items-center text-[1.4em] mb-[11%] hover:bg-[#660605] hover:px-[3%] hover:py-[4%] hover:ml-[-3%] hover:rounded-xl 
                      hover:cursor-pointer hover:animate-small-fade-in-down hover:mb-[3%] xs:max-sm:text-[1.1em] xl:max-2xl:text-[0.95em]
                      ${urlPart === 'review' ? 'bg-[#660605] px-[3%] py-[4%] ml-[-3%] rounded-xl mb-[3%]' : ''}`}
                      onClick={()=>{navigate('/review')}}>
                      <MdRateReview className='mr-[4%] text-[1.5em]'/> Merchant Manager</li>
              </ul>
          </div>
          <div className='fixed top-[90%] ml-[1.5%] w-[8%] p-2 text-[0.9em] hover:bg-[#660605] hover:rounded-xl 
                    hover:cursor-pointer hover:animate-small-fade-in-down hover:mb-[3%]  xs:max-sm:text-[1.1em] xs:max-sm:w-[40%] xs:max-sm:top-[90%] xl:max-2xl:text-[0.6em]'
              onClick={()=>{navigate('/logout')}}>
              <p className='flex items-center ml-[3%] text-[1.5em] text-white  xs:max-sm:text-[1.1em] xs:max-sm:top-[90%] xs:max-sm:ml-[10%]'>
                <FiLogOut className='mr-[1%] text-[1.5em] xs:max-sm:text-[1.5em] xs:max-sm:mr-[5%]'/>Log Out</p>
          </div>
      </div>
    );
};

export default AdminSide;