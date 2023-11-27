import { useContext } from 'react'
import { IoCloseCircle } from 'react-icons/io5';
import { mainContext } from '../../../pages/merchant/reservationManager/mainPage';
const SetMerchantScheduleModal = (props:any) =>{
    const merchID = localStorage.getItem("merch_id");
    const [showSetMerchSchedModal, setShowSetMerchSchedModal]:any = useContext(mainContext);

  return (
  <div className=' absolute w-[100vw] h-[100vh] top-0 left-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm'>
    <div className='flex justify-center items-center'>
      {/*This is the modal container*/}
    <div className='flex flex-col z-[1000] w-[70vw] h-[80vh] mt-[10vh] bg-slate-50 z-100 rounded-lg'>
      <button className='w-[12vw]' onClick={()=>setShowSetMerchSchedModal(false)}><IoCloseCircle/>
      setMerchantScheduleModal
      </button>
      </div>

      </div>
   </div>
  )
}

export default SetMerchantScheduleModal
