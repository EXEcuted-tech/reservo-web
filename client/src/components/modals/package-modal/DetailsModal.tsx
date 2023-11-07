import colors from '../../../common/colors'
import React, {useEffect, useState} from 'react'
import {AiFillCloseCircle, AiFillDelete} from "react-icons/ai"
import { HiOutlineMagnifyingGlass, HiMiniPencilSquare } from "react-icons/hi2";
import {LuPackage2} from "react-icons/lu";
import "../../../assets/css/card.css"
import { BsDot } from "react-icons/bs";
import EditDetailsModal from './EditDetailsModal';
import axios from 'axios'
import config from '../../../common/config';
import DeleteConfirmationModal from '../../card/DeleteConfirmationModal';

interface DetailsModalProps {
    onClose: () => void;
    openEditModal: ()=>void;
    packageId: string;
  }

  
const DetailsModal: React.FC<DetailsModalProps> = ({onClose, openEditModal, packageId}) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    //DATA for the Modal
    const [packageName, setPackageName] = useState('UNDEFINED');
    const [dateStart, setDateStart] = useState('1970-01-01');
    const [dateEnd, setDateEnd] = useState('');
    const [description, setDescription] = useState('UNDEFINED');
    const [price, setPrice] = useState(0.00);
    const [tags, setTags] = useState([]);
    const [visibility, setVisibilility] = useState()
    const [items, setItems] = useState([])
    const [timeStart, setTimeStart] = useState('12:00')
    const [timeEnd, setTimeEnd] = useState('');
    const [image, setImage] = useState('');
    





    useEffect(() => {
      fetchData()
    }, [packageId])
    
    const handleDeleteClick = () => {
      setDeleteModal(true);
    };
    const handleConfirmDelete = async () => {
      try {
          await axios.post(`${config.API}/package/delete/`,{
              package_id: packageId,
              
          })
            
           
          
  
          
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
        var temptags = data.tags!== null || data.tags !== ''? data.tags.split(","): []
        //console.log("TEMPTAGSSS:::: ", temptags)
        setTags(temptags)
        setVisibilility(data.visibility);
        var items = data.item_list !== null || data.tags !== ''? data.item_list.split(","): []
        setItems(items);
        setTimeEnd(data.time_end)
        setTimeStart(data.time_start)
        }
        catch(error){
          console.log(error);
        }finally{
          setIsLoading(false);
        }
      }
    }
  
  
    const handleCloseDeleteModal = () => {
      setDeleteModal(false);
    };

      const closeModal = () => {
        setIsModalOpen(false);
      };
    


    return (
  <div>
    <div className='z-0 absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] w-[100vw] h-full overflow-x-hidden backdrop-blur-sm animate-zoom-in overflow-hidden xs:max-sm:h-[58rem]'>
    <div className='flex justify-center align-center my-20 xl:max-2xl:my-16'>
        <div className="w-[75vw] h-[80vh] bg-white p-10 rounded-xl xs:max-sm:p-6 xs:max-sm:w-[85vw] xl:max-2xl:h-[83vh]">
          {deleteModal && (
        <DeleteConfirmationModal
          onClose={handleCloseDeleteModal}
          onConfirmDelete={handleConfirmDelete}
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

      <div className="grid grid-cols-2 h-[60vh] my-5 border-b-2 border-solid border-[#000000]">
            <div>
              <div className='h-[40vh] text-xl xs:max-sm:text-[1em] xs:max-sm:mt-[100%] xs:max-sm:h-[30vh] xl:max-2xl:text-[0.8em] '>
                  <p><b>Package Name: </b>{packageName}</p>
                  <p><b>Total Price: </b> {price}</p>
                  <p><b>Available From: </b> {dateStart.split("T")[0]}</p>
                  <p><b>Expiry Date: </b> {dateEnd.split("T")[0]}</p>
                  <p><b>Time:</b> {timeStart}{timeEnd == null? '': ` - ${timeEnd}`}</p>
                  <p><b>Tags: </b> {tags.map((tag, index) => (
                                              <span key={index}>{tag}{index < tags.length - 1 ? ', ' : ''}</span>
                                          ))}  
                  </p>
                  <p><b>Visibility: </b>{visibility}</p>
                  <p><b>Description: </b></p><p>{description}</p>
            </div>
            <div className='my-4 text-xl xs:max-sm:text-[1em] xl:max-2xl:text-[0.8em]'>
                    <p><b>Items: </b>
                    <ul className='list-disc  ml-[6%]'>
                    {items.map((item, index) => (
                                            <li key={index} className=''>{item}</li>
                                        ))}      
                    </ul>
                    </p>
                </div>
            </div>

        <div className='IMAGE_PLACEHOLDER block w-[50%] h-[50%] rounded-2xl xs:max-sm:w-[35vw] xs:max-sm:h-[15vh] xs:max-sm:ml-[-50%]'>
            <img
                src={image} // Use your image URL from the DB here
                alt="Package Image"
                onError={(e) => {
                  e.currentTarget.onerror = null; // Prevent infinite loop if the image itself is not found
                  e.currentTarget.src = 'https://i.imgur.com/YNoZzmJ.png'; // Use a placeholder image as a fallback
                }}
                
                className="w-full h-full object-cover rounded-2xl"
                />
          </div>

      </div>
      
            <div className='flex justify-end items-center h-[3vh]'>{/*This is the footer*/}
                <button className='w-[8vw] h-[4vh] mx-5 rounded-md text-[1.1rem] bg-[#e14f4c] flex items-center justify-center xs:max-sm:w-[25vw] xl:max-2xl:text-[0.8em]
                hover:bg-[#ff5d5b] transition-colors delay-250 duration-[3000] ease-in' 
                  onClick={handleDeleteClick}><AiFillDelete className="mr-[3%]"/>Delete</button>
                <button className='w-[8vw] h-[4vh] text-[1.1rem] bg-[#efb953] mx-5 rounded-md flex items-center justify-center xs:max-sm:w-[25vw] xl:max-2xl:text-[0.8em]
                hover:bg-[#ffcf76] transition-colors delay-250 duration-[3000] ease-in' 
                  onClick={openEditModal}><HiMiniPencilSquare className="mr-[3%]"/>Edit</button>
                {isEditModalOpen && 
                <EditDetailsModal onClose={onClose} packageID={packageId} packageName={''} description={''} dateStart={new Date()} dateEnd={new Date()} timeStart={''} timeEnd={''} price={''} tags={[]} filePath={''} visibility={''} items={[]}                />}
            </div>
        </div>
    </div>
    </div>
    </div>
  )
}

export default DetailsModal