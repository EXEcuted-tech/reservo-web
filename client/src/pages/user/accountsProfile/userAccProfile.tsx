import React, { useEffect, useState } from 'react'
import '../../../assets/css/userAccProfile.css';
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { BsFillPencilFill } from "react-icons/bs";
import axios from 'axios'
import config from "../../../common/config"


function UserProfilePage(){ 
            const [data, setData] = useState<any>();

    
            const fetchData = async ()=>{
                try{
                    const response = await axios.get(`${config.API}/user/retrieve`, {
                        params:{
                            col: 'account_id',
                            val: 1       //currently logged in user
                        },
                    })
                    setData(response.data.users[0]);
                    console.log(data);
                }catch(error){
                    console.log(error);
                }
            }

            useEffect(() => {
                fetchData(); // Call the async function to fetch data
            },[]);
    return(
        <div className = "h-[80vh] bg-[#F9F2EA] font-[Poppins]">

            <div className="mx-auto w-[90vw] border-b-[1px] border-black">
                <p className="pt-2 text-[30pt] font-bold">User Information</p>
                <p className="text-[#929090] text-[15pt] font-bold">Protect and Secure Your Account</p>
            </div>

            <div className="m-auto h-[63vh] w-[90vw] mt-7 mb-10 mr-[-5] rounded-3xl bg-white">
                    <div className="float-left border-r-[2px] border-black mt-[2vh]">
                        <FaRegUserCircle className="text-[21vh] mx-[15vh] mb-[2vh]"/>

                        <h1 className="userName mb-[6vh]">{data?.account_name} <button><BsFillPencilFill className="ml-1 "/></button></h1>
                        <table className='accTable'>
                            
                            <tr className="row">
                                <td className="var">Email:</td>
                                <td className="value">{data?.email_address}</td>
                            </tr>
                            <tr className="row">
                                <td className="var">Phone Number:</td>
                                <td className="value">{data?.contact_number}</td>
                            </tr>
                            <tr>
                                <td><button className="p-[7px] w-[3.2cm] mt-[1cm] flex flex-row items-center bg-[#FFA800] rounded-3xl"><MdOutlineLogout className="mr-[0.5cm]"/>Logout</button></td>
                                <td className="value"></td>
                            </tr>
                        </table>

                    </div>
                
                    <div className="">
                        <h1 className="resTitle">Reservation History</h1>
                            <div className="h-[65vh] w-[55vw] rounded-3xl float-right mr-[2cm] mt-[0.5cm]">
                                <table>
                                    <thead>
                                        <tr className="resRow">
                                            <th className="py-1 px-12 text-center">Date</th>
                                            <th className="py-1 px-12 text-center">Time</th>
                                            <th className="py-1 px-12 text-center">Organizer</th>
                                            <th className="py-1 px-7 text-center">Event Size</th>
                                            <th className="py-1 px-12 text-center">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="py-3 px-12 text-center">Jan. 23, 2023</td>
                                            <td className="py-3 px-12 text-center">11:30am - 1:00pm</td>
                                            <td className="py-3 px-12 text-center">Juan Dela Cruz</td>
                                            <td className="py-3 px-12 text-center">5</td>
                                            <td className="py-3 px-12 text-center"><div className="m-2 bg-[#CCFFD1] text-[#00A310]">Done</div></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                    </div>

            </div>

            
        </div>

        
    )
    
}

export default UserProfilePage