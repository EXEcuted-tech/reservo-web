import React, { useState, useEffect } from 'react'
import {IoLocation} from 'react-icons/io5'
import {PiBinoculars} from 'react-icons/pi'
import {MdPhone} from 'react-icons/md'
import colors from '../../../common/colors'
import jjlogo from "../../../assets/jjlogo.png"
import axios from 'axios'

export default function GeneralSettings() {
    const [data, setData] = useState({
        merchant: {
            merchant_id: 2,
            merchant_name: "",
            email_address: "",
            logo: "",
            contact_number: '',
            sched_id: ""
        },
        address: {
            country: "",  
            region: "",
            province: "",
            municipality: "",
            barangay: "",
        },
        settings: {
            branch: "",
            description: "",
        },
        accounts: {
            email: "",
            position: "",
        }
    });

    const request = {
        params: {
          column: 'merchant_id',
          value: 2
        }
      }

    useEffect(() => {
        axios.get(`http://localhost:5000/merchant/retrieve`, request)
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setData((prevData) => {

            //if input data is from object settings
            if(name.startsWith('settings.')) {
                const settingsKey = name.split('.')[1];
                return {
                    ...prevData,
                    settings: {
                        ...prevData.settings,
                        [settingsKey]: value,
                    },
                };
            }
            else if(name.startsWith('address.')) {
                const addressKey = name.split('.')[1];
                return {
                    ...prevData,
                    address: {
                        ...prevData.address,
                        [addressKey]: value,
                    },
                };
            }
            else if(name.startsWith('merchant.')){
                const merchantKey = name.split('.')[1];
                return {
                    ...prevData,
                    merchant: {
                        ...prevData.merchant,
                        [merchantKey]: value,
                    },
                };
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = data;
        console.log(formData);

        axios.post(`http://localhost:5000/merchant/update`, formData)
        .then(function(response){
            console.log(response);
        })
        .catch(function(error){
            console.log(error);
        })
    }
    return (
        <>
            <div style={{fontFamily: 'Poppins, sans-serif'}} className="w-auto h-auto bg-white m-8 p-5 rounded-lg">
                <div className='flex flex-row mr-5 ml-5'>
                    <PiBinoculars size={40} />
                    <h3 className='text-2xl mb-2 p-1'><strong>Business Overview</strong></h3>
                </div>
                
                <form className="mt-2 mr-5 ml-5" onSubmit={handleSubmit}> 
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
                                value={data.merchant.merchant_name || "Enter your business name here"}
                                onChange={handleChange}
                                name="merchant.merchant_name"
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
                                value={data.settings.branch || "Enter your branch name here"}
                                onChange={handleChange}
                                name="settings.branch"
                                className="m-2 ml-5 p-2 text w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className="text-sm p-2 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '3.0rem' }}>
                                Description
                            </label>
                            <textarea
                                value={data.settings.description || "Enter your business description here..."}
                                onChange={handleChange}
                                name="settings.description"
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
                <form className="mt-2 mr-5 ml-5" onSubmit={handleSubmit}> 
                        <div className="m-2 flex flex-row">
                            <label className="text-sm p-2 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '2.5rem' }}>
                                Country
                            </label>
                            <select
                                name="address.country"
                                value={data.address.country || "Select Country"}
                                onChange={handleChange}
                                className="m-2 p-2 ml-12 text-gray-500 w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                required
                            >
                                <option value="Canada">Canada</option>
                                <option value="Philippines">Philippines</option>
                                <option value="US">United States</option>
                            </select>
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className="text-sm p-2 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '2.5rem' }}>
                                Region
                            </label>
                            <select
                                name="address.region"
                                value={data.address.region || "Select Region"}
                                onChange={handleChange}
                                className="m-2 p-2 ml-14 text-gray-500 w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                required
                            >
                                <option value="A">Region A</option>
                                <option value="B">Region B</option>
                                <option value="C">Region C</option>
                            </select>
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className="text-sm p-2 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '2.5rem' }}>
                                Province
                            </label>
                            <select
                                name="address.province"
                                value={data.address.province || "Select Province"}
                                onChange={handleChange}
                                className="m-2 p-2 ml-11 text-gray-500 w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                required
                            >
                                <option value="A">Province A</option>
                                <option value="B">Province B</option>
                                <option value="C">Province C</option>
                            </select>
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className="text-sm p-2 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '2.5rem' }}>
                                Municipality
                            </label>
                            <select
                                name="address.municipality"
                                value={data.address.municipality || "Select Municipality"}
                                onChange={handleChange}
                                className="m-2 p-2 ml-5 text-gray-500 w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                required
                            >
                                <option value="A">Municipality A</option>
                                <option value="B">Municipality B</option>
                                <option value="C">Municipality C</option>
                            </select>
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className="text-sm p-2 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '2.5rem' }}>
                                Barangay
                            </label>
                            <select
                                name="address.barangay"
                                value={data.address.barangay || "Select Barangay"}
                                onChange={handleChange}
                                className="m-2 p-2 ml-9 text-gray-500 w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                required
                            >
                                <option value="A">Barangay A</option>
                                <option value="B">Barangay B</option>
                                <option value="C">Barangay C</option>
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
                <form className="mt-2 mr-5 ml-5" onSubmit={handleSubmit}> 
                        <div className="m-2 flex flex-row">
                            <label className="text-sm p-2 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '3.0rem' }}>
                                Contact Number
                            </label>
                            <input
                                type="tel"
                                maxLength={11}
                                name="merchant.contact_number"
                                value={data.merchant.contact_number || "+63"}
                                onChange={handleChange}
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
                                name="merchant.email_address"
                                value={data.merchant.email_address || "example@abc.com"}
                                onChange={handleChange}
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