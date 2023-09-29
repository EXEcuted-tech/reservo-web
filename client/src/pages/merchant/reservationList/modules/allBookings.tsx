import React, { useEffect, useState } from 'react'
import ReserveCard from './reserveCard'
import axios from 'axios'

const AllBookings: React.FC<ReserveProps> = (props) => {
  const openModal = props;
  const [reservations, setReservations] = useState<ReserveCardProps[]>([]);

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

  return (
    <div>
      <div className='font-poppins mx-[3%] mt-[1%]'>
        <ReserveCard 
          bookings={reservations} openModal={openModal} />
      </div>
    </div>
  )
}

export default AllBookings