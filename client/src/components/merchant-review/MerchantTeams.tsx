import React, {useState} from 'react'
import {SlOptions} from 'react-icons/sl'
import {IoPeopleOutline} from 'react-icons/io5'
import Logo from '../../assets/jjlogo.png'
import MerchantTeamDeets from './MerchantTeamDeets'

sessionStorage.setItem('viewDetails', 'false')

const MerchantTeams = () => {
    const [buttonStatus, setbuttonStatus] = useState(false)

    return (
        <div className='h-[100%] py-[1%] font-poppins'>
            { sessionStorage.getItem('viewDetails') === 'false' ? 
            <div className='bg-white h-[25%] flex-row py-[1%] px-[2%] text-[#838383] border-[#F3F3F3] border-b-2 p-[1%] flex rounded-xl'>
                <div className='w-[20%] p-[0.5%] pl-[3%] flex'>
                  <img src={Logo} className='w-auto h-[100%] rounded-[50px]' alt="Logo"/>
                </div>
                <div className='w-[55%] justify-center items-left px-[1%] py-[2%] flex flex-col'>
                  <p className='text-[1.5em] text-black text-bold'>J & J Lechon Belly House</p>
                  <p className='text-[1.2em] text-black'>Talamban, Cebu City, Philippines</p>
                  <p className='text-[1.2em] text-[#838383] flex'><IoPeopleOutline className='text-[1.5em]'/> 10 members</p>
                </div>
                <div className='w-[25%] flex flex-col p-[1%] justify-center items-center text-black'>
                    <div className='hover:cursor-pointer w-auto h-auto transition-all' onClick={()=>setbuttonStatus(!buttonStatus)}>
                        <SlOptions className='text-[1.5em]'/>
                        {buttonStatus && 
                        <div className='w-[100%] items-right'>
                            <div className='bg-green-300 p-[1%] w-[110%] text-center border-[#838383] border-2 rounded-lg' onClick={()=>sessionStorage.setItem('viewDetails','true')}>
                                <p>View More</p>
                            </div>
                        </div>
                        }
                    </div>
                </div>
              </div>
            : <MerchantTeamDeets/>
            }
        </div>
    )
}

export default MerchantTeams