import React, { useEffect, useState } from 'react';
import { AiFillCloseCircle, AiFillDelete, AiOutlineCloseCircle, AiOutlineUndo } from "react-icons/ai";
import { HiMiniPencilSquare } from "react-icons/hi2";
import "../../../assets/css/card.css";
import { IoMdAddCircleOutline } from "react-icons/io";
import {LuPackage2} from "react-icons/lu";
import axios from 'axios';
import config from '../../../common/config'
import DeleteConfirmationModal from '../../card/DeleteConfirmationModal';
import GenSpinner from '../../loaders/genSpinner';
import Notification from '../../alerts/Notification';
import {dayMMDDYYYY} from '../../../common/functions'

interface EditDetailsModalProps {
  onClose: () => void;
  errorMsg: (message:string)=>void;
  packageID: string;
}

const EditDetailsModal: React.FC<EditDetailsModalProps> = ({
  onClose,
  errorMsg,
  packageID,
  
}) => {
  const [editedPackageName, setEditedPackageName] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [editedDateStart, setEditedDateStart] = useState('')
  const [editedDateEnd, setEditedDateEnd] = useState<string|undefined>('')
  const [editedTimeStart, setEditedTimeStart] = useState('');
  const [editedTimeEnd, setEditedTimeEnd] = useState('');
  const [editedTags, setEditedTags] = useState<string[]>([]);
  const [editedVisibility, setEditedVisibility] = useState('NOT PUBLISHED');
  const [editedFilePath, setEditedFilePath] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedItems, setEditedItems] = useState<string[]>([]);
  const [itemName, setItemName] = useState(''); // State for the input field
  const [deleteModal, setDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  


  const editInfo = async ()=>{
    setIsLoading(true)
    try{
      // const dateStartModified = editedDateStart
      // console.log("EDIT INFO", dateStartModified)
      const preformatTags = JSON.stringify(
        {
          tags: editedTags
        }
      )

      const preformatItems = JSON.stringify(
        {
          items: editedItems
        }
      )
      // console.log("PREFOR Items", preformatItems)
      // console.log("PREFOR TAGS", preformatTags)
      var timeEnd:string|null = editedTimeEnd;
      if(editedTimeEnd === '00:00:00'){
        timeEnd = null;
      }
      const request = {
            package_id: packageID,
            package_name: editedPackageName,
            package_desc: editedDescription,
            price: editedPrice,
            date_start: editedDateStart,
            date_end: editedDateEnd,
            time_end: timeEnd,
            time_start: editedTimeStart,
            tags: preformatTags,
            visibility: editedVisibility,
            image_filepath: editedFilePath,
            item_list: preformatItems,
        }
    //  console.log(request)
        await axios.post(`${config.API}/package/update`, request);
        setErrorMessage('Successfully Updated!');
        setTimeout(()=>{
          setErrorMessage('')
        }, 5000)
    }catch(error){
        //PUT ERROR NOTIF 
    }
     setIsLoading(false);
     onClose();
  }

  const fetchData = async ()=>{
    
    if (packageID){
      setIsLoading(true);
          try {
            const response = await axios.get(`${config.API}/package/retrieve`, {
              params:{
                  col: "package_id",
                  val: packageID
              }
            })

            const data = response.data.data[0];
            if (data.date_start === "0000-00-00" || data.date_start === null){
              setEditedDateStart('2000-01-01')
            }else{
              var parsed_date:Date = new Date(data.date_start)
              
              var newDate = parsed_date.toISOString()
              
              newDate = newDate.split('T')[0];
              var arrDate = newDate.split('-');
              arrDate[1] = arrDate[1].padStart(2, '0');
              arrDate[2] = arrDate[2].padStart(2, '0');
              setEditedDateStart(`${arrDate[0]}-${arrDate[1]}-${arrDate[2]}`)
              console.log("PARSED DATE KO BEH ==>", editedDateStart)
             
            }

            if (data.date_end && data.date_end !== '0000-00-00'){
              var parsed_date:Date = new Date(data.date_end)
              var newDate = parsed_date.toISOString()
              newDate = newDate.split('T')[0];
              var arrDate = newDate.split('-');
              arrDate[1] = arrDate[1].padStart(2, '0');
              arrDate[2] = arrDate[2].padStart(2, '0');
              setEditedDateEnd(`${arrDate[0]}-${arrDate[1]}-${arrDate[2]}`)
              
            }else{
              setEditedDateEnd(undefined);
            }



           
            if (data.tags){
              const retrieved_tags = JSON.parse(data.tags)
              setEditedTags(retrieved_tags.tags);
            }

            if (data.item_list) {
              const retrievedItems:{items:string[]} = JSON.parse(data.item_list);
              setEditedItems(retrievedItems.items);
            }
            
            
            setEditedPackageName(data.package_name)
            setEditedVisibility(data.visibility)
            setEditedDescription(data.package_desc)
            setEditedPrice(data.price)
            setEditedFilePath(data.image_filepath)
            setEditedTimeStart(data.time_start)
            setEditedTimeEnd(data.time_end)
            setEditedFilePath(data.image_filepath)
            
           
            console.log("TIMESA==>", editedTimeStart)
            setIsLoading(false);
          }  
          catch(error:any){
            setErrorMessage(error.message);
            setTimeout(()=>{
            setErrorMessage('')
         }, 5000)

          }
          
        }
  }

  const handleDeleteClick = () => {
    setDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
        const response = await axios.post(`${config.API}/package/delete/`,{
            package_id: packageID,
        })
          console.log(response.data)
          setErrorMessage('Deleted Package Successfully!');
          setTimeout(()=>{
            setErrorMessage('')
          }, 5000)
        }
    catch(error:any|undefined){
        setErrorMessage(error.message);
        setTimeout(()=>{
          setErrorMessage('')
        }, 5000)
    }
    onClose();
    setDeleteModal(false);
    
  };


  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
  };

  const handleFilePathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedFilePath(e.target.value);
  };


  const handlePackageNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedPackageName(e.target.value);
  };

  const handleAddItemClick = () => {
    if (itemName.trim() !== '') {
      // Add the new item to the editedItems state
      setEditedItems((prevItems) => [...prevItems, itemName.trim()]);
      // Clear the input field
      setItemName('');
      console.log("ADDED ITEMS: ", editedItems)
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedPrice(e.target.value);
  };

  const handleDateStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value // Create a new Date object from the input value
    //console.log("INPUT", newDate)
    setEditedDateStart(newDate);
}

  const handleTimeStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value // Create a new Date object from the input value
    //console.log("INPUT", newDate)
    setEditedDateStart(newDate);
  }

  const handleTimeEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value // Create a new Date object from the input value
    //console.log("INPUT", newDate)
    setEditedDateEnd(newDate);
  }

  const handleDateEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value // Create a new Date object from the input value
    //console.log("INPUT", newDate)
    setEditedDateEnd(newDate);
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTags(e.target.value.split(','));
  };

  const handleVisibilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedVisibility(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedDescription(e.target.value);
  };

  useEffect(()=>{
    fetchData();
  },[packageID])

  // Use a useEffect to log the updated state
  useEffect(() => {
    console.log("ITEMS KO BEH", editedItems);
  }, [editedItems]);

  return (
    <div className=''>
        
      <div className='z-0 absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] w-[100vw] h-[100vh] backdrop-blur-sm animate-zoom-in overflow-hidden'>
        
        <div className='flex justify-center align-center my-20 xl:max-2xl:my-16 '>
          <div className="w-[75vw] h-[80vh] bg-white p-10 rounded-xl xl:max-2xl:h-[83vh]">
          {deleteModal && (
        <DeleteConfirmationModal
          onClose={handleCloseDeleteModal}
          onConfirmDelete={handleConfirmDelete}
        />
      )}
  
  <div className='grid grid-cols-2 h-[5vh] border-b-2 border-black'>
      <div className='flex start items-center text-2xl mb-4 xl:max-2xl:text-xl'>
            <LuPackage2 className="text-4xl mr-[2%] xl:max-2xl:text-2xl"/>
            <p><b>Package ID: </b>{packageID}</p>
      </div>
    
      <div className='flex justify-end'>
          <button onClick={onClose} className='flex items-center text-3xl mb-4 xl:max-2xl:text-2xl '><AiFillCloseCircle className='mx-2 detailsClose' /></button>
      </div>
    </div>
    {(errorMessage !== '') && <Notification message={errorMessage} color='#840705'/>}
    {isLoading? 
      <div className='h-[60vh] my-5 border flex justify-center pt-[5%]'><p className='text-center'><GenSpinner/></p><p className='pt-[5%] text-center animate-pulse'>Loading...</p></div>
      :    
    <div className="grid grid-cols-2 h-[60vh] my-5 border-b-2 border-solid border-[#000000]">
      <div>
        <div className='h-[40vh] text-xl xl:max-2xl:text-[0.8em]'>
        <p><span className='text-red-600 text-xs xl:max-2xl:text-[0.9em]'>Fields with * are required.</span></p>
          <table className='border-separateborder-spacing-8'>
            <tr><td><b>Package Name: <span className='text-red-600'>*</span></b></td>
            <td><input onChange={handlePackageNameChange} type="text" value={editedPackageName} className="h-[4vh] my-2 p-2 border rounded-md mx-4 pl-2 focus:outline-none focus:ring focus:ring-blue-500"/></td>
            </tr>
            <tr>
              <td><b>Total Price: <span className='text-red-600'>*</span></b></td>
              <td><input type="text" value={editedPrice} onChange={handlePriceChange} className="h-[4vh] my-2 border p-2 rounded-md mx-4 pl-2 focus:outline-none focus:ring focus:ring-blue-500"/></td>
            </tr>
            <tr>
              <td>
              <b>Available From: <span className='text-red-600'>*</span></b>
              </td>
              <td>
              <input type="date" value={editedDateStart} placeholder={editedDateStart} onChange={handleDateStartChange} className="h-[4vh] my-2 p-2 border rounded-md ml-4 pl-2 focus:outline-none focus:ring focus:ring-blue-500"></input>
              <input type="time" value={editedTimeStart} placeholder={editedTimeStart} onChange={handleTimeStartChange} className="h-[4vh] my-2 p-2 border rounded-md ml-2 pl-2 focus:outline-none focus:ring focus:ring-blue-500"></input>
              </td>
            </tr>
            <tr>
              <td>
              <b>Expiry Date:</b>
              </td>
              <td>
              <input type="date" value={editedDateEnd} placeholder={editedDateEnd} onChange={handleDateEndChange} className="h-[4vh] my-2 p-2 border rounded-md ml-4 pl-2 focus:outline-none focus:ring focus:ring-blue-500"></input>
              <input type="time" value={editedTimeEnd} placeholder={editedTimeEnd} onChange={handleTimeEndChange} className="h-[4vh] my-2 p-2 border rounded-md ml-2 pl-2 focus:outline-none focus:ring focus:ring-blue-500"></input>
              <button className='duration-200 ml-2 rounded-full hover:ring-2 hover:ring-blue-400' 
              onClick={()=>{
                setEditedTimeEnd('')
                setEditedDateEnd('')
              }}><AiOutlineUndo/></button>
              </td>
            </tr>
            <tr>
              <td>
              <b>Tags: </b><span className='text-red-600'>*</span>
              </td>
              <td>
              <input onChange={handleTagsChange} type="text" value={editedTags} className="h-[4vh] my-2 border rounded-md mx-4 pl-2 focus:outline-none focus:ring focus:ring-blue-500"/>
              </td>
            </tr>
            <tr>
              <td>
              <b>Visibility: <span className='text-red-600'>*</span></b>
              </td>
              <td>
              <select id="sortDropdown" name="sortDropdown" className={`h-[3vh] w-[10vw] my-2 border focus:outline-none focus:ring focus:ring-blue-500 rounded-2xl mx-4 pl-2 text-center ${editedVisibility === 'PUBLISHED'? 'bg-green-600 text-white':'bg-blue-200 text-blue-500'}`}
                onChange={handleVisibilityChange}
                placeholder={editedVisibility}
                value={editedVisibility}>
                <option value="PUBLISHED" className='bg-green-600 text-white'>Published</option>
                <option value="NOT PUBLISHED"   className='bg-blue-300 text-blue-800'>Not Published</option>
              </select>
              </td>
            </tr>
          </table>
            <p><b>Description: <span className='text-red-600'>*</span></b></p>
                <textarea onChange={handleDescriptionChange} className="text-sm mt-[2%] w-[80%] h-[35%] focus:outline-none focus:ring focus:ring-blue-500 border p-2 overflow-y-auto rounded-md resize-none" value={editedDescription}></textarea>
        </div>
      </div>
    
    <div className='flex flex-col w-[100%] h-[100%]'>
        <div className='IMAGE_PLACEHOLDER block w-[45%] h-[45%] rounded-2xl text-xl'>
            <img
              src={editedFilePath} // Use your image URL from the DB here
              alt="Package Image"
              onError={(e) => {
                e.currentTarget.onerror = null; // Prevent infinite loop if the image itself is not found
                e.currentTarget.src = 'https://i.imgur.com/YNoZzmJ.png'; // Use a placeholder image as a fallback
              }}
                
              className="w-full h-full object-cover rounded-2xl"
            />
          <div className="mt-[3%]">
              <label htmlFor="packageImage" className="text-xl xl:max-2xl:text-[0.7em]">Paste Image Link Here: <span className='text-red-600 font-bold '>*</span></label>
                <input className="h-[4vh] my-2 w-[100%] px-2 ml-[4%] rounded-lg border xl:max-2xl:text-[0.55em]" value={editedFilePath} onChange={handleFilePathChange} type="text" name="packageImage" placeholder='Paste Link Here'/>
          </div>
        </div>

                <div className='block text-xl mt-[7vh] xl:max-2xl:text-[0.8em] border p-2 rounded-lg'>
                  <b>Items: <span className='text-red-600'>*</span></b>
                  <div className='p-2 overflow-y-auto h-[8vh] mb-6 xl:max-2xl:mb-2'>
                    {editedItems && Array.isArray(editedItems) && editedItems.length > 0 ?
                    <ul>
                    {editedItems.map((element, index) => (
                        <div className='flex items-center' ><li key={index}><button className='hover:bg-red:200 rounded-full duration-200 mx-2 hover:border-red-200 hover:ring-2 ring-red-500 text-[1rem]'
                        onClick={() => {
                          const newItems = [...editedItems]; // Create a copy of editedItems
                          newItems.splice(index, 1);
                          setEditedItems(newItems);
                          console.log("Removed: ", newItems);
                          setItemName('');
                        }}
                        ><AiOutlineCloseCircle/></button><span className='text-sm'>{element}</span></li></div>
                      ))}
                    </ul>
                    : <p className=' italic text-sm'>No items in list</p>}
                  </div>
                  <div className='flex flex-row items-center'>
                    <button
                      onClick={handleAddItemClick}
                      className="w-[20%] h-[4vh] rounded-md text-[1.1rem] text-white bg-[#1f8022] flex items-center justify-center xl:max-2xl:text-[0.8em]
                      hover:bg-[#00962a] transition-colors delay-250 duration-[3000] ease-in">
                      <IoMdAddCircleOutline className="mr-[3%]"/>Add Item
                    </button>
                    <input
                      type="text"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      className="h-[4vh] border-solid border-[#000000] border-2 rounded-md mx-4 px-2"
                    />
                  </div>
                </div>
              
              </div>
            </div>
              }
            <div className='flex justify-end items-center h-[3vh]'>
              <button className='w-[8vw] h-[4vh] mx-3 rounded-md text-[1.1rem] bg-[#e14f4c] flex items-center justify-center xl:max-2xl:text-[0.8em]
              hover:bg-[#ff5d5b] transition-colors delay-250 duration-[3000] ease-in'
                onClick={handleDeleteClick}><AiFillDelete className="mr-[3%]"/>Delete</button>
              <button
                    className='w-[8vw] h-[4vh] mx-3 text-[1.1rem] bg-[#1f8022] text-white rounded-md flex items-center justify-center xl:max-2xl:text-[0.8em]
                    hover:bg-[#00962a] transition-colors delay-250 duration-[3000] ease-in'
                    disabled={isLoading}
                    onClick={editInfo}
                    >
                    {isLoading ? 'Loading...' : <><HiMiniPencilSquare className="mr-[3%]" /> Save</>}
                    </button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default EditDetailsModal;
