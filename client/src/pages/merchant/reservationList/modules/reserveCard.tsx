import React from 'react'
import {HiOutlineUsers} from 'react-icons/hi'
import {LiaSearchSolid} from 'react-icons/lia'
import {ImPencil} from 'react-icons/im'

const ReserveCard: 
    React.FC<{bookings: ReserveCardProps[],openModal: ReserveProps}> = ({bookings, openModal}) => {
  
    const {setOpenModalEdit,setOpenModalView} = openModal;
   return (
    <div>
        <h1 className='text-[1.3em] text-[#797979] font-bold'>{"January 18, 2023, Tuesday"}</h1>
        <div className='px-[1%] bg-white rounded-lg drop-shadow'>
        <table className='w-[100%] mt-[0.8%]'>
        <thead className='text-[1.2em]'>
            <tr>  
                <th className='py-[0.7%]'>Organizer</th>
                <th>Client Name</th>
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
            {bookings.map((booking, index) => (
              <tr className='text-center'>
                <td className='py-[1%]'>{booking.organizerName}</td>
                <td>{booking.clientName}</td>
                <td className='flex items-center justify-center  my-[5%] pt-[4%] text-[1.1em]'><HiOutlineUsers className='text-[1.2em]'/>{booking.eventSize}</td>
                <td>{booking.time}</td>
                <td className='flex justify-center'>
                    <p className={`font-bold rounded-2xl py-[2%] w-[70%]
                            ${booking.status=='Ongoing'?'bg-[#cce1f4] text-[#0056A5]'
                                :'bg-[#ccf6d0] text-[#199250]'}`}>
                        {booking.status}
                    </p>
                </td>
                <td>
                    <div className='flex justify-center'>
                        <button className='flex items-center bg-[#ffbb38] py-[3%] px-[15%] mt-[5%] mb-[2%] rounded-3xl
                                hover:bg-[#ffe7ba]'
                                onClick={()=>setOpenModalView(true)}>
                            <LiaSearchSolid/>
                            View
                        </button>
                    </div>
                    <div className='flex justify-center'>
                        <button className='flex items-center bg-[#ff8e4f] py-[3%] px-[17%] mb-[5%] rounded-3xl
                               hover:bg-[#ffbe9b]'
                               onClick={()=>setOpenModalEdit(true)}>
                            <ImPencil/>
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