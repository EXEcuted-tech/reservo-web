import { useContext, useState } from 'react'
import { mainContext } from '../../../pages/merchant/reservationManager/mainPage';
import { AiFillCloseCircle } from 'react-icons/ai';
import { RiNewspaperFill } from 'react-icons/ri';
import GenSpinner from '../../loaders/genSpinner';
import { HiMiniPencilSquare } from 'react-icons/hi2';

const SetMerchantScheduleModal = (props:any) =>{
    const merchID = localStorage.getItem("merch_id");
    const [showSetMerchSchedModal, setShowSetMerchSchedModal]:any = useContext(mainContext);
    const [isLoading, setIsLoading] = useState(false);
    const [is24Hour, setIs24Hour] = useState(true);
    const [dow, setDow] = useState<{
      Sun: boolean;
      Mon: boolean;
      Tue: boolean;
      Wed: boolean;
      Thu: boolean;
      Fri: boolean;
      Sat: boolean;
    }>({
      Sun: false,
      Mon: false,
      Tue: false,
      Wed: false,
      Thu: false,
      Fri: false,
      Sat: false,
    });

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
          
          <div className='w-[100%]'>
            <p className='my-[1%]'><span className='font-bold'>Time Open: </span>
            <input type="time" className='h-[4vh] w-[8vw] ml-[1vw] border rounded-md p-[1%] text-sm'/>
            </p>
            <p className='my-[1%]'><span className='font-bold'>Time Close: </span>
            <input type="time" className='h-[4vh] w-[8vw] ml-[0.9vw] border rounded-md p-[1%] text-sm'/>
            </p>
            <p className='my-[1%]'><span className='font-bold'>Is 24-Hour: </span>
            <label>
                    <input
                      type="checkbox"
                      value="yes"
                      checked={is24Hour}
                      onChange={() => setIs24Hour(!is24Hour)}
                      className='ml-[1.2vw]'
                    />
                    <span className='ml-[0.5vw]'>Yes</span>
                  </label>
        
      
            </p>
            <p className='my-[1%]'>
                  <span className='font-bold'>Days Available: </span>
                  {Object.keys(dow).map((day, index) => (
                    <button
                      key={index}
                      className={`${dow[day as keyof typeof dow] === true? 'bg-green-400': 'bg-red-800 text-white'} w-[4vw] text-center mx-[1vw] border p-[1%] rounded-md  duration-75`}
                      onClick={() => {
                        console.log("DOW ==>",day, " : ", dow[day as keyof typeof dow])
                        setDow((prevDow) => ({
                          ...prevDow,
                          [day]: !prevDow[day as keyof typeof dow],
                        }))
                      }
                    }
                    >
                      {day}
                    </button>
                  ))}
                </p>
            <p className='my-[1%]'><span className='font-bold'>Status: </span><input type="text" className='h-[4vh] w-[15vw] ml-[0.9vw] border rounded-md p-[1%] text-sm'/></p>
          </div>
        </div>


       
            


          
        

        <div className='fixed bottom-[2%] ml-[-1%] w-[100%]'>
          <hr className=' w-[100%] h-[1px] bg-black border-0'/>       
          <div className='flex justify-end mr-[3%] mt-[1%] xs:max-sm:mr-[7%] xs:max-sm:mt-[1%]'>
            <button className='flex text-white text-[1.1em] bg-green-700 px-[2%] py-[0.5%] rounded-2xl xl:max-2xl:text-[0.8em]
            hover:bg-green-600  transition-colors delay-450 duration-[3000] ease-in-out xs:max-sm:text-[0.8em]'>
              <HiMiniPencilSquare className='mt-[5%] pr-[5%] '
              onClick={()=>{
                
              }}
              />Save</button>
          </div>
        </div>
        </>
      }
      </div>
   </div>
  )
}

export default SetMerchantScheduleModal;
