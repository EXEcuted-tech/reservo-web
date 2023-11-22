import React, { useEffect } from 'react'
import Card from "../../../components/card/card.tsx";
import CardEmpty from "../../../components/card/CardEmpty.tsx"
import MerchAdHeader from '../../../components/headers/MerchAdHeader.tsx';
import { BiPackage, BiRefresh } from "react-icons/bi";
import { useState } from 'react';
import CreatePackageModal from '../../../components/modals/package-modal/CreatePackageModal.tsx';
import config from '../../../common/config.ts'
import axios from 'axios'
import GenSpinner from '../../../components/loaders/genSpinner.tsx';
import Notification from '../../../components/alerts/Notification.tsx';

const PackageManager = () => {
    const [packages, setPackages] = useState<PackageItem[]>([]);
    const [unpublishedPackages, setUnpublishedPackages] = useState<PackageItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreatePackageModalOpen, setIsCreatePackageModalOpen] = useState(false);
    const [sort, setSort] = useState('package_name');
    const merchant_id = localStorage.getItem('merch_id');
    const [alertMessage, setAlertMessage] = useState('')
    const [alertColor, setAlertColor] = useState('#840705');

    // Function to handle sorting option change
    const handleSortChange = (event: { target: { value: any; }; }) => {
      const selectedOption = event.target.value;
      setSort(selectedOption);
      fetchData(selectedOption);
    }

    const promptAlert = (msg:string)=>{
      setAlertMessage(msg);
      setTimeout(()=>{
        setAlertMessage('')
      },5000)
    }


    // Function to open the modal when the empty card is clicked
    const openCreatePackageModal = () => {
      setIsCreatePackageModalOpen(true);
    };
  
    // Function to close the modal
    const closeCreatePackageModal = () => {
      setIsCreatePackageModalOpen(false);
    };

    const fetchData = async (selectedSortOption: string | undefined) => {
      setIsLoading(true);
      try {
        const publishedPackages = await fetchPublishedPackages(selectedSortOption);
        const unpublishedPackages = await fetchUnpublishedPackages(selectedSortOption);
    
        setPackages(publishedPackages);
        setUnpublishedPackages(unpublishedPackages);
        setIsLoading(false);
      } catch (error) {
        setAlertMessage("Failed to fetch Packages")
        setTimeout(()=>{
          setAlertMessage('')
        }, 5000)
        setIsLoading(false);
      }
    };
      
    const fetchPublishedPackages = async (selectedSortOption: string | undefined) => {
      try {
        const response = await axios.get(`${config.API}/package/retrieveparams`, {
          params: {
            col1: 'merchant_id',
            val1: merchant_id, // Replace with the actual merchant ID
            col2: 'visibility',
            val2: 'PUBLISHED',
            order_param: selectedSortOption,
          },
        });
    
        return response.data.data;
      } catch (error) {
        promptAlert("Failed to Fetch Published Packages")
        
        //console.error('Error fetching published packages:', error);
        return [];
      }
    };
    
    const fetchUnpublishedPackages = async (selectedSortOption: string | undefined) => {
      try {
        const response = await axios.get(`${config.API}/package/retrieveparams`, {
          params: {
            col1: 'merchant_id',
            val1: merchant_id, // Replace with the actual merchant ID
            col2: 'visibility',
            val2: 'NOT PUBLISHED',
            order_param: selectedSortOption,
          },
        });
    
        return response.data.data;
      } catch (error) {
        promptAlert("Failed to Fetch Unpublished Packages")
        
        //console.error('Error fetching unpublished packages:', error);
        return [];
      }
    };

    useEffect(() => {
        fetchData(sort);
      }, [sort]);



  const refreshPackageManager = () => {
        fetchData(sort); // Call the async function to fetch data
      };


  //filters
  const sortPackages = (packages: PackageItem[], sortOption: string) => {
    if (sortOption === 'package_name') {
      return packages.sort((a, b) => a.package_name.localeCompare(b.package_name));
    } 
    if (sortOption === 'date_start') {
      return packages.sort((a, b) => new Date(a.date_start).getTime() - new Date(b.date_start).getTime());
    }
    return packages;
  };


return (
<div className={`bg-[#FFFFFF] h-[100vh] font-poppins overflow-y-auto overflow-x-hidden animate-fade-in`}>
    <div className="w-[80vw] xs:max-sm:w-full">
    {(alertMessage !== '') && <Notification message={alertMessage} color={alertColor}/>}
      
    
    <MerchAdHeader icon={BiPackage} title={'Package Manager'}/>

    <div className="SortFilterSubheader flex mb-4 text-lg bg-[#f0e5d8] w-[85vw] xs:max-sm:w-full xs:max-sm:h-[7vh] xl:max-2xl:h-[10vh]">
        <div className="flex align-middle w-3/6 items-center mx-32 ps-8 h-20 xs:max-sm:ps-2 xs:max-sm:mx-2 xs:max-sm:w-full xs:max-sm:h-16 xl:max-2xl:ps-2 ">
        <label htmlFor="filterDropdown" className={`font-bold mx-2 w-[4vw] xs:max-sm:ml-[3%] xs:max-sm:text-[0.8em] xs:max-sm:w-[40%] xs:max-sm:mx-0 xl:max-2xl:text-[0.8em] xl:max-2xl:w-[5vw] xl:max-2xl:pb-4`}>
          Sort By: </label>
                    <select 
                        id="sortDropdown" 
                        name="sortDropdown" 
                        className={`bg-transparent rounded-md h-10 w-[17vw] xs:max-sm:text-[0.8em] xs:max-sm:w-full xl:max-2xl:text-[0.8em] xl:max-2xl:h-[5vh] xl:max-2xl:mb-[4%]
                        hover:bg-white transition duration-150 ease-out hover:ease-in`}
                        value={sort}
                        onChange={handleSortChange}
                        >
                            <option value="package_name">A to Z (Alphabetical Ascending)</option>
                            <option value="date_start">Oldest</option> 
                    </select>
        </div>
        {/* <div className="flex align-middle w-3/6 items-center mx-48 ps-8 h-20 hidden">
            <label htmlFor="filterDropdown" className={`font-bold mx-2`}>Filter By: </label>
                    <select id="filterDropdown" name="filterDropdown"
                      className={`bg-transparent rounded-md h-10 w-[9vw] hover:bg-white transition duration-150 ease-out hover:ease-in`}>
                        <option value="option1">Time-Limited</option>
                        <option value="option2">All Time</option>
                        <option value="option3">Exclusive</option>
                    </select>
                
        </div> */}
    </div>

    <div className='PublishedPackages ps-20 xs:max-sm:ps-0'>
      <div className='grid grid-flow-col'>
        <div><p className={`text-3xl mx-20 my-3 font-bold xs:max-sm:w-[100%] xs:max-sm:text-2xl xs:max-sm:mx-8 xl:max-2xl:text-2xl`}>
          Published Packages</p></div>
        <div className='flex justify-end items-center mx-10' >
          <button
            onClick={() => fetchData(sort)}
            className="w-[6vw] h-[4vh] p-2 bg-[#1b6e1e] text-white text-lg flex justify-center items-center rounded-lg
            hover:bg-[#00962a] transition-colors delay-250 duration-[3000] ease-in xs:max-sm:w-[10vw] xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.8em] xl:max-2xl:w-[6vw] xl:max-2xl:h-[5vh]"
          >{window.innerWidth <= 640 ? (
            <BiRefresh className="flex items-center justify-center xs:max-sm:text-[2em] " />
          ) : (
            "Refresh"
          )}
        </button>
    </div>

    </div>
        <div className="PackageGallery flex flex-row  overflow-x-scroll overflow-y-hidden h-[60vh] mx-20 p-8 rounded-xl xs:max-sm:h-[60vh] xs:max-sm:p-2 xs:max-sm:mx-4 xl:max-2xl:h-[70vh] ">
        {isLoading ? (
              <GenSpinner/>
            ) : packages.length === 0 ? (
              <p className="text-lg">No packages to show for now.</p>
            ) : (
              sortPackages(packages, sort).map((packageItem) => (
                <Card
                  key={packageItem.package_id}
                  package_id={packageItem.package_id}
                  packageName={packageItem.package_name}
                  date_start={packageItem.date_start}
                  date_end={packageItem.date_end}
                  description={packageItem.package_desc} // Make sure to use the correct property name
                  price={packageItem.price} // Make sure to use the correct property name
                  tags={packageItem.tags ? (packageItem.tags as any).split(',').map((tag: string) => tag.trim()) : []} // Handle empty or null tags
                  visibility={packageItem.visibility}
                  items={packageItem.item_list ? (packageItem.item_list as any).split(',').map((item: string) => item.trim()) : []} // Handle empty or null item_list
                  filePath={packageItem.image_filepath}
                  oneButton={false} 
                  time_start={packageItem.time_start} 
                  time_end={packageItem.time_end}
                  error_msg={promptAlert}
                  refresh={refreshPackageManager}                
                  />
              ))
            )}

        </div>
    </div>

    
    <div className='PublishedPackages ps-20 my-10 xs:max-sm:ps-0'>
        <p className={`text-3xl mx-20 my-3 font-bold xs:max-sm:w-[90%] xs:max-sm:text-2xl xs:max-sm:mx-8 xl:max-2xl:text-2xl`}>
          Unpublished Packages</p>
        <div className="PackageGallery flex flex-row  overflow-x-scroll overflow-y-hidden h-[60vh] mx-20 p-8 rounded-xl xs:max-sm:h-[40vh] xs:max-sm:p-2 xs:max-sm:mx-4  xl:max-2xl:h-[66vh] ">
        <CardEmpty onClick={openCreatePackageModal} />
        {isCreatePackageModalOpen && 
        <CreatePackageModal 
        alertMsg={promptAlert}
        onClose={closeCreatePackageModal}
        fetchData={refreshPackageManager} // Pass the refresh function as a prop
        selectedSortOption={sort}/>}
        {isLoading ? (
              <GenSpinner/>
            ) : unpublishedPackages.length === 0 ? (
              <p className="text-lg xs:max-sm:text-[0.9em] xs:max-sm:mt-[5%] xl:max-2xl:text-[0.8em]">No packages to show for now.</p>
            ) : (
              sortPackages(unpublishedPackages, sort).map((packageItem) => (
                <Card
                  key={packageItem.package_id}
                  package_id={packageItem.package_id}
                  packageName={packageItem.package_name}
                  date_start={new Date(packageItem.date_start)}
                  date_end={new Date(packageItem.date_end)}
                  description={packageItem.package_desc}
                  price={packageItem.price}
                  tags={packageItem.tags ? (packageItem.tags as any).split(',').map((tag: string) => tag.trim()) : []} // Handle empty or null tags
                  visibility={packageItem.visibility}
                  filePath={packageItem.image_filepath}
                  items={packageItem.item_list ? (packageItem.item_list as any).split(',').map((item: string) => item.trim()) : []} // Handle empty or null item_list
                  oneButton={false} 
                  time_start={packageItem.time_start} 
                  time_end={packageItem.time_end} 
                  error_msg={promptAlert}   
                  refresh={refreshPackageManager}            
                  />
              ))
              
            )}


        </div>
    </div>
    </div>
</div>
    )
  }
  
export default PackageManager