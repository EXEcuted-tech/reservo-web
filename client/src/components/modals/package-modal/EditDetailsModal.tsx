import React, { useEffect, useState } from 'react';
import { AiFillCloseCircle, AiFillDelete } from "react-icons/ai";
import { HiOutlineMagnifyingGlass, HiMiniPencilSquare } from "react-icons/hi2";
import "../../../assets/css/card.css";
import { IoMdAddCircleOutline } from "react-icons/io";
import { BsDot } from "react-icons/bs";
import axios from 'axios';
import config from '../../../common/config'
import DeleteConfirmationModal from '../../card/DeleteConfirmationModal';

interface EditDetailsModalProps {
  onClose: () => void;
  packageID: string;
  packageName: string;
  description: string;
  dateStart: Date;
  dateEnd: Date;
  timeStart: string;
  timeEnd: string;
  price: string;
  tags: string[];
  filePath: string;
  visibility: string;
  items: string[];
}

const EditDetailsModal: React.FC<EditDetailsModalProps> = ({
  onClose,
  packageID,
  packageName,
  description,
  dateStart,
  dateEnd,
  timeStart,
  timeEnd,
  price,
  tags,
  filePath,
  visibility,
  items,
}) => {
  const [editedPackageName, setEditedPackageName] = useState(packageName);
  const [editedPrice, setEditedPrice] = useState(price);
  const [editedDateStart, setEditedDateStart] = useState(dateStart);
  const [editedDateEnd, setEditedDateEnd] = useState(dateEnd);
  const [editedTags, setEditedTags] = useState(tags.join(', '));
  const [editedVisibility, setEditedVisibility] = useState(visibility);
  const [editedFilePath, setEditedFilePath] = useState(filePath);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedItems, setEditedItems] = useState(items.join(', '));
  const [itemName, setItemName] = useState(''); // State for the input field
  const [deleteModal, setDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const editInfo = async ()=>{
    setIsLoading(true)
    try{
        const response = await axios.post(`${config.API}/package/update`,{
            package_id: packageID,
            package_name: editedPackageName,
            package_desc: editedDescription,
            price: editedPrice,
            date_start: editedDateStart,
            date_end: editedDateEnd,
            time_end: timeEnd,
            time_start: timeStart,
            tags: editedTags,
            visibility: editedVisibility,
            image_filepath: editedFilePath,
            item_list: editedItems,
        });
        console.log("RESPONSE IS: " + response.data)
    }catch(error){
        console.log(error);
    }
     setIsLoading(false);
     onClose();
  }

  const handleDeleteClick = () => {
    setDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
        const response = await axios.post(`${config.API}/package/delete/`,{
            package_id: packageID,

        }).then(response=>{
            console.log(response);
        })

        console.log('Delete request successful:', response);}
    catch(error:any|undefined){
        console.log('Error deleting package:', error);
        console.log('Status Code:', error.response?.status);
    }
    onClose();
    setDeleteModal(false);
    
  };


  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
  };



// Convert from "YYYY/MM/DD" to "MM/DD/YYYY"
function formatDateToMMDDYYYY(date: string) {
    const [year, month, day] = date.split('/');
    return `${month}-${day}-${year}`;
  }
  
  // Convert from "MM/DD/YYYY" to "YYYY/MM/DD"
  function formatDateToYYYYMMDD(date: string) {
    const [month, day, year] = date.split('-');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  const handleFilePathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedFilePath(e.target.value);
  };


  const handlePackageNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedPackageName(e.target.value);
  };

  const handleAddItemClick = () => {
    if (itemName.trim() !== '') {
      // Add the new item to the editedItems state
      setEditedItems((prevItems) => prevItems + `, ${itemName.trim()}`);
      // Clear the input field
      setItemName('');
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedPrice(e.target.value);
  };

  const handleDateStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value); // Create a new Date object from the input value
    setEditedDateStart(newDate);
}

  const handleDateEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    setEditedDateEnd(newDate);
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTags(e.target.value);
  };

  const handleVisibilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedVisibility(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedDescription(e.target.value);
  };



  return (
    <div className=''>
        
      <div className='z-0 absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] w-[100vw] h-[100vh] backdrop-blur-sm animate-zoom-in overflow-hidden'>
        
        <div className='flex justify-center align-center my-20'>
          <div className="w-[75vw] h-[80vh] bg-white p-10 rounded-xl">
          {deleteModal && (
        <DeleteConfirmationModal
          onClose={handleCloseDeleteModal}
          onConfirmDelete={handleConfirmDelete}
        />
      )}
            <div className='grid grid-cols-2 h-[5vh] border-b-2 border-black'>
              <div className='flex start items-center text-2xl mb-4'>
                <p><b>Package ID: </b>{packageID}</p>
              </div>
              <div className='flex justify-end'>
                <button onClick={onClose} className='flex items-center text-3xl mb-4 '><AiFillCloseCircle className='mx-2 detailsClose' /></button>
              </div>
            </div>
            <div className="grid grid-cols-2 h-[60vh] my-5 border-b-2 border-solid border-[#000000]">
              <div>
                <div className='h-[40vh] '>
                <p><span className='text-red-600 text-m'>Fields with * are required.</span></p>
                  <p><b>Package Name: <span className='text-red-600'>*</span></b><input onChange={handlePackageNameChange} type="text" value={editedPackageName} className="h-[4vh] my-2 p-2 border-solid border-[#000000] border-2 rounded-md mx-4 pl-2"></input></p>
                  <p><b>Total Price: <span className='text-red-600'>*</span></b> <input type="text" value={editedPrice} onChange={handlePriceChange} className="h-[4vh] my-2 border-solid border-[#000000] border-2 p-2 rounded-md mx-4 pl-2"></input></p>
                  <p><b>Available From: <span className='text-red-600'>*</span></b> <input type="date" value={editedDateStart.toISOString().split('T')[0]} onChange={handleDateStartChange} className="h-[4vh] my-2 p-2 border-solid border-[#000000] border-2 rounded-md mx-4 pl-2"></input></p>
                  <p><b>Expiry Date: <span className='text-red-600'>*</span></b> <input type="date" value={editedDateEnd.toISOString().split('T')[0]} onChange={handleDateEndChange} className="h-[4vh] my-2 p-2 border-solid border-[#000000] border-2 rounded-md mx-4 pl-2"></input></p>
                  <p><b>Tags: </b> <span className='text-red-600'>*</span><input onChange={handleTagsChange} type="text" value={editedTags} className="h-[4vh] my-2 border-solid p-2 border-[#000000] border-2 rounded-md mx-4 pl-2"></input></p>
                  <p><b>Visibility: <span className='text-red-600'>*</span></b>
                    <select id="sortDropdown" name="sortDropdown" className={`h-[4vh] my-2 border-solid border-[#000000] border-2 rounded-md mx-4 pl-2`}
                      onChange={handleVisibilityChange}
                      value={editedVisibility}
                    >
                      <option value="PUBLISHED">Published</option>
                      <option value="NOT PUBLISHED">Not Published</option>
                    </select>
                  </p>
                  <p><b>Description: <span className='text-red-600'>*</span></b></p>
                  <textarea onChange={handleDescriptionChange} className="w-[80%] p-2 h-[25%] overflow-y-auto border-black border-2" value={editedDescription}></textarea>
                </div>
              </div>
              <div className='flex flex-col w-[100%] h-[100%]'>
              <div className='IMAGE_PLACEHOLDER bg-slate-600 block w-[20vw] h-[40vh] rounded-2xl'>
              <img
                src={editedFilePath} // Use your image URL from the DB here
                alt="Package Image"
                onError={(e) => {
                  e.currentTarget.onerror = null; // Prevent infinite loop if the image itself is not found
                  e.currentTarget.src = 'https://i.imgur.com/YNoZzmJ.png'; // Use a placeholder image as a fallback
                }}
                
                className="w-full h-full object-cover rounded-2xl"
                />
<label htmlFor="packageImage">Upload Image Here: <span className='text-red-600'>*</span></label>
            <input className="my-2 w-[50%] px-2 border-black border-solid rounded-lg border-2" value={editedFilePath} onChange={handleFilePathChange} type="text" name="packageImage" placeholder='Paste Link Here'/>
              </div>

                <div className='my-8 block '>
                  <b>Items: <span className='text-red-600'>*</span></b>
                  <div className='overflow-y-auto h-[8vh]'>
                    <ul>
                      {editedItems.split(',').map((item, index) => (
                        <li key={index}>{item.trim()}</li>
                      ))}
                    </ul>
                  </div>
                  <div className='flex flex-row items-center'>
                    <button
                      onClick={handleAddItemClick}
                      className="w-[5vw] h-[4vh] rounded-md bg-[#7dc72d] flex items-center justify-center duration-75 hover:border-black border-2">
                      <IoMdAddCircleOutline />Add Item
                    </button>
                    <input
                      type="text"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      className="h-[4vh] border-solid border-[#000000] border-2 rounded-md mx-4"
                    />
                  </div>
                </div>
              
              </div>
            </div>
            <div className='flex justify-end items-center h-[5vh]'>
              <button className='w-[8vw] h-[4vh] mx-5 rounded-md bg-[#e14f4c] flex items-center justify-center duration-75 hover:border-black border-2'  onClick={handleDeleteClick}><AiFillDelete />Delete</button>
              <button
                    className='w-[8vw] h-[4vh] bg-[#7dc72d] mx-5 rounded-md flex items-center justify-center duration-75  hover:border-black border-2'
                    disabled={isLoading}
                    onClick={editInfo}
                    >
                    {isLoading ? 'Loading...' : <><HiMiniPencilSquare /> Save</>}
                    </button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default EditDetailsModal;
