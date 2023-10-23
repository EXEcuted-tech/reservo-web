import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface details {
  id: number,
  date: Date;
  eventSize: number;
  time: string;
  email: string;
  organizer: string;
  contactN: string;
  clientN: string;
  status: string;
  remarks: string;
};


const DetailsReserv = (props: { data: details }) => {

  const dataX = props.data;
  const style2 = { fontFamily: "poppins", fontWeight: "bolder", marginRight: '5px' }
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>
        <div className='flex flex-rows'>
          <Typography sx={{margin:"5px"}}>{dataX.id}</Typography>
          <Typography sx={{margin:"5px"}}>{dataX.time}</Typography>
          <Typography sx={{margin:"5px"}}>{dataX.clientN}</Typography>
        </div>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={style}>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="block">
              <div className="grid grid-cols-2 gap-5">
                <span className='flex flex-row bg-[red] font-poppins items-center ml-[5px]'><Typography variant='h6' sx={style2}>Date: </Typography>{dataX.date.toDateString()}</span>
                <span className='flex flex-row bg-[red] font-poppins items-center ml-[5px]'><Typography variant='h6' sx={style2}>Event Size: </Typography>{dataX.eventSize}</span>
                <span className='flex flex-row bg-[red] font-poppins items-center ml-[5px]'><Typography variant='h6' sx={style2}>Time: </Typography>{dataX.time}</span>
                <span className='flex flex-row bg-[red] font-poppins items-center ml-[5px]'><Typography variant='h6' sx={style2}>Email: </Typography>{dataX.email}</span>
                <span className='flex flex-row bg-[red] font-poppins items-center ml-[5px]'><Typography variant='h6' sx={style2}>Organizer: </Typography>{dataX.organizer}</span>
                <span className='flex flex-row bg-[red] font-poppins items-center ml-[5px]'><Typography variant='h6' sx={style2}>Contact Number: </Typography>{dataX.contactN}</span>
                <span className='flex flex-row bg-[red] font-poppins items-center ml-[5px]'><Typography variant='h6' sx={style2}>Client Name: </Typography>{dataX.clientN}</span>
                <span className='flex flex-row bg-[red] font-poppins items-center ml-[5px]'><Typography variant='h6' sx={style2}>Status: </Typography>{dataX.status}</span>
              </div>
              <div className="rmk mt-[2rem]">
                <span className='flex flex-row bg-[red] font-poppins items-center ml-[5px]'><Typography variant='h6' sx={style2}>Remarks: </Typography>{dataX.remarks}</span>
              </div>
            </div>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default function ReservationList(props: { year: number, dataSet: details[], today: Date, day: number, monthNdx: number, monthName: string }) {

  const day = props.day;
  const year = props.year;
  const monthNdx = props.monthNdx
  const data = props.dataSet;
  const [dateToday, setDate] = useState(props.today);
  const [today, setDateToday] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  useEffect(() => {
    dateToday.getFullYear() === year && dateToday.getMonth() === monthNdx && dateToday.getDate() === day ? setDateToday(true) : setDateToday(false);
  }, [day])

  const isReserved = (elem: details) => {

    const bol = elem.date.getFullYear() === year && elem.date.getMonth() === monthNdx && elem.date.getDate() === day
    return bol
  }

  const reserveFilter = data.filter((elem) => isReserved(elem));
  //list of Reseration


  // Content of the Reservation
  const reserveList = (elem: details[]) => {

    const reservedStyle = {
      border: reserveFilter && reserveFilter.length > 0 ?  "yellowgreen 4px solid": "none",
    }
    return (
      <div>
        <Button variant="text" onClick={handleOpen} sx={[reservedStyle , styleToday]}>{day}</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="Reservation List"
          aria-describedby="it shows the reservations on this day"
        >
          <Box sx={style}>
            <Box id="modal-modal-title">
              <Typography variant="h4" component="h2">
                Reservation Details
              </Typography>
            </Box>
            {elem.length > 0 ? elem.map((reserveCard) => {
              return (
                <Box key={reserveCard.id}>
                  <DetailsReserv data={reserveCard} />
                </Box>
              )
            }) :
            <Box>
                <Typography>There is no Reservation in this day</Typography>
              </Box>}
          </Box>
        </Modal>
      </div>
    )
  }

  // styles for reservation
  const styleToday = {
    backgroundColor: today ? "red" : "none",
    color: today ? "white" : "",
  }

  console.log(reserveFilter);
  return (
    <div>
      {reserveList(reserveFilter) }
    </div>
  );
}




/* <div className="block">
            <div className="grid grid-cols-2 gap-5">
            <span className='flex flex-row bg-[red] font-poppins items-center ml-[5px]'><Typography variant='h6' sx={style2}>Date: </Typography>{elem.date.toDateString()}</span>
            <span className='flex flex-row bg-[red] font-poppins items-center ml-[5px]'><Typography variant='h6' sx={style2}>Event Size: </Typography>{data[0].eventSize}</span>
            <span className='flex flex-row bg-[red] font-poppins items-center ml-[5px]'><Typography variant='h6' sx={style2}>Time: </Typography>{data[0].time}</span>
            <span className='flex flex-row bg-[red] font-poppins items-center ml-[5px]'><Typography variant='h6' sx={style2}>Email: </Typography>{data[0].email}</span>
            <span className='flex flex-row bg-[red] font-poppins items-center ml-[5px]'><Typography variant='h6' sx={style2}>Organizer: </Typography>{data[0].organizer}</span>
            <span className='flex flex-row bg-[red] font-poppins items-center ml-[5px]'><Typography variant='h6' sx={style2}>Contact Number: </Typography>{data[0].contactN}</span>
            <span className='flex flex-row bg-[red] font-poppins items-center ml-[5px]'><Typography variant='h6' sx={style2}>Client Name: </Typography>{data[0].clientN}</span>
            <span className='flex flex-row bg-[red] font-poppins items-center ml-[5px]'><Typography variant='h6' sx={style2}>Status: </Typography>{data[0].status}</span>
          </div>
          <div className="rmk mt-[2rem]">
            <span className='flex flex-row bg-[red] font-poppins items-center ml-[5px]'><Typography variant='h6' sx={style2}>Remarks: </Typography>{data[0].remarks}</span>
          </div>
          </div>  */