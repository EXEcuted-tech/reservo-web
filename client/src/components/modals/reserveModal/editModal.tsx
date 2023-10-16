import React, { useEffect, useState } from 'react'
import {GrUpdate} from 'react-icons/gr'
import {AiFillCloseCircle, AiFillSave} from 'react-icons/ai'
import axios from 'axios';
import config from '../../../common/config';

const EditModal:React.FC<EditModalProps> = (props) => {

  useEffect(() => {
    axios.get("http://localhost:5000/reserve/retrieve_all").then((res) => {
      // Parse date strings into Date objects
      const parsedReservations = res.data.records.map((record: any) => ({
        ...record,
        res_date: new Date(record.res_date),
      }));

      // Set the reservations in state
      setReservations(parsedReservations);
    });
  }, []);


  const {setOpenModalEdit} = props;
  const [record,setRecord]=useState<ReserveCardProps[]>([]);
  const editId = Number(sessionStorage.getItem('res_id'));

  useEffect(()=>{
    retrieveExisting();
  },[editId])

  useEffect(()=>{
    console.log("Retrieve: ",record);
  },[])

  const retrieveExisting = () =>{
    const col = "reservation_id";
    const val = editId;
    // setIsLoading(false);
    axios.get(`${config.API}/reserve/retrieve?col=${col}&val=${val}`)
    .then((res)=>{
        console.log("Result? ",res);
       if(res.status === 200){
        setRecord(res.data.records)
       }
    })
    // setTimeout(()=>{setIsLoading(true)},2500);
  }

  const updateRecord = (event: { preventDefault: () => void }) => {
    event.preventDefault();


  }

  return (
    <div className="animate-slide-up font-poppins fixed top-[7%] left-[18%] right-0 bg-white z-50 bg-[rgba(0, 0, 0, 0.5)] w-[70%] p-4 overflow-x-hidden overflow-y-auto h-[80%] drop-shadow rounded-3xl">
        <div className='flex w-full h-[5vh]'>
            <div className='flex items-center w-[96%] mt-[0.5%]'>
                <div className='flex items-center w-[100%] ml-[1%]'>
                    <GrUpdate className='mr-[1%] text-[2em]'/>
                    <h1 className='font-bold text-[1.5em]'>Update Reservation Record</h1>   
                </div>
            </div>
            <div className='mt-[0.5%]'>
                <AiFillCloseCircle className='text-[2.5em] hover:cursor-pointer'
                 onClick={()=>{setOpenModalEdit(false)}}/>
            </div>
        </div>
        <hr className='h-[2px] w-full my-[1.2%] bg-gray-200 border-0'/>

        {/* General Information */}
        <h1 className='font-bold uppercase text-[1.5em] ml-[4%] bg-[#840705] inline-block text-white px-[1%] rounded-lg mb-[0.5%]'>General Section</h1>
        <div className='flex ml-[4%] mr-[2%] text-[1.2em] w-full'>
          <div className='w-[33%]'>
            <div className='mb-[2.5%]'>
                <p className='mt-[1.5%] mb-[0.3%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
            <div className='mb-[2.5%]'>
                <p className='mt-[1.5%] mb-[0.3%] mr-[1%]'>Package</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
            <div className='mb-[2.5%]'>
                <p className='mt-[1.5%] mb-[0.3%] mr-[1%]'>Amount Paid</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
          </div>
          <div className='w-[33%]'>
          <div className='mb-[2.5%]'>
                <p className='mt-[1.5%] mb-[0.3%] mr-[1%]'>Time Start</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
            <div className='mb-[2.5%]'>
                <p className='mt-[1.5%] mb-[0.3%] mr-[1%]'>Location</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
            <div className='mb-[2.5%]'>
                <p className='mt-[1.5%] mb-[0.3%] mr-[1%]'>Balance</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
          </div>
          <div className='w-[33%]'>
          <div className='mb-[2.5%]'>
                <p className='mt-[1.5%] mb-[0.3%] mr-[1%]'>Event Size</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
            <div className='mb-[2.5%]'>
                <p className='mt-[1.5%] mb-[0.3%] mr-[1%]'>Contact Number</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
            <div className='mb-[2.5%]'>
                <p className='mt-[1.5%] mb-[0.3%] mr-[1%]'>Reservation Status</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
          </div>
        </div>
        <div className='flex ml-[4%] text-[1.2em]'>
            <div className='mb-[2.5%] w-full'>
                    <p className='mt-[1.5%] mb-[0.3%] mr-[1%]'>Additional Details</p>
                    <input type="date" className='border border-gray-500 w-[92.9%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
        </div>
        {/* Inventory */}
        <h1 className='font-bold uppercase text-[1.5em] ml-[4%] bg-[#840705] inline-block text-white px-[1%] mt-[2%] rounded-lg mb-[0.5%]'>Inventory</h1>
        <div className='flex ml-[4%] text-[1.2em] w-full'>
          <div className='w-[50%]'>
            <div className='mb-[2.5%]'>
                <p className='mt-[1.5%] mb-[0.3%] mr-[1%]'>No. of Tables</p>
                <input type="date" className='border border-gray-500 w-[80%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
            <div className='mb-[2.5%]'>
                <p className='mt-[1.5%] mb-[0.3%] mr-[1%]'>No. of Chairs</p>
                <input type="date" className='border border-gray-500 w-[80%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
            <div className='mb-[2.5%]'>
                <p className='mt-[1.5%] mb-[0.3%] mr-[1%]'>No. of Plates</p>
                <input type="date" className='border border-gray-500 w-[80%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
          </div>
          <div className='w-[50%]'>
          <div className='mb-[2.5%]'>
                <p className='mt-[1.5%] mb-[0.3%] mr-[1%]'>No. of Glasses</p>
                <input type="date" className='border border-gray-500 w-[80%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
            <div className='mb-[2.5%]'>
                <p className='mt-[1.5%] mb-[0.3%] mr-[1%]'>No. of Table Cloths</p>
                <input type="date" className='border border-gray-500 w-[80%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
            <div className='mb-[2.5%]'>
                <p className='mt-[1.5%] mb-[0.3%] mr-[1%]'>No. of Chair Covers</p>
                <input type="date" className='border border-gray-500 w-[80%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
          </div>
        </div>  

        {/* Additional Details */}
        <h1 className='font-bold uppercase text-[1.5em] ml-[4%] bg-[#840705] inline-block text-white px-[1%] mt-[2%] rounded-lg mb-[0.5%]'>Additional Details</h1>
        <div className='flex ml-[4%] mr-[2%] text-[1.2em]'>
        <h1 className='font-medium text-[1.4em] italic'>Coming Soon</h1>
          {/* <div className='w-[33%]'>
            <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
            <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
          </div>
          <div className='w-[33%]'>
          <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
            <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
          </div>
          <div className='w-[33%]'>
          <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
            <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
          </div> */}
        </div>  


        <div className='relative bottom-[2%] top-[2%] mb-[2%] w-[100%]'>
          <hr className=' w-[100%] h-[1px] bg-black border-0'/>       
          <div className='flex justify-end mr-[3%] mt-[1%]'>
            <button className='flex text-white text-[1.1em] bg-[#17A200] px-[2%] py-[0.5%] rounded-2xl hover:bg-[#117600] transition-colors delay-450 duration-[3000] ease-in-out '>
              <AiFillSave className='mt-[2%] text-[1.2em] mr-[1%]'/> Save</button>
            
          </div>
        </div>
    </div>
  )
}

export default EditModal