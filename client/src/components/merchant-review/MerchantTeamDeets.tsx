import React, {useState} from 'react'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import {IoPeopleOutline} from 'react-icons/io5'
import {BsFolder, BsTrash} from 'react-icons/bs'
import Logo from '../../assets/jjlogo.png'

const MerchantTeamDeets = () => {
    const [buttonStatus, setbuttonStatus] = useState(false)

    return (
        <div className='w-[100%] bg-white h-[90%] mt-[1%] rounded-ss-2xl flex-row align-center overflow-y-auto'>
          {/* Dummy Conten 1 */}
          <div className='bg-white h-[10%] flex-row rounded-ss-2xl py-[1%] px-[2%] text-black border-[#F3F3F3] border-b-2 flex font-bold text-[1.4em] items-center hover:cursor-pointer'>
          <AiOutlineArrowLeft className='text-[1.4em] text-[#838383] mr-[1%]' onClick={()=>sessionStorage.setItem('viewDetails','false')}/><p>Merchant Team Details</p>
          </div>
          <div className='bg-white h-[25%] flex-row py-[1%] px-[2%] text-[#838383] p-[1%] flex rounded-xl'>
                <div className='w-[20%] p-[0.5%] pl-[3%] flex'>
                <img src={Logo} className='w-auto h-[100%] rounded-[50px]' alt="Logo"/>
                </div>
                <div className='w-[55%] justify-center items-left px-[1%] py-[2%] flex flex-col'>
                  <p className='text-[1.5em] text-black text-bold'>J & J Lechon Belly House</p>
                  <p className='text-[1.2em] text-black'>Talamban, Cebu City, Philippines</p>
                  <div className='flex'>
                    <p className='text-[1.2em] text-[#838383] flex'><IoPeopleOutline className='text-[1.5em]'/> 10 members • </p>
                    <div className='bg-[#DCFFD0] ml-[1%] w-[15%] text-center rounded-2xl border-[#238700] border-2'>
                      <p className='text-[#238700]'>Active</p> 
                    </div>
                  </div>                 
                </div>
                <div className='w-[25%] flex flex-col p-[1%] justify-center items-center text-black'>
                    <div className='hover:cursor-pointer w-auto h-auto text-right'>
                       <p className='text-[#838383] text-[1.4em]'>Applied Since</p>
                       <p className='text-[1.4em]'>03/04/2002</p>
                       <p className='flex text-[1.4em]'><BsFolder className='text-[1.6em] text-[#838383] mr-[2%]'/> Documents</p>
                    </div>
                </div>
              </div>
              <div className='h-[100%] overflow-hidden pt-[1%] text-center'>
                  <table className='w-[90%] text-[1.5em] border-[#F3F3F3] border-t-2'>
                    <tr>
                      <th>Employee</th>
                      <th>Email Address</th>
                      <th>Position</th>
                      <th>Manage</th>
                    </tr>
                    <tr className='border-[#F3F3F3] border-t-2 p-[1%] my-[2%]'>
                      <td>Kathea Mari Mayol</td>
                      <td>@kathemari@abc.com</td>
                      <td>Manager</td>
                      <div className='bg-[#DD2803] items-center text-white p-[1%] m-[7%] rounded-md'>
                        <p className='flex items-center text-center justify-center text-[1em]'><BsTrash className='text-[1em]'/> Delete</p>
                      </div>
                    </tr>
                    <tr className='border-[#F3F3F3] border-t-2 p-[1%] my-[2%]'>
                      <td>John Doe</td>
                      <td>@johndoe@abc.com</td>
                      <td>Employee</td>
                      <div className='bg-[#DD2803] items-center text-white p-[1%] m-[7%] rounded-md'>
                        <p className='flex items-center text-center justify-center text-[1em]'><BsTrash className='text-[1em]'/> Delete</p>
                      </div>
                    </tr>
                  </table>
              </div>
        </div> 
    )
}

export default MerchantTeamDeets