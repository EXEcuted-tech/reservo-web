import colors from '../../../common/colors'
import React from 'react'
import {AiFillCloseCircle, AiFillDelete} from "react-icons/ai"
import { HiOutlineMagnifyingGlass, HiMiniPencilSquare } from "react-icons/hi2";
import "../../../assets/css/card.css"
import { IoAddCircleSharp } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";
import {LuPackage2} from "react-icons/lu";
import { useState, useEffect} from 'react'
import config from '../../../common/config'
import axios from 'axios'
import GenSpinner from '../../loaders/genSpinner';

interface CreatePackageModal{
    onClose: ()=>void;
    fetchData: ()=>void;
    selectedSortOption: string;
}



  const CreatePackageModal: React.FC<CreatePackageModal>=({onClose, fetchData, selectedSortOption}) => {

    const getCurrentDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Add 1 because months are zero-based
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    const [isCreatePackageModalOpen, setIsCreatePackageModalOpen] = useState(false);
    const [itemName, setItemName] = useState('');
    const [items, setItems] = useState<string[]>([]);
    const [packageName, setPackageName] = useState('');
    const [packageDesc, setPackageDesc] = useState('');
    const [price, setPrice] = useState(0);
    const [dateStart, setDateStart] = useState(getCurrentDate);
    const [dateEnd, setDateEnd] = useState(getCurrentDate);
    const [timeStart, setTimeStart] = useState('00:00:00');
    const [timeEnd, setTimeEnd] = useState('23:59:59');
    const [visibility, setVisibility] = useState('NOT PUBLISHED');
    const [itemList, setItemList] = useState<string[]>([]);
    const [filePath, setFilePath] = useState('');
    const [tags, setTags] = useState('');
    const [merchantId, setMerchantId] = useState('1'); 
    //change this since this ↑ is not static it will get data on the currently logged in merchant
    const [isLoading, setIsLoading] = useState(false);
    const [incompleteAlert, setIncompleteAlert] = useState(true);

    const handlePackageNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPackageName(e.target.value);
      updateIncompleteAlert();
    };
  
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPrice = parseFloat(e.target.value);
      setPrice(newPrice);
      updateIncompleteAlert();
    };
  
    const handleDateStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setDateStart(e.target.value);
      updateIncompleteAlert();
    };
  
    const handleDateEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setDateEnd(e.target.value);
      updateIncompleteAlert();
    };
  
    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTags(e.target.value);
      updateIncompleteAlert();
    };
  
    const handleVisibilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setVisibility(e.target.value);
      updateIncompleteAlert();
    };
  
    const handlePackageDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setPackageDesc(e.target.value);
      updateIncompleteAlert();
    };
  
    const handleFilePathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilePath(e.target.value);
      updateIncompleteAlert();
    };
  
    const handleItemNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setItemName(e.target.value);
      updateIncompleteAlert();
    };
    
    const closeCreatePackageModal = () => {
        setIsCreatePackageModalOpen(false);
        onClose();
      };

    const addItem = () => {
    if (itemName.trim() !== '') {
      setItems((prevItems) => [...prevItems, itemName]);
      setItemName('');
      setItemList((prevItemList) => [...prevItemList, itemName]);
    }
    };

    const createPackage = async () => {
      if (itemName == null || price == null || dateStart == null || visibility == null || filePath == null ||tags == null ||items == null) {
        setIncompleteAlert(true);
        return;
      }
    
      try {
        setIncompleteAlert(false);
        setIsLoading(true);
        const response = await axios.post(`${config.API}/package/create`, {
          package_name: packageName,
          package_desc: packageDesc || '', // Provide a default value if it's null
          price: price,
          date_start: dateStart,
          date_end: dateEnd || null, // Use null if it's null
          time_start: timeStart || '', // Provide a default value if it's null
          time_end: timeEnd || null, // Use null if it's null
          visibility: visibility,
          item_list: itemList.join(',') || "none", // Use null if it's null
          image_filepath: filePath,
          tags: tags || "untagged", // Use null if it's null
          merchant_id: merchantId,
        });
    
        fetchData();
        setIsLoading(false);
        onClose();
      } catch (error) {
        // Handle the error, e.g., show an error message to the user
        console.error('Error creating package:', error);
        
      } finally {
        setIsLoading(false);
      }
    };


    const updateIncompleteAlert = () => {
      // Check if any of the required fields are empty
      if (
        packageName.trim() === '' ||
        price === 0 || // Modify this condition as needed for other fields
        dateStart === '0000-00-00' || // Adjust this condition as needed
        visibility.trim() === '' ||
        filePath.trim() === '' ||
        tags.trim() === '' ||
        items.length === 0
      ) {
        setIncompleteAlert(true);
      } else {
        setIncompleteAlert(false);
      }
    };



    return (
    <div className=''>
    <div className='z-0 absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] w-[100vw] h-[100vh] backdrop-blur-sm animate-zoom-in'>
    <div className='flex justify-center align-center my-20 xl:max-2xl:my-16'>
        <div className="w-[75vw] h-[80vh] bg-white p-10 rounded-xl xl:max-2xl:h-[83vh]">
            <div className='grid grid-cols-2 h-[5vh] border-b-2 border-black'> {/*this is the header for the modal*/}
                <div className='text-2xl flex start items-center mb-4 xl:max-2xl:text-xl'>
                  <LuPackage2 className="text-4xl mr-[2%] xl:max-2xl:text-2xl"/>
                  <p><b>Add a New Package</b></p>
                </div>
                <div className='flex justify-end mb-4'><button className='flex items-center text-3xl xl:max-2xl:text-2xl ' onClick={closeCreatePackageModal}><AiFillCloseCircle className='mx-2 detailsClose'/></button></div>
            </div>
            <div className="grid grid-cols-2 h-[60vh] my-5 border-b-2 border-solid border-[#000000]">
            <div>
            <div className='h-[40vh] text-xl xl:max-2xl:text-[0.8em] xl:max-2xl:mt-[-4%]'>
            <p><span className='text-red-600 text-base xl:max-2xl:text-[0.9em]'>Fields with * are required.</span></p>
                <p><b>Package Name:<span className='text-red-600'>*</span> </b><input type="text"  value={packageName} onChange={handlePackageNameChange}className="h-[4vh] my-2 p-2 border-solid border-[#000000] border-2 rounded-md mx-4"></input></p>
                <p><b>Total Price:<span className='text-red-600'>*</span> </b> <input type="text" value= {price} onChange={handlePriceChange} className="h-[4vh] my-2 border-solid p-2 border-[#000000] border-2 rounded-md mx-4"></input></p>
                <p><b>Available From:<span className='text-red-600'>*</span> </b> <input type="date" value={dateStart} onChange={handleDateStartChange} className="h-[4vh] my-2 p-2 border-solid border-[#000000] border-2 rounded-md mx-4"></input></p>
                <p><b>Expiry Date:<span className='text-red-600'>*</span></b> <input type="date" value={dateEnd} onChange={handleDateEndChange} className="h-[4vh] my-2 border-solid border-[#000000] border-2 rounded-md mx-4"></input></p>
                <p><b>Tags:<span className='text-red-600'>*</span> </b> <input type="text" value={tags} onChange={handleTagsChange} placeholder="Separate by commas (,)" className="h-[4vh] my-2 p-2 border-solid border-[#000000] border-2 rounded-md mx-4"></input>
                
                </p>
                <p><b>Visibility:<span className='text-red-600'>*</span> </b>
                        <select id="sortDropdown" value={visibility} onChange={handleVisibilityChange} name="sortDropdown" className={`h-[4vh] my-2 border-solid border-[#000000] border-2 rounded-md mx-4`}>
                        <option value="NOT PUBLISHED" selected>Not Published</option>
                        <option value="PUBLISHED">Published</option>
                    </select>
                    </p>
                <p><b>Description:<span className='text-red-600'>*</span> </b></p>
                <textarea value={packageDesc} onChange={handlePackageDescChange} placeholder="Your Description Here" className="w-[80%] h-[25%] p-2 overflow-y-auto my-4 border-solid border-[#000000] border-2 rounded-md"></textarea>
            </div>
            
            </div>
            <div>
            <div className='IMAGE_PLACEHOLDER bg-slate-600 w-[50%] h-[50%] mb-5 rounded-2xl'></div>
            <label htmlFor="packageImage" className="text-xl xl:max-2xl:text-[0.8em]">Upload Image Here:<span className='text-red-600 '>*</span> </label>
            <input className="my-2 w-[50%] px-4 text-l border-black border-solid rounded-lg border-2 xl:max-2xl:text-[0.7em]" value={filePath} onChange={handleFilePathChange} type="text" name="packageImage" placeholder='Paste Link Here'/>
            <div className="my-2">
        
        <div className="text-xl xl:max-2xl:text-[0.8em] ">
          <b>Items:<span className='text-red-600 '>*</span> </b>
          <div className='overflow-y-auto h-[8vh] mb-6 xl:max-2xl:mb-2'>
            <ul>
              {items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className='flex flex-row item'>
        <button
            onClick={addItem}
            className="w-[20%] h-[4vh] rounded-md text-[1.1rem] text-white bg-[#1f8022] flex items-center justify-center  xl:max-2xl:text-[0.8em]
              hover:bg-[#00962a] transition-colors delay-250 duration-[3000] ease-in">
            <IoMdAddCircleOutline className="mr-[3%]"/> Add Item
          </button><input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="h-[4vh] border-solid border-[#000000] border-2 rounded-md mx-4 xl:max-2xl:text-[0.7em]">
          </input>
          </div>
          
        
      </div>
            </div>
            

            </div>
            <div className='flex justify-end items-center h-[3vh]'>{/*This is the footer*/}
                <button className='w-[8vw] h-[4vh] mx-5 rounded-md text-[1.1rem] bg-[#e14f4c] flex items-center justify-center xl:max-2xl:text-[0.8em] xl:max-2xl:mx-2
                hover:bg-[#ff5d5b] transition-colors delay-250 duration-[3000] ease-in' 
                  onClick={onClose}><AiFillDelete className="mr-[3%]"/>Cancel</button>
                <button
                  className={`w-[8vw] h-[4vh] text-[1.1rem] mx-5 rounded-md duration-300 xl:max-2xl:text-[0.8em] xl:max-2xl:mx-2 ${
                    isLoading || incompleteAlert? 'bg-[#bbd89e] cursor-not-allowed' : 'bg-[#1f8022] hover:bg-[#00962a] transition-colors delay-250 duration-[3000] ease-in'
                  } flex items-center justify-center`}
                  disabled={isLoading}
                  onClick={createPackage}
                >
                  {isLoading? <>Processing...</>:<><IoAddCircleSharp className="mr-[3%]"/>Add</>}
                  
                </button>
                  {incompleteAlert? <span className='text-red-600 xl:max-2xl:text-[0.8em]'>Some required fields are empty.</span>:<></>}
            </div>

        </div>

    </div>
    </div>
    </div>
  )
}

export default CreatePackageModal