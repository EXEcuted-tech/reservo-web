import React from 'react'
import ReserveCard from './reserveCard'

const CompleteList: React.FC<ReserveProps> = (props) => {
  const openModal = props;

  const bookings2:ReserveCardProps[] = [
    {
      reserveId: 1,
      organizerName: "Kathea Mari Mayol",
      clientName: "Jeremiah Juinio",
      eventSize: 5,
      time: "11:30 PM - 12:00 AM",
      status: "Finished",
    },
    {
      reserveId: 2,
      organizerName: "Franz Ondiano",
      clientName: "Jeremiah Juinio",
      eventSize: 5,
      time: "11:30 PM - 12:00 AM",
      status: "Finished",
    },
  ]
  return (
    <div>
      <div className='font-poppins mx-[3%] mt-[3%]'>
        <ReserveCard bookings={bookings2} openModal={openModal}/>
      </div>
    </div>
  )
}

export default CompleteList