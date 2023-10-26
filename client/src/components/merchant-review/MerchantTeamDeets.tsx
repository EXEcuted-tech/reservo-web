import React, {useState} from 'react'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import {IoPeopleOutline} from 'react-icons/io5'
import {BsFolder, BsTrash} from 'react-icons/bs'
import Logo from '../../assets/jjlogo.png'

const MerchantTeamDeets = () => {
    const [buttonStatus, setbuttonStatus] = useState(false)

    return (
        <div className='w-[100%] bg-white h-auto mt-[1%] p-[2%] rounded-ss-2xl flex-row align-center overflow-y-auto animate-fade-in xs:max-sm:w-[180%] xs:max-sm:p-2 xs:max-sm:ml-[-2%]'>
          {/* Dummy Conten 1 */}
          <div className='bg-white h-[10%] flex-row rounded-ss-2xl py-[1%] px-[2%] text-black border-[#F3F3F3] border-b-2 flex font-bold text-[1.4em] items-center hover:cursor-pointer xs:max-sm:text-[1em]'>
          <AiOutlineArrowLeft className='text-[1.4em] text-[#838383] mr-[1%] xs:max-sm:text-[0.9em]' onClick={()=>sessionStorage.setItem('viewDetails','false')}/><p>Merchant Team Details</p>
          </div>
          <div className='w-full h-[25%] flex-row py-[1%] px-[2%] text-[#838383] p-[1%] flex rounded-xl'>
              <div className='w-[20%] p-[0.5%] pl-[3%] flex xs:max-sm:pr-[2%] xs:max-sm:mt-[3%]'>
                <img src={Logo} className='w-auto h-[100%] rounded-[50px] xs:max-sm:h-[5rem]' alt="Logo"/>
                </div>
                <div className='w-[55%] justify-center items-left px-[1%] py-[2%] flex flex-col'>
                  <p className='text-[1.5em] text-black font-bold xs:max-sm:text-[0.8em] xl:max-2xl:text-[1em]'>J & J Lechon Belly House</p>
                  <p className='text-[1em] text-black xs:max-sm:text-[0.7em] xl:max-2xl:text-[0.8em]'>Talamban, Cebu City, Philippines</p>
                  <div className='flex'>
                    <p className='text-[0.9em] text-[#838383] flex xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.7em]'><IoPeopleOutline className='text-[1.5em]'/> 10 members • </p>
                    <div className='bg-[#DCFFD0] ml-[1%] w-[15%] text-center rounded-2xl border-[#238700] border-2 xs:max-sm:w-[25%] xl:max-2xl:w-[17%]'>
                      <p className='text-[#238700] text-[0.9em] xs:max-sm:text-[0.6em] xl:max-2xl:text-[0.6em]'>Active</p> 
                    </div>
                  </div>                 
                </div>
                <div className='w-[25%] ml-[25%] flex flex-col p-[1%] justify-center items-center text-black'>
                    <div className='hover:cursor-pointer w-auto h-auto text-right'>
                       <p className='text-[#838383] text-[1.2em] xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.9em]'>Applied Since</p>
                       <p className='text-[1.1em] xs:max-sm:text-[0.7em] xl:max-2xl:text-[0.8em]'>03/04/2002</p>
                       <p className='group flex text-[1.2em] mt-[2%] hover:text-[#840705] hover:underline hover:underline-offset-4 transition-colors delay-250 duration-[3000] ease-in xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.8em]'>
                        <BsFolder className='group text-[1.2em] text-[#838383] mr-[2%] hover:text-[#840705] transition-colors delay-250 duration-[3000] ease-in xs:max-sm:text-[1em] xs:max-sm:mt-[5%] xl:max-2xl:text-[1.1em] xl:max-2xl:mt-[4%]'/>
                        Documents</p>
                    </div>
                </div>
              </div>
              <div className='h-[100%] overflow-hidden pt-[2%] text-center'>
                  <table className='w-[100%] border-[#F3F3F3] border-t-2'>
                    <tr className=" text-[1.3em] xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.9em]">
                      <th>Employee</th>
                      <th>Email Address</th>
                      <th>Position</th>
                      <th>Manage</th>
                    </tr>
                    <tr className='border-[#F3F3F3] text-[1em] border-t-2 p-[1%] my-[2%] xs:max-sm:text-[0.7em] xl:max-2xl:text-[0.7em]'>
                      <td>Kathea Mari Mayol</td>
                      <td>@kathemari@abc.com</td>
                      <td>Manager</td>
                      <div className='bg-[#DD2803] w-[50%] ml-[25%] text-white p-[1%] m-[7%] rounded-md
                      hover:bg-[#840705] transition-colors delay-250 duration-[3000] ease-in xs:max-sm:w-[65%]'>
                        <p className='flex items-center text-center justify-center text-[1em]'><BsTrash className='text-[1em]'/> Delete</p>
                      </div>
                    </tr>
                    <tr className='border-[#F3F3F3] text-[1em] border-t-2 p-[1%] my-[2%] xs:max-sm:text-[0.7em] xl:max-2xl:text-[0.7em]'>
                      <td>John Doe</td>
                      <td>@johndoe@abc.com</td>
                      <td>Employee</td>
                      <div className='bg-[#DD2803] w-[50%] ml-[25%] items-center text-white p-[1%] m-[7%] rounded-md
                      hover:bg-[#840705] transition-colors delay-250 duration-[3000] ease-in xs:max-sm:w-[65%]'>
                        <p className='flex items-center text-center justify-center text-[1em]'><BsTrash className='text-[1em]'/> Delete</p>
                      </div>
                    </tr>
                  </table>
              </div>
        </div> 
    )
}

export default MerchantTeamDeets