<<<<<<< HEAD
import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import logo from '../../assets/temp-logo-2w.png'
import {RiDashboard3Line} from 'react-icons/ri'
import {MdAccountBox, MdRateReview} from 'react-icons/md'
import { FiLogOut } from 'react-icons/fi';


const AdminSide = () => {
    const [urlPart, setUrlPart] = useState('');
  
    const navigate = useNavigate();
    
    useEffect(() => {
      const pathParts = window.location.pathname.split('/');
      if (pathParts.length >= 2) {
        setUrlPart(pathParts[1]);
      }
    }, [window.location.pathname]);
  
    return (
      <div className='font-poppins'>
          <div className='text-center'>
              <img src={logo} alt='Reservo Logo' className='mx-[18%] my-[5%] w-[60%]'/>
          </div>
          <hr className='mx-[6%]'/>   
          <div className='text-white mx-[8%] my-[8%]'>
              <ul>
                  <li className={`flex items-center text-[1.4em] mb-[11%] hover:bg-[#660605] hover:px-[3%] hover:py-[4%] hover:ml-[-3%] hover:rounded-xl 
                      hover:cursor-pointer hover:animate-small-fade-in-down hover:mb-[3%] ${urlPart === 'admindash' ? 'bg-[#660605] px-[3%] py-[4%] ml-[-3%] rounded-xl mb-[3%]' : ''}`}
                      onClick={()=>{ navigate('/admindash')}}>
                      <RiDashboard3Line className='mr-[4%] text-[1.5em] '/> Dashboard</li>
                  <li className={`flex items-center text-[1.4em] mb-[11%] hover:bg-[#660605] hover:px-[3%] hover:py-[4%] hover:ml-[-3%] hover:rounded-xl 
                      hover:cursor-pointer hover:animate-small-fade-in-down hover:mb-[3%] ${urlPart === 'accountlist' ? 'bg-[#660605] px-[3%] py-[4%] ml-[-3%] rounded-xl mb-[3%]' : ''}`}
                      onClick={()=>{navigate('/accountlist')}}>
                      <MdAccountBox className='mr-[4%] text-[1.5em]'/> Accounts List</li>
                  <li className={`flex items-center text-[1.4em] mb-[11%] hover:bg-[#660605] hover:px-[3%] hover:py-[4%] hover:ml-[-3%] hover:rounded-xl 
                      hover:cursor-pointer hover:animate-small-fade-in-down hover:mb-[3%] ${urlPart === 'review' ? 'bg-[#660605] px-[3%] py-[4%] ml-[-3%] rounded-xl mb-[3%]' : ''}`}
                      onClick={()=>{navigate('/review')}}>
                      <MdRateReview className='mr-[4%] text-[1.5em]'/> Merchant Manager</li>
              </ul>
          </div>
          <div className='fixed bottom-[5%] ml-[1.8%] w-[15%]'
              onClick={()=>{navigate('/logout')}}>
              <p className='flex items-center text-[1.3em] text-white hover:text-[#D9D9D9] hover:cursor-pointer'><FiLogOut className='mr-[1%] text-[1.5em]'/> Log Out</p>
          </div>
      </div>
    )
}

=======
import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import logo from '../../assets/temp-logo-2w.png'
import {RiDashboard3Line} from 'react-icons/ri'
import {MdAccountBox, MdRateReview} from 'react-icons/md'
import { FiLogOut } from 'react-icons/fi';


const AdminSide = () => {
    const [urlPart, setUrlPart] = useState('');
  
    const navigate = useNavigate();
    
    useEffect(() => {
      const pathParts = window.location.pathname.split('/');
      if (pathParts.length >= 2) {
        setUrlPart(pathParts[1]);
      }
    }, [window.location.pathname]);
  
    return (
      <div className='font-poppins'>
          <div className='text-center'>
              <img src={logo} alt='Reservo Logo' className='mx-[18%] my-[5%] w-[60%]'/>
          </div>
          <hr className='mx-[6%]'/>   
          <div className='text-white mx-[8%] my-[8%]'>
              <ul>
                  <li className={`flex items-center text-[1.4em] mb-[11%] hover:bg-[#660605] hover:px-[3%] hover:py-[4%] hover:ml-[-3%] hover:rounded-xl 
                      hover:cursor-pointer hover:animate-small-fade-in-down hover:mb-[3%] ${urlPart === 'admindash' ? 'bg-[#660605] px-[3%] py-[4%] ml-[-3%] rounded-xl mb-[3%]' : ''}`}
                      onClick={()=>{ navigate('/admindash')}}>
                      <RiDashboard3Line className='mr-[4%] text-[1.5em] '/> Dashboard</li>
                  <li className={`flex items-center text-[1.4em] mb-[11%] hover:bg-[#660605] hover:px-[3%] hover:py-[4%] hover:ml-[-3%] hover:rounded-xl 
                      hover:cursor-pointer hover:animate-small-fade-in-down hover:mb-[3%] ${urlPart === 'accountlist' ? 'bg-[#660605] px-[3%] py-[4%] ml-[-3%] rounded-xl mb-[3%]' : ''}`}
                      onClick={()=>{navigate('/accountlist')}}>
                      <MdAccountBox className='mr-[4%] text-[1.5em]'/> Accounts List</li>
                  <li className={`flex items-center text-[1.4em] mb-[11%] hover:bg-[#660605] hover:px-[3%] hover:py-[4%] hover:ml-[-3%] hover:rounded-xl 
                      hover:cursor-pointer hover:animate-small-fade-in-down hover:mb-[3%] ${urlPart === 'review' ? 'bg-[#660605] px-[3%] py-[4%] ml-[-3%] rounded-xl mb-[3%]' : ''}`}
                      onClick={()=>{navigate('/review')}}>
                      <MdRateReview className='mr-[4%] text-[1.5em]'/> Merchant Manager</li>
              </ul>
          </div>
          <div className='fixed bottom-[5%] ml-[1.8%] w-full'
              onClick={()=>{navigate('/logout')}}>
              <p className='flex items-center text-[1.3em] text-white hover:text-[#D9D9D9] hover:cursor-pointer'><FiLogOut className='mr-[1%] text-[1.5em]'/> Log Out</p>
          </div>
      </div>
    )
}

>>>>>>> 802eb6c58c81e931b06842bdf6bd99922a31a6dd
export default AdminSide