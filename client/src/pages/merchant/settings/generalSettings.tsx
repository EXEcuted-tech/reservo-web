import React, { useState, useEffect } from 'react'
import {IoLocation} from 'react-icons/io5'
import {PiBinoculars} from 'react-icons/pi'
import {MdPhone} from 'react-icons/md'
import colors from '../../../common/colors'
import jjlogo from "../../../assets/jjlogo.png"
import axios from 'axios'
import GenSpinner from '../../../components/loaders/genSpinner'
import config from '../../../common/config'
import { searchProvince, searchRegion, searchBaranggay, searchMunicipality} from 'ph-geo-admin-divisions'
import { AdminRegion } from 'ph-geo-admin-divisions/lib/dtos'
import { LuSearchX } from 'react-icons/lu'

export default function GeneralSettings() {
    const [isLoading, setIsLoading] = useState(false);
    const regionNames = [
        "NCR",
        "CAR ",
        "Region I (Ilocos Region)",
        "Region II (Cagayan Valley)",
        "Region III (Central Luzon)",
        "Region IV-A (CALABARZON)",
        "Region IV-B (MIMAROPA)",
        "Region V (Bicol Region)",
        "Region VI (Western Visayas)",
        "Region VII (Central Visayas)",
        "Region VIII (Eastern Visayas)",
        "Region IX (Zamboanga Peninsula)",
        "Region X (Northern Mindanao)",
        "Region XI (Davao Region)",
        "Region XII (SOCCSKSARGEN)",
        "Region XIII (Caraga)",
        "Bangsamoro Autonomous Region in Muslim Mindanao (BARMM)",
      ];
    
      //these are the info to be used on completing the form data
      const [selectedRegion, setSelectedRegion] = useState<any>();
      const [selectedBarangay, setSelectedBarangay] = useState("");
      const [selectedMunicipality, setSelectedMunicipality] = useState("");
      const [selectedProvince, setSelectedProvince] = useState("");

      //these are the IDs to be used for query
      const [selectedRegionId, setSelectedRegionId] = useState("");
      const [selectedProvinceId, setSelectedProvinceId] = useState("000");
      const [selectedMunicipalityId, setSelectedMunicipalityId] = useState("000");
      const [selectedBarangayId, setSelectedBarangayId] = useState("000");
      
      
    //these are the geolocation names, these will dynamically change based on inputs
    const [provinceNames, setProvinceNames] = useState([]);
    const [municipalityNames, setMunicipalityNames] = useState([]);
    const [barangayNames, setBarangayNames] = useState([]);
    


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
          col: 'merchant_id',
          val: 2
        }
      }

    useEffect(() => {
        setIsLoading(true);
        axios.get(`${config.API}/merchant/retrieve`, request)
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.log(error);
        })
        setIsLoading(false);
    }, []);

    const handleChange = async (e:any) => {
        const { name, value } = e.target;

       await setData((prevData: any) => {

            //if input data is from object settings
            if (name.startsWith('settings.')) {
                const settingsKey = name.split('.')[1]
                return {
                    ...prevData,
                    settings: {
                        ...prevData.settings,
                        [settingsKey]: value,
                    },
                }
            }
            else if (name.startsWith('address.')) {
                const addressKey = name.split('.')[1]

                if (addressKey === 'region') {
                    if (value === ""){
                        setSelectedRegion('');
                        setSelectedProvince('');
                        setSelectedProvinceId('');
                        setSelectedMunicipality('');
                        setSelectedMunicipalityId('');
                        setSelectedBarangay('');
                        setSelectedBarangayId('');
                        setProvinceNames([]);
                        setBarangayNames([]);
                        setMunicipalityNames([]);
                        return {
                            ...prevData,
                            address: {
                                ...prevData.address,
                                [addressKey]: '',
                                province: '',
                                municipality: '',
                                barangay: '', 
                            },
                        }
                    }
                    // Update the selected region
                    setSelectedRegion(value)
                    //clear lower fields
                    setSelectedProvince('');
                    setSelectedProvinceId('');
                    setSelectedMunicipality('');
                    setSelectedMunicipalityId('');
                    setSelectedBarangay('');
                    setSelectedBarangayId('');
                    const currentRegion = searchRegion({ name: value })
                        if (currentRegion) {
                            setSelectedRegionId(currentRegion[0].regionId)
                            const provinces = searchProvince({ regionId: selectedRegionId })
                            const result = provinces.map(AdminRegion => ({
                                provinceId: AdminRegion.provinceId,
                                name: AdminRegion.name
                            }))

                            setProvinceNames(result)


                        }
                return {
                    ...prevData,
                    address: {
                        ...prevData.address,
                        [addressKey]: value,
                        province: '',
                        municipality: '',
                        barangay: '',
                    },
                }
                }
                if (addressKey === 'province') {
                    if (value === ""){
                     setSelectedProvince(value)
                     setSelectedMunicipality('');
                     setSelectedMunicipalityId('');
                     setSelectedBarangay('');
                     setSelectedBarangayId('');
                     setBarangayNames([]);
                     setMunicipalityNames([]);
                    return {
                        ...prevData,
                        address: {
                            ...prevData.address,
                            [addressKey]: '',
                            municipality: '',
                            barangay: '',
                        },
                    }
                    }
                    
                     const currentProvince = searchProvince({ name: value, regionId: selectedRegionId });
                     setSelectedProvinceId(currentProvince[0].provinceId);
                     const municipality = searchMunicipality({ regionId: selectedRegionId, provinceId: selectedProvinceId});
                        if (municipality) {
                            const result = municipality.map(AdminRegion => ({
                                municipalityId: AdminRegion.municipalityId,
                                name: AdminRegion.name
                            }))
                             setMunicipalityNames(result)
                        }
                return {
                    ...prevData,
                    address: {
                        ...prevData.address,
                        [addressKey]: value,
                        municipality: '',
                        barangay: '',
                    },
                }
            
                }

                if (addressKey === 'municipality') {
                    if (value === ""){
                        
                        setBarangayNames([]);
                        setSelectedBarangay('');
                        setSelectedBarangayId('');
                        return{
                            ...prevData,
                        address: {
                            ...prevData.address,
                            [addressKey]: '',
                            barangay: '',
                        },
                        }
                    }
                    setSelectedMunicipality(value)
                    setSelectedBarangay('');
                    const currentMunicipality = searchMunicipality({ name: value, provinceId: selectedProvinceId})
                    setSelectedMunicipalityId(currentMunicipality[0].municipalityId)
                    const currentBaranggay = searchBaranggay({municipalityId: selectedMunicipalityId, provinceId: selectedProvinceId})
                        if (currentBaranggay) {
                            const result = currentBaranggay.map(AdminRegion => ({
                                barangayId: AdminRegion.baranggayId,
                                name: AdminRegion.name
                            }))
                            setBarangayNames(result);
                        }
                return {
                    ...prevData,
                    address: {
                        ...prevData.address,
                        [addressKey]: value,
                        barangay: '',
                    },
                }
                }


                if (addressKey === 'barangay') {
                    if (value === ""){
                        return {
                            ...prevData,
                            address: {
                                ...prevData.address,
                                [addressKey]: '',
                            },
                        }
                    }
                    setSelectedBarangay(value);
                return {
                    ...prevData,
                    address: {
                        ...prevData.address,
                        [addressKey]: value,
                    },
                }
                }

                return {
                    ...prevData,
                    address: {
                        ...prevData.address,
                        [addressKey]: value,
                    },
                }
            }
            else if (name.startsWith('merchant.')) {
                const merchantKey = name.split('.')[1]
                return {
                    ...prevData,
                    merchant: {
                        ...prevData.merchant,
                        [merchantKey]: value,
                    },
                }
            }
        });
        console.log(data.address);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const formData = data;
        console.log(formData);

        axios.post(`${config.API}/merchant/update`, formData)
        .then(function(response){
            console.log(response);
        })
        .catch(function(error){
            console.log(error);
        })
    }
    return (
        <>
            <div style={{fontFamily: 'Poppins, sans-serif'}} className="w-auto h-auto bg-white m-8 p-5 rounded-lg animate-fade-in">
                <div className='flex flex-row mr-5 ml-5'>
                    <PiBinoculars size={40} />
                    <h3 className='text-2xl mb-2 p-1'><strong>Business Overview</strong></h3>
                </div>
                
                <form className="mt-2 mr-5 ml-5" onSubmit={handleSubmit}> 
                    <div className="m-2 flex flex-row ">
                        <label className="text-lg p-2 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '3.0rem' }}>
                                Business Logo
                            </label>
                                {isLoading? <><span className='ml-5'><GenSpinner/></span></> // if we are still getting data from DB
                                :
                                <img src={jjlogo} onError={(e) => {
                                    e.currentTarget.onerror = null; // Prevent infinite loop if the image itself is not found
                                    e.currentTarget.src = 'https://i.imgur.com/YNoZzmJ.png'; // Use a placeholder image as a fallback
                                    }} className="ml-5">
                                </img>}
                                
                        </div>
                        <div className="m-2 flex flex-row ">
                            <label className="text-lg p-2 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '3.0rem' }}>
                                Business Name
                            </label>
                            <input
                                type="text"
                                value={isLoading? "Loading... ": data.merchant.merchant_name || "Enter your business name here..."}
                                disabled = {isLoading}
                                onChange={handleChange}
                                name="merchant.merchant_name"
                                className={`m-2 ml-2 p-2 w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 ${isLoading? 'animate-pulse cursor-not-allowed':''}`}
                                required
                            />
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className="text-lg mr-4 p-2 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '3.0rem' }}>
                                Branch Name
                            </label>
                            <input
                                type="text"
                                value={isLoading? "Loading... ": data.settings.branch || "Enter your branch name here... "}
                                disabled = {isLoading}
                                onChange={handleChange}
                                name="settings.branch"
                                className={`m-2 ml-5 p-2 text w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 ${isLoading? 'animate-pulse cursor-not-allowed':''}`}
                                required
                            />
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className="text-lg mr-9 p-2 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '3.0rem' }}>
                                Description
                            </label>
                            <textarea
                                value={isLoading? "Loading... ": data.settings.description || "Enter your business description here..."}
                                disabled = {isLoading}
                                onChange={handleChange}
                                name="settings.description"
                                className={`m-2 ml-9 p-2 text w-full flex border border-gray-300 rounded-md resize-none focus:outline-none focus:ring focus:ring-blue-500 ${isLoading? 'animate-pulse cursor-not-allowed':''}`}
                                required
                            />
                        </div>
                        <div className='m-4 flow-root'>
                            <button
                                type="submit"
                                disabled = {isLoading}
                                className={`px-10 py-1 mr-2 float-right text-white rounded-2xl focus:outline-none focus:ring focus:ring-blue-500 ${isLoading? 'bg-[#c58f8f] cursor-not-allowed' : ' bg-[#840705] hover:bg-[#660605]'}`}
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
                            <label className="text-lg mr-16 p-2 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '2.5rem' }}>
                                Country
                            </label>
                            <select
                                name="address.country"
                                value={data.address.country || "Philippines"}
                                onChange={handleChange}
                                className="m-2 p-2 ml-2 text-gray-500 w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                required
                            >
                                <option value="Philippines">Philippines</option>
                            </select>
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className="text-lg p-2 mr-16 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '2.5rem' }}>
                                Region
                            </label>
                            <select
                                name="address.region"
                                value={data.address.region || ""}
                                onChange={handleChange}
                                className="m-2 p-2 ml-[1.1rem] text-gray-500 w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                required
                            >
                                  <option value="">Select Region</option>
                                {regionNames.map((regionName:string) => (
                                    <option key={regionName} value={regionName}>
                                    {regionName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className="text-lg p-2 mr-[3.6rem] w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '2.5rem' }}>
                                Province
                            </label>
                            <select
                                name="address.province"
                                value={data.address.province || ""}
                                onChange={handleChange}
                                className="m-2 p-2 ml-2 text-gray-500 w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Province</option>
                                {provinceNames.map((province:AdminRegion) => (
                                    <option key={province.provinceId} value={province.name}>
                                    {province.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className="text-lg p-2 mr-6 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '2.5rem' }}>
                                Municipality
                            </label>
                            <select
                                name="address.municipality"
                                value={data.address.municipality || ""}
                                onChange={handleChange}
                                className="m-2 p-2 ml-2 text-gray-500 w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Municipality</option>
                                {municipalityNames.map((municipality:AdminRegion) => (
                                    <option key={municipality.municipalityId} value={municipality.name}>
                                    {municipality.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className="text-lg p-2 mr-[2.85rem] w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '2.5rem' }}>
                                Barangay
                            </label>
                            <select
                                name="address.barangay"
                                value={data.address.barangay || "Select Barangay"}
                                onChange={handleChange}
                                className="m-2 p-2 ml-2 text-gray-500 w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                required
                            >
                                 <option value="">Select Barangay</option>
                                {barangayNames.map((barangay:AdminRegion) => (
                                    <option key={barangay.baranggayId} value={barangay.name}>
                                    {barangay.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='m-4 flow-root'>
                            <button
                                type="submit"
                                className="px-10 py-1 mr-2 float-right bg-[#840705] text-white text-m rounded-2xl hover:bg-[#660605] focus:outline-none focus:ring focus:ring-blue-500 transition-colors delay-250 duration-[3000] ease-in"
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
                            <label className="text-lg p-2 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '3.0rem' }}>
                                Contact Number
                            </label>
                            <input
                                type="tel"
                                maxLength={11}
                                name="merchant.contact_number"
                                value={isLoading? "Loading... " : data.merchant.contact_number || "+63"}
                                disabled= {isLoading}
                                onChange={handleChange}
                                className={`m-2 ml-5 p-2 text w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 ${isLoading? 'animate-pulse cursor-not-allowed': ''} `}
                                required
                            />
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className="text-lg p-2 mr-[2.15rem] w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '3.0rem' }}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="merchant.email_address"
                                value={isLoading? "Loading... " : data.merchant.email_address || "example@abc.com"}
                                disabled = {isLoading}
                                onChange={handleChange}
                                className={`m-2 ml-9 p-2 text w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 ${isLoading? 'animate-pulse cursor-not-allowed': ''}`}
                                required
                            />
                        </div>
                        <div className='m-4 flow-root'>
                            <button
                                type="submit"
                                className={`px-10 py-1 mr-2 float-right text-white rounded-2xl focus:outline-none focus:ring focus:ring-blue-500 ${isLoading? 'bg-[#c58f8f] cursor-not-allowed' : ' bg-[#840705] hover:bg-[#660605]'}`}
                            >
                            Save
                            </button>
                        </div>
                </form>
            </div>
        </>
        
    )
}