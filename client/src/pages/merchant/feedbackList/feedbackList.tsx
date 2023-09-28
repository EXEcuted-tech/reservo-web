import React from 'react'
import MerchAdHeader from '../../../components/headers/MerchAdHeader'
import {RiMegaphoneFill} from 'react-icons/ri'
import Rating from '@mui/material/Rating';
import {BsFillPersonFill} from 'react-icons/bs'
import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#DD2803',
    }
  },
});

const FeedbackList = () => {
  return (
    <div>
      <MerchAdHeader icon={RiMegaphoneFill} title="Feedback List"/>
      <div className='bg-[#F3F3F3] h-[90vh] px-12 py-7'>
        <div className='bg-[#FFFFFF] h-[85vh] rounded-[2rem]'>
          <div className='flex font-poppins px-10 py-10'>
            <h1 className='text-3xl font-bold'>Merchant Rating</h1>
            <h1 className='text-2xl pl-5 font-medium'>(5.0)</h1>
            <Rating name="half-rating" defaultValue={5} precision={0.5} size="large" className='pl-5' readOnly/>
          </div>
          <div className='bg-[#F0E5D8] bg-opacity-50 rounded-[3rem] mx-16 mb-3 px-12 py-4'>
            <div className='flex font-poppins'>
              <BsFillPersonFill className='rounded-full bg-[#F4D147] text-4xl p-1'></BsFillPersonFill>
              <h3 className='text-2xl ml-2'>Cool Name</h3>
            </div>
            <div className='pl-12'>
              <Rating name="half-rating" defaultValue={5} precision={0.5} size="small" readOnly/>
              <p className='opacity-50 text-xs'>2022-06-18 11:00</p>
              <p className='text-xl'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
            </div>
          </div>
          <div className='bg-[#F0E5D8] bg-opacity-50 rounded-[3rem] mx-16 mb-3 px-12 py-4'>
            <div className='flex font-poppins'>
              <BsFillPersonFill className='rounded-full bg-[#F4D147] text-4xl p-1'></BsFillPersonFill>
              <h3 className='text-2xl ml-2'>Cool Name</h3>
            </div>
            <div className='pl-12'>
              <Rating name="half-rating" defaultValue={5} precision={0.5} size="small" readOnly/>
              <p className='opacity-50 text-xs'>2022-06-18 11:00</p>
              <p className='text-xl'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
            </div>
          </div><div className='bg-[#F0E5D8] bg-opacity-50 rounded-[3rem] mx-16 mb-3 px-12 py-4'>
            <div className='flex font-poppins'>
              <BsFillPersonFill className='rounded-full bg-[#F4D147] text-4xl p-1'></BsFillPersonFill>
              <h3 className='text-2xl ml-2'>Cool Name</h3>
            </div>
            <div className='pl-12'>
              <Rating name="half-rating" defaultValue={5} precision={0.5} size="small" readOnly/>
              <p className='opacity-50 text-xs'>2022-06-18 11:00</p>
              <p className='text-xl'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
            </div>
          </div>
          <div className='bg-[#F0E5D8] bg-opacity-50 rounded-[3rem] mx-16 mb-3 px-12 py-4'>
            <div className='flex font-poppins'>
              <BsFillPersonFill className='rounded-full bg-[#F4D147] text-4xl p-1'></BsFillPersonFill>
              <h3 className='text-2xl ml-2'>Cool Name</h3>
            </div>
            <div className='pl-12'>
              <Rating name="half-rating" defaultValue={5} precision={0.5} size="small" readOnly/>
              <p className='opacity-50 text-xs'>2022-06-18 11:00</p>
              <p className='text-xl'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
            </div>
          </div>
          <ThemeProvider theme={theme}>
            <Pagination count={3} shape="rounded" showFirstButton showLastButton color="primary" className='flex justify-center pt-5'/>
          </ThemeProvider>
          <div className='text-[#969696] text-xs flex justify-center'>
            {"1"} of {"2"}
          </div>

        </div>
      </div>
    </div>
  )
}

export default FeedbackList