import React, { useEffect, useState } from 'react'
import {RiNewspaperFill} from 'react-icons/ri'
import {AiFillCloseCircle} from 'react-icons/ai'
import {BsFillTrashFill} from 'react-icons/bs'
import config from '../../../common/config'
import axios from 'axios'
import GenSpinner from '../../loaders/genSpinner'

const ViewModal:React.FC<ViewModalProps> = (props) => {
  const [resId,setResId]=useState(0);
  const [record,setRecord]=useState<ReserveCardProps[]>([]);
  const [existingList, setExistingList] = useState<
  Array<{
    label: string;
    type: string;
    value: string;
  }>
  >([]);  
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [contactNo,setContactNo] = useState("");
  const [inventory,setInventory] = useState<Inventory | null>(null);
  const [isLoading,setIsLoading] = useState(false);
  const {setOpenModalView} = props;

  useEffect(()=>{
    const current=sessionStorage.getItem('res_id');
    if(current!==null){
      const currentId = parseInt(current,10);
      setResId(currentId);
    }
  },[])

  useEffect(() => {
    const timer = setTimeout(() => {getRecord();}, 500);
    return () => clearTimeout(timer);
  }, [resId]);

  useEffect(() => {
    const timer = setTimeout(() => {getClientInfo()}, 500);
    return () => clearTimeout(timer);
  }, [record]);

  useEffect(() => {
    const timer = setTimeout(() => {getInventory()}, 500);
    return () => clearTimeout(timer);
  }, [record]);

  const getRecord = () => {
    const col = "reservation_id";
    const val = resId;
    setIsLoading(false);
    axios.get(`${config.API}/reserve/retrieve?col=${col}&val=${val}`)
    .then((res)=>{
       if(res.status === 200){
        setRecord(res.data.records)
        const addDeets = JSON.parse(res.data.records[0].settings);
        addDeets !=null && setExistingList(addDeets?.additional_details);
       }
    })
    setTimeout(()=>{setIsLoading(true)},2500);
  }

  const getClientInfo = () => {
    const col = "account_id";
    const val = record[0]?.account_id;
    setIsLoading(false);
    axios.get(`${config.API}/user/retrieve?col=${col}&val=${val}`)
    .then((res)=>{
       if(res.status === 200){
        
        const user = res.data.users[0];
        setName(user?.account_name);
        setEmail(user?.email_address);
        setContactNo(user?.contact_number);
       }
       setTimeout(()=>{setIsLoading(true)},2500);
    })
  }

  const getInventory = () => {
    const col = "inventory_id";
    const val = record[0]?.inventory_id;
    setIsLoading(false);
    axios.get(`${config.API}/inventory/retrieve?col=${col}&val=${val}`)
    .then((res)=>{
       if(res.status === 200){
       
        const inventoryData = res.data.records[0];
        setInventory({
          no_of_tables: inventoryData?.no_of_tables,
          no_of_chairs: inventoryData?.no_of_chairs,
          no_of_plates: inventoryData?.no_of_plates,
          no_of_glasses: inventoryData?.no_of_glasses,
          no_of_tableCloths: inventoryData?.no_of_tableCloths,
          no_of_chairCovers: inventoryData?.no_of_chairCovers,
        });
       }
       setTimeout(()=>{setIsLoading(true)},500);
    })
  }

  const formatDate = (date: Date) => {
    if (date instanceof Date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); 
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return '';
  };
  
  return (
    <div className='bg-[rgba(0,0,0,0.6)] w-[100vw] h-[100vh] z-10 absolute top-0 left-0 duration-100 animate-fade-in overflow-hidden xs:max-sm:z-[1001] xs:max-sm:h-[110vh]'>
    <div className="animate-slide-up font-poppins fixed top-[5%] left-[18%] right-0 bg-white z-[100] bg-[rgba(0, 0, 0, 0.5)] w-[70%] p-4 overflow-x-hidden overflow-y-auto h-[90%] drop-shadow rounded-3xl xs:max-sm:w-[90%] xs:max-sm:left-[5%] xs:max-sm:z-[1001]">
      {!isLoading 
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
                    <h1 className='font-bold text-[1.5em] xs:max-sm:text-[1.2em] xl:max-2xl:text-[1.2em]'>Reservation Details</h1>   
                    <p className='mt-[-1%] text-[1.2em] xs:max-sm:text-[0.9em] xl:max-2xl:text-[0.9em]'>ID: {resId}</p>
                </div>
            </div>
            <div className='mt-[0.5%]'>
                <AiFillCloseCircle className='text-[2.5em] hover:cursor-pointer xs:max-sm:text-[1.8em] xl:max-2xl:text-[1.8em]'
                 onClick={()=>{
                  sessionStorage.removeItem('res_id');
                  setOpenModalView(false)
                }}/>
            </div>
        </div>
        <hr className='h-[2px] w-full my-[1.2%] bg-gray-200 border-0'/>
        
        <h1 className='font-bold uppercase text-[1.5em] ml-[2%] bg-[#840705] inline-block text-white px-[1%] rounded-lg mb-[0.5%] xs:max-sm:text-[1.1em] xs:max-sm:mt-[3%] xs:max-sm:mb-[1%] xl:max-2xl:text-[1.0em]'>
          General Information</h1>
        <div className='flex mx-[2%] text-[1.2em] xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.8em]'>
          <div className='w-[50%]'>
            <p className='my-[1%]'><span className='font-bold'>Event Date: </span>{formatDate(new Date(record[0]?.res_date))}</p>
            <p className='my-[1%]'><span className='font-bold'>Event Time: </span>{record[0]?.res_time}</p>
            <p className='my-[1%]'><span className='font-bold'>Event Size: </span>{record[0]?.party_size}</p>
            <p className='my-[1%]'><span className='font-bold'>Location: </span>{record[0]?.res_location}</p>
            <p className='my-[1%]'><span className='font-bold'>Remarks: </span>{
              record[0]?.additional_details !=null ? record[0]?.additional_details : "No Remarks."
            }</p>
          </div>
          <div className='w-[50%]'>
            <p className='my-[1%]'><span className='font-bold'>Date Booked: </span>{formatDate(new Date(record[0]?.date_received))}</p>
            <p className='my-[1%]'><span className='font-bold'>Client Name: </span>{name}</p>
            <p className='my-[1%]'><span className='font-bold'>Email: </span>{email}</p>
            <p className='my-[1%]'><span className='font-bold'>Contact Number: </span>{contactNo}</p>
            <p className='my-[1%]'><span className='font-bold'>Status: </span>{record[0]?.status}</p> {/*Ako pani iedit ang ui ani pero pls insert the value na nya there*/}
          </div>
        </div>


        <h1 className='font-bold uppercase text-[1.5em] ml-[2%] bg-[#840705] inline-block px-[1%] mt-[2%] text-white rounded-lg mb-[0.5%] xs:max-sm:text-[1.1em] xl:max-2xl:text-[1.0em]'>Inventory</h1>
        <div className='flex mx-[2%] text-[1.2em] xs:max-sm:text-[0.8em] xs:max-sm:mb-[5%] xl:max-2xl:text-[0.8em]'>
          <div className='w-[33%] xs:max-sm:w-[50%]'>
            <p className={`my-[1%]`}><span className={`font-bold`}>No. of Tables: </span>
              <span className={`${inventory?.no_of_tables == null && 'italic text-gray-400'}`}>
                {inventory?.no_of_tables != null ? inventory?.no_of_tables : "To be added."}
              </span>
            </p>
            <p className='my-[1%]'><span className='font-bold'>No. of Chairs: </span>
              <span className={`${inventory?.no_of_chairs == null && 'italic text-gray-400'}`}>
                {inventory?.no_of_chairs != null ? inventory?.no_of_chairs : "To be added."}
              </span>
            </p>
            <p className='my-[1%]'><span className='font-bold'>No. of Plates: </span>
              <span className={`${inventory?.no_of_plates == null && 'italic text-gray-400'}`}>
                {inventory?.no_of_plates != null ? inventory?.no_of_plates : "To be added."}
              </span>
            </p>
          </div>
          <div className='w-[33%] xs:max-sm:w-[50%]'>
            <p className='my-[1%]'><span className='font-bold'>No. of Glasses: </span>
              <span className={`${inventory?.no_of_glasses == null && 'italic text-gray-400'}`}>
                {inventory?.no_of_glasses != null ? inventory?.no_of_glasses : "To be added."}
              </span>
            </p>
            <p className='my-[1%]'><span className='font-bold'>No. of Table Cloths: </span>
              <span className={`${inventory?.no_of_tableCloths == null && 'italic text-gray-400'}`}>
                {inventory?.no_of_tableCloths != null ? inventory?.no_of_tableCloths : "To be added."}
              </span>
            </p>
            <p className='my-[1%]'><span className='font-bold'>No. of Chair Covers: </span>
              <span className={`${inventory?.no_of_chairCovers == null && 'italic text-gray-400'}`}>
                {inventory?.no_of_chairCovers != null ? inventory?.no_of_chairCovers : "To be added."}
              </span>            
            </p>
          </div>
        </div>

        <h1 className='font-bold uppercase text-[1.5em] ml-[2%] bg-[#840705] inline-block px-[1%] mt-[2%] text-white text-center rounded-lg mb-[0.5%] xs:max-sm:text-[1.1em] xl:max-2xl:text-[1.0em]'>
          Additional Information</h1>
        <div className='flex mx-[2%] text-[1.2em] xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.6em] w-full'>

          {existingList?.length > 0 ? (
                  <div className="flex w-full flex-wrap">
                  {existingList.map((item: any, index: number) => (
                    <div className='w-[33%]'>
                      <p className='my-[0.5%]'><span className='font-bold mr-[3%]'>{`${item.label}:`}</span>{`${item.value}`} </p>
                    </div>
                  ))}
                  </div>
                  )
              :
              <div>
                <h1 className='italic text-[1em] xl:max-2xl:text-[1.3em]'>User did not input additional details.</h1>
              </div>
            }


          {/* <div className='w-[33%]'>
            <p className='my-[1%]'><span className='font-bold'>Date: </span>{"January 13,2023"}</p>
          </div>
          <div className='w-[33%]'>
            <p className='my-[1%]'><span className='font-bold'>Event Size: </span>{"January 13,2023"}</p>
          </div>
          <div className='w-[33%]'>
            <p className='my-[1%]'><span className='font-bold'>Event Size: </span>{"January 13,2023"}</p>
          </div> */}
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

export default ViewModal