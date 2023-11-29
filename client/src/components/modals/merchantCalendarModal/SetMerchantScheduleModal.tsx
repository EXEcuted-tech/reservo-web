import { useContext, useState } from 'react'
import { IoCloseCircle } from 'react-icons/io5';
import { mainContext } from '../../../pages/merchant/reservationManager/mainPage';
import { BsFillTrashFill } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import { RiNewspaperFill } from 'react-icons/ri';
import GenSpinner from '../../loaders/genSpinner';

const SetMerchantScheduleModal = (props:any) =>{
    const merchID = localStorage.getItem("merch_id");
    const [showSetMerchSchedModal, setShowSetMerchSchedModal]:any = useContext(mainContext);
    const [isLoading, setIsLoading] = useState(false);

  return (
  <div className=' z-[2000] absolute w-[100vw] h-[100vh] top-0 left-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm'>
    <div className="animate-slide-up font-poppins fixed top-[5%] left-[18%] right-0 bg-white z-[1001] bg-[rgba(0, 0, 0, 0.5)] w-[70%] p-4 overflow-x-hidden overflow-y-auto h-[90%] drop-shadow rounded-3xl xs:max-sm:w-[90%] xs:max-sm:left-[5%] xs:max-sm:z-[1001] xs:max-sm:top-[7%]">
      {isLoading 
       ?
        <div className='flex justify-center ml-[-2%] mt-[25%]'>
          <GenSpinner/>
        </div>
      :
        <>
      <div className='flex w-full h-[5vh]'>
            <div className='flex items-center w-[96%] mt-[0.5%]'>
                <RiNewspaperFill className='text-[2.8em] ml-[1%] mr-[1%] xs:max-sm:text-[2em] xl:max-2xl:text-[2em]'/>
                <div>
                    <h1 className='font-bold text-[1.5em] xs:max-sm:text-[1.2em] xl:max-2xl:text-[1.2em]'>Set Schedule</h1>   
                    <p className='mt-[-1%] text-[1em] xs:max-sm:text-[0.5em] xl:max-2xl:text-[0.7em]'>Set specific schedules for your customers to reserve</p>
                </div>
            </div>
            <div className='mt-[0.5%]'>
                <AiFillCloseCircle className='text-[2.5em] hover:cursor-pointer xs:max-sm:text-[1.8em] xl:max-2xl:text-[1.8em]'
                 onClick={()=>{
                  setShowSetMerchSchedModal(false)
                }}/>
            </div>
        </div>
        <hr className='h-[2px] w-full my-[1.2%] bg-gray-200 border-0'/>
        
        <h1 className='font-bold uppercase text-[1.5em] ml-[2%] bg-[#840705] inline-block text-white px-[1%] rounded-lg mb-[0.5%] xs:max-sm:text-[1.1em] xs:max-sm:mt-[3%] xs:max-sm:mb-[1%] xl:max-2xl:text-[1.0em]'>
          Default Schedule</h1>
        <div className='flex mx-[2%] text-[1.2em] xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.8em]'>
          
          <div className='w-[50%]'>
            <p className='my-[1%]'><span className='font-bold'>Time Open: </span>8:00 AM</p>
            <p className='my-[1%]'><span className='font-bold'>Time Close: </span>8:00 PM</p>
            <p className='my-[1%]'><span className='font-bold'>Is 24-Hour: </span>No</p>
            <p className='my-[1%]'><span className='font-bold'>Days Available: </span>Mon, Tue, Wed, Thu, Fri, Sat</p>
            <p className='my-[1%]'><span className='font-bold'>Status: </span>1 - Active</p>
          </div>
        </div>


        <h1 className='font-bold uppercase text-[1.5em] ml-[2%] bg-[#840705] inline-block px-[1%] mt-[2%] text-white rounded-lg mb-[0.5%] xs:max-sm:text-[1.1em] xl:max-2xl:text-[1.0em]'>Inventory</h1>
        <div className='flex mx-[2%] text-[1.2em] xs:max-sm:text-[0.8em] xs:max-sm:mb-[5%] xl:max-2xl:text-[0.8em]'>
          <div className='w-[33%] xs:max-sm:w-[50%]'>
            
          </div>
          <div className='w-[33%] xs:max-sm:w-[50%]'>
            
          </div>
        </div>

        <h1 className='font-bold uppercase text-[1.5em] ml-[2%] bg-[#840705] inline-block px-[1%] mt-[2%] text-white text-center rounded-lg mb-[0.5%] xs:max-sm:text-[1.1em] xl:max-2xl:text-[1.0em]'>
          Additional Information</h1>
        <div className='flex mx-[2%] text-[1.2em] xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.6em] w-full'>

          
              
              <div>
                <h1 className='italic text-[1em] xl:max-2xl:text-[1.3em]'>User did not input additional details.</h1>
              </div>
            


          
        </div>

        <div className='fixed bottom-[2%] ml-[-1%] w-[100%]'>
          <hr className=' w-[100%] h-[1px] bg-black border-0'/>       
          <div className='flex justify-end mr-[3%] mt-[1%] xs:max-sm:mr-[7%] xs:max-sm:mt-[1%]'>
            <button className='flex text-white text-[1.1em] bg-[#DD2803] px-[2%] py-[0.5%] rounded-2xl xl:max-2xl:text-[0.8em]
            hover:bg-[#840705] transition-colors delay-450 duration-[3000] ease-in-out xs:max-sm:text-[0.8em]'>
              <BsFillTrashFill className='mt-[5%] pr-[5%] '/>Delete</button>
          </div>
        </div>
        </>
      }
      </div>
   </div>
  )
}

export default SetMerchantScheduleModal;
