import React, { useEffect, useState } from 'react'
import ReserveCard from './reserveCard'
import config from '../../../../common/config'
import axios from 'axios'

const AllBookings: React.FC<ReserveProps> = (props) => {
  const openModal = props;
  const [reservations, setReservations] = useState<ReserveCardProps[]>([]);
  const merchID = Number(localStorage.getItem('merch_id'));

  useEffect(() => {
    const col = "merchant_id";
    const val = merchID;
    const orderCol = "reservation_id";
    const order = "ASC"

    axios.get(`${config.API}/reserve/retrieve?col=${col}&val=${val}&orderVal=${orderCol}&order=${order}`)
      .then((res) => {
      const parsedReservations = res.data.records.map((record: any) => ({
        ...record,
        res_date: new Date(record.res_date),
      }));

      setReservations(parsedReservations);
    });
  }, []);

  return (
    <div className='h-[82.5vh] overflow-y-auto animate-fade-in'>
      <div className='font-poppins mx-[3%] mt-[1%] mb-[1%]'>
          <ReserveCard 
            bookings={reservations} openModal={openModal} />
      </div>
    </div>
  )
}

export default AllBookings