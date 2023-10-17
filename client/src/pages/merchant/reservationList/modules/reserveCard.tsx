import React, { useEffect, useState } from 'react'
import {HiOutlineUsers} from 'react-icons/hi'
import {LiaSearchSolid} from 'react-icons/lia'
import {GoPencil} from 'react-icons/go'
import config from '../../../../common/config'
import axios from 'axios'

const ReserveCard: 
    React.FC<{bookings: ReserveCardProps[],openModal: ReserveProps}> =  ({bookings, openModal}) => {
  
    const {setOpenModalEdit,setOpenModalView, openModalEdit, openModalView} = openModal;
    const [date, setDate] = useState<Date | null>(null);
    const [newRecs, setNewRecs] = useState<Array<{ booking: ReserveCardProps; clientName: string }>>([]);

    useEffect(() => {
      setDate(new Date());
    }, []);

    useEffect(() => {
      getNewRecs();
    }, [bookings]);
  
    const getNewRecs = async () => {
      const updatedNewRecs = [];
  
      for (const booking of bookings) {
        const clientName = await getClient(booking.account_id);
        updatedNewRecs.push({ booking, clientName });
      }

      setNewRecs(updatedNewRecs);
    };
  
    const getClient = async (id: number) => {
      try {
        const col = 'account_id';
        const val = id;
  
        const response = await axios.get(`${config.API}/user/retrieve?col=${col}&val=${val}`);
  
        if (response.data.status === 200) {
          return response.data.users[0].account_name;
        }
        return '';
      } catch (error) {
        console.error(error);
        return '';
      }
    };

    return (
    <div>
        <h1 className='text-[1.3em] mb-4 text-[#797979] font-bold xl:max-2xl:text-[0.9em]'>{`As of ${date}`}</h1>
        <div className={`px-[1%] bg-white rounded-lg drop-shadow opacity-0.5`}
            style={{opacity: openModalView || openModalEdit ? 0.25 : 1}}>
        <table className='w-[100%] mt-[0.8%]'>
        <thead className='text-[1.2em] xl:max-2xl:text-[0.9em]'>
            <tr>  
                <th className='py-[0.7%]'>Client Name</th>
                <th>Location</th>
                <th>Event Size</th>
                <th>Time</th>
                <th>Status</th>
                <th>Manage</th>
            </tr>
            <tr>
              <th colSpan={6} className='border-b-[1px] border-slate-500'></th>
            </tr>
        </thead>
        {/* <hr className='border-[1px] w-[100vw]'/> */}
            <tbody>
            {newRecs.map(({booking, clientName},index) => (
                
              <tr className='text-center xl:max-2xl:text-[0.8em]'>
                <td className='py-[1%]'>{clientName}</td>
                <td>{booking.res_location}</td>
                <td className='flex items-center justify-center  my-[5%] pt-[7%] text-[1.1em]'><HiOutlineUsers className='text-[1.2em] xl:max-2xl:text-[0.9em]'/>{booking.party_size}</td>
                <td>{booking.res_time}</td>
                <td className='flex justify-center'>
                    <p className={`font-bold rounded-2xl py-[2%] w-[70%] xl:max-2xl:text-[0.9em]
                            ${booking.status=='Ongoing'?'bg-[#cce1f4] text-[#0056A5]'
                                :'bg-[#ccf6d0] text-[#199250]'}`}>
                        {booking.status}
                    </p>
                </td>
                <td>
                    <div className='flex justify-center'>
                        <button className='flex items-center bg-[#ffbb38] py-[3%] px-[15%] mt-[5%] mb-[2%] rounded-3xl xl:max-2xl:text-[0.9em] xl:max-2xl:mb-[3%]
                                hover:bg-[#ffe7ba] transition-colors delay-450 duration-[3000] ease-in-out'
                                onClick={()=>{
                                  console.log("Before: ",booking.reservation_id.toString())
                                  sessionStorage.setItem('res_id',booking.reservation_id.toString())
                                  // localStorage.setItem('res_id',`${booking.account_id}`);
                                  setOpenModalView(true)
                                }}>
                            <LiaSearchSolid className="mr-[0.3rem]"/>
                            View
                        </button>
                    </div>
                    <div className='flex justify-center'>
                        <button className='flex items-center bg-[#ff8e4f] py-[3%] px-[18%] mb-[5%] rounded-3xl xl:max-2xl:text-[0.9em] xl:max-2xl:mb-[7%] xl:max-2xl:px-[19%]
                               hover:bg-[#ffbe9b] transition-colors delay-450 duration-[3000] ease-in-out'
                               onClick={()=>{
                                sessionStorage.setItem('res_id',booking.account_id.toString())
                                console.log(sessionStorage.getItem('res_id'))
                                setOpenModalEdit(true)
                               }}>
                            <GoPencil className="ml-[-0.5rem] mr-[0.4rem]"/>
                            Edit
                        </button>
                    </div>
                </td>
              </tr>
            ))}
            </tbody>
        </table>
        </div>
    </div>
  )
}

export default ReserveCard