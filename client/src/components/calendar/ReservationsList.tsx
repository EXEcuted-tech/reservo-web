import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { RiNewspaperFill } from 'react-icons/ri';
import GenSpinner from '../loaders/genSpinner';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import config from '../../common/config';
import axios from 'axios';
import colors from '../../common/colors';

function ReservationsList(props:{
    year:number,
    month:number,
    day:number,
    count:number,
    close: Function,
}) {

const [isLoading, setIsLoading] = useState(false);
const [data, setData] = useState([]);
const merchant_id = localStorage.getItem('merch_id');
const dayOfWeek = ["NULL", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const monthName = ["NULL", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const fetchData = async (year:number, month:number, day:number)=>{
    try {
        const yy = String(year);
        const mm = String(month).padStart(2, '0'); // Ensure two digits for month
        const dd = String(day).padStart(2, '0'); //ensure two digits for day
        await axios.get(`${config.API}/reserve/retrieveTwo`, {
          params: {
            col1: 'res_date',
            val1: yy + '-' + mm + '-' + dd,
            col2: 'merchant_id',
            val2: merchant_id,
            orderVal: 'res_time',
            order: 'ASC'
          }
        }).then((response)=>{
            //console.log("COUNT ==> for date:", yy, "-", mm, "-", dd, "-->", response.data.count)
            setData(response.data.records);
            console.log("DATA from reservations list ===> ", data);
        });
        
      } catch (err) {
        console.log("AXIOS ERROR!!: ", err);
      } 
}

useEffect(() => {
    setIsLoading(true);
    if (props.year && props.month && props.day) {
      fetchData(props.year, props.month, props.day);
    }
    setIsLoading(false);
  }, [props.year, props.month, props.day]);

  useEffect(() => {
    // Log the data whenever it changes
    console.log("DATA from reservations list ===>", data);
  }, [data]);
  return (
    <>
    <div className='bg-[rgba(0,0,0,0.6)] w-[100vw] h-[100vh] z-20 absolute top-0 left-0'>
    <div className="animate-slide-up font-poppins fixed top-[8%] left-[18%] right-0 bg-white z-50 bg-[rgba(0, 0, 0, 0.5)] w-[70%] p-4 overflow-x-hidden overflow-y-auto h-[80%] drop-shadow rounded-3xl">
      {isLoading 
       ?
        <div className='flex justify-center mt-[25%]'>
          <GenSpinner/>
        </div>
      :
        <>
                <div className='flex w-full h-[5vh]'>
            <div className='flex items-center w-[96%] mt-[0.5%]'>
                <RiNewspaperFill className='text-[2.8em] ml-[1%] mr-[1%] xl:max-2xl:text-[2em]'/>
                <div>
                    <h1 className='font-bold text-[1.5em] xl:max-2xl:text-[1.2em]'>Reservations List</h1>   
                    <p className='mt-[-1%] text-[1.2em] xl:max-2xl:text-[0.9em]'>Count: {String(props.count)}</p>
                </div>
            </div>
            <div className='mt-[0.5%]'>
                <AiFillCloseCircle className='text-[2.5em] hover:cursor-pointer xl:max-2xl:text-[1.8em]'
                 onClick={()=>{
                 props.close();
                }}/>
            </div>
        </div>
        <hr className='h-[2px] w-full my-[1.2%] bg-gray-200 border-0'/>
        
        <h1 className='font-bold uppercase text-[1.5em] ml-[2%] bg-[#840705] inline-block text-white px-[1%] rounded-lg mb-[0.5%] xl:max-2xl:text-[1.0em]'>As of: {dayOfWeek[props.day%7]} - {monthName[props.month]}/{props.day}/{props.year}</h1>
        <div className='flex mx-[2%] py-[2%] text-[1.2em] xl:max-2xl:text-[0.8em]'>
            <table className="w-[100%] table-fixed">
                <thead className=''>
                    <th className='font-bold uppercase text-[1.5em] m1-[4%] px-[1%] mt-[2%] rounded-lg mb-[0.5%] xl:max-2xl:text-[1.0em]'>Reservation Id</th>
                <th className='font-bold uppercase text-[1.5em] ml-[4%] px-[1%] mt-[2%]  rounded-lg mb-[0.5%] xl:max-2xl:text-[1.0em]'>Client Name</th>
                <th className='font-bold uppercase text-[1.5em] ml-[4%] mt-[2%] rounded-lg mb-[0.5%] xl:max-2xl:text-[1.0em]'>Time</th>
                <th className='font-bold uppercase text-[1.5em] ml-[4%] mt-[2%] rounded-lg mb-[0.5%] xl:max-2xl:text-[1.0em]'>Status</th>
                <th className='font-bold uppercase text-[1.5em] ml-[4%] mt-[2%] rounded-lg mb-[0.5%] xl:max-2xl:text-[1.0em]'>Actions</th>
            </thead>
            <tbody>
                {data.length > 0 ? (
                    <>
                    {data.map((reservation: any, index) => (
                        <tr className=' mt-4' key={index}>
                        <td>{reservation.reservation_id}</td>
                        <td>{reservation.account_id}</td>
                        <td>{reservation.res_time}</td>
                        <td>{reservation.status}</td>
                        <td>
                            <button className={`bg-[${colors.beige}] rounded-md w-[40%] mx-[2.5%]`}>Action1</button>
                            <button className={`bg-[${colors.secondaryAdmin}] text-white rounded-md w-[40%] mx-[2.5%]`}>Action2</button>
                            {/* Add action buttons or icons here */}
                        </td>
                        </tr>
                    ))}
                    </>
                ) : (
                    <tr>
                    <td colSpan={5}>Nothing to show for now.</td>
                    </tr>
                )}
                </tbody>

          </table>
          <p></p>
        </div>



        

        <div className='fixed bottom-[2%] ml-[-1%] w-[100%]'>
          <hr className=' w-[100%] h-[1px] bg-black border-0'/>       
          <div className='flex justify-end mr-[3%] mt-[1%]'>
            
              
          </div>
        </div>
        </>
      }

    </div>
    </div>
    </>
  )
}

ReservationsList.propTypes = {}

export default ReservationsList
