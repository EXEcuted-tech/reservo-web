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
        // console.log("RESULT: ",res.data);
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
        console.log("RESULT: ",res.data);
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
    <div className="animate-slide-up font-poppins fixed top-[8%] left-[18%] right-0 bg-white z-50 bg-[rgba(0, 0, 0, 0.5)] w-[70%] p-4 overflow-x-hidden overflow-y-auto h-[80%] drop-shadow rounded-3xl">
      {!isLoading 
       ?
        <div className='flex justify-center ml-[-2%] mt-[25%]'>
          <GenSpinner/>
        </div>
      :
        <>
                <div className='flex w-full h-[5vh]'>
            <div className='flex items-center w-[96%] mt-[0.5%]'>
                <RiNewspaperFill className='text-[2.8em] ml-[1%] mr-[1%]'/>
                <div>
                    <h1 className='font-bold text-[1.5em]'>Reservation Details</h1>   
                    <p className='mt-[-1%] text-[1.2em]'>ID: {resId}</p>
                </div>
            </div>
            <div className='mt-[0.5%]'>
                <AiFillCloseCircle className='text-[2.5em] hover:cursor-pointer'
                 onClick={()=>{
                  sessionStorage.removeItem('res_id');
                  setOpenModalView(false)
                }}/>
            </div>
        </div>
        <hr className='h-[2px] w-full my-[1.2%] bg-gray-200 border-0'/>
        
        <h1 className='font-bold uppercase text-[1.5em] ml-[2%] bg-[#840705] inline-block text-white px-[1%] rounded-lg mb-[0.5%]'>General Information</h1>
        <div className='flex mx-[2%] text-[1.2em]'>
          <div className='w-[50%]'>
            <p className='my-[1%]'><span className='font-bold'>Event Date: </span>{formatDate(new Date(record[0]?.res_date))}</p>
            <p className='my-[1%]'><span className='font-bold'>Event Time: </span>{record[0]?.res_time}</p>
            <p className='my-[1%]'><span className='font-bold'>Event Size: </span>{record[0]?.party_size}</p>
            <p className='my-[1%]'><span className='font-bold'>Location: </span>{record[0]?.res_location}</p>
            <p className='my-[1%]'><span className='font-bold'>Remarks: </span>{record[0]?.additional_details}</p>
          </div>
          <div className='w-[50%]'>
            <p className='my-[1%]'><span className='font-bold'>Date Booked: </span>{formatDate(new Date(record[0]?.date_received))}</p>
            <p className='my-[1%]'><span className='font-bold'>Client Name: </span>{name}</p>
            <p className='my-[1%]'><span className='font-bold'>Email: </span>{email}</p>
            <p className='my-[1%]'><span className='font-bold'>Contact Number: </span>{contactNo}</p>
            <p className='my-[1%]'><span className='font-bold'>Status: </span>{record[0]?.status}</p> {/*Ako pani iedit ang ui ani pero pls insert the value na nya there*/}
          </div>
        </div>


        <h1 className='font-bold uppercase text-[1.5em] ml-[2%] bg-[#840705] inline-block px-[1%] mt-[2%] text-white rounded-lg mb-[0.5%]'>Inventory</h1>
        <div className='flex mx-[2%] text-[1.2em]'>
          <div className='w-[33%]'>
            <p className='my-[1%]'><span className='font-bold'>No. of Tables: </span>{inventory?.no_of_tables}</p>
            <p className='my-[1%]'><span className='font-bold'>No. of Chairs: </span>{inventory?.no_of_chairs}</p>
            <p className='my-[1%]'><span className='font-bold'>No. of Plates: </span>{inventory?.no_of_plates}</p>
          </div>
          <div className='w-[33%]'>
            <p className='my-[1%]'><span className='font-bold'>No. of Glasses: </span>{inventory?.no_of_glasses}</p>
            <p className='my-[1%]'><span className='font-bold'>No. of Table Cloths: </span>{inventory?.no_of_tableCloths}</p>
            <p className='my-[1%]'><span className='font-bold'>No. of Chair Covers: </span>{inventory?.no_of_chairCovers}</p>
          </div>
        </div>

        <h1 className='font-bold uppercase text-[1.5em] ml-[2%] bg-[#840705] inline-block px-[1%] mt-[2%] text-white text-center rounded-lg mb-[0.5%]'>Additional Information</h1>
        <div className='flex mx-[2%] text-[1.2em]'>
          <p className='font-bold text-[1.8em]'>Coming Soon</p>
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
          <div className='flex justify-end mr-[3%] mt-[1%]'>
            <button className='flex text-white text-[1.1em] bg-[#DD2803] px-[2%] py-[0.5%] rounded-2xl hover:bg-[#840705] transition-colors delay-450 duration-[3000] ease-in-out'>
              <BsFillTrashFill className='mt-[2%]'/>Delete</button>
          </div>
        </div>
        </>
      }

    </div>
  )
}

export default ViewModal