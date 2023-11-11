
import React, {useEffect, useState} from 'react'
import {AiFillCloseCircle, AiFillDelete} from "react-icons/ai"
import { HiMiniPencilSquare } from "react-icons/hi2";
import {LuPackage2} from "react-icons/lu";
import "../../../assets/css/card.css"
import axios from 'axios'
import config from '../../../common/config';
import DeleteConfirmationModal from '../../card/DeleteConfirmationModal';
import GenSpinner from '../../loaders/genSpinner';
import Notification from '../../alerts/Notification';

interface DetailsModalProps {
    onClose: () => void;
    openEditModal: ()=>void;
    refresh: ()=>void;
    errorMsg: (message:string)=>void;
    packageId: string;
  }

  
const DetailsModal: React.FC<DetailsModalProps> = ({onClose, openEditModal, errorMsg, refresh, packageId}) => {
    const [deleteModal, setDeleteModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    //DATA for the Modal
    const [packageName, setPackageName] = useState('UNDEFINED');
    const [dateStart, setDateStart] = useState('1970-01-01');
    const [dateEnd, setDateEnd] = useState('');
    const [description, setDescription] = useState('UNDEFINED');
    const [price, setPrice] = useState(0.00);
    const [tags, setTags] = useState([]);
    const [visibility, setVisibilility] = useState('NOT DEFINED')
    const [items, setItems] = useState([])
    const [timeStart, setTimeStart] = useState('12:00')
    const [timeEnd, setTimeEnd] = useState('');
    const [image, setImage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    




    
    
    const handleDeleteClick = () => {
      setDeleteModal(true);
    };
    const handleConfirmDelete = async () => {
      try {
          await axios.post(`${config.API}/package/delete/`,{
              package_id: packageId,
          })
          errorMsg('Deleted Package: '+ packageName);
          refresh()
        }
      catch(error:any|undefined){
        //PUT ERROR NOTIF 
      }
      onClose();
      setDeleteModal(false);
      
    };

    const fetchData = async ()=>{
      if (packageId){
        try{
          setIsLoading(true);
          const response = await axios.get(`${config.API}/package/retrieve`, {
            params: {
              col: 'package_id',
              val: packageId
            }
          })
        
        //console.log("DATA BEHHH ==>", response);
        const data = response.data.data[0]
        setPackageName(data.package_name)
        setDescription(data.package_desc);
        setPrice(data.price);
        setDateStart(String(data.date_start))
        setDateEnd(String(data.date_end))
       
        if(data.item_list){
          const received_items = JSON.parse(data.item_list)
          const items = received_items.items
          setItems(items);
        }
        if(data.tags){
          const received_tags = JSON.parse(data.tags);
          const tags = received_tags.tags;
          setTags(tags)
        }
        
        setVisibilility(data.visibility);
        setTimeEnd(data.time_end)
        setTimeStart(data.time_start)
        setIsLoading(false);
        setImage(data.image_filepath)
        }
        catch(error:any){
          console.log(error.message)
          setErrorMessage(error.message)
          setTimeout(()=>{
            setErrorMessage('')
         }, 5000)
          setIsLoading(true)
          return;
        }
      }
    }

  
  
    const handleCloseDeleteModal = () => {
      setDeleteModal(false);
    };

    
    useEffect(() => {
      fetchData()
    }, [packageId])

    return (
  <div>
    
    
    <div className='z-0 absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] w-[100vw] h-full overflow-hidden backdrop-blur-sm animate-zoom-in xs:max-sm:h-[58rem]'>
    <div className='flex justify-center align-center my-20 xl:max-2xl:my-16'>
        <div className="w-[75vw] h-[80vh] bg-white p-10 rounded-xl xs:max-sm:p-6 xs:max-sm:w-[85vw] xl:max-2xl:h-[83vh]">
          {deleteModal && (
        <DeleteConfirmationModal
          onClose={handleCloseDeleteModal}
          onConfirmDelete={handleConfirmDelete}
          alertMsg={errorMsg}
        />
      )}

      <div className='grid grid-cols-2 h-[5vh] border-b-2 border-black '> {/*this is the header for the modal*/}
      
          <div className='flex start items-center text-2xl mb-4 font-bold xs:max-sm:text-[1.2em] xs:max-sm:w-[60vw] xl:max-2xl:text-xl'>
              <LuPackage2 className="text-4xl mr-[2%] xs:max-sm:text-[1.3em] xl:max-2xl:text-2xl"/>
              <p>Package ID: {packageId}</p>
          </div>
          <div className='flex justify-end mb-4'><button onClick={onClose} className='flex items-center text-3xl xs:max-sm:text-[1.5em] xl:max-2xl:text-2xl '>
            <AiFillCloseCircle className='mx-2 detailsClose'/></button>
          </div>
      </div>
      {(errorMessage !== '') && <Notification message={errorMessage} color='#840705'/>}
      
      {isLoading? 
      <div className='h-[60vh] my-5 border-b-2 border-solid border-[#000000] flex justify-center pt-[5%]'><p className='text-center'><GenSpinner/></p><p className='pt-[5%] text-center animate-pulse'>Loading...</p></div>
      :
      <div className="grid grid-cols-2 h-[60vh] my-5 border-b-2 border-solid border-[#000000]">
        
            <div>
              <div className='h-[40vh] text-xl xs:max-sm:text-[1em] xs:max-sm:mt-[100%] xs:max-sm:h-[30vh] xl:max-2xl:text-[0.8em] '>
                <table className='border-separate border-spacing-x-8 border-spacing-y-2'>
                  <tr >
                    <td><b>Package Name: </b></td ><td>{packageName}</td>
                    
                  </tr>
                  <tr>
                    <td><b>Total Price: </b></td><td>{price}</td>
                  </tr>
                  <tr>
                    <td><b>Available From: </b></td><td>{dateStart.split('T')[0]} at {timeStart}</td>
                  </tr>
                  <tr>
                  <td><b>Expiry Date: </b></td>
                        <td>
                          {dateEnd && dateEnd !== 'null' && dateEnd!== '0000-00-00'? (
                            <>
                              {dateEnd.split('T')[0]}
                              {timeEnd && timeEnd != '00:00:00'? ` at ${timeEnd}` : ''}
                            </>
                          ) : 'N/A'}
                        </td>
                  </tr>
                  
                  <tr>
                    <td><b>Tags: </b></td><td><div className=' w-[20vw] overflow-x-hidden hover:overflow-x-auto h-[5vh]'>{tags.map((tag:string, index) => (<button className=' w-auto text-sm mx-1 border rounded-lg px-2 hover:bg-blue-200 duration-200' key={index}>{tag}</button>))}  </div></td>
                  </tr>
                  <tr>
                    <td><b>Visibility: </b></td><td><div className={` text-center rounded-2xl ${visibility === "PUBLISHED"? ' w-[80%] bg-green-600 text-white': 'bg-blue-200 text-blue-500'}`}>{visibility}</div></td>
                  </tr>
                  <tr className='h-[10]'>
                    <td colSpan={2}><b>Description: </b></td>
                  </tr>
                  <tr>
                    
                  <td colSpan={2}>
                  <div className='text-sm border px-4 overflow-y-auto h-[10vh] w-[25vw]'>
                    {description}</div></td>
                  </tr>
                  <tr>
                    <td colSpan={2}><b>Items: </b></td>
                  </tr>
                  <tr>
                  <td colSpan={2}>
                    <div className='border px-4 overflow-y-auto h-[10vh] w-[25vw]'>
                    <ul className='list-disc  ml-[6%]'>
                    {items.map((item, index) => (
                                            <li key={index} className='text-sm'>{item}</li>
                                        ))}      
                    </ul>
                    </div>
                    </td>
                  
                  </tr>
                  
                  
                </table>

            </div>
            <div className='my-4 text-xl xs:max-sm:text-[1em] xl:max-2xl:text-[0.8em]'>
                </div>
            </div>

        <div className='IMAGE_PLACEHOLDER block w-[90%] h-[90%] rounded-2xl xs:max-sm:w-[35vw] xs:max-sm:h-[15vh] xs:max-sm:ml-[-50%]'>
            <img
                src={image} // Use your image URL from the DB here
                alt={`${image}`}
                onError={(e) => {
                  e.currentTarget.onerror = null; // Prevent infinite loop if the image itself is not found
                  e.currentTarget.src = 'https://i.imgur.com/YNoZzmJ.png'; // Use a placeholder image as a fallback
                }}
                
                className="w-full h-full object-cover rounded-2xl"
                />
          </div>

      </div>
      }
      
      
            <div className='flex justify-end items-center h-[3vh]'>{/*This is the footer*/}
                <button className='w-[8vw] h-[4vh] mx-5 rounded-md text-[1.1rem] bg-[#e14f4c] flex items-center justify-center xs:max-sm:w-[25vw] xl:max-2xl:text-[0.8em]
                hover:bg-[#ff5d5b] transition-colors delay-250 duration-[3000] ease-in disabled:bg-[#b17574] disabled:cursor-not-allowed' 
                  onClick={handleDeleteClick} disabled={isLoading}><AiFillDelete className="mr-[3%]"/>Delete</button>
                <button className='w-[8vw] h-[4vh] text-[1.1rem] bg-[#efb953] mx-5 rounded-md flex items-center justify-center xs:max-sm:w-[25vw] xl:max-2xl:text-[0.8em]
                hover:bg-[#ffcf76] transition-colors delay-250 duration-[3000] ease-in disabled:bg-[#b49d73] disabled:cursor-not-allowed' 
                  onClick={openEditModal}  disabled={isLoading}><HiMiniPencilSquare className="mr-[3%]"/>Edit</button>
                
            </div>
        </div>
    </div>
    </div>
    </div>
  )
}

export default DetailsModal