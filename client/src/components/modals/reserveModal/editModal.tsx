import React, { useEffect, useState } from 'react'
import {GrUpdate} from 'react-icons/gr'
import {AiFillCloseCircle, AiFillSave} from 'react-icons/ai'
import {TbArrowsExchange} from 'react-icons/tb'
import axios from 'axios';
import config from '../../../common/config.ts';
import GenSpinner from '../../loaders/genSpinner';
import Spinner from '@material-tailwind/react/components/Spinner';

const EditModal:React.FC<EditModalProps> = (props) => {
  const {setOpenModalEdit} = props;
  const [isHovered, setIsHovered] = useState(false);

  const [contact,setContact]= useState("");
  const [record,setRecord]=useState<ReserveCardProps[]>([]);
  const [payment, setPayment] = useState<Payment[]>([]);
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [inventory, setInventory] = useState<Inventory[]>([]);

  const editId = Number(sessionStorage.getItem('res_id'));
  const merchId = Number(localStorage.getItem('merch_id'));
  const [isLoading, setIsLoading] = useState(false);
  const [loading,setLoading] = useState(false);
  const [retrieved, setRetrieved] = useState(false);

  useEffect(() => {
    retrieveExisting();
  }, [editId]);

  useEffect(() => {
    fetchData();
    retrievePayment();
    retrieveAccount();
    retrieveInventory();
    setTimeout(()=>{setIsLoading(true)},2500);
  }, [retrieved]);

  // Retrieve Area
  const fetchData = async () =>{
    const publishedPackages = await retrievePackage();
    setPackages(publishedPackages)
  }

  const retrieveExisting = () =>{
    const col = "reservation_id";
    const val = editId;
    setIsLoading(false);
    axios.get(`${config.API}/reserve/retrieve?col=${col}&val=${val}`)
    .then((res)=>{
       if(res.data.success === true){
            setRecord(res.data.records)
            setRetrieved(true);
       }
    })
    .catch((error) => {
        console.error("Error retrieving data:", error);
      });
    // setTimeout(()=>{setIsLoading(true)},2500);
  }

  const formatDate = (date: Date) => {
    if (date instanceof Date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); 
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return '';
  };

  const retrievePackage = async () => {
    try {
        const response = await axios.get(`${config.API}/package/retrieveparams`, {
          params: {
            col1: 'merchant_id',
            val1: merchId, 
            col2: 'visibility',
            val2: 'PUBLISHED',
          },
        });
        return response.data.data;
      } catch (error) {
        console.error('Error fetching published packages:', error);
        return [];
      }  
  }

  const retrievePayment = () =>{
    const col = 'payment_id';
    const val = record[0]?.payment_id

    axios.get(`${config.API}/payment/retrieve?col=${col}&val=${val}`)
    .then((res)=>{
      if(res.data.success == true){
        setPayment(res.data.data);
      }
    })
  }

  const retrieveAccount = () =>{
    const col = 'account_id';
    const val = record[0]?.account_id

    axios.get(`${config.API}/user/retrieve?col=${col}&val=${val}`)
    .then((res)=>{
      if(res.data.success == true){
        setContact(res.data.users[0]?.contact_number);
      }
    })
  }

  const retrieveInventory = () =>{
    const col = 'inventory_id';
    const val = record[0]?.inventory_id

    axios.get(`${config.API}/inventory/retrieve?col=${col}&val=${val}`)
    .then((res)=>{
      if(res.data.success == true){
        setInventory(res.data.records)
      }
    })
  }

  // handleStateChanges
  const handleRecordChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    console.log("Name: ",name," Value: ",value);
    setRecord((prevRecord) => {
      const updatedRecord = prevRecord.map((record, index) => {
        if (index === 0) {
          return { ...record, [name]: value };
        }
        return record;
      });
      return updatedRecord;
    });
  };

  const handlePaymentChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;

    setPayment((prevPayment) => {
      const updatedPayment = prevPayment.map((payment, index) => {
        if (index === 0) {
          return { ...payment, [name]: value };
        }
        return payment;
      });

      return updatedPayment;
    });
  };

  const handleStatusChange = () => {
    const updatedRecord = [...record];

    updatedRecord[0].status = record[0].status === 'Ongoing' ? 'Finished' : 'Ongoing';

    setRecord(updatedRecord);
  };

  const handleInventoryChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    console.log("Name: ",name," Value: ",value);
    setInventory((prevInventory) => {
      const updatedInv = prevInventory.map((record, index) => {
        if (index === 0) {
          return { ...record, [name]: value };
        }
        return record;
      });

      return updatedInv;
    });
  };

  // handleUpdates
  const updateRecord = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setLoading(false);
    updateRes();
    updatePayment();
    updateInventory();
    updateContact();
    setTimeout(()=>{
      setLoading(true);
    },2500)
    alert("Updated record successfully!");
    window.location.reload();
  }

  const updateRes = () => {
    const res_id = editId;
    console.log("RECORD: ",record[0])
    axios.post(`${config.API}/reserve/update?res_id=${res_id}`,record[0])
    .then((res)=>{
      console.log("Reservation Update: ",res);
    })
  }

  const updatePayment = () => {
    const payId = record[0].payment_id;
    console.log("PAYMENT: ",payment[0])
    axios.post(`${config.API}/payment/update?payId=${payId}`,payment[0])
    .then((res)=>{
      console.log("Payment Update: ",res);
    })
  }

  const updateInventory = () => {
    const inventoryID = record[0].inventory_id;
    console.log("INVENTORY: ",inventory[0])
    axios.post(`${config.API}/inventory/update?inventoryID=${inventoryID}`,inventory[0])
    .then((res)=>{
      console.log("Inventory Update: " ,res);
    })
  }

  const updateContact = () => {
    const userID = record[0]?.account_id;
    axios.post(`${config.API}/user/edit?userID=${userID}`,{
      "contact_number":contact
    }).then((res)=>{
      console.log(res);
    })
  }


  return (
    <div className="animate-slide-up font-poppins fixed top-[7%] left-[18%] right-0 bg-white z-50 bg-[rgba(0, 0, 0, 0.5)] w-[70%] p-4 overflow-x-hidden overflow-y-auto h-[80%] drop-shadow rounded-3xl">
      {!isLoading 
       ?
        <div className='flex justify-center ml-[-2%] mt-[25%]'>
          <GenSpinner/>
        </div>
      :
      <>
        <div className='flex w-full h-[5vh]'>
            <div className='flex items-center w-[96%] mt-[0.5%]'>
                <div className='flex items-center w-[100%] ml-[1%]'>
                    <GrUpdate className='mr-[1%] text-[2em] xl:max-2xl:text-[1.3em]'/>
                    <h1 className='font-bold text-[1.5em] xl:max-2xl:text-[1.2em]'>Update Reservation Record</h1>   
                </div>
            </div>
            <div className='mt-[0.5%]'>
                <AiFillCloseCircle className='text-[2.5em] hover:cursor-pointer xl:max-2xl:text-[1.8em]'
                 onClick={()=>{
                  sessionStorage.removeItem('res_id');
                  setOpenModalEdit(false)
                }}/>
            </div>
        </div>
        <hr className='h-[2px] w-full my-[1.2%] bg-gray-200 border-0'/>

        {/* General Information */}
        <div className='flex items-center w-full'>
          <h1 className='font-bold uppercase text-[1.5em] ml-[4%] bg-[#840705] inline-block text-white px-[1%] rounded-lg mb-[0.5%] xl:max-2xl:text-[1.0em]'>General Section</h1>
          <div className='relative w-[70%] ml-[1%]'>
         
            {isHovered &&
              <p className='absolute bg-[black] opacity-80 text-white top-[-95%] rounded w-[17%] py-[0.5%]
              px-[1%] left-[11.5%] text-[0.8em] z-10'>Change to {record[0]?.status==='Ongoing' ? 'Finished' : 'Ongoing'} ?</p>
            }
           
            <p className={`relative font-bold rounded-lg py-[0.5%] w-[12%] mt-[-1%] text-center
                    hover:animate-zoom-in hover:cursor-pointer flex items-center justify-center
                    ${record[0]?.status=='Ongoing'?'bg-[#cce1f4] text-[#0056A5]'
                        :'bg-[#ccf6d0] text-[#199250]'}`}
                        onMouseEnter={()=>{setIsHovered(!isHovered)}}
                        onMouseLeave={()=>{setIsHovered(!isHovered)}}
                        onClick={handleStatusChange}>
                {record[0]?.status} <TbArrowsExchange className='pl-[1%] text-[1.2em]'/>
            </p>
          </div>
        </div>        
        <div className='flex ml-[4%] mr-[2%] text-[1.2em] w-full xl:max-2xl:text-[0.8em]'>
          <div className='w-[33%]'>
            <div className='mb-[2.5%]'>
                <p className='mt-[1.5%] mb-[0.3%] mr-[1%] font-semibold'>Date</p>
                <input type="date" 
                    className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'
                    name="res_date"
                    value={formatDate(new Date(record[0]?.res_date))}
                    onChange={(e)=>handleRecordChange(e)}
                />
            </div>
            <div className='mb-[2.5%]'>
                <p className='mt-[1.5%] mb-[0.3%] mr-[1%] font-semibold'>Package</p>
                <select 
                    className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'
                    name="package_id"
                    value={record[0]?.package_id}
                    onChange={(e)=>{handleRecordChange(e)}}
                    placeholder='Package'>
                    <option value="0" hidden>Package</option>
                    {packages.map((packageItem) => (
                        <option key={packageItem.package_id} value={packageItem.package_id}>
                            {packageItem.package_name}
                        </option>
                    ))}
                </select>
            </div>
            <div className='mb-[2.5%]'>
                <p className='mt-[1.5%] mb-[0.3%] mr-[1%] font-semibold'>Amount Paid</p>
                <input type="number" 
                  className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'
                  name="total_expense"
                  step=".01"
                  value={payment[0]?.total_expense}
                  onChange={(e)=>handlePaymentChange(e)}
                />
            </div>
          </div>
          <div className='w-[33%]'>
          <div className='mb-[2.5%]'>
                <p className='mt-[1.5%] mb-[0.3%] mr-[1%] font-semibold'>Time Start</p>
                <input type="time" 
                  className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'
                  name="res_time"
                  value={record[0]?.res_time}
                  onChange={(e)=>handleRecordChange(e)}
                />
            </div>
            <div className='mb-[2.5%]'>
                <p className='mt-[1.5%] mb-[0.3%] mr-[1%] font-semibold'>Location</p>
                <input type="text" 
                  className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'
                  name="res_location"
                  value={record[0]?.res_location}
                  onChange={(e)=>handleRecordChange(e)}
                />
            </div>
            <div className='mb-[2.5%]'>
                <p className='mt-[1.5%] mb-[0.3%] mr-[1%] font-semibold'>Balance</p>
                <input type="number" 
                  className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'
                  name="balance"
                  step=".01"
                  value={payment[0]?.balance}
                  onChange={(e)=>handlePaymentChange(e)}
                />
            </div>
          </div>
          <div className='w-[33%]'>
          <div className='mb-[2.5%]'>
                <p className='mt-[1.5%] mb-[0.3%] mr-[1%] font-semibold'>Event Size</p>
                <input type="number"
                  className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'
                  name="party_size"
                  value={record[0]?.party_size}
                  onChange={(e)=>handleRecordChange(e)}
                />
            </div>
            <div className='mb-[2.5%]'>
                <p className='mt-[1.5%] mb-[0.3%] mr-[1%] font-semibold'>Contact Number</p>
                <input type="text" 
                  className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'
                  value={contact}
                  onChange={(e)=>setContact(e.target.value)}
                />
            </div>
            <div className='mb-[2.5%]'>
                <p className='mt-[1.5%] mb-[0.3%] mr-[1%] font-semibold'>Payment Status</p>
                <select 
                    className='border w-[70%] border-gray-500 pl-[1%] rounded-lg text-[0.9em]'
                    name="payment_status"
                    value={payment[0]?.payment_status}
                    onChange={(e)=>handlePaymentChange(e)}>
                    <option value="PENDING">Pending</option>
                    <option value="FULLY PAID">Fully Paid</option>
                </select>
            </div>
          </div>
        </div>
        <div className='flex ml-[4%] text-[1.2em] xl:max-2xl:text-[0.8em]'>
            <div className='mb-[2.5%] w-full'>
                    <p className='mt-[1.5%] mb-[0.3%] mr-[1%]'>Additional Details</p>
                    <input type="text" 
                      name="additional_details"
                      className='border border-gray-500 w-[92.9%] pl-[1%] rounded-lg text-[0.9em]'
                      value={record[0]?.additional_details || ''}
                      onChange={(e)=>handleRecordChange(e)}/>
            </div>
        </div>
        {/* Inventory */}
        <h1 className='font-bold uppercase text-[1.5em] ml-[4%] bg-[#840705] inline-block text-white px-[1%] mt-[2%] rounded-lg mb-[0.5%] xl:max-2xl:text-[1.0em]'>Inventory</h1>
        <div className='flex ml-[4%] text-[1.2em] w-full xl:max-2xl:text-[0.8em]'>
          <div className='w-[50%]'>
            <div className='mb-[2.5%]'>
                <p className='mt-[1.5%] mb-[0.3%] mr-[1%]'>No. of Tables</p>
                <input type="number" 
                  name="no_of_tables"
                  value={inventory[0]?.no_of_tables}
                  onChange={(e)=>handleInventoryChange(e)}
                  className='border border-gray-500 w-[80%] pl-[1%] rounded-lg text-[0.9em]'
                />
            </div>
            <div className='mb-[2.5%]'>
                <p className='mt-[1.5%] mb-[0.3%] mr-[1%]'>No. of Chairs</p>
                <input type="number" 
                  name="no_of_chairs"
                  value={inventory[0]?.no_of_chairs}
                  onChange={(e)=>handleInventoryChange(e)}
                  className='border border-gray-500 w-[80%] pl-[1%] rounded-lg text-[0.9em]'
                />
            </div>
            <div className='mb-[2.5%]'>
                <p className='mt-[1.5%] mb-[0.3%] mr-[1%]'>No. of Plates</p>
                <input type="number" 
                  name="no_of_plates"
                  value={inventory[0]?.no_of_plates}
                  onChange={(e)=>handleInventoryChange(e)}
                  className='border border-gray-500 w-[80%] pl-[1%] rounded-lg text-[0.9em]'
                />
            </div>
          </div>
          <div className='w-[50%]'>
          <div className='mb-[2.5%]'>
                <p className='mt-[1.5%] mb-[0.3%] mr-[1%]'>No. of Glasses</p>
                <input type="number" 
                  name="no_of_glasses"
                  value={inventory[0]?.no_of_glasses}
                  onChange={(e)=>handleInventoryChange(e)}
                  className='border border-gray-500 w-[80%] pl-[1%] rounded-lg text-[0.9em]'
                />
            </div>
            <div className='mb-[2.5%]'>
                <p className='mt-[1.5%] mb-[0.3%] mr-[1%]'>No. of Table Cloths</p>
                <input type="number" 
                  name="no_of_tableCloths"
                  value={inventory[0]?.no_of_tableCloths}
                  onChange={(e)=>handleInventoryChange(e)}
                  className='border border-gray-500 w-[80%] pl-[1%] rounded-lg text-[0.9em]'
                />
            </div>
            <div className='mb-[2.5%]'>
                <p className='mt-[1.5%] mb-[0.3%] mr-[1%]'>No. of Chair Covers</p>
                <input type="number" 
                  name="no_of_chairCovers"
                  value={inventory[0]?.no_of_chairCovers}
                  onChange={(e)=>handleInventoryChange(e)}
                  className='border border-gray-500 w-[80%] pl-[1%] rounded-lg text-[0.9em]'
                />
            </div>
          </div>
        </div>  

        {/* Additional Details */}
        <h1 className='font-bold uppercase text-[1.5em] ml-[4%] bg-[#840705] inline-block text-white px-[1%] mt-[2%] rounded-lg mb-[0.5%] xl:max-2xl:text-[1.0em]'>Additional Details</h1>
        <div className='flex ml-[4%] mr-[2%] text-[1.2em] xl:max-2xl:text-[0.8em]'>
        <h1 className='font-medium text-[1.4em] italic'>Coming Soon</h1>
          {/* <div className='w-[33%]'>
            <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
            <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
          </div>
          <div className='w-[33%]'>
          <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
            <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
          </div>
          <div className='w-[33%]'>
          <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
            <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
          </div> */}
        </div>  

        <div className='relative bottom-[2%] top-[2%] mb-[2%] w-[100%]'>
          <hr className=' w-[100%] h-[1px] bg-black border-0'/>       
          <div className='flex justify-end mr-[3%] mt-[1%]'>
            <button className='flex text-white text-[1.1em] bg-[#17A200] px-[2%] py-[0.5%] rounded-2xl xl:max-2xl:text-[0.8em]
            hover:bg-[#117600]'
            onClick={updateRecord}
            >
              {loading 
              ?
              <Spinner/>
              :
              <AiFillSave className='mt-[2%] text-[1.2em] mr-[1%]'/>
              }
              Save</button>
            
          </div>
        </div>

        </>
        }
    </div>
  )
}

export default EditModal