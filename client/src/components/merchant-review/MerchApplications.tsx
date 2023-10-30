import React from 'react'
import {IoPeopleOutline} from 'react-icons/io5'
import {SlOptions} from 'react-icons/sl'
import {BiSearchAlt} from 'react-icons/bi'
import {AiOutlineCheck} from 'react-icons/ai'
import {RxCross2} from 'react-icons/rx'
import Logo from '../../assets/jjlogo.png'

const MerchantApplications = () => {
    return (
        <div className='w-auto bg-white h-[90vh] mt-[4%] rounded-ss-2xl flex-row align-center overflow-x-hidden overflow-y-auto animate-fade-in xs:max-sm:w-[100%] xs:max-sm:ml-[-2%]'>
          {/* Dummy Conten 1 */}
          <div className='bg-white h-[10%] flex-row rounded-ss-2xl py-[1%] px-[2%] text-[#838383] border-[#F3F3F3] border-b-2'>
            <label htmlFor="filterDropdown" className={`mx-2 w-[4vw] xl:max-2xl:text-[0.7em] xs:max-sm:text-[0.7em]`}>Filter by: </label>
                  <select id="sortDropdown" name="sortDropdown" className={`bg-transparent rounded-xl h-10 w-[10vw] xl:max-2xl:text-[0.7em] xs:max-sm:text-[0.7em] xs:max-sm:w-[35vw] border-black border-2 
                  hover:bg-white transition duration-150 ease-out hover:ease-in`}>
                  <option value="option1">All Applications</option>
                  <option value="option2">Popular</option>
                  <option value="option3">Oldest</option>
            </select>
          </div>
          <div className='bg-white h-[25%] flex-row py-[1%] px-[2%] text-[#838383] border-[#F3F3F3] border-b-2 p-[1%] flex xs:max-sm:w-[100%]'>
            <div className='w-[20%] p-[0.5%] pl-[3%] flex xs:max-sm:pr-[2%] xs:max-sm:mt-[7%]'>
            <img src={Logo} className='w-auto h-[100%] rounded-[50px] xs:max-sm:h-[5rem]' alt="Logo"/>
            </div>
            <div className='w-[55%] justify-center items-left px-[1%] py-[2%] flex flex-col'>
              <p className='text-[1.5em] text-black font-bold xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.9em]'>J & J Lechon Belly House<br/></p>
              <p className='text-[1.2em] text-black xs:max-sm:text-[0.7em] xl:max-2xl:text-[0.9em]'>Kathea Mari Mayol<br/></p>
              <p className='text-[0.9em] text-[#838383] flex xs:max-sm:text-[0.7em] xl:max-2xl:text-[0.7em]'>Chief Marketing Officer</p>
              <div className='flex'>
                <p className='text-[1em] text-[#838383] flex mr-[1%] xs:max-sm:text-[0.7em] xl:max-2xl:text-[0.7em]'>7 days to go • </p>
                <p className='text-[1em] text-[#FFB800] flex xs:max-sm:text-[0.7em] xl:max-2xl:text-[0.7em]'>Pending</p>
              </div>
            </div>
            <div className='w-[25%] flex flex-col p-[1%] justify-center items-center'>
              <div className='h-[33%] bg-[#F4D147] text-center m-[2%] w-[50%] text-black rounded-md hover:cursor-pointer
                hover:bg-[#FFB800] transition-colors delay-450 duration-[3000] ease-in-out xs:max-sm:w-[25vw] xs:max-sm:h-[20%]'>
                <div className='flex justify-center p-[1%] m-[2%] xs:max-sm:text-[0.7em] xl:max-2xl:text-[0.7em]'>
                  <BiSearchAlt className='text-[1.2em] mt-[1%]  xs:max-sm:mt-[5%] xl:max-2xl:mt-[5%]'/>View More
                </div >
              </div>
              <div className='h-[33%] bg-[#1b6e1e] text-center m-[2%] w-[50%] text-white rounded-md hover:cursor-pointer
                  hover:bg-[#00962a] transition-colors delay-250 duration-[3000] ease-in xs:max-sm:w-[25vw] xs:max-sm:h-[20%]'>
                <div className='flex justify-center p-[1%] m-[2%] xs:max-sm:text-[0.7em] xl:max-2xl:text-[0.7em]'>
                  <AiOutlineCheck className='text-[1.2em] mt-[1%]  xs:max-sm:mt-[5%] xl:max-2xl:mt-[5%]'/>Approve
                </div >
              </div>
              <div className='h-[33%] bg-[#DD2803] text-center m-[2%] w-[50%] text-white rounded-md hover:cursor-pointer
                  hover:bg-[#840705] transition-colors delay-250 duration-[3000] ease-in xs:max-sm:w-[25vw] xs:max-sm:h-[20%]'>
                <div className='flex justify-center p-[1%] m-[2%] xs:max-sm:text-[0.7em] xl:max-2xl:text-[0.7em]'>
                  <RxCross2 className='text-[1.2em] mt-[1%]  xs:max-sm:mt-[5%] xl:max-2xl:mt-[5%]'/>Deny
                </div >
              </div>
            </div>
          </div>
          {/* Dummy Conten 2 */}
          <div className='bg-white h-[25%] flex-row py-[1%] px-[2%] text-[#838383] border-[#F3F3F3] border-b-2 p-[1%] flex'>
            <div className='w-[20%] p-[0.5%] pl-[3%] flex xs:max-sm:pr-[2%] xs:max-sm:mt-[7%]'>
            <img src={Logo} className='w-auto h-[100%] rounded-[50px] xs:max-sm:h-[5rem]' alt="Logo"/>
            </div>
            <div className='w-[55%] justify-center items-left px-[1%] py-[2%] flex flex-col'>
              <p className='text-[1.5em] text-black font-bold xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.9em] '>J & J Lechon Belly House<br/></p>
              <p className='text-[1.2em] text-black xs:max-sm:text-[0.7em] xl:max-2xl:text-[0.9em]'>Kathea Mari Mayol<br/></p>
              <p className='text-[0.9em] text-[#838383] xs:max-sm:text-[0.7em] flex xl:max-2xl:text-[0.7em]'>Chief Marketing Officer</p>
              <div className='flex'>
                <p className='text-[1em] text-[#838383] flex xs:max-sm:text-[0.7em] mr-[1%] xl:max-2xl:text-[0.7em]'>7 days to go • </p>
                <p className='text-[1em] text-[#FFB800] flex xs:max-sm:text-[0.7em] xl:max-2xl:text-[0.7em] '>Pending</p>
              </div>
            </div>
            <div className='w-[25%] flex flex-col p-[1%] justify-center items-center'>
              <div className='h-[33%] bg-[#F4D147] text-center m-[2%] w-[50%] text-black rounded-md hover:cursor-pointer
                hover:bg-[#FFB800] transition-colors delay-450 duration-[3000] ease-in xs:max-sm:w-[25vw] xs:max-sm:h-[20%]'>
                <div className='flex justify-center p-[1%] m-[2%] xs:max-sm:text-[0.7em] xl:max-2xl:text-[0.7em]'>
                  <BiSearchAlt className='text-[1.2em] mt-[1%]  xs:max-sm:mt-[5%] xl:max-2xl:mt-[5%]'/>View More
                </div >
              </div>
              <div className='h-[33%] bg-[#1b6e1e] text-center m-[2%] w-[50%] text-white rounded-md hover:cursor-pointer
                  hover:bg-[#00962a] transition-colors delay-250 duration-[3000] ease-in xs:max-sm:w-[25vw] xs:max-sm:h-[20%]'>
                <div className='flex justify-center p-[1%] m-[2%] xs:max-sm:text-[0.7em] xl:max-2xl:text-[0.7em]'>
                  <AiOutlineCheck className='text-[1.2em] mt-[1%] xs:max-sm:mt-[5%] xl:max-2xl:mt-[5%]'/>Approve
                </div >
              </div>
              <div className='h-[33%] bg-[#DD2803] text-center m-[2%] w-[50%] text-white rounded-md hover:cursor-pointer
                    hover:bg-[#840705] transition-colors delay-250 duration-[3000] ease-in xs:max-sm:w-[25vw] xs:max-sm:h-[20%]'>
                <div className='flex justify-center p-[1%] m-[2%] xs:max-sm:text-[0.7em] xl:max-2xl:text-[0.7em]'>
                  <RxCross2 className='text-[1.2em] mt-[1%] xs:max-sm:mt-[5%] xl:max-2xl:mt-[5%]'/>Deny
                </div >
              </div>
            </div>
          </div> 
          {/* Dummy Content 3 */}
          <div className='bg-white h-[25%] flex-row py-[1%] px-[2%] text-[#838383] border-[#F3F3F3] border-b-2 p-[1%] flex'>
            <div className='w-[20%] p-[0.5%] pl-[3%] flex xs:max-sm:pr-[2%] xs:max-sm:mt-[7%]'>
            <img src={Logo} className='w-auto h-[100%] rounded-[50px] xs:max-sm:h-[5rem]' alt="Logo"/>
            </div>
            <div className='w-[55%] justify-center items-left px-[1%] py-[2%] flex flex-col'>
              <p className='text-[1.5em] text-black font-bold xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.9em]'>J & J Lechon Belly House<br/></p>
              <p className='text-[1.2em] text-black xs:max-sm:text-[0.7em] xl:max-2xl:text-[0.9em]'>Kathea Mari Mayol<br/></p>
              <p className='text-[0.9em] text-[#838383] flex xs:max-sm:text-[0.7em] xl:max-2xl:text-[0.7em]'>Chief Marketing Officer</p>
              <div className='flex'>
                <p className='text-[1em] text-[#838383] flex mr-[1%] xs:max-sm:text-[0.7em] xl:max-2xl:text-[0.7em]'>31 days to go • </p>
                <p className='text-[1em] text-[#FFB800] flex xs:max-sm:text-[0.7em] xl:max-2xl:text-[0.7em]'>Pending</p>
              </div>
            </div>
            <div className='w-[25%] flex flex-col p-[1%] justify-center items-center'>
              <div className='h-[33%] bg-[#F4D147] text-center m-[2%] w-[50%] text-black rounded-md hover:cursor-pointer
                hover:bg-[#FFB800] transition-colors delay-450 duration-[3000] ease-in xs:max-sm:w-[25vw] xs:max-sm:h-[20%]'>
                <div className='flex justify-center p-[1%] m-[2%] xs:max-sm:text-[0.7em] xl:max-2xl:text-[0.7em]'>
                  <BiSearchAlt className='text-[1.2em] mt-[1%]  xs:max-sm:mt-[5%] xl:max-2xl:mt-[5%]'/>View More
                </div >
              </div>
              <div className='h-[33%] bg-[#1b6e1e] text-center m-[2%] w-[50%] text-white rounded-md hover:cursor-pointer
                  hover:bg-[#00962a] transition-colors delay-250 duration-[3000] ease-in xs:max-sm:w-[25vw] xs:max-sm:h-[20%]'>
                <div className='flex justify-center p-[1%] m-[2%] xs:max-sm:text-[0.7em] xl:max-2xl:text-[0.7em]'>
                  <AiOutlineCheck className='text-[1.2em] mt-[1%] xs:max-sm:mt-[5%] xl:max-2xl:mt-[5%]'/>Approve
                </div >
              </div>
              <div className='h-[33%] bg-[#DD2803] text-center m-[2%] w-[50%] text-white rounded-md hover:cursor-pointer
                  hover:bg-[#840705] transition-colors delay-250 duration-[3000] ease-in xs:max-sm:w-[25vw] xs:max-sm:h-[20%]'>
                <div className='flex justify-center p-[1%] m-[2%] xs:max-sm:text-[0.7em] xl:max-2xl:text-[0.7em]'>
                  <RxCross2 className='text-[1.2em] mt-[1%]  xs:max-sm:mt-[5%] xl:max-2xl:mt-[5%]'/>Deny
                </div >
              </div>
            </div>
          </div>         
        </div> 
    )
}

export default MerchantApplications