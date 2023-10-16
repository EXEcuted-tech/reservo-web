import React, { useState, useEffect } from 'react'
import {IoLocation, IoCameraSharp} from 'react-icons/io5'
import {PiBinoculars} from 'react-icons/pi'
import {MdPhone} from 'react-icons/md'
import {FiEdit} from 'react-icons/fi'
import colors from '../../../common/colors'
import jjlogo from "../../../assets/jjlogo.png"
import axios from 'axios'
import GenSpinner from '../../../components/loaders/genSpinner'
import config from '../../../common/config'
import ImageEditModal from '../../../components/modals/settingsModal/imageEditModal.tsx';

import { searchProvince, searchRegion, searchBaranggay, searchMunicipality} from 'ph-geo-admin-divisions'
import { AdminRegion } from 'ph-geo-admin-divisions/lib/dtos'
import { LuSearchX } from 'react-icons/lu'

export default function GeneralSettings() {
    const [isLoading, setIsLoading] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newImageUrl, setNewImageUrl] = useState('');
  
    const openEditModal = () => {
      setIsEditModalOpen(true);
    };
  
    const closeEditModal = () => {
      setIsEditModalOpen(false);
    };
  
    const handleSaveImageUrl = (imageUrl: string) => {
      setNewImageUrl(imageUrl);
    };
    const merchID = Number(localStorage.getItem("merch_id"))

    //These are the masterlist from API
    const [regionNames, setRegionNames] = useState([]);
    const [provincesList, setProvincesList] = useState([]);
    const [municipalityList, setMunicipalityList] = useState<any>([]);

    


      //these are the info to be used on completing the form data
      const [selectedRegion, setSelectedRegion] = useState("");
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
    const [municipalityNames, setMunicipalityNames] = useState<any>([]);
    const [barangayNames, setBarangayNames] = useState([]);
    


    const [data, setData] = useState({
        merchant: {
            merchant_id: "", //to be changed
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
          val: merchID
        }
      }

      useEffect(() => {
        fetchData();
    }, [merchID]);
    
    useEffect(()=>{
        loadRegions();
    }, [merchID,data])

    const fetchData = async ()=>{
        /*get DB data*/
            const dbResponse = await axios.get(`${config.API}/merchant/retrieve`, request)
            const response = dbResponse.data;
            setData(response);
            setSelectedRegion(response.address.region);
            setSelectedProvince(response.address.province);
            setSelectedMunicipality(response.address.municipality);
            setSelectedBarangay(response.address.barangay);
            console.log("DATAAAAa => ", data);

    }

    const loadRegions = async()=>{
            const response = await axios.get("https://psgc.gitlab.io/api/regions/")
            const regionNames = response.data.map((region: { name: string; code: string, regionName: string})=>({
                        regionName: region.regionName,
                        name: region.name,
                        regionId: region.code
                    })) 
            setRegionNames(regionNames);
            const region:{name: string, regionId: string, regionName: string} = regionNames.find((reg: {name: string, regionId:string, regionName: string})=> reg.name === selectedRegion) || {name: '', regionId: '', regionName: ''};
            setSelectedRegionId(region.regionId);
            //console.log("DATA REGIONS : ", regionNames);

    }
                
                
                /*2nd Step to load data*/
                
                
        //        if (selectedRegionId!= undefined) {
        //          axios.get("https://psgc.gitlab.io/api/provinces/")
        //         .then((response) => {
        //           const result = response.data.map((province:{name: string, code: string, regionCode: string}) => ({
        //             name: province.name,
        //             provinceId: province.code,
        //             regionId: province.regionCode,
        //           }));
        //           setProvincesList(result);
        //           const  provinces = result.filter((prov:{name: string, provinceId: string, regionId: string}) =>
        //           prov.regionId === selectedRegionId
        //         ) || [];
        //         setProvinceNames(provinces);
        //         const province:any = provinces.find((prov:any)=> prov.name === selectedProvince) || {};
        //         setSelectedProvinceId(province.provinceId);
        //         console.log("PROVID: ", province.provinceId)
        //         })
        //         .catch((error) => {
        //           console.log("Failed to fetch province data:", error);
        //         });
        //     }
                

        //         if (selectedProvinceId!= undefined) {
        //          axios.get("https://psgc.gitlab.io/api/cities-municipalities/")
        //          .then((response) => {
        //            const result = response.data.map((municipality:{name: string, code: string, provinceCode: string ,regionCode: string}) => ({
        //             name: municipality.name,
        //             municipalityId: municipality.code,
        //             provinceId: municipality.provinceCode,
        //             regionId: municipality.regionCode
        //           }));
        //           setMunicipalityList(result);
                 
        //           const  municipality = result.filter((muni:{name: string, municipalityId: string, provinceId: string, regionId: string})=> 
               
        //             muni.provinceId === selectedProvinceId
        //           ) || [];

        //             setMunicipalityNames(municipality);
        //             const m:any = municipality.find((res:any)=> res.name === selectedMunicipality) || {};
        //             setSelectedMunicipalityId(m.municipalityId);
        //             console.log("MUNICIPALITY ID: ", m.municipalityId)
        //         })
        //         .catch((error) => {
        //           console.log("Failed to fetch municipality data:", error);
        //         });
        //     }

        //         if (selectedMunicipalityId!= undefined) {
        //         await axios.get("https://psgc.gitlab.io/api/cities-municipalities/"+ selectedMunicipalityId +"/barangays/")
        //          .then((response) => {
        //            const result = response.data.map((barangay:{name: string, code: string}) => ({
        //             name: barangay.name,
        //             barangayId: barangay.code,
        //           }));
        //           setBarangayNames(result);
        //           console.log("DATA BARANGaAY : ", result);
        //           const  barangay = result.filter((brgy:{name: string, municipalityId: string, provinceId: string, regionId: string})=> 
        //           brgy.name === selectedBarangay
        //           ) || [];
        //           setSelectedBarangayId(barangay.code);
        //         })
        //         .catch((error) => {
        //           console.log("Failed to fetch barangay data:", error);
        //         });
        //     }
        //         setIsLoading(false);
                        
        //    }
        //    catch(e){
        //        console.log("API ERROR");
        //        console.log(e)
                
        //    }
        
        

    const handleRegionChange = (e:any)=>{
        const {value} = e.target.value;
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
            setData((prevData: any)=>{
                return {
                    ...prevData,
                    address: {
                        ...prevData.address,
                        region: '',
                        province: '',
                        municipality: '',
                        barangay: '', 
                    },
                }
            })
            
        }else{
            // Update the selected region
            setSelectedRegion(value)
            //clear lower fields
            setSelectedProvince('');
            setSelectedProvinceId('');
            setSelectedMunicipality('');
            setSelectedMunicipalityId('');
            setSelectedBarangay('');
            setSelectedBarangayId('');
            axios.get(`https://psgc.gitlab.io/api/regions/`)
            .then(
                response=>{
                    
                    const region = response.data.find((res : {regionName: string, code: string, islandGroupCode: string}) => res.regionName === value);
                    console.log("RESPONSE DATA")
                    
                    console.log("CHANGE - REGIONSSSS");
                    console.log(region);
                    setSelectedRegionId(region.code);
                }
            )
                    axios.get(`https://psgc.gitlab.io/api/regions/`+ selectedRegionId + `/provinces/`)
                    .then(response=>{
                        const provinceNames = response.data.map((province: { name: string; code: string })=>({
                            name: province.name,
                            provinceId: province.code
                        }))
                        console.log("CHANGE - PROVINCENAMESSS");
                        console.log(provinceNames);
                        setProvinceNames(provinceNames);
                        
                        });
            setData((prevData: any)=>{
                return {
                    ...prevData,
                    address: {
                        ...prevData.address,
                        region: value,
                        province: '',
                        municipality: '',
                        barangay: '',
                    },
                }
            })
        }
        
    }

    const handleProvinceChange = async (e:any) => {
        const {value} = e.target.value;
    }

    const handleChange = async (e:any) => {
        const { name, value } = e.target;

       setData((prevData: any) => {

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
                    console.log("CURRENT PROV")
                     console.log(currentProvince)
                     setSelectedProvinceId(currentProvince[0].provinceId);
                     const municipality = searchMunicipality({ regionId: selectedRegionId, provinceId: currentProvince[0].provinceId});
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
            <div style={{fontFamily: 'Poppins, sans-serif'}} className="w-auto h-auto bg-white m-8 p-5 rounded-lg animate-fade-in   ">
                <div className='flex flex-row mr-5 ml-5'>
                    <PiBinoculars size={40} />
                    <h3 className='text-2xl mb-2 p-1'><strong>Business Overview</strong></h3>
                </div>
                
                <form className="mt-2 mr-5 ml-5" onSubmit={handleSubmit}> 
                    <div className="m-2 mb-8 flex flex-row  ">
                        <label className="text-lg p-2 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '3.0rem' }}>
                                Business Logo
                            </label>
                            <input type="button" id="logoInput" onClick={openEditModal} className=''></input>
                                {isLoading? <><span className='ml-5'><GenSpinner/></span></> // if we are still getting data from DB
                                :
                                <label htmlFor="logoInput" className='relative cursor-pointer flex items-center justify-center'>
                                    <img src={jjlogo} onError={(e) => {
                                        e.currentTarget.onerror = null; // Prevent infinite loop if the image itself is not found
                                        e.currentTarget.src = 'https://i.imgur.com/YNoZzmJ.png'; // Use a placeholder image as a fallback
                                        }} className="ml-5 overflow-hidden w-[9rem]">
                                    </img>                                    
                                    <div className='absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 hover:opacity-80 bg-white'>
                                        <IoCameraSharp className='relative text-[50px] left-[39%] bottom-[10%]'/>
                                        <p className='relative text-black font-bold text-[14px] top-[10%] right-[8%]'>Change Image</p>
                                    </div>                                  
                                </label>}

                                <ImageEditModal
                                    isOpen={isEditModalOpen}
                                    onClose={closeEditModal}
                                    onSave={handleSaveImageUrl}
                                />
                        </div>
                        <div className="m-2 flex flex-row ">
                            <label className="text-lg p-2 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '3.0rem' }}>
                                Business Name
                            </label>
                            <input
                                type="text"
                                placeholder={isLoading? "": "Enter your business name here..."}
                                value={data.merchant.merchant_name}
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
                                placeholder={isLoading? "": "Enter your branch name here... "}
                                value= {data.settings.branch}
                                disabled = {isLoading}
                                onChange={handleChange}
                                name="settings.branch"
                                className={`m-2 p-2 text w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 ${isLoading? 'animate-pulse cursor-not-allowed':''}`}
                                required
                            />
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className="text-lg mr-9 p-2 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '3.0rem' }}>
                                Description
                            </label>
                            <textarea
                                placeholder={isLoading? "":  "Enter your business description here..."}
                                value={data.settings.description}
                                disabled = {isLoading}
                                onChange={handleChange}
                                name="settings.description"
                                className={`m-2 p-2 text w-full flex border border-gray-300 rounded-md resize-none focus:outline-none focus:ring focus:ring-blue-500 ${isLoading? 'animate-pulse cursor-not-allowed':''}`}
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
                                value={data.address.country}
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
                                value={isLoading? "Loading ..." : selectedRegion || ""}
                                onChange={handleRegionChange}
                                className="m-2 p-2 ml-[1.1rem] text-gray-500 w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                required
                            >
                                {!isLoading ? 
                                <>
                                  <option value="">Select Region</option>
                                {regionNames.map((regionName: {name:string, code: string, regionName: string}) => (
                                    
                                    <option key={regionName.code} value={regionName.name}>
                                        
                                    {regionName.regionName + " - " + regionName.name}
                                    </option>
                                ))}
                                </>
                                : <></>}
                            </select>
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className="text-lg p-2 mr-[3.6rem] w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '2.5rem' }}>
                                Province
                            </label>
                            <select
                                name="address.province"
                                value={data.address.province}
                                onChange={handleChange}
                                className="m-2 p-2 ml-2 text-gray-500 w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                required
                            >
                                {!isLoading ? 
                                <>
                                <option value="">Select Province</option>
                                {provinceNames.map((province:{name: string, code:string}, idx) => (
                                    <option key={province.code} value={province.name}>
                                    {province.name}
                                    </option>
                                ))}
                                </>:<></>
                                
                                }
                            </select>
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className="text-lg p-2 mr-6 w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '2.5rem' }}>
                                Municipality
                            </label>
                            <select
                                name="address.municipality"
                                value={data.address.municipality}
                                onChange={handleChange}
                                className="m-2 p-2 ml-2 text-gray-500 w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                required
                            >
                                {!isLoading ? 
                                <>
                                <option value="">Select Municipality</option>
                                {municipalityNames.map((municipality:AdminRegion, idx) => (
                                    <option key={idx} value={municipality.name}>
                                    {municipality.name}
                                    </option>
                                    
                                ))}</>:<></>
                                };
                            </select>
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className="text-lg p-2 mr-[2.85rem] w-auto flex-shrink-0 font-semibold text-black" style={{ lineHeight: '2.5rem' }}>
                                Barangay
                            </label>
                            <select
                                name="address.barangay"
                                value={data.address.barangay}
                                onChange={handleChange}
                                className="m-2 p-2 ml-2 text-gray-500 w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                required
                            >
                                {!isLoading ? 
                                <>
                                 <option value="">Select Barangay</option>
                                {barangayNames.map((barangay:AdminRegion, idx) => (
                                    <option key={idx} value={barangay.name}>
                                    {barangay.name}
                                    </option>
                                ))}</>:<></>
                                }
                            </select>
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
                                placeholder={isLoading? "":  "+63"}
                                value={data.merchant.contact_number}
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
                                placeholder={isLoading? "":  "example@abc.com"}
                                value={data.merchant.email_address}
                                disabled = {isLoading}
                                onChange={handleChange}
                                className={`m-2 p-2 text w-full flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 ${isLoading? 'animate-pulse cursor-not-allowed': ''}`}
                                required
                            />
                        </div>
                        <div className='m-4 flow-root'>
                            <button
                                type="submit"
                                className={`px-10 py-1 mr-2 float-right text-white rounded-2xl focus:outline-none focus:ring focus:ring-blue-500 ${isLoading? 'bg-[#c58f8f] cursor-not-allowed' : ' bg-[#840705] hover:bg-[#660605]'}`}
                                disabled = {isLoading}
                            >
                            Save
                            </button>
                        </div>
                </form>
            </div>
        </>
        
    )
}