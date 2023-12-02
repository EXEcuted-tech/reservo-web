import React, { Suspense, useEffect, useState } from 'react'
// import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import config from "../../../common/config"
import GenSpinner from '../../../components/loaders/genSpinner';

import { Chip, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { IoCameraSharp } from 'react-icons/io5';
import DisplayEditModal from '../../../components/modals/profile-modal/displayEditModal';
import EditProfile from './modals/editProfile';

const Notification = React.lazy(() => import('../../../components/alerts/Notification'));




function UserProfilePage() {
    const [data, setData] = useState<any>();
    const [reservations, setReservations] = useState<any[]>([]);
    const userDetails = localStorage.getItem('userDetails');
    const userID = userDetails ? JSON.parse(userDetails).userID : "0";

    const [updateSuccess, updating] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const Navigate = useNavigate();
    const [newImageUrl, setNewImageUrl] = useState('');

    const userName = data?.account_name;
    const [shortLet, setShortLet] = useState("");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
                    val: userID,
                    orderVal: "res_date",
                    order: 'DESC'
                }
            })
            setData(response.data.users[0]);
            setReservations(result.data.records);
            setIsLoading(false);
        } catch (error) {
            //PUT ERROR NOTIF 
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('userDetails');
        Navigate('/logout');
    }

    useEffect(() => {
        fetchData(); // Call the async function to fetch data
    }, []);

    useEffect(() => {
        if (userName) {
            getShortLetter(userName);
        }
    }, [data])

    const getShortLetter = (name: string) => {
        const nameParts = name.split(' ');
        if (nameParts.length === 1) {
            setShortLet(nameParts[0].charAt(0).toUpperCase());
        } else if (nameParts.length > 1) {
            setShortLet(nameParts[0].charAt(0).toUpperCase() + nameParts[1].charAt(0).toUpperCase());
        }
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleSaveImageUrl = (imageUrl: string) => {
        setNewImageUrl(imageUrl);
        setIsEditModalOpen(false);
        axios.post(`${config.API}/user/edit?userID=${userID}`, {
            "profile_picture": imageUrl,
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {

            updating(false);
            window.location.reload()

        }, 3000);
        fetchData()
        if (!updateSuccess) {
            clearTimeout(timer);
        }

    }, [updateSuccess])


    return (
        <div className="h-[100vh] bg-[#F9F2EA] ">
            {updateSuccess ?
                <Suspense fallback={<div>Loading</div>}>
                    <Notification message='Updating you Profile, Please Wait!' color='#2E8B57' />
                </Suspense> : null}
            {isEditModalOpen && <div className='fixed top-0 left-0 w-full h-full bg-[rgb(0,0,0,0.5)] opacity-0.5 z-[100]'></div>}
            <DisplayEditModal
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
                onSave={handleSaveImageUrl}
            />
            <div className="mx-auto w-[90vw] border-b-[1px] border-black">
                <p className="pt-10 text-[30pt] font-bold">User Information</p>
                <p className="text-[#929090] text-[15pt] font-bold">Protect and Secure Your Account</p>
            </div>

            <div className="m-auto h-[80vh] w-[95vw] mt-7 mb-10 mr-[-5] rounded-3xl bg-white">

                <div>

                    <div className="float-left border-r-[2px] border-black ml-[2%] mt-[7%]">

                        <div className='flex justify-center'>
                            {data?.profile_picture
                                ?
                                <div className="relative inline-flex items-center justify-center w-60 h-60 overflow-hidden bg-[#DD2803] rounded-full dark:bg-gray-600 xs:max-sm:w-9 xs:max-sm:h-8">
                                    <img src={newImageUrl ? newImageUrl : data?.profile_picture} className="w-60 h-60 object-cover rounded-2xl xl:max-2xl:w-[7rem]" />
                                    <div className='absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 hover:opacity-80 hover:cursor-pointer bg-white'
                                        onClick={() => { setIsEditModalOpen(true) }}>
                                        <IoCameraSharp className='relative text-[50px] left-[22%] bottom-[5%] xl:max-2xl:text-[1.3em] xl:max-2xl:left-[43%]' />
                                        <p className='relative text-black font-bold text-[14px] top-[10%] right-[8%] xs:max-sm:text-[0.7em] xl:max-2xl:text-[0.6em] xl:max-2xl:right-[4%]'>Change Image</p>
                                    </div>
                                </div>
                                :
                                <div className="relative inline-flex items-center justify-center w-60 h-60 overflow-hidden bg-[#DD2803] rounded-full dark:bg-gray-600 xs:max-sm:w-9 xs:max-sm:h-8">
                                    <span className="font-medium text-[4em] text-white dark:text-gray-300">{shortLet}</span>
                                </div>
                            }
                        </div>
                        <br />
                        {data ? (
                            <>
                                <h1 className="text-center flex flex-rows justify-center font-bold text-[20pt]"><span>{userName}</span><EditProfile phoneData={data.contact_number} updating={updating} />
                                </h1>
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
                                            <td><button onClick={handleLogout} className="p-[7px] w-[3.2cm] mt-[0.8cm] flex flex-row items-center justify-center bg-[#FFA800] rounded-3xl hover:bg-[#ec8600] transition-colors delay-250 duration-[3000] ease-in">
                                                <MdOutlineLogout className="mr-[1.5%]" />Logout</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </>
                        ) : (
                            <p>Loading...</p>
                        )}

                        <div className='float-center w-full hidden xs:max-sm:block overscroll-x-auto'>
                            <h1 className="text-center font-bold text-[22pt] pt-[0.75cm]">Reservation History</h1>
                            <TableContainer style={{width:"100%",height:"auto" ,borderRadius:'0.5em'}}>
                                <Table style={{ textAlign: 'center', fontFamily: 'poppins'}}>
                                    <TableHead style={{ background: "grey", textAlign: 'center'}}>
                                        <TableRow>
                                            <TableCell style={{ textAlign: 'center', fontFamily: 'poppins', fontSize: 12, padding: 0 }}>Date</TableCell>
                                            <TableCell style={{ textAlign: 'center', fontFamily: 'poppins', fontSize: 12, padding: 0 }}>Time</TableCell>
                                            <TableCell style={{ textAlign: 'center', fontFamily: 'poppins', fontSize: 12, padding: 0 }}>Location</TableCell>
                                            <TableCell style={{ textAlign: 'center', fontFamily: 'poppins', fontSize: 12, padding: 0 }}>Event Size</TableCell>
                                            <TableCell style={{ textAlign: 'center', fontFamily: 'poppins', fontSize: 12, padding: 0 }}>Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {isLoading == true ? <tr><td colSpan={5}><GenSpinner /></td></tr> :
                                            <>
                                                {reservations && reservations.length > 0 ? (
                                                    reservations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((reservation: any, index: number) => (
                                                        <TableRow key={index} >
                                                            <TableCell style={{ textAlign: 'center', fontFamily: 'poppins', fontSize: 12, padding: 3 }}>{getDate(reservation.res_date)}</TableCell>
                                                            <TableCell style={{ textAlign: 'center', fontFamily: 'poppins', fontSize: 12, padding: 3 }}>{reservation.res_time}</TableCell>
                                                            <TableCell style={{ textAlign: 'center', fontFamily: 'poppins', fontSize: 12, padding: 3 }}>{reservation.res_location}</TableCell>
                                                            <TableCell style={{ textAlign: 'center', fontFamily: 'poppins', fontSize: 12, padding: 3 }}>{reservation.party_size}</TableCell>
                                                            <TableCell style={{ textAlign: 'center', fontFamily: 'poppins', fontSize: 12, padding: 3 }}>
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
                                count={10}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />

                        </div>
                    </div>

                    <div className='float-right w-[60vw] pr-[50pt] xs:max-sm:hidden'>
                        <h1 className="text-center font-bold text-[22pt] pt-[0.75cm]">Reservation History</h1>
                        <TableContainer style={{ width: "100%", height: "60vh", borderRadius: '0.5em' }}>
                            <Table style={{ textAlign: 'center', fontFamily: 'poppins' }}>
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
                                                    <TableCell style={{ textAlign: "center", fontFamily: 'poppins' }} colSpan={5}>No reservations found</TableCell>
                                                </TableRow>

                                            )}</>
                                    }

                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            component="div"
                            count={10}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />

                    </div>

                </div>

            </div>
        </div>
    )

}

export default UserProfilePage