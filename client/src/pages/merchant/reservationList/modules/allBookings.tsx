import React from 'react'
import ReserveCard from './reserveCard'

const AllBookings = () => {
  const bookings1:ReserveCardProps[] = [
    {
      reserveId: 1,
      organizerName: "Hannah Calisura",
      clientName: "Jeremiah Juinio",
      eventSize: 5,
      time: "11:30 PM - 12:00 AM",
      status: "Ongoing",
    },
    {
      reserveId: 1,
      organizerName: "Angelou Sereno",
      clientName: "Jeremiah Juinio",
      eventSize: 5,
      time: "11:30 PM - 12:00 AM",
      status: "Ongoing",
    },
  ]

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
      reserveId: 1,
      organizerName: "Franz Ondiano",
      clientName: "Jeremiah Juinio",
      eventSize: 5,
      time: "11:30 PM - 12:00 AM",
      status: "Finished",
    },
  ]
  return (
    <div>
      {/* <ReserveCard props={bookings1}/> */}
    </div>
  )
}

export default AllBookings