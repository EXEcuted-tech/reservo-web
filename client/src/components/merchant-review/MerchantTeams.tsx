import React, {useState} from 'react'
import {SlOptions} from 'react-icons/sl'
import {IoPeopleOutline} from 'react-icons/io5'
import Logo from '../../assets/jjlogo.png'
import MerchantTeamDeets from './MerchantTeamDeets'

sessionStorage.setItem('viewDetails', 'false')

const MerchantTeams = () => {
    const [buttonStatus, setbuttonStatus] = useState(false)

    return (
        <div className='w-[100%] h-[90vh] py-[1%] mt-[3%] font-poppins overflow-y-auto animate-fade-in xs:max-sm:w-[105%] xs:max-sm:p-2 xs:max-sm:ml-[-2%]'>
            { sessionStorage.getItem('viewDetails') === 'false' ?
            <div className='bg-white h-[25%] flex-row py-[1%] px-[2%] text-[#838383] border-[#F3F3F3] border-b-2 p-[1%] flex rounded-xl '>
                <div className='w-[20%] p-[0.5%] pl-[3%] flex xs:max-sm:pr-[2%] xs:max-sm:mt-[13%]'>
                  <img src={Logo} className='w-auto h-[100%] rounded-[50px] xs:max-sm:h-[5rem]' alt="Logo"/>
                </div>
                <div className='w-[55%] justify-center items-left px-[1%] py-[2%] flex flex-col'>
                  <p className='text-[1.5em] text-black font-bold xs:max-sm:text-[0.8em] xl:max-2xl:text-[1em]'>J & J Lechon Belly House</p>
                  <p className='text-[1em] text-black xs:max-sm:text-[0.7em] xl:max-2xl:text-[0.8em]'>Talamban, Cebu City, Philippines</p>
                  <p className='text-[0.9m] text-[#838383] flex xs:max-sm:text-[0.7em] xl:max-2xl:text-[0.7em]'><IoPeopleOutline className='text-[1.5em]'/> 10 members</p>
                </div>

                <div className='w-[25%] flex flex-col p-[1%] justify-center items-center text-black '>
                    <div className='hover:cursor-pointer w-[8rem] h-auto transition-all xl:max-2xl:w-[6rem]' onClick={()=>setbuttonStatus(!buttonStatus)}>
                        <SlOptions className='text-[1.5em] xs:max-sm:text-[0.8em] xl:max-2xl:text-[1.1em] xs:max-sm:ml-[50%]'/>
                        {buttonStatus && 
                        <div className='w-[100%] items-right animate-fade-in xs:max-sm:ml-[7%]'>
                            <div className='bg-[#1b6e1e] p-[3%] w-full text-[0.9em] text-white text-center border-2 rounded-lg
                            hover:bg-[#00962a] transition-colors delay-250 duration-[3000] ease-in xs:max-sm:w-[25vw] xs:max-sm:text-[0.7em] xl:max-2xl:text-[0.7em]
                            'onClick={()=>sessionStorage.setItem('viewDetails','true')}>
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