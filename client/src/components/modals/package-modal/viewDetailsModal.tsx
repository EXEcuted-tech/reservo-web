import colors from '../../../common/colors'
import React, {useEffect, useState} from 'react'
import {AiFillCloseCircle, AiFillDelete} from "react-icons/ai"
import {LuPackage2} from "react-icons/lu";
import { HiOutlineMagnifyingGlass, HiMiniPencilSquare } from "react-icons/hi2";
import "../../../assets/css/card.css"
import { BsDot } from "react-icons/bs";
import EditDetailsModal from './EditDetailsModal';
import axios from 'axios'
import config from '../../../common/config';
import DeleteConfirmationModal from '../../card/DeleteConfirmationModal';
import { BiTime } from 'react-icons/bi';
import { MdAccessTime } from 'react-icons/md';

interface DetailsModalProps {
    onClose: () => void;
    openEditModal: ()=>void;
    packageID: string;
    packageName: string;
    description: string;
    date_start: string;
    date_end: string;
    tags: string[];
    price: string;
    visibility: string;
    items: string[];
    time_start: string;
    time_end: string;
    filePath: string;
  }

  
const DetailsModal: React.FC<DetailsModalProps> = ({ onClose, packageID, packageName,date_start, date_end, description, price, tags, visibility, items, time_start, time_end, filePath }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [parsedStartDate, setParsedStartDate] = useState<string|undefined>('')
    const [parsedEndDate, setParsedEndDate] = useState<string|undefined>('')

    function parseDate (date:string) {
      if (date && date !== 'Invalid Date'){
      const parsed = date.split("T")[0];
      const split =  parsed.split(" ");
      return String(`${split[1]}-${split[2]}-${split[3]}`)
      }else{
        return "Not set."
      }
    }
    useEffect(()=>{
      
      setParsedStartDate(parseDate(date_start))
      setParsedEndDate(parseDate(date_end))
    }, [date_start, date_end])
    return (
    <div>
    <div className='z-[100] fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] w-[100%] h-[100%] backdrop-blur-sm animate-zoom-in overflow-y-hidden '>
    <div className='flex justify-center align-center my-20'>
          <div className="w-[75vw] h-[80vh] bg-white p-10 rounded-xl">
            <div className='grid grid-cols-2 h-[5vh] border-b-2 border-black'> {/*this is the header for the modal*/}
                <div className='flex start items-center text-2xl mb-4 xl:max-2xl:text-xl'>
                  <LuPackage2 className="text-4xl mr-[2%] xl:max-2xl:text-2xl"/>
                  <p><b>Package ID: </b> {packageID}</p>
                </div>
                <div className='flex justify-end mb-4'><button onClick={onClose} className='flex items-center text-3xl xl:max-2xl:text-2xl '><AiFillCloseCircle className='mx-2 detailsClose'/></button></div>
            </div>
            <div className="grid grid-cols-2 h-[60vh] my-5 border-b-2 border-solid border-[#000000] xs:max-sm:grid-cols-1">
            <div>
            <div className='h-[40vh] text-xl xs:max-sm:text-[0.9em] xs:max-sm:h-[30vh] xl:max-2xl:text-[0.9em] pr-4'>
              <table className='border-separate border-spacing-x-8 border-spacing-y-2 text-left'>
                <tr>
                  <td className=' w-1/4'>
                  <p><b>Package Name: </b></p>
                  </td>
                  <td className=' w-3/4'>
                  {packageName}
                  </td>
                </tr>
                <tr>
                  <td  className=' w-1/4'>
                  <p><b>Total Price: </b> </p>
                  </td>
                  <td className=' w-3/4'>
                  {price}
                  </td>
                </tr>
                <tr>
                  <td>
                  <p><b>Available From: </b></p>
                  </td>
                  <td>
                    <div className='w-[7vw] inline-block'>
                  {parsedStartDate} 
                  </div>
                  <button className=' bg-green-200 px-4 rounded-2xl ml-4 w-[8vw]'><MdAccessTime className=' inline-block'/> {time_start}</button> 

                  
                  </td>
                </tr>
                <tr>
                  <td>
                    
                  <p><b>Expiry Date: </b></p>
                  </td>
                  <td>
                  <div className='w-[7vw] inline-block'>
                  {parsedEndDate && parsedEndDate!== "undefined-undefined-undefined"? parsedEndDate: "Not Set."} 
                  </div>
                  {time_end? <button className=' bg-red-200 px-4 rounded-2xl ml-4 w-[8vw]'><MdAccessTime className=' inline-block'/> {time_end}</button> : <></>}
                  </td>
                </tr>
                <tr>
                  <td className=' w-1/4'>
                  <b>Tags: </b>
                  </td>
                  <td className=' w-3/4'>
                  <div className=' w-[20vw] overflow-x-hidden hover:overflow-x-auto h-[5vh]'> 
                {tags.map((tag, index) => (
                                            <button className=' w-auto text-sm mx-1 border rounded-lg px-2 hover:bg-blue-200 duration-200' key={index}>{tag}</button>
                                        ))}
                                        </div>
                  </td>
                </tr>

                {/* <tr>
                  <td className=' w-1/4'>
                  <b>Visibility: </b>
                  </td>
                  <td className=' w-3/4'>
                  <button className={` text-center rounded-2xl ${visibility === "PUBLISHED"? ' w-[80%] bg-green-600 text-white': 'bg-blue-200 text-blue-500'}`}>{visibility}</button>
                  </td>
                </tr> */}
                
                </table>
                
                
               
                
               
                 

                
                <p><b>Description: </b></p><textarea className='bg-white text-sm border p-4 indent-10 w-[35vw] h-[14vh] text-justify overflow-y-hidden hover:overflow-y-auto rounded-lg resize-none' disabled>{description}</textarea>
            </div>
            <div className='my-4 text-xl xl:max-2xl:text-[0.9em]'>
                    <p><b>Items: </b>
                    <div className='w-[35vw] border h-[10vh] rounded-lg overflow-y-hidden hover:overflow-y-auto'>
                    <ul className='list-disc ml-[6%] text-sm'>
                    {items.map((tag, index) => (
                                            <li key={index} className=''>{tag}</li>
                                        ))}
                                    
                    </ul>
                    </div>
                    </p>
                </div>
            </div>
            <div className='IMAGE_PLACEHOLDER bg-slate-600 block w-[90%] h-[90%] ml-4  rounded-2xl xs:max-sm:w-[100%] xs:max-sm:h-[50%]'>
            <img
                src={filePath} // Use your image URL from the DB here
                alt="Package Image"
                onError={(e) => {
                  e.currentTarget.onerror = null; // Prevent infinite loop if the image itself is not found
                  e.currentTarget.src = 'https://i.imgur.com/YNoZzmJ.png'; // Use a placeholder image as a fallback
                }}
                
                className="w-full h-full object-cover rounded-2xl"
                />
            </div>

            </div>
            <div className='flex justify-end items-center h-[5vh]'>{/*This is the footer*/}
            </div>
        </div>

    </div>
    </div>
    </div>
  )
}

export default DetailsModal