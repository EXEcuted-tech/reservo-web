import React, { useEffect, useState } from 'react'
import {IoPeopleOutline} from 'react-icons/io5'
import {SlOptions} from 'react-icons/sl'
import {BiSearchAlt} from 'react-icons/bi'
import {AiOutlineCheck} from 'react-icons/ai'
import {RxCross2} from 'react-icons/rx'
import Logo from '../../assets/jjlogo.png'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';

const theme = createTheme({
  palette: {
    primary: {
      main: '#DD2803',
    },
  },
});

const MerchantApplications = () => {

  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const itemsPerPage = 3;
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentMerchApplication = merchApp.slice(indexOfFirstItem, indexOfLastItem);
  // const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
  //   setCurrentPage(page);
  // };
  
    return (
        <div className='w-[100%] bg-white h-[90%] mt-[1%] rounded-ss-2xl flex-row align-center overflow-y-auto'>
          {/* Filter */}
          <div className='bg-white h-[10%] flex-row rounded-ss-2xl py-[1%] px-[2%] text-[#838383] border-[#F3F3F3] border-b-2'>
            <label htmlFor="filterDropdown" className={`mx-2 w-[4vw]`}>Filter by: </label>
                  <select id="sortDropdown" name="sortDropdown" className={`bg-transparent rounded-xl h-10 w-[10vw] border-black border-2 hover:bg-white transition duration-150 ease-out hover:ease-in`}>
                  <option value="option1">All Applications</option>
                  <option value="option2">Popular</option>
                  <option value="option3">Oldest</option>
            </select>
          </div>
          {/* currentMerchApplication.length > 0, fetch from db */}
          {/* Dummy Content 1 */}
          <div className='bg-white h-[25%] flex-row py-[1%] px-[2%] text-[#838383] border-[#F3F3F3] border-b-2 p-[1%] flex'>
            <div className='w-[20%] p-[0.5%] pl-[3%] flex'>
            <img src={Logo} className='w-auto h-[100%] rounded-[50px]' alt="Logo"/>
            </div>
            <div className='w-[55%] justify-center items-left px-[1%] py-[2%] flex flex-col'>
              <p className='text-[1.5em] text-black text-bold'>J & J Lechon Belly House<br/></p>
              <p className='text-[1.2em] text-black'>Kathea Mari Mayol<br/></p>
              <p className='text-[1.2em] text-[#838383] flex'>Chief Marketing Officer</p>
              <div className='flex'>
                <p className='text-[1em] text-[#838383] flex mr-[1%]'>31 days to go • </p>
                <p className='text-[1em] text-[#FFB800] flex'>Pending</p>
              </div>
            </div>
            {/* Buttons */}
            <div className="w-[25%] flex flex-col p-[1%] justify-center items-center">
              <button className="h-[33%] bg-[#FFB800] text-center m-[2%] w-[50%] text-black rounded-sm hover:cursor-pointer">
                <div className="flex justify-center p-[1%] m-[2%]">
                  <BiSearchAlt className="text-[1.2em] mt-[1%]" />
                  View More
                </div>
              </button>
              <button className="h-[33%] bg-[#3B9C00] text-center m-[2%] w-[50%] text-white rounded-sm hover:cursor-pointer">
                <div className="flex justify-center p-[1%] m-[2%]">
                  <AiOutlineCheck className="text-[1.2em] mt-[1%]" />
                  Approve
                </div>
              </button>
              <button className="h-[33%] bg-[#DD2803] text-center m-[2%] w-[50%] text-white rounded-sm hover:cursor-pointer">
                <div className="flex justify-center p-[1%] m-[2%]">
                  <RxCross2 className="text-[1.2em] mt-[1%]" />
                  Deny
                </div>
              </button>
            </div>
          </div>
          {/* Dummy Content 2 */}
          <div className='bg-white h-[25%] flex-row py-[1%] px-[2%] text-[#838383] border-[#F3F3F3] border-b-2 p-[1%] flex'>
            <div className='w-[20%] p-[0.5%] pl-[3%] flex'>
            <img src={Logo} className='w-auto h-[100%] rounded-[50px]' alt="Logo"/>
            </div>
            <div className='w-[55%] justify-center items-left px-[1%] py-[2%] flex flex-col'>
              <p className='text-[1.5em] text-black text-bold'>J & J Lechon Belly House<br/></p>
              <p className='text-[1.2em] text-black'>Kathea Mari Mayol<br/></p>
              <p className='text-[1.2em] text-[#838383] flex'>Chief Marketing Officer</p>
              <div className='flex'>
                <p className='text-[1em] text-[#838383] flex mr-[1%]'>31 days to go • </p>
                <p className='text-[1em] text-[#FFB800] flex'>Pending</p>
              </div>
            </div>
            {/* Buttons */}
            <div className="w-[25%] flex flex-col p-[1%] justify-center items-center">
              <button className="h-[33%] bg-[#FFB800] text-center m-[2%] w-[50%] text-black rounded-sm hover:cursor-pointer">
                <div className="flex justify-center p-[1%] m-[2%]">
                  <BiSearchAlt className="text-[1.2em] mt-[1%]" />
                  View More
                </div>
              </button>
              <button className="h-[33%] bg-[#3B9C00] text-center m-[2%] w-[50%] text-white rounded-sm hover:cursor-pointer">
                <div className="flex justify-center p-[1%] m-[2%]">
                  <AiOutlineCheck className="text-[1.2em] mt-[1%]" />
                  Approve
                </div>
              </button>
              <button className="h-[33%] bg-[#DD2803] text-center m-[2%] w-[50%] text-white rounded-sm hover:cursor-pointer">
                <div className="flex justify-center p-[1%] m-[2%]">
                  <RxCross2 className="text-[1.2em] mt-[1%]" />
                  Deny
                </div>
              </button>
            </div>
          </div>
          {/* Dummy Content 3 */}
          <div className='bg-white h-[25%] flex-row py-[1%] px-[2%] text-[#838383] border-[#F3F3F3] border-b-2 p-[1%] flex'>
            <div className='w-[20%] p-[0.5%] pl-[3%] flex'>
            <img src={Logo} className='w-auto h-[100%] rounded-[50px]' alt="Logo"/>
            </div>
            <div className='w-[55%] justify-center items-left px-[1%] py-[2%] flex flex-col'>
              <p className='text-[1.5em] text-black text-bold'>J & J Lechon Belly House<br/></p>
              <p className='text-[1.2em] text-black'>Kathea Mari Mayol<br/></p>
              <p className='text-[1.2em] text-[#838383] flex'>Chief Marketing Officer</p>
              <div className='flex'>
                <p className='text-[1em] text-[#838383] flex mr-[1%]'>31 days to go • </p>
                <p className='text-[1em] text-[#FFB800] flex'>Pending</p>
              </div>
            </div>
            {/* Buttons */}
            <div className="w-[25%] flex flex-col p-[1%] justify-center items-center">
              <button className="h-[33%] bg-[#FFB800] text-center m-[2%] w-[50%] text-black rounded-sm hover:cursor-pointer">
                <div className="flex justify-center p-[1%] m-[2%]">
                  <BiSearchAlt className="text-[1.2em] mt-[1%]" />
                  View More
                </div>
              </button>
              <button className="h-[33%] bg-[#3B9C00] text-center m-[2%] w-[50%] text-white rounded-sm hover:cursor-pointer">
                <div className="flex justify-center p-[1%] m-[2%]">
                  <AiOutlineCheck className="text-[1.2em] mt-[1%]" />
                  Approve
                </div>
              </button>
              <button className="h-[33%] bg-[#DD2803] text-center m-[2%] w-[50%] text-white rounded-sm hover:cursor-pointer">
                <div className="flex justify-center p-[1%] m-[2%]">
                  <RxCross2 className="text-[1.2em] mt-[1%]" />
                  Deny
                </div>
              </button>
            </div>
          </div>
          <div className="flex justify-center mt-10 w-[100%] h-[0%]">
            <ThemeProvider theme={theme}>
              <Pagination
                // count={Math.ceil(merchApp.length / itemsPerPage)}
                shape="rounded"
                showFirstButton
                showLastButton
                color="primary"
                className="absolute bottom-8"
                // onChange={handlePageChange}
                // page={currentPage}
              />
            </ThemeProvider>
            <div className="text-[#969696] text-xs absolute bottom-3">
              Page {1} of {1}
              {/* Page {currentPage} of {Math.ceil(merchApp.length / itemsPerPage)} */}
            </div>
        </div>        
        </div> 
    )
}

export default MerchantApplications