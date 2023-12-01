import React, { useEffect, useState } from 'react'
import GenSpinner from '../../loaders/genSpinner';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FaIdCard } from "react-icons/fa6";
import { PiUserSquareDuotone } from "react-icons/pi";
import { FaDownload } from "react-icons/fa";
import axios from 'axios';
import config from '../../../common/config';

const EmployeeModal = (props: { setOpenEmpModal: any; }) => {
    const [isLoading,setIsLoading] = useState(false);
    const [name,setName] = useState('')
    const [email,setEmail]=useState('')
    const [contactNo,setContactNo]=useState('')
    const [dateSigned,setDateSigned]=useState('')
    const [dp,setDp] = useState('')
    const [merchRec,setMerchRec] = useState<any>()

    const [notif,setNotif] = useState('');
    const [color,setColor] = useState('');

    const [fileID,setfileID] = useState();
    const [fileURL, setFileURL] = useState('');
    const [fileName,setFileName] =useState('')

    const {setOpenEmpModal} = props;
    const emp=sessionStorage.getItem('employee_idtoView');
    const merch=sessionStorage.getItem('company_id');
    const empID = Number(emp);
    const merchID = Number(merch);

    useEffect(() => {
      const timer = setTimeout(() => {getEmpInfo()}, 500);
      return () => clearTimeout(timer);
    }, []);
  
    useEffect(() => {
      const timer = setTimeout(() => {getMerchDeets();}, 500);
      return () => clearTimeout(timer);
    }, []);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        if (fileID !== undefined) {
          getFile(fileID);
        }
      }, 500);
  
      return () => clearTimeout(timer);
    }, [fileID]);
  
    const getMerchDeets = () => {
      setIsLoading(false);
      axios.get(`${config.API}/merchant/retrieve?col=merchant_id&val=${merchID}`)
      .then((res)=>{
         if(res.data.success === true){
          const accounts = res.data.accounts;
          let foundAccount:any;
          if (empID in accounts) {
            foundAccount = accounts[empID];
          } 
          //console.log("Found Acc: ",foundAccount);
            const newMerchRec = {
              company: res.data?.merchant?.merchant_name,
              position: foundAccount?.position,
              status: foundAccount?.status
            }

            setMerchRec(newMerchRec);
         }
      })
      setTimeout(()=>{setIsLoading(true)},2500);
    }
  
    const getEmpInfo = () => {
      const col = "account_id";
      const val = empID;
      setIsLoading(false);
      axios.get(`${config.API}/user/retrieve?col=${col}&val=${val}`)
      .then((res)=>{
         if(res.status === 200){
          const user = res.data.users[0];
          setfileID(user?.file_id ? user.file_id : 0);
          setName(user?.account_name);
          setEmail(user?.email_address);
          setContactNo(user?.contact_number);
          setDp(user?.profile_picture);
          const parsedDate = new Date(user?.date_signedup);
          const formattedDate = parsedDate.toLocaleDateString(); 
          const formattedTime = parsedDate.toLocaleTimeString(); 

          setDateSigned(formattedDate + ' ' + formattedTime);
         }
         setTimeout(()=>{setIsLoading(true)},2500);
      })
    }

    const getFile = async (file_id:number) => {
      try {
        if(file_id!=0 || file_id!=undefined){
          await axios.get(`${config.API}/file/retrieve?col=file_id&val=${file_id}`)
          .then(async (res)=>{
            console.log("Hellaur? ",res);
            if(res.data.success == true && res.data.filedata){
              setFileName(res.data.filedata.filename);
              console.log(`${config.API}/file/fetch?pathfile=${encodeURIComponent(res.data.filedata.path)}`);
              const response = await axios.get(`${config.API}/file/fetch?pathfile=${encodeURIComponent(res.data.filedata.path)}`, {
                responseType: 'arraybuffer',
              });
        
              const url = URL.createObjectURL(new Blob([response.data]));
              console.log("URL: ", url);
              setFileURL(url);
            }
          }).catch((err)=>{
            console.log("File ERr? ", err);
          })
        }
      } catch (error) {
        console.error('Error fetching file:', error);
      }
    };
    
    return (
      <div className='bg-[rgba(0,0,0,0.6)] w-[100vw] h-[100vh] absolute top-0 left-0 duration-100 animate-fade-in overflow-hidden xs:max-sm:z-[1001] xs:max-sm:h-[110vh]'>
      <div className="animate-slide-up font-poppins fixed top-[10%] left-[35%] right-0 bg-white z-[1001] bg-[rgba(0, 0, 0, 0.5)] w-[40%] overflow-x-hidden overflow-y-auto h-[70%] drop-shadow rounded-3xl xs:max-sm:w-[90%] xs:max-sm:left-[5%] xs:max-sm:z-[1001] xs:max-sm:top-[7%]">
        {!isLoading 
         ?
          <div className='flex justify-center ml-[-5%] mt-[43%]'>
            <GenSpinner/>
          </div>
        :
          <>
        <div className='flex w-full h-[8vh]'>
              <div className='flex items-center w-[96%] mt-[1.5%] ml-[2.3%]'>
                  <FaIdCard className='text-[3.5em] ml-[2%] mr-[1%] xs:max-sm:text-[2em] xl:max-2xl:text-[2em]'/>
                  <div>
                      <h1 className='font-bold text-[1.5em] xs:max-sm:text-[1.2em] xl:max-2xl:text-[1.2em]'>Employee Details</h1>   
                      <p className='mt-[-1%] text-[1.2em] xs:max-sm:text-[0.9em] xl:max-2xl:text-[0.9em]'>ID: {empID}</p>
                  </div>
              </div>
              <div className='mt-[2.8%] mr-[3%]'>
                  <AiFillCloseCircle className='text-[2.5em] hover:cursor-pointer xs:max-sm:text-[1.8em] xl:max-2xl:text-[1.8em]'
                   onClick={()=>{
                    sessionStorage.removeItem('employee_idtoView');
                    setOpenEmpModal(false)
                  }}/>
              </div>
          </div>
          <hr className='h-[2px] w-full mt-[1.2%] mb-[3%] bg-gray-200 border-0'/>
          
          <h1 className='font-bold uppercase text-[1.5em] ml-[5%] bg-[#840705] inline-block text-white px-[1%] rounded-lg mb-[0.5%] xs:max-sm:text-[1.1em] xs:max-sm:mt-[3%] xs:max-sm:mb-[1%] xl:max-2xl:text-[1.0em]'>
            Basic Information</h1>
          <div className='flex mx-[2%] mt-[1.5%] text-[1.2em] xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.8em]'>
            <div className='w-[30%] flex items-center justify-center'>
                {dp ?
                    <img src={dp} className="w-40 h-40 object-cover rounded-2xl" />
                :
                    <PiUserSquareDuotone className='w-[93%] h-[93%]'/>
                }
            </div>
            <div className='w-[70%]'>
              <p className='my-[1.5%]'>
                <span className='font-bold'>Name: </span>
                {name ? name : 'Data cannot be retrieved.'}
              </p>
              <p className='my-[1.5%]'>
                <span className='font-bold'>E-mail Address: </span>
                {email ? email : 'Data cannot be retrieved.'}
              </p>
              <p className='my-[1.5%]'>
                <span className='font-bold'>Contact Number: </span>
                {contactNo ? contactNo : 'Data cannot be retrieved.'}
              </p>
              <p className='my-[1.5%]'>
                <span className='font-bold'>Date Signed Up: </span>
                {dateSigned ? dateSigned : 'Data cannot be retrieved.'}
              </p>
              <p className='my-[1.5%]'>
                <span className='font-bold'>Account Status: </span>
                {merchRec.status=='Pending'
                 ?
                 <span className='px-[1%] py-[0.5%] text-[0.8em] text-[#CC7722] bg-[#FBEC5D] rounded-lg'>Pending</span>
                 :
                 <span className='px-[1%] py-[0.5%] text-[0.8em] text-[#005C29] bg-[#98FF98] rounded-lg'>Approved</span>
                }
              </p>
            </div>
          </div>
  
  
          <h1 className='font-bold uppercase text-[1.5em] ml-[5%] bg-[#840705] inline-block px-[1%] mt-[4%] text-white rounded-lg mb-[0.5%] xs:max-sm:text-[1.1em] xl:max-2xl:text-[1.0em]'>
            Merchant-Related Info</h1>
          <div className='flex mx-[5%] text-[1.2em] xs:max-sm:text-[0.8em] xs:max-sm:mb-[5%] xl:max-2xl:text-[0.8em]'>
            <div className='w-full xs:max-sm:w-[50%]'>
              <p className='my-[2.5%]'>
                <span className='font-bold'>Working For: </span>
                {merchRec.company ? merchRec.company : 'Data cannot be retrieved.'}
              </p>
            <p className='my-[2.5%]'>
                <span className='font-bold'>Position: </span>
                {merchRec.position ? merchRec.position : 'Data cannot be retrieved.'}
              </p>
              <p className={`my-[2.5%]`}>
                <span className='font-bold'>Proof of Employment: </span>
                <span className={`${!fileURL && 'italic text-gray-500'}`}> 
                  {fileURL 
                  ? 
                  <a className='text-white text-[0.8em] w-[24%] bg-blue-700 hover:bg-blue-800 focus:ring-4 
                  focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 
                  py-2.5 text-center justify-center ml-[1%] inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 
                  dark:focus:ring-blue-800'
                  href={fileURL} download={fileName}>
                      <FaDownload className='mr-[1%]'/> Download File
                  </a>
                  : 'No Proof Provided.'}
                </span>
              </p>
            </div>
          </div>
            <hr className='fixed bottom-[8%] w-[100%] h-[1px] bg-black border-0'/> 
          </>
        }
        </div>
      </div>
    )
  }

export default EmployeeModal