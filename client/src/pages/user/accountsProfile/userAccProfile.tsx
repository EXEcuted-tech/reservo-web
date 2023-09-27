import React from 'react'
import '../../../assets/css/userAccProfile.css';
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { BsFillPencilFill } from "react-icons/bs";

function UserProfilePage(){ 
    return(
        <div className = "h-[100vh] bg-[#F9F2EA] font-[Poppins]">

            <div className="mx-auto w-[90vw] border-b-[1px] border-black">
                <p className="pt-10 text-[30pt] font-bold">User Information</p>
                <p className="text-[#929090] text-[15pt] font-bold">Protect and Secure Your Account</p>
            </div>

            <div className="m-auto h-[80vh] w-[90vw] mt-7 mb-10 mr-[-5] rounded-3xl bg-white">

                <div>

                    <div className="float-left border-r-[2px] border-black mt-[5vh]">
                        <FaRegUserCircle className="text-[23vh] mx-[15vh] mt-[6vh]"/>
                        <br />
                        <h1 className="userName">Kathea Mari<button><BsFillPencilFill className="ml-1"/></button></h1>
                        <br />
                        <br />
                        <br />
                        <table>
                            
                            <tr className="row">
                                <td className="var">Gender:</td>
                                <td className="value">Female</td>
                            </tr>
                            <tr className="row">
                                <td className="var">Address:</td>
                                <td className="value">123 Sesasmi Street st. , neverland peter pan amazon Cebu City</td>
                            </tr>
                            <tr className="row">
                                <td className="var">BirthDate:</td>
                                <td className="value">September 20, 2000</td>
                            </tr>
                            <tr className="row">
                                <td className="var">Age:</td>
                                <td className="value">23</td>
                            </tr>
                            <tr className="row">
                                <td className="var">Email:</td>
                                <td className="value">Example@example.com</td>
                            </tr>
                            <tr className="row">
                                <td className="var">Phone Number:</td>
                                <td className="value">0937 462 5364</td>
                            </tr>
                            <tr>
                                <td><button className="p-[7px] w-[3.2cm] mt-[1cm] flex flex-row items-center bg-[#FFA800] rounded-3xl"><MdOutlineLogout className="mr-[0.5cm]"/>Logout</button></td>
                                <td className="value"></td>
                            </tr>
                        </table>

                        
                    </div>
                
                    <div className="">
                    <h1 className="resTitle">Reservation History</h1>
                        <div className="h-[65vh] w-[55vw] rounded-3xl float-right bg-white mr-[2cm] mt-[0.5cm]">
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
        </div>
    )
    
}

export default UserProfilePage