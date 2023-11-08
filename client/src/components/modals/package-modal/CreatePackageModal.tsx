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
    const [dateEnd, setDateEnd] = useState<any>(null);
    const [timeStart, setTimeStart] = useState<any>('00:00:00');
    const [timeEnd, setTimeEnd] = useState<string|null>(null);
    const [visibility, setVisibility] = useState('NOT PUBLISHED');
    const [itemList, setItemList] = useState<string[]>([]);
    const [filePath, setFilePath] = useState('');
    const [tags, setTags] = useState<any>([]);
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
      setTags(e.target.value.split(','));
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
        var temptags = JSON.stringify({
          tags: tags
        })
        var tempitems = JSON.stringify({
          items: itemList
        })
        const response = await axios.post(`${config.API}/package/create`, {
          package_name: packageName,
          package_desc: packageDesc || '', // Provide a default value if it's null
          price: price,
          date_start: dateStart,
          date_end: dateEnd || null, // Use null if it's null
          time_start: timeStart || '', // Provide a default value if it's null
          time_end: timeEnd || null, // Use null if it's null
          visibility: visibility,
          item_list: tempitems, // Use null if it's null
          image_filepath: filePath,
          tags: temptags, // Use null if it's null
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
        !price || // Modify this condition as needed for other fields
        !dateStart || // Adjust this condition as needed
        !timeStart ||
        !visibility ||
        !filePath ||
        tags.length === 0 ||
        items.length === 0
      ) {
        setIncompleteAlert(true);
      } else {
        setIncompleteAlert(false);
      }
    };



    return (
    <div className=''>
    <div className='z-0 absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] w-[100vw] h-[100vh] backdrop-blur-sm animate-zoom-in xs:max-sm:h-[58rem]'>
    <div className='flex justify-center align-center my-20 xl:max-2xl:my-16'>
        <div className="w-[75vw] h-[80vh] bg-white p-10 rounded-xl xs:max-sm:p-6 xs:max-sm:w-[90vw] xs:max-sm:h-[85vh] xl:max-2xl:h-[83vh]">

            <div className='grid grid-cols-2 h-[5vh] border-b-2 border-black'> {/*this is the header for the modal*/}
                <div className='text-2xl flex start items-center mb-4 xs:max-sm:text-[1.1em] xs:max-sm:w-[60vw] xl:max-2xl:text-xl'>
                  <LuPackage2 className="text-4xl mr-[2%] xs:max-sm:text-[1.3em] xl:max-2xl:text-2xl"/>
                  <p><b>Add a New Package</b></p>
                </div>
                <div className='flex justify-end mb-4'><button className='flex items-center text-3xl  xs:max-sm:text-[1.5em] xl:max-2xl:text-2xl ' onClick={closeCreatePackageModal}>
                  <AiFillCloseCircle className='mx-2 detailsClose'/></button></div>
            </div>
            <div className="grid grid-cols-2 h-[60vh] my-5 border-b-2 border-solid border-[#000000] xs:max-sm:h-[65vh]">
            <div>
            <div className='h-[40vh] text-xl xs:max-sm:text-[0.9em] xl:max-2xl:text-[0.8em] xl:max-2xl:mt-[-4%]'>
            <p><span className='text-red-600 text-base xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.9em]'>Fields with * are required.</span></p>
                <p><b>Package Name:<span className='text-red-600'>*</span> </b><input type="text"  value={packageName} onChange={handlePackageNameChange}className="h-[4vh] my-2 p-2 border-solid border-[#000000] border-2 rounded-md mx-4 xs:max-sm:w-[33vw] xs:max-sm:h-[3vh] xs:max-sm:my-1 xs:max-sm:mx-2"></input></p>
                <p><b>Total Price:<span className='text-red-600'>*</span> </b> <input type="text" value= {price} onChange={handlePriceChange} className="h-[4vh] my-2 border-solid p-2 border-[#000000] border-2 rounded-md mx-4 xs:max-sm:w-[33vw] xs:max-sm:h-[3vh] xs:max-sm:my-1 xs:max-sm:mx-2"></input></p>
                <p><b>Available From:<span className='text-red-600'>*</span> </b> <input type="date" value={dateStart} onChange={handleDateStartChange} className="h-[4vh] my-2 p-2 border-solid border-[#000000] border-2 rounded-md mx-4 xs:max-sm:w-[33vw] xs:max-sm:h-[3vh] xs:max-sm:my-1 xs:max-sm:mx-2"></input></p>
                <p><b>Expiry Date:<span className='text-red-600'>*</span></b> <input type="date" value={dateEnd} onChange={handleDateEndChange} className="h-[4vh] my-2 border-solid border-[#000000] border-2 rounded-md mx-4 xs:max-sm:w-[33vw] xs:max-sm:h-[3vh] xs:max-sm:my-1 xs:max-sm:mx-2"></input></p>
                <p><b>Tags:<span className='text-red-600'>*</span> </b> <input type="text" value={tags} onChange={handleTagsChange} placeholder="Separate by commas (,)" className="h-[4vh] my-2 p-2 border-solid border-[#000000] border-2 rounded-md mx-4 xs:max-sm:w-[33vw] xs:max-sm:h-[4vh] xs:max-sm:my-1 xs:max-sm:mx-2"></input>
                
                </p>
                <p><b>Visibility:<span className='text-red-600'>*</span> </b>
                        <select id="sortDropdown" value={visibility} onChange={handleVisibilityChange} name="sortDropdown" className={`h-[4vh] my-2 border-solid border-[#000000] border-2 rounded-md mx-4 xs:max-sm:h-[3vh] xs:max-sm:my-1 xs:max-sm:mx-2`}>
                        <option value="NOT PUBLISHED" selected>Not Published</option>
                        <option value="PUBLISHED">Published</option>
                    </select>
                    </p>
                <p><b>Description:<span className='text-red-600 xs:max-sm:mt-[2rem]'>*</span> </b></p>
                <textarea value={packageDesc} onChange={handlePackageDescChange} placeholder="Your Description Here" className="w-[80%] h-[25%] p-2 overflow-y-auto my-4 border-solid border-[#000000] border-2 rounded-md xs:max-sm:w-[70vw] xs:max-sm:h-[8vh] xs:max-sm:my-1 xs:max-sm:mx-2"></textarea>
            </div>
            
            </div>
            <div>

    <div className='IMAGE_PLACEHOLDER bg-slate-600 w-[50%] h-[50%] mb-5 rounded-2xl xs:max-sm:w-[35vw] xs:max-sm:h-[15vh] xs:max-sm:ml-[8%]'></div>
        <label htmlFor="packageImage" className="text-xl font-bold xs:max-sm:text-[0.8em] xs:max-sm:ml-[2%] xl:max-2xl:text-[0.8em]">Upload Image Here:<span className='text-red-600 '>*</span> </label>
          <input className="my-2 w-[50%] px-4 text-l border-black border-solid rounded-md border-2 xl:max-2xl:text-[0.7em] xs:max-sm:w-full xs:max-sm:h-[3vh] xs:max-sm:my-1 xs:max-sm:mx-2" 
            value={filePath} onChange={handleFilePathChange} type="text" name="packageImage" placeholder='Paste Link Here'/>
            <div className="my-2">
        
        <div className="text-xl xs:max-sm:text-[0.9em] xl:max-2xl:text-[0.8em] ">
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
            className="w-[20%] h-[4vh] rounded-md text-[1.1rem] text-white bg-[#1f8022] flex items-center justify-center xs:max-sm:text-[0.9em] xs:max-sm:h-[3vh] xs:max-sm:mt-[3%] xl:max-2xl:text-[0.8em]
              hover:bg-[#00962a] transition-colors delay-250 duration-[3000] ease-in">
            {window.innerWidth <= 640 ? (
              <IoMdAddCircleOutline className="flex items-center justify-center xs:max-sm:text-[1.5em] " />
            ) : (
              "Add Item"
            )}
          </button><input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="h-[4vh] border-solid border-[#000000] border-2 rounded-md mx-4 xs:max-sm:w-[75%] xs:max-sm:h-[3vh] xs:max-sm:my-1 xs:max-sm:mx-2">
          </input>
          </div>
        </div>
      </div>
    </div>

      <div className='flex justify-end items-center h-[3vh]'>{/*This is the footer*/}
                <button className='w-[8vw] h-[4vh] mx-5 rounded-md text-[1.1rem] bg-[#e14f4c] flex items-center justify-center xs:max-sm:text-[0.9em] xs:max-sm:w-[20vw] xs:max-sm:mx-2 xl:max-2xl:text-[0.8em] xl:max-2xl:mx-2
                hover:bg-[#ff5d5b] transition-colors delay-250 duration-[3000] ease-in' 
                  onClick={onClose}><AiFillDelete className="mr-[3%]"/>Cancel</button>
                <button
                  className={`w-[8vw] h-[4vh] text-[1.1rem] mx-5 rounded-md duration-300 xs:max-sm:w-[20vw] xs:max-sm:mx-2 xs:max-sm:mr-[8%] xs:max-sm:text-[0.9em] xl:max-2xl:text-[0.8em] xl:max-2xl:mx-2 ${
                    incompleteAlert || isLoading? 'bg-[#a6bb92] cursor-not-allowed' : 'bg-[#1f8022] hover:bg-[#00962a] transition-colors delay-250 duration-[3000] ease-in'
                  } flex items-center justify-center`}
                  disabled={incompleteAlert||isLoading}
                  onClick={createPackage}
                >
                  {isLoading? <>Processing...</>:<><IoAddCircleSharp className="mr-[3%]"/>Add</>}
                  
                </button>
                  {incompleteAlert? <span className='text-red-600 xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.8em]'>Some required fields are empty.</span>:<></>}
            </div>

        </div>

    </div>
    </div>
    </div>
  )
}

export default CreatePackageModal