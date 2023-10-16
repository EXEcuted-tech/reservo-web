import React, { useEffect, useState } from 'react'
import ReserveCard from './reserveCard'
import config from '../../../../common/config'
import axios from 'axios';

const CompleteList: React.FC<ReserveProps> = (props) => {
  const openModal = props;
  const [reservations, setReservations] = useState<ReserveCardProps[]>([]);
  const merchID = Number(localStorage.getItem('merch_id'));

  useEffect(() => {
    axios.get(`${config.API}/reserve/retrieveTwo?col1=merchant_id&val1=${merchID}&col2=status&val2=Finished&orderVal=reservation_id&order=ASC`)
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
        <ReserveCard bookings={reservations} openModal={openModal}/>
      </div>
    </div>
  )
}

export default CompleteList