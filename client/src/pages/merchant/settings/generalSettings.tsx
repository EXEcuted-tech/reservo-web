import React, { useState, useEffect } from 'react'
import {IoLocation} from 'react-icons/io5'
import {PiBinoculars} from 'react-icons/pi'
import {MdPhone} from 'react-icons/md'
import colors from '../../../common/colors'
import jjlogo from "../../../assets/jjlogo.png"

export default function GeneralSettings() {
    const HandleSubmit = () => {
        //smth
    }
    return (
        <>
            <div style={{fontFamily: 'Poppins, sans-serif'}} className="w-auto h-auto bg-white m-8 p-5 rounded-lg">
                <div className='flex flex-row mr-5 ml-5'>
                    <PiBinoculars size={40} />
                    <h3 className='text-2xl mb-2 p-1'><strong>Business Overview</strong></h3>
                </div>
                
                <form className="mt-2 mr-5 ml-5" onSubmit={HandleSubmit}> 
                    <div className="m-2 flex flex-row ">
                        <label className="text-sm p-2 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '3.0rem' }}>
                                Business Logo
                            </label>
                                <img src={jjlogo} className="ml-5"></img>
                        </div>
                        <div className="m-2 flex flex-row ">
                            <label className="text-sm p-2 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '3.0rem' }}>
                                Business Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your business name here"
                                id=""
                                name=""
                                className="m-2 ml-2 p-2 w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className="text-sm p-2 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '3.0rem' }}>
                                Branch Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your branch name here"
                                id=""
                                name=""
                                className="m-2 ml-5 p-2 text w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className="text-sm p-2 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '3.0rem' }}>
                                Description
                            </label>
                            <textarea
                                id=""
                                placeholder="Enter your business description here..."
                                name=""
                                className="m-2 ml-9 p-2 text w-full flex border border-gray-300 rounded-md resize-none focus:outline-none focus:ring focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className='m-4 flow-root'>
                            <button
                                type="submit"
                                className="px-10 py-1 mr-2 float-right bg-[#840705] text-white rounded-2xl hover:bg-[#660605] focus:outline-none focus:ring focus:ring-blue-500"
                            >
                            Save
                            </button>
                        </div>
                </form>
            </div>

            <div style={{fontFamily: 'Poppins, sans-serif'}} className="w-auto h-auto bg-white m-8 p-5 rounded-lg">
                <div className='flex flex-row mr-5 ml-5'>
                    <IoLocation size={40} />
                    <h3 className='text-2xl mb-2 p-1'><strong>Business Address</strong></h3>
                </div>
                <form className="mt-2 mr-5 ml-5" onSubmit={HandleSubmit}> 
                        <div className="m-2 flex flex-row">
                            <label className="text-sm p-2 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '2.5rem' }}>
                                Country
                            </label>
                            <select
                                id="country"
                                name="country"
                                className="m-2 p-2 ml-12 text-gray-500 w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Country</option>
                                <option value="">Canada</option>
                                <option value="">Philippines</option>
                                <option value="">United States</option>
                            </select>
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className="text-sm p-2 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '2.5rem' }}>
                                Region
                            </label>
                            <select
                                id="region"
                                name="region"
                                className="m-2 p-2 ml-14 text-gray-500 w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Region</option>
                                <option value="">Region A</option>
                                <option value="">Region B</option>
                                <option value="">Region C</option>
                            </select>
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className="text-sm p-2 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '2.5rem' }}>
                                Province
                            </label>
                            <select
                                id="province"
                                name="province"
                                className="m-2 p-2 ml-11 text-gray-500 w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Province</option>
                                <option value="">Province A</option>
                                <option value="">Province B</option>
                                <option value="">Province C</option>
                            </select>
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className="text-sm p-2 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '2.5rem' }}>
                                Municipality
                            </label>
                            <select
                                id="municipality"
                                name="municipality"
                                className="m-2 p-2 ml-5 text-gray-500 w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Municipality</option>
                                <option value="">Municipality A</option>
                                <option value="">Municipality B</option>
                                <option value="">Municipality C</option>
                            </select>
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className="text-sm p-2 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '2.5rem' }}>
                                Barangay
                            </label>
                            <select
                                id="barangay"
                                name="barangay"
                                className="m-2 p-2 ml-9 text-gray-500 w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Barangay</option>
                                <option value="">Barangay A</option>
                                <option value="">Barangay B</option>
                                <option value="">Barangay C</option>
                            </select>
                        </div>
                        <div className='m-4 flow-root'>
                            <button
                                type="submit"
                                className="px-10 py-1 mr-2 float-right bg-[#840705] text-white rounded-2xl hover:bg-[#660605] focus:outline-none focus:ring focus:ring-blue-500"
                            >
                            Save
                            </button>
                        </div>
                </form>
            </div>

            <div style={{fontFamily: 'Poppins, sans-serif'}} className="w-auto h-auto bg-white m-8 p-5 rounded-lg">
                <div className='flex flex-row mr-5 ml-5'>
                    <MdPhone size={40} />
                    <h3 className='text-2xl mb-2 p-1'><strong>Contact Details</strong></h3>
                </div>
                <form className="mt-2 mr-5 ml-5" onSubmit={HandleSubmit}> 
                        <div className="m-2 flex flex-row">
                            <label className="text-sm p-2 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '3.0rem' }}>
                                Contact Number
                            </label>
                            <input
                                type="text"
                                placeholder="+63"
                                id=""
                                name=""
                                className="m-2 ml-5 p-2 text w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className="text-sm p-2 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '3.0rem' }}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="example@abc.com"
                                id=""
                                name=""
                                className="m-2 ml-9 p-2 text w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className='m-4 flow-root'>
                            <button
                                type="submit"
                                className="px-10 py-1 mr-2 float-right bg-[#840705] text-white rounded-2xl hover:bg-[#660605] focus:outline-none focus:ring focus:ring-blue-500"
                            >
                            Save
                            </button>
                        </div>
                </form>
            </div>
        </>
        
    )
}