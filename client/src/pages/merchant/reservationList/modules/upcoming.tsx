import React, { useEffect, useState } from 'react'
import ReserveCard from './reserveCard'
import axios from 'axios';

const UpcomingList: React.FC<ReserveProps> = (props) => {
  const openModal = props;
  const [reservations, setReservations] = useState<ReserveCardProps[]>([]);

  useEffect(() => {
    const col = "status";
    const val = "Ongoing";

    axios.get(`http://localhost:5000/reserve/retrieve?col=${col}&val=${val}`).then((res) => {
      const parsedReservations = res.data.records.map((record: any) => ({
        ...record,
        res_date: new Date(record.res_date),
      }));

      setReservations(parsedReservations);
    });
  }, []);
  return (
    <div className='h-[82.5vh] overflow-y-auto'>
      <div className='font-poppins mx-[3%] mt-[1%] mb-[1%]'>
        <ReserveCard bookings={reservations} openModal={openModal}/>
      </div>
    </div>
  )
}

export default UpcomingList