import React, { useEffect, useState } from 'react'
import ReserveCard from './reserveCard'
import config from '../../../../common/config'
import axios from 'axios';

const UpcomingList: React.FC<ReserveProps> = (props) => {
  const openModal = props;
  const [reservations, setReservations] = useState<ReserveCardProps[]>([]);
  const merchID = Number(localStorage.getItem('merch_id'));

  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    setDate(new Date());
  }, []);

  useEffect(() => {
    axios.get(`${config.API}/reserve/retrieveTwo?col1=merchant_id&val1=${merchID}&col2=status&val2=Ongoing&orderVal=reservation_id&order=ASC`)
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
      <h1 className='text-[1.3em] mb-4 text-[#797979] italic font-light xs:max-sm:text-[0.65em] xs:max-sm:mt-2 xs:max-sm:mb-4 xl:max-2xl:text-[0.9em]'>{`As of ${date}`}</h1>
        {/* Group reservations by date */}
        {groupReservationsByDate(reservations).map((group, index) => (
          <ReserveCard key={index} bookings={group} openModal={openModal} res_date={group[0].res_date} />
        ))}
      </div>
    </div>
  )
}

const groupReservationsByDate = (reservations: ReserveCardProps[]) => {
  const groupedByDate: { [key: string]: ReserveCardProps[] } = {};

  reservations.forEach((booking) => {

    const dateKey = new Date(booking.res_date).toISOString().split('T')[0]; // Using ISO format

    if (!groupedByDate[dateKey]) {
      groupedByDate[dateKey] = [];
    }

    groupedByDate[dateKey].push(booking);
  });

  const sortedGroups = Object.keys(groupedByDate).sort();

  return sortedGroups.map((key) => groupedByDate[key]);
};

export default UpcomingList