import React, { useEffect, useState } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import config from "../../../common/config"
import GenSpinner from '../../../components/loaders/genSpinner';
import EditUsername from './modals/editUsername';

import { Chip, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';


function UserProfilePage() {
    const [data, setData] = useState<any>();
    const [reservations, setReservations] = useState<any[]>([]);
    const userDetails = localStorage.getItem('userDetails');
    const userID = userDetails ? JSON.parse(userDetails).userID : "0";
    const [isLoading, setIsLoading] = useState(false);
    const Navigate = useNavigate();

    //Table
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const getDate = (dateStr: string) => {

        const dateV = new Date(dateStr);

        return (
            <div className="dateC">
                {dateV.toLocaleDateString()}
            </div>
        )

    }
    const reservStats = (status: string) => {
        return status === 'Finished' ? <Chip variant='filled' color='success' label="Finished" className='font-[Poppins]' /> : <Chip variant='filled' color='warning' label="Ongoing" />
    }
    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    //--------------------------
    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${config.API}/user/retrieve`, {
                params: {
                    col: 'account_id',
                    val: userID       //currently logged in user
                },
            })
            const result = await axios.get(`${config.API}/reserve/retrieve`, {
                params: {
                    col: 'account_id',
                    val: userID
                }
            })
            setData(response.data.users[0]);
            console.log(result.data);
            setReservations(result.data.records);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const updateData = async () => {
        try {
            // const response = await axios.post(`${config.API}/user/edit`, {
            //     params:{
            //         col: 'account_id'
            //         val: userID
            //     },
            // })
            // const result = await axios.post(`${config.API}/user/edit`, {
            //     params:{
            //         col: 'account_id'
            //         val: userID
            //     }
            // })
            const result = await axios.post(`${config.API}/user/edit`, {
                body: {
                    userUpdate: { 'account_name': "userName" }
                },
                params: {
                    col: 'account_id',
                    val: userID,
                },
            });

            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('userDetails');
        Navigate('/logout');
    }

    useEffect(() => {
        fetchData(); // Call the async function to fetch data
    }, []);

    const userName = data?.account_name;
    console.log(userName);

    console.log(reservations);

    return (
        <div className="h-[100vh] bg-[#F9F2EA] ">

            <div className="mx-auto w-[90vw] border-b-[1px] border-black">
                <p className="pt-10 text-[30pt] font-bold">User Information</p>
                <p className="text-[#929090] text-[15pt] font-bold">Protect and Secure Your Account</p>
            </div>

            <div className="m-auto h-[80vh] w-[90vw] mt-7 mb-10 mr-[-5] rounded-3xl bg-white">

                <div>

                    <div className="float-left border-r-[2px] border-black mt-[5vh]">
                        <FaRegUserCircle className="text-[23vh] mx-[15vh] mt-[6vh]" />
                        <br />
                        {data ? (
                            <>
                                <h1 className="text-center font-bold text-[20pt]"><EditUsername userName={userName} userID={userID} /></h1>
                                <br />
                                <br />
                                <br />
                                <table className="ml-[3vw]">
                                    <tbody>
                                        <tr className="font-[12pt]">
                                            <td className="font-bold w-[150px]">Email:</td>
                                            <td className="w-[250px]">{data.email_address}</td>
                                        </tr>
                                        <tr className="font-[12pt]">
                                            <td className="font-bold w-[150px]">Phone Number:</td>
                                            <td className="w-[250px]">{data.contact_number}</td>
                                        </tr>
                                        <tr>
                                            <td><button onClick={handleLogout} className="p-[7px] w-[3.2cm] mt-[0.8cm] flex flex-row items-center bg-[#FFA800] rounded-3xl"><MdOutlineLogout className="mr-[0.5cm]" />Logout</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </>
                        ) : (
                            <p>Loading...</p>
                        )}


                    </div>

                    <div className='float-right w-[60vw] pr-[50pt]'>
                        <h1 className="text-center font-bold text-[22pt] pt-[0.75cm]">Reservation History</h1>
                        <TableContainer style={{width:"100%",height:"60vh" ,borderRadius:'0.5em'}}>
                            <Table style={{ textAlign: 'center', fontFamily: 'poppins'}}>
                                <TableHead style={{ background: "grey", textAlign: 'center' }}>
                                    <TableRow>
                                        <TableCell style={{ textAlign: 'center', fontFamily: 'poppins' }} className="py-1 px-[3vw] text-center">Date</TableCell>
                                        <TableCell style={{ textAlign: 'center', fontFamily: 'poppins' }} className="py-1 px-[3vw] text-center">Time</TableCell>
                                        <TableCell style={{ textAlign: 'center', fontFamily: 'poppins' }} className="py-1 px-[3vw] text-center">Location</TableCell>
                                        <TableCell style={{ textAlign: 'center', fontFamily: 'poppins' }} className="py-1 px-[3vw] text-center">Event Size</TableCell>
                                        <TableCell style={{ textAlign: 'center', fontFamily: 'poppins' }} className="py-1 px-[3vw] text-center">Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {isLoading == true ? <tr><td colSpan={5}><GenSpinner /></td></tr> :
                                        <>
                                            {reservations && reservations.length > 0 ? (
                                                reservations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((reservation: any, index: number) => (
                                                    <TableRow key={index} >
                                                        <TableCell style={{ textAlign: 'center', fontFamily: 'poppins' }} className="py-1 px-[1vw] text-center">{getDate(reservation.res_date)}</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontFamily: 'poppins' }} className="py-1 px-[1vw] text-center">{reservation.res_time}</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontFamily: 'poppins' }} className="py-1 px-[1vw] text-center">{reservation.res_location}</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontFamily: 'poppins' }} className="py-1 px-[1vw] text-center">{reservation.party_size}</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontFamily: 'poppins' }} className="py-1 px-[1vw] row flex justify-center items-center">
                                                            {reservStats(reservation.status)}
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow >
                                                    <TableCell style={{textAlign:"center",fontFamily: 'poppins' } } colSpan={5}>No reservations found</TableCell>
                                                </TableRow>

                                            )}</>
                                    }

                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            component="div"
                            count={50}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />


                        {/* <table className="flex flex-col items-center">
                                <thead>
                                    <tr className="text-[15pt] border-b-2 border-black">
                                        <th className="py-1 px-[3vw] text-center">Date</th>
                                        <th className="py-1 px-[3vw] text-center">Time</th>
                                        <th className="py-1 px-[3vw] text-center">Organizer</th>
                                        <th className="py-1 px-[3vw] text-center">Event Size</th>
                                        <th className="py-1 px-[3vw] text-center">Status</th>
                                    </tr>
                                
                                
                                    
                                </thead>
                                <tbody>
                                    {isLoading == true?  <tr><td colSpan={5}><GenSpinner/></td></tr> :
                                        <>
                                        {reservations && reservations.length > 0 ? (
                                            reservations.map((reservation: any, index: number) => (
                                            <tr key={index} className="text-[12pt] text-center">
                                                <td className="py-1 px-[1vw] text-center">{reservation.date}</td>
                                                <td className="py-1 px-[1vw] text-center">{reservation.time}</td>
                                                <td className="py-1 px-[1vw] text-center">{reservation.organizer}</td>
                                                <td className="py-1 px-[1vw] text-center">{reservation.eventSize}</td>
                                                <td className="py-1 px-[1vw] row flex justify-center items-center">
                                                    {reservation.status == "Finished"? <><div className="m-2 bg-[#CCFFD1] text-[#00A310] wx-[50px] ">Ongoing</div></>:<div className="m-2 bg-[#50b0d6] text-[#000000] wx-[50px] ">Ongoing</div>}
                                                
                                                </td>
                                            </tr>
                                            ))
                                        ) : (
                                            <tr>
                                            <td colSpan={5}>No reservations found.</td>
                                            </tr>
                                        )}</>

                                }
                            </tbody>
                            </table> */}

                    </div>

                </div>

            </div>
        </div>
    )

}

export default UserProfilePage