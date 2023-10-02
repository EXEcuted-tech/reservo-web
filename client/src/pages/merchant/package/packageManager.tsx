import React, { useEffect } from 'react'
import colors from '../../../common/colors.ts'
import { FaIcons } from 'react-icons/fa'
import { AiFillDownCircle } from "react-icons/ai";
import Card from "../../../components/card/card.tsx";
import CardEmpty from "../../../components/card/CardEmpty.tsx"
import MerchAdHeader from '../../../components/headers/MerchAdHeader.tsx';
import { BiPackage, BiRefresh } from "react-icons/bi";
import { useState } from 'react';
import CreatePackageModal from '../../../components/modals/package-modal/CreatePackageModal.tsx';
import config from '../../../common/config.ts'
import axios from 'axios'
import GenSpinner from '../../../components/loaders/genSpinner.tsx';

interface PackageItem {
    package_id: string;
    package_name: string;
    package_desc: string;
    price: string;
    tags: string[];
    date_start: string;
    date_end: string;
    visibility: string;
    item_list: string[];
    image_filepath: string;
    oneButton: boolean;
    time_start: string;
    time_end: string;
  }

const PackageManager = () => {
    const [packages, setPackages] = useState<PackageItem[]>([]);
    const [unpublishedPackages, setUnpublishedPackages] = useState<PackageItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreatePackageModalOpen, setIsCreatePackageModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sort, setSort] = useState('package_name');

    // Function to handle sorting option change
    const handleSortChange = (event: { target: { value: any; }; }) => {
      const selectedOption = event.target.value;
      setSort(selectedOption);
      fetchData(selectedOption);
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
          const response = await axios.get(`${config.API}/package/retrieveparams`, {
            params: {
              col1: 'merchant_id',
              val1: 1, // Replace with the actual merchant ID
              col2: 'visibility',
              val2: 'PUBLISHED',
              order_param: selectedSortOption,
            },
          });

          const unpublishedresponse = await axios.get(`${config.API}/package/retrieveparams`, {
            params: {
              col1: 'merchant_id',
              val1: 1, // Replace with the actual merchant ID
              col2: 'visibility',
              val2: 'NOT PUBLISHED',
              order_param: selectedSortOption,
            },
          });

          const formattedPackages = response.data.data.map((packageItem: { date_start: string | number | Date; date_end: string | number | Date; }) => ({
              ...packageItem,
              date_start: new Date(packageItem.date_start).toLocaleDateString('en-US'),
              date_end: new Date(packageItem.date_end).toLocaleDateString('en-US'),
            }));


            const formattedUnpublishedPackages = unpublishedresponse.data.data.map((packageItem: { date_start: string | number | Date; date_end: string | number | Date; }) => ({
              ...packageItem,
              date_start: new Date(packageItem.date_start).toLocaleDateString('en-US'),
              date_end: new Date(packageItem.date_end).toLocaleDateString('en-US'),
            }));
            
          setPackages(formattedPackages)
          setUnpublishedPackages(formattedUnpublishedPackages); // Assuming packages are returned in the 'data' property of the response
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching packages:', error);
          setIsLoading(false);
        }
      };

    useEffect(() => {
        fetchData(sort); // Call the async function to fetch data
      }, [sort]);

      console.log(packages);


      const refreshPackageManager = () => {
        fetchData(sort); // Call the async function to fetch data
      };


    return (
<div className={`bg-[#FFFFFF] h-[100vh] font-poppins overflow-y-auto overflow-x-hidden`}>
    <div className="w-[80vw]">
    <MerchAdHeader icon={BiPackage} title={'Package Manager'}/>
    <div className="SortFilterSubheader flex mb-4 text-lg bg-[#f0e5d8] w-[85vw]">
        <div className="flex align-middle w-3/6 items-center mx-32 ps-8 h-20">
        <label htmlFor="filterDropdown" className={`font-bold mx-2 w-[4vw]`}>Sort By: </label>
                    <select 
                        id="sortDropdown" 
                        name="sortDropdown" 
                        className={`bg-transparent rounded-md h-10 w-[20vw]  hover:bg-white transition duration-150 ease-out hover:ease-in`}
                        value={sort}
                        onChange={handleSortChange}
                        >
                            <option value="package_name">A to Z (Alphabetical Ascending)</option>
                            <option value="date_start">Oldest</option> 
                    </select>
        </div>
        <div className="flex align-middle w-3/6 items-center mx-48 ps-8 h-20">
            <label htmlFor="filterDropdown" className={`font-bold mx-2`}>Filter By: </label>
                    <select id="filterDropdown" name="filterDropdown" className={`bg-transparent rounded-md h-10 w-[9vw] hover:bg-white transition duration-150 ease-out hover:ease-in`}>
                        <option value="option1">Time-Limited</option>
                        <option value="option2">All Time</option>
                        <option value="option3">Exclusive</option>
                    </select>
                
        </div>
    </div>
    <div className='PublishedPackages ps-20'>
      <div className='grid grid-flow-col'>
        <div><p className={`text-3xl mx-20 my-3 font-bold`}>Published Packages</p></div>
        <div className='flex justify-end items-center mx-10' ><button onClick={() => fetchData(sort)} className='w-[6vw] h-[3vh] p-2 bg-[#1b6e1e] text-white flex justify-center items-center rounded-lg hover:border-black border-solid border-2'><BiRefresh className='flex items-center justify-center'/>Refresh</button></div>
        </div>
        <div className="PackageGallery flex flex-row  overflow-x-scroll overflow-y-hidden h-[60vh] mx-20 p-8 rounded-xl  ">
        {isLoading ? (
              <GenSpinner/>
            ) : packages.length === 0 ? (
              <p>No packages to show for now.</p>
            ) : (
              packages.map((packageItem) => (
                <Card
                  key={packageItem.package_id}
                  package_id={packageItem.package_id}
                  packageName={packageItem.package_name}
                  date_start={packageItem.date_start}
                  date_end={packageItem.date_end}
                  description={packageItem.package_desc} // Make sure to use the correct property name
                  price={packageItem.price} // Make sure to use the correct property name
                  tags={packageItem.tags ? packageItem.tags.split(',').map((tag: string) => tag.trim()) : []} // Handle empty or null tags
                  visibility={packageItem.visibility}
                  items={packageItem.item_list ? packageItem.item_list.split(',').map((item: string) => item.trim()) : []} // Handle empty or null item_list
                  filePath={packageItem.image_filepath}
                  oneButton={false} 
                  time_start={packageItem.time_start} 
                  time_end={packageItem.time_end}                />
              ))
              
            )}

        </div>
    </div>

    
    <div className='PublishedPackages ps-20 my-10'>
        <p className={`text-3xl mx-20 my-3 font-bold`}>Unpublished Packages</p>
        <div className="PackageGallery flex flex-row  overflow-x-scroll overflow-y-hidden h-[60vh] mx-20 p-8 rounded-xl  ">
        <CardEmpty onClick={openCreatePackageModal} />
        {isCreatePackageModalOpen && 
        <CreatePackageModal 
        onClose={closeCreatePackageModal}
        fetchData={refreshPackageManager} // Pass the refresh function as a prop
        selectedSortOption={sort}/>}
        {isLoading ? (
              <GenSpinner/>
            ) : packages.length === 0 ? (
              <p>No packages to show for now.</p>
            ) : (
              unpublishedPackages.map((packageItem) => (
                <Card
                  key={packageItem.package_id}
                  package_id={packageItem.package_id}
                  packageName={packageItem.package_name}
                  date_start={packageItem.date_start}
                  date_end={packageItem.date_end}
                  description={packageItem.package_desc}
                  price={packageItem.price}
                  tags={packageItem.tags ? packageItem.tags.split(',').map((tag: string) => tag.trim()) : []} // Handle empty or null tags
                  visibility={packageItem.visibility}
                  filePath={packageItem.image_filepath}
                  items={packageItem.item_list ? packageItem.item_list.split(',').map((item: string) => item.trim()) : []} // Handle empty or null item_list
                  oneButton={false} 
                  time_start={packageItem.time_start} 
                  time_end={packageItem.time_end}                
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