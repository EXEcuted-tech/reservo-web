import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { RiNewspaperFill } from 'react-icons/ri';
import GenSpinner from '../loaders/genSpinner';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import config from '../../common/config';
import axios from 'axios';
import colors from '../../common/colors';
import { LiaSearchSolid } from 'react-icons/lia';
import { GoPencil } from 'react-icons/go';

function MerchSchedList(props:{
    year:number,
    month:number,
    day:number,
    count:number,
    close: Function,
    openView: any,
    openEdit: any
}) {

const [isLoading, setIsLoading] = useState(false);
const [data, setData] = useState([]);
const merchant_id = localStorage.getItem('merch_id');
const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const monthName = ["NULL", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const urlPart = window.location.pathname.split("/");
      var filter:string = '%';
      switch (urlPart[2]){
        case 'upcoming':
            filter = 'Ongoing%'
            break
        case 'finished':
            filter = 'Finished%';
            break;
        default:
             break;
      }

const fetchData = async (year:number, month:number, day:number)=>{
    try {
      const yy = String(year);
      const mm = String(month).padStart(2, '0'); // Ensure two digits for month
      const dd = String(day).padStart(2,'0');

      axios.get(`${config.API}/reserve/retrievenparams`, {
        params: {
          query: `merchant_id = ${merchant_id} AND res_date = '${yy}-${mm}-${dd}' AND status LIKE '${filter}' ORDER BY res_time ASC`
        },

        }).then((response)=>{
            setData(response.data.data);
        });
        
      } catch (err) {
        //PUT ERROR NOTIF 
      } 
}
// For Mobile
const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

useEffect(() => {
    setIsLoading(true);
    if (props.year && props.month && props.day) {
      fetchData(props.year, props.month, props.day);
      
    }
    setIsLoading(false);
  }, [props.year, props.month, props.day]);

  useEffect(() => {
  }, [data]);

//For Mobile
useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 640);
  };

  window.addEventListener('resize', handleResize);
  handleResize();

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);


  return (
    <>
    <div className='bg-[rgba(0,0,0,0.6)] w-[100vw] h-[100vh] z-10 absolute top-0 left-0 duration-100 animate-fade-in overflow-hidden xs:max-sm:z-[1001] xs:max-sm:h-[110vh]'>
    <div className="animate-slide-up font-poppins fixed top-[8%] left-[18%] right-0 bg-white z-50 bg-[rgba(0, 0, 0, 0.5)] w-[70%] p-4 overflow-x-hidden overflow-y-auto h-[80%] drop-shadow rounded-3xl xs:max-sm:w-[90%] xs:max-sm:left-[5%]">
      {isLoading 
       ?
        <div className='flex justify-center mt-[25%]'>
          <GenSpinner/>
        </div>
      :
        <>
        <div className='flex w-full h-[5vh]'>
            <div className='flex items-center w-[96%] mt-[0.5%]'>
                <RiNewspaperFill className='text-[2.8em] ml-[1%] mr-[1%] xs:max-sm:text-[2em] xl:max-2xl:text-[2em]'/>
                <div>
                    <h1 className='font-bold text-[1.5em] xs:max-sm:text-[1.2em] xl:max-2xl:text-[1.2em]'>Merchant Schedule</h1>   
                    <p className='mt-[-1%] text-[1.2em] xs:max-sm:text-[0.9em] xl:max-2xl:text-[0.9em]'>Events: {data.length}</p>
                </div>
            </div>
            <div className='mt-[0.5%]'>
                <AiFillCloseCircle className='text-[2.5em] hover:cursor-pointer xs:max-sm:text-[1.8em] xl:max-2xl:text-[1.8em]'
                 onClick={()=>{
                 props.close();
                }}/>
            </div>
        </div>
        <hr className='h-[2px] w-full my-[1.2%] bg-gray-200 border-0'/>
        
        <h1 className='font-bold uppercase text-[1.5em] ml-[2%] bg-[#840705] inline-block text-white px-[1%] rounded-lg mb-[0.5%] xs:max-sm:text-[1.0em] xs:max-sm:mt-[4%] xl:max-2xl:text-[1.0em]'>
          As of: {dayOfWeek[props.day%7]} - {monthName[props.month]}/{props.day}/{props.year}</h1>
        
        <div className='flex mx-[2%] py-[2%] text-[1.2em] xs:max-sm:text-[1em] xs:max-sm:mt-[3%]  xl:max-2xl:text-[1em]'>
            <table className="w-[100%] table-fixed">
                <thead className=''>
                    <th className='font-bold uppercase text-[1.0em] m1-[4%] px-[1%] mt-[2%] rounded-lg mb-[0.5%] xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.9em]'>
                    {isMobile ? "Reserve ID" : "Reservation ID"}</th>
                <th className='font-bold uppercase text-[1.0em] ml-[4%] px-[1%] mt-[2%]  rounded-lg mb-[0.5%] xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.9em]'>Client ID</th>
                <th className='font-bold uppercase text-[1.0em] ml-[4%] mt-[2%] rounded-lg mb-[0.5%] xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.9em]'>Time</th>
                <th className='font-bold uppercase text-[1.0em] ml-[4%] mt-[2%] rounded-lg mb-[0.5%] xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.9em]'>Status</th>
                <th className='font-bold uppercase text-[1.0em] ml-[4%] mt-[2%] rounded-lg mb-[0.5%] xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.9em]'>Actions</th>
            </thead>
            <tbody className=' scroll-auto'>
              { isLoading? <>
              <GenSpinner/>
              </>:<>
                {data.length > 0  ? ( 
                    <>
                    {data.map((reservation: any, index) => (
                        <tr className='mt-4 py-4 border-t-2 border-b-2 border-black border-solid' key={index}>
                        <td className='text-center text-[0.8em]'>{reservation.reservation_id}</td>
                        <td  className='text-center text-[0.8em]'>{reservation.account_id}</td>
                        <td className='text-center  text-[0.8em]'>{reservation.res_time}</td>
                        <td  className={`text-center text-[0.8em] font-bold xs:max-sm:text-[0.6em]
                          ${reservation.status === 'Finished'? 'text-green-800': ' text-blue-800'}`}>
                          <button className={`${reservation.status === 'Finished'? 'bg-green-200': ' bg-blue-200'} w-[50%] rounded-xl xs:max-sm:w-[80%]`}>
                            {reservation.status}</button></td>
                        <td className="flex flex-col items-center justify-center space-y-2 text-[0.8em] py-4">

                            <div className='w-full flex justify-center items-center font-semibold'>
                            <button
                                className="flex justify-center items-center w-[80%] bg-[#ffbb38] py-[3%] px-[15%] rounded-3xl xs:max-sm:text-[0.9em] xl:max-2xl:text-[0.9em] xl:max-2xl:mb-[3%]
                                hover:bg-[#ffe7ba] transition-colors delay-450 duration-[3000] ease-in-out"
                                onClick={() => {
                                  sessionStorage.setItem('res_id', reservation.reservation_id);
                                  props.openView(true);
                                }}
                            >
                                <LiaSearchSolid className="mr-[0.3rem] xs:max-sm:hidden" />
                                View
                            </button>
                            </div>
                            <div className='w-full flex justify-center items-center font-semibold text-[1em] xs:max-sm:font-medium'>
                            <button
                                className="flex justify-center items-center w-[80%] bg-[#ff8e4f] py-[3%] px-[18%] rounded-3xl xs:max-sm:text-[0.9em] xl:max-2xl:text-[1.1em] xl:max-2xl:mb-[7%] xl:max-2xl:px-[19%]
                                hover:bg-[#ffbe9b] transition-colors delay-450 duration-[3000] ease-in-out"
                                onClick={() => {
                                  sessionStorage.setItem('res_id', reservation.reservation_id);
                                  props.openEdit(true);
                                }}
                            >
                                <GoPencil className="ml-[-0.5rem] mr-[0.4rem] xs:max-sm:hidden" />
                                Edit
                            </button>
                            </div>
                        </td>
                        </tr>
                    ))}
                    </>
                ) : (
                    <tr>
                    <td className='text-center' colSpan={5}>Nothing to show for now.</td>
                    </tr>
                )}
</>}
                </tbody>


          </table>
          <p></p>
        </div>



        

    
        </>
      }

    </div>
    </div>
    </>
  )
}

MerchSchedList.propTypes = {}

export default MerchSchedList
