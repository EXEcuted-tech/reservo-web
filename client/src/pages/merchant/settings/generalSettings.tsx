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
import Notification from '../../../components/alerts/Notification.tsx'

export default function GeneralSettings() {
    const [isLoading, setIsLoading] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newImageUrl, setNewImageUrl] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [notification, setNotification] = useState('');
    const [color, setColor] = useState('#660605');
  
    const openEditModal = () => {
      setIsEditModalOpen(true);
    };
  
    const closeEditModal = () => {
      setIsEditModalOpen(false);
    };
  
    const handleSaveImageUrl = (imageUrl: string) => {
      setNewImageUrl(imageUrl);
      setIsEditModalOpen(false);
    };

     const merchID = Number(localStorage.getItem("merch_id"))

    //These are the masterlist from API
    const [regionNames, setRegionNames] = useState([]);
    const [municipalityList, setMunicipalityList] = useState<any>([]);

      //these are the info to be used on completing the form data
      const [selectedRegion, setSelectedRegion] = useState("");
      const [selectedBarangay, setSelectedBarangay] = useState("");
      const [selectedMunicipality, setSelectedMunicipality] = useState("");
      const [selectedProvince, setSelectedProvince] = useState("");
      const [requiredFields, setRequiredFields] = useState(true);

      //these are the IDs to be used for query
      const [selectedRegionId, setSelectedRegionId] = useState("");
      const [selectedProvinceId, setSelectedProvinceId] = useState("");
      const [selectedMunicipalityId, setSelectedMunicipalityId] = useState("");
      const [selectedBarangayId, setSelectedBarangayId] = useState("");
      
      
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
            tags: "",
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
        setIsLoading(true)
        fetchData();
        setIsLoading(false)
    }, [merchID]);


    useEffect(() => {
        setIsLoading(true)
        loadRegions();
        setIsLoading(false)
    }, [data, selectedCountry]);

    useEffect(()=>{
        setIsLoading(true)
        loadProvinces();
        setIsLoading(false)
    }, [selectedProvince, selectedRegionId])

    useEffect(()=>{
        setIsLoading(true)
        loadMunicipality();
        setIsLoading(false)
    }, [selectedMunicipality, selectedProvinceId])

    useEffect(()=>{
        
        if (selectedMunicipalityId) {
            setIsLoading(true)
            loadBarangay();
            setIsLoading(false)
        }
    }, [selectedMunicipalityId])

    useEffect(()=>{
        setTimeout(()=>{
            setNotification('');
            setColor('#660605')
        }, 5200)
    }, [notification]);

    const fetchData = async ()=>{
        /*get DB data*/
        try{
            await axios.get(`${config.API}/merchant/retrieve`, request).then((res)=>{
                const response = res.data;
                var tempResponse = response;
                
                if (tempResponse.settings == null || '') {
                    tempResponse.settings = '';
                }
                console.log("TEMP RESPONSE =>>>", tempResponse);
                setData(tempResponse);
                setSelectedCountry (response.address.country);
                setSelectedRegion(response.address.region);
                setSelectedProvince(response.address.province);
                setSelectedMunicipality(response.address.municipality);
                setSelectedBarangay(response.address.barangay);
                //console.log("DATAAAAa => ", data);
            })
        }catch(error){
            setColor('#660605')
            setNotification("API: Failed to fetch merchant data")
            
        }
           
    }

    const loadRegions = async()=>{
        if (selectedCountry == 'Philippines'){
            try{
            const response = await axios.get("https://psgc.gitlab.io/api/regions/")
            const regionNames = response.data.map((region: { name: string; code: string, regionName: string})=>({
                        regionName: region.regionName,
                        name: region.name,
                        regionId: region.code
                    })) 
            setRegionNames(regionNames);
            const region:{name: string, regionId: string, regionName: string} = regionNames.find((reg: {name: string, regionId:string, regionName: string})=> reg.name === selectedRegion) || {name: '', regionId: '', regionName: ''};
            if (selectedRegion === ''){
                setSelectedRegionId('');
            }
            else{
            setSelectedRegionId(region.regionId);
            //console.log("DATA REGIONS : ", regionNames);
            }
        }
        catch(error){
            setColor('#660605')
            setNotification("API: Failed to get region data")
        }
    }
    else{
        setRegionNames([]);
    }
    }

    const loadProvinces = async ()=>{
        //console.log("REGION ID : ", selectedRegionId);
        if (selectedRegionId === '' || selectedCountry != 'Philippines'){
            setProvinceNames([]);
            setSelectedProvinceId('');
        }else{
            axios.get("https://psgc.gitlab.io/api/regions/"+selectedRegionId+"/provinces")
           .then((response) => {
             const result = response.data.map((province:{name: string, code: string, regionCode: string}) => ({
               name: province.name,
               provinceId: province.code,
               regionId: province.regionCode,
             }));
           setProvinceNames(result);
           const province:any = result.find((prov:any)=> prov.name === selectedProvince) || {};
           setSelectedProvinceId(province.provinceId);
           //console.log("PROVID: ", province.provinceId)
           })
           .catch((error) => {
             //console.log("Failed to fetch province data:", error);
             setColor('#660605')
             setNotification("API: Failed to get province data")
           });
        }
    }


    const loadMunicipality = async () => {
        if (selectedProvinceId != ""){
                 axios.get("https://psgc.gitlab.io/api/cities-municipalities/")
                 .then((response) => {
                   const result = response.data.map((municipality:{name: string, code: string, provinceCode: string ,regionCode: string}) => ({
                    name: municipality.name,
                    municipalityId: municipality.code,
                    provinceId: municipality.provinceCode,
                    regionId: municipality.regionCode
                  }));
                  setMunicipalityList(result);
                  const  municipality = result.filter((muni:{name: string, municipalityId: string, provinceId: string, regionId: string})=> 
                    muni.provinceId === selectedProvinceId
                  ) || [];
                    //console.log("MUNICIPALITIES ==> ", selectedMunicipality)
                    setMunicipalityNames(municipality);
                    const m:any = municipality.find((res:any)=> res.name === selectedMunicipality) || {};
                    setSelectedMunicipalityId(m.municipalityId);
                   // console.log("MUNICIPALITY : ", selectedMunicipalityId)
                })
                .catch((error) => {
                  //console.log("Failed to fetch municipality data:", error);
                  setColor('#660605')
                  setNotification("API: Failed to fetch municipality data")
                });
            }else{
                setMunicipalityNames([]);
                setSelectedMunicipalityId("");
            }

        }
    
    const loadBarangay = async () => {
        if (selectedMunicipalityId != ''){
        axios.get("https://psgc.gitlab.io/api/cities-municipalities/"+ selectedMunicipalityId +"/barangays/")
                 .then((response) => {
                   const result = response.data.map((barangay:{name: string, code: string}) => ({
                    name: barangay.name,
                    barangayId: barangay.code,
                  }));
                  setBarangayNames(result);
                  //console.log("DATA BARANGaAY : ", result);
                  const  barangay = result.filter((brgy:{name: string, municipalityId: string, provinceId: string, regionId: string})=> 
                  brgy.name === selectedBarangay
                  ) || [];
                  setSelectedBarangayId(barangay.code);
                  setRequiredFields(false);
                })
                .catch((error) => {
                  //console.log("Failed to fetch barangay data:", error);
                  setColor('#660605')
                  setNotification("API: Failed to fetch barangay data")
                });
            }else{
                setSelectedBarangay('');
                setSelectedBarangayId('');
                setRequiredFields(true);
            }
    }

    const handleChange = async (e:any) => {
        const { name, value } = e.target;

       setData((prevData: any) => {


            //if input data is from object settings
            if (name.startsWith('settings.')) {
                const settingsKey = name.split('.')[1]
                //console.log("CURRENTLY CHANGING ==> ", settingsKey)
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

                if (addressKey === 'country'){
                    if (value === '' || value != 'Philippines'){
                        setSelectedCountry('')
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
                        // Clear lower fields
                        setData((prevData: any) => ({
                            ...prevData,
                            address: {
                                country: '',
                                region: '',
                                province: '',
                                municipality: '',
                                barangay: '',
                            },
                        }));
                    }else{
                        setSelectedCountry(value)
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
                        // Clear lower fields
                        setData((prevData: any) => ({
                            ...prevData,
                            address: {
                                country: value,
                                region: '',
                                province: '',
                                municipality: '',
                                barangay: '',
                            },
                        }));
                    }
                    setRequiredFields(true);
                    // return;
                }
                if (addressKey === 'region'){
                    if (value === '') {
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
                        // Clear lower fields
                        setData((prevData: any) => ({
                            ...prevData,
                            address: {
                                region: '',
                                province: '',
                                municipality: '',
                                barangay: '',
                            },
                        }));
                    } else {
                        //console.log("I AM HEREE!! BETCH!!");
                        // Update the selected region
                        setSelectedRegion(value);
                        setSelectedProvince('');
                        setSelectedProvinceId('');
                        setSelectedMunicipality('');
                        setSelectedMunicipalityId('');
                        setSelectedBarangay('');
                        setSelectedBarangayId('');
                        setBarangayNames([]);
                        setMunicipalityNames([]);
                
                        
                
                            // Update data state
                            setData((prevData: any) => ({
                                ...prevData,
                                address: {
                                    region: value,
                                    province: '',
                                    municipality: '',
                                    barangay: '',
                                },
                            }));
                
                      
                    }
                    setRequiredFields(true);
                }
                if (addressKey === 'province') {
                    if (value === '') {
                        setSelectedProvince('');
                        setSelectedProvinceId('');
                        setSelectedMunicipality('');
                        setSelectedMunicipalityId('');
                        setSelectedBarangay('');
                        setSelectedBarangayId('');
                        setBarangayNames([]);
                        setMunicipalityNames([]);
                        // Clear lower fields
                        setData((prevData: any) => ({
                            ...prevData,
                            address: {
                                province: '',
                                municipality: '',
                                barangay: '',
                            },
                        }));
                    } else {
                        // Update the selected region
                        setSelectedProvince(value);
                        setSelectedProvinceId('');
                        setSelectedMunicipality('');
                        setSelectedMunicipalityId('');
                        setSelectedBarangay('');
                        setSelectedBarangayId('');
                        setBarangayNames([]);
                        setMunicipalityNames([]);
                
                        
                
                            // Update data state
                            setData((prevData: any) => ({
                                ...prevData,
                                address: {
                                    ...prevData.address,
                                    province: value,
                                    municipality: '',
                                    barangay: '',
                                },
                            }));
                
                      
                    }
                    setRequiredFields(true);
            
                }

                if (addressKey === 'municipality') {
                    if (value === '') {
                        setSelectedMunicipality('');
                        setSelectedMunicipalityId('');
                        setSelectedBarangay('');
                        setSelectedBarangayId('');
                        setBarangayNames([]);
                        // Clear lower fields
                        setData((prevData: any) => ({
                            ...prevData,
                            address: {
                                municipality: '',
                                barangay: '',
                            },
                        }));
                    } else {
                        // Update the selected region
                        setSelectedMunicipality(value);
                        setSelectedMunicipalityId('');
                        setSelectedBarangay('');
                        setSelectedBarangayId('');
                        setBarangayNames([]);
                            // Update data state
                            setData((prevData: any) => ({
                                ...prevData,
                                address: {
                                    ...prevData.address,
                                    municipality: value,
                                    barangay: '',
                                },
                            }));
                
                      
                    }
                    setRequiredFields(true);

                }


                if (addressKey === 'barangay') {

                    if (value === '') {
                        setSelectedBarangay('');
                        setSelectedBarangayId('');
                        setData((prevData: any) => ({
                            ...prevData,
                            address: {
                                barangay: '',
                            },
                        }));
                        setRequiredFields(true);
                    } else {
                        // Update the selected region
                        setSelectedBarangay(value);
                       // console.log("CURRENT BRGY SEL ==> ", value)
                        setSelectedBarangayId('');
                            // Update data state
                            setData((prevData: any) => ({
                                ...prevData,
                                address: {
                                    ...prevData.address,
                                    barangay: value,
                                },
                            }));
                
                        setRequiredFields(false);
                    }
                }

                return {
                    ...prevData,
                    address: {
                        ...prevData.address,
                        [addressKey]: value,
                    },
                }
               // console.log("CURRENT ADDRESS ==> ", data.address);
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
        
    };
    
    
    const handleSubmit = (e: any) => {
        setIsLoading(true)
        e.preventDefault();
        data.merchant.logo = newImageUrl ? newImageUrl: data.merchant.logo;

        const formData = data;
        //console.log("FORMDATA ==> ", formData);

        axios.post(`${config.API}/merchant/update`, formData)
        .then(function(response){
        //console.log("SERVER RESPONDED WITH ==> ", response);
          if (response.data.success === true){
            setNotification("Successfully Saved!");
          }else{
            setNotification("Error with code: "+response.data.status);
          }
        })
        .catch(function(error){
            //console.log(error.request.status);
            setNotification("Error with code "+ error.request.status);
        })
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }
    
    return (
        <>
        {(notification === '')? <></>:  <Notification message={notification} color={color}/>}
       
            <div style={{fontFamily: 'Poppins, sans-serif'}} className="w-auto h-auto bg-white m-8 p-5 rounded-lg animate-fade-in xs:max-sm:w-[130%] xs:max-sm:p-2 xs:max-sm:ml-[-2%]">
                <div className='flex flex-row mr-5 ml-5'>
                    <PiBinoculars className="text-4xl xs:max-sm:text-[1.3em] xs:max-sm:mt-[0.5rem] xl:max-2xl:text-[1.5em]" />
                    <h3 className='text-2xl mb-2 p-1 xs:max-sm:text-[1.1rem] xl:max-2xl:text-lg'><strong>Business Overview</strong></h3>
                </div>
                
                <form className="mt-2 mr-5 ml-5 xs:max-sm:ml-2" onSubmit={handleSubmit}> 
                    <div className="m-2 mb-8 flex flex-row  ">
                        <label className="text-lg p-2 w-auto flex-shrink-0 font-semibold text-black xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.8em]" style={{ lineHeight: '3.0rem' }}>
                                Business Logo
                            </label>
                            <input name="settings.logo" type="button" id="logoInput" onClick={openEditModal} className=''></input>
                                {isLoading? <><span className='ml-5'><GenSpinner/></span></> // if we are still getting data from DB
                                :
                                <label htmlFor="logoInput" className='relative cursor-pointer flex items-center justify-center'>
                                    <img src={newImageUrl ? newImageUrl :data.merchant.logo} onError={(e) => {
                                        e.currentTarget.onerror = null; // Prevent infinite loop if the image itself is not found
                                        e.currentTarget.src = 'https://i.imgur.com/YNoZzmJ.png'; // Use a placeholder image as a fallback
                                        }} className="ml-5 overflow-hidden w-[9rem] rounded-2xl xl:max-2xl:w-[7rem]">
                                    </img>                                    
                                    <div className='absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 hover:opacity-80 bg-white'>
                                        <IoCameraSharp className='relative text-[50px] left-[39%] bottom-[11.2%] xl:max-2xl:text-[1.3em] xl:max-2xl:left-[43%]'/>
                                        <p className='relative text-black font-bold text-[14px] top-[10%] right-[8%] xs:max-sm:text-[0.7em] xl:max-2xl:text-[0.6em] xl:max-2xl:right-[4%]'>Change Image</p>
                                    </div>                                  
                                </label>}

                                <ImageEditModal
                                    isOpen={isEditModalOpen}
                                    onClose={closeEditModal}
                                    onSave={handleSaveImageUrl}
                                />
                        </div>
                        <div className="m-2 flex flex-row ">
                            <label className="text-lg p-2 w-auto flex-shrink-0 font-semibold text-black xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.8em]" style={{ lineHeight: '3.0rem' }}>
                                Business Name
                            </label>
                            <input
                                type="text"
                                placeholder={isLoading? "Loading...": "Enter your business name here..."}
                                value={data.merchant.merchant_name}
                                disabled = {isLoading}
                                onChange={handleChange}
                                name="merchant.merchant_name"
                                className={`m-2 ml-2 p-2 w-full flex border border-gray-300 rounded-md xs:max-sm:text-[0.7em] xs:max-sm:w-[100vw] xl:max-2xl:text-[0.7em] focus:outline-none focus:ring focus:ring-blue-500 ${isLoading? 'animate-pulse cursor-not-allowed':''}`}
                                required
                            />
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className="text-lg mr-4 p-2 w-auto flex-shrink-0 font-semibold text-black xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.8em]" style={{ lineHeight: '3.0rem' }}>
                                Branch Name
                            </label>
                            <input
                                type="text"
                                placeholder={isLoading? "Loading...": "Enter your branch name here... "}
                                value= {data.settings.branch}
                                disabled = {isLoading}
                                onChange={handleChange}
                                name="settings.branch"
                                className={`m-2 p-2 text w-full flex border border-gray-300 rounded-md xs:max-sm:w-[100vw] xs:max-sm:text-[0.7em] xl:max-2xl:text-[0.7em] focus:outline-none focus:ring focus:ring-blue-500 ${isLoading? 'animate-pulse cursor-not-allowed':''}`}
                                
                            />
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className="text-lg mr-9 p-2 w-auto flex-shrink-0 font-semibold text-black xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.8em]" style={{ lineHeight: '3.0rem' }}>
                                Description
                            </label>
                            <textarea
                                placeholder={isLoading? "Loading...":  "Enter your business description here..."}
                                value={data.settings.description != '' || null ? data.settings.description : ''}
                                disabled = {isLoading}
                                onChange={handleChange}
                                name="settings.description"
                                className={`m-2 p-2 text w-full flex border border-gray-300 rounded-md resize-none xs:max-sm:h-[15vh] xs:max-sm:text-[0.6em] xl:max-2xl:text-[0.7em] focus:outline-none focus:ring focus:ring-blue-500 ${isLoading? 'animate-pulse cursor-not-allowed':''}`}
<<<<<<< HEAD
                                required
=======
>>>>>>> 06ca8cae86c22581cb74dab8a7dfdd536ad85e0a
                            />
                        </div>
                        <div className='m-4 flow-root'>
                           
                        </div>
                </form>
            </div>

            <div style={{fontFamily: 'Poppins, sans-serif'}} className="w-auto h-auto bg-white m-8 p-5 rounded-lg xs:max-sm:w-[130%] xs:max-sm:p-2 xs:max-sm:ml-[-2%]">
                <div className='flex flex-row mr-5 ml-5'>
                    <IoLocation className="text-4xl xs:max-sm:text-[1.3em] xs:max-sm:mt-[0.5rem] xl:max-2xl:text-[1.5em]" />
                    <h3 className='text-2xl mb-2 p-1 xs:max-sm:text-[1.1rem] xl:max-2xl:text-lg '><strong>Business Address</strong></h3>
                </div>
                <form className="mt-2 mr-5 ml-5 xs:max-sm:ml-2" onSubmit={handleSubmit}> 
                        <div className="m-2 flex flex-row">
                            <label className="text-lg mr-16 p-2 w-auto flex-shrink-0 font-semibold text-black xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.8em]" style={{ lineHeight: '2.5rem' }}>
                                Country
                            </label>
                            <select
                                name="address.country"
                                value={data.address.country}
                                onChange={handleChange}
                                disabled={isLoading}
                                className={`m-2 p-2 ml-2 text-gray-500 w-full flex border border-gray-300 rounded-md xs:max-sm:text-[0.7em] xs:max-sm:w-[100vw] xl:max-2xl:text-[0.7em] focus:outline-none focus:ring focus:ring-blue-500  ${isLoading? 'animate-pulse cursor-not-allowed':''} `}
                                required
                            >
                                <option value="Philippines">{isLoading? "Loading...":"Philippines"}</option>
                                {data.address.country != null && data.address.country != 'Philippines'? <option value={data.address.country}>{data.address.country}</option>: <></>}
                            </select>
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className="text-lg p-2 mr-16 w-auto flex-shrink-0 font-semibold text-black xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.8em]" style={{ lineHeight: '2.5rem' }}>
                                Region
                            </label>
                            <select
                                name="address.region"
                                value={isLoading? "Loading ..." : selectedRegion || ""}
                                onChange={handleChange}
                                disabled={isLoading}
                                className={`m-2 p-2 ml-[1.1rem] text-gray-500 w-full flex border border-gray-300 rounded-md xs:max-sm:text-[0.7em] xs:max-sm:w-[43vw]  xl:max-2xl:text-[0.7em] focus:outline-none focus:ring focus:ring-blue-500  ${isLoading? 'animate-pulse cursor-not-allowed':''} `}
                                required
                            >
                                {!isLoading ? 
                                <>
                                  <option value="">{selectedCountry!= 'Philippines'? 'Currently Not Available on Selected Country': 'Select Region'}</option>
                                {regionNames.map((regionName: {name:string, code: string, regionName: string}) => (
                                    
                                    <option key={regionName.code} value={regionName.name}>
                                        
                                    {regionName.regionName + " - " + regionName.name}
                                    </option>
                                ))}
                                </>
                                : <><option value="">Loading...</option></>}
                            </select>
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className=" text-lg p-2 mr-[3.6rem] w-auto flex-shrink-0 font-semibold text-black xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.8em]" style={{ lineHeight: '2.5rem' }}>
                                Province
                            </label>
                            <select
                                name="address.province"
                                value={selectedProvince}
                                onChange={handleChange}
                                disabled={isLoading}
                                className={`m-2 p-2 ml-2 text-gray-500 w-full flex border border-gray-300 rounded-md focus:outline-none xs:max-sm:text-[0.7em] xs:max-sm:w-[100vw] xl:max-2xl:text-[0.7em] focus:ring focus:ring-blue-500 ${isLoading? 'animate-pulse cursor-not-allowed':''} `}
                                required
                            >
                                {!isLoading ? 
                                <>
                                 <option value="">{selectedCountry!= 'Philippines'? 'Currently Not Available on Selected Country': 'Select Province'}</option>
                                {provinceNames.map((province:{name: string, code:string}) => (
                                    <option key={province.code} value={province.name}>
                                    {province.name}
                                    </option>
                                ))}
                                </>:<> <option value="">Loading...</option></>
                                
                                }
                            </select>
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className="text-lg p-2 mr-6 w-auto flex-shrink-0 font-semibold text-black xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.8em]" style={{ lineHeight: '2.5rem' }}>
                                Municipality
                            </label>
                            <select
                                name="address.municipality"
                                value={selectedMunicipality}
                                onChange={handleChange}
                                disabled={isLoading}
                                className={`m-2 p-2 ml-2 text-gray-500 w-full flex border border-gray-300 rounded-md xs:max-sm:text-[0.7em] xs:max-sm:w-[100vw] xl:max-2xl:text-[0.7em] focus:outline-none focus:ring focus:ring-blue-500 ${isLoading? 'animate-pulse cursor-not-allowed':''} `}
                                required
                            >
                                {!isLoading ? 
                                <>
                                 <option value="">{selectedCountry!= 'Philippines'? 'Currently Not Available on Selected Country': 'Select Municipality'}</option>
                                {municipalityNames.map((municipality: {name: string,code: string}) => (
                                    <option key={municipality.code} value={municipality.name}>
                                    {municipality.name}
                                    </option>
                                    
                                ))}</>:<><option value="">Loading...</option></>
                                };
                            </select>
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className="text-lg p-2 mr-[2.85rem] w-auto flex-shrink-0 font-semibold text-black xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.8em]" style={{ lineHeight: '2.5rem' }}>
                                Barangay
                            </label>
                            <select
                                name="address.barangay"
                                value={selectedBarangay}
                                onChange={handleChange}
                                disabled={isLoading}
                                className={`m-2 p-2 ml-2 text-gray-500 w-full flex border border-gray-300 rounded-md xs:max-sm:text-[0.7em] xs:max-sm:w-[100vw] xl:max-2xl:text-[0.7em] focus:outline-none focus:ring focus:ring-blue-500 ${isLoading? 'animate-pulse cursor-not-allowed':''} `}
                                required
                            >
                                {!isLoading ? 
                                <>
                                  <option value="">{selectedCountry!= 'Philippines'? 'Currently Not Available on Selected Country': 'Select Barangay'}</option>
                                {barangayNames.map((barangay:{name:string, code:string}) => (
                                    <option key={barangay.code} value={barangay.name}>
                                    {barangay.name}
                                    </option>
                                ))}</>:<><option value="">Loading...</option></>
                                }
                            </select>
                        </div>
                        <div className='m-4 flow-root'>
                            
                        </div>
                </form>
            </div>

            <div style={{fontFamily: 'Poppins, sans-serif'}} className="w-auto h-auto bg-white m-8 p-5 rounded-lg xs:max-sm:w-[130%] xs:max-sm:p-2 xs:max-sm:ml-[-2%]">
                <div className='flex flex-row mr-5 ml-5'>
                    <MdPhone className="text-4xl xs:max-sm:text-[1.3em] xs:max-sm:mt-[0.5rem] xl:max-2xl:text-[1.5em]" />
                    <h3 className='text-2xl mb-2 p-1 xs:max-sm:text-[1.1rem] xl:max-2xl:text-lg'><strong>Contact Details</strong></h3>
                </div>
                <form className="mt-2 mr-5 ml-5 xs:max-sm:ml-2" onSubmit={handleSubmit}> 
                        <div className="m-2 flex flex-row">
                            <label className="text-lg p-2 w-auto flex-shrink-0 font-semibold text-black xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.8em]" style={{ lineHeight: '3.0rem' }}>
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
                                className={`m-2 ml-5 p-2 text w-full flex border border-gray-300 rounded-md xs:max-sm:text-[0.7em] xs:max-sm:w-[80vw] xl:max-2xl:text-[0.7em] focus:outline-none focus:ring focus:ring-blue-500 ${isLoading? 'animate-pulse cursor-not-allowed': ''} `}
                                required
                            />
                        </div>
                        <div className="m-2 flex flex-row">
                            <label className="text-lg p-2 mr-[2.15rem] w-auto flex-shrink-0 font-semibold text-black xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.8em]" style={{ lineHeight: '3.0rem' }}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="merchant.email_address"
                                placeholder={isLoading? "":  "example@abc.com"}
                                value={data.merchant.email_address}
                                disabled = {isLoading}
                                onChange={handleChange}
                                className={`m-2 p-2 text w-full flex border border-gray-300 rounded-md xs:max-sm:text-[0.7em] xs:max-sm:w-[80vw] xl:max-2xl:text-[0.7em] focus:outline-none focus:ring focus:ring-blue-500 ${isLoading? 'animate-pulse cursor-not-allowed': ''}`}
                                required
                            />
                        </div>
                        <div className='m-4 flow-root'>

                            <button
                                type="submit"
                                disabled={isLoading || requiredFields}
                                className={`px-10 py-1 mr-2 float-right text-white rounded-2xl xs:max-sm:text-[0.7em] xs:max-sm:px-8 xs:max-sm:mr-1 xl:max-2xl:text-[0.7em] xl:max-2xl:px-8 
                                focus:outline-none focus:ring focus:ring-blue-500 ${isLoading || requiredFields? 'bg-[#c58f8f] cursor-not-allowed' : ' bg-[#840705] hover:bg-[#660605]'}`}
                            >
                             {isLoading? "Loading...":"Save"}
                            </button>
                        </div>
                </form>
            </div>
        </>
        
    )
}