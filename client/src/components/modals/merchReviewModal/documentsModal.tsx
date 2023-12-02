import React, { useEffect, useState } from 'react'
import GenSpinner from '../../loaders/genSpinner';
import { AiFillCloseCircle } from 'react-icons/ai';
import { IoDocumentAttach } from "react-icons/io5";
import { PiUserSquareDuotone } from "react-icons/pi";
import { FaDownload } from "react-icons/fa";
import axios from 'axios';
import config from '../../../common/config';

const DocumentsModal = (props: { setOpenDocModal: any; }) => {
    const [isLoading,setIsLoading] = useState(false);
    const [merchRec,setMerchRec] = useState<any>({})

    const [notif,setNotif] = useState('');
    const [color,setColor] = useState('');

    const {setOpenDocModal} = props;
    const merchRet = sessionStorage.getItem('merchTeam_id')
    const merchID = Number(merchRet);
  
    useEffect(() => {
      const timer = setTimeout(() => {getEmpDeets();}, 500);
      return () => clearTimeout(timer);
    }, []);
  
    const getEmpDeets = () => {
      setIsLoading(false);
      axios.get(`${config.API}/merchant/retrieve?col=merchant_id&val=${merchID}`)
      .then(async (res)=>{
         if(res.data.success === true){

          const approvedAccounts: Record<string, any> = Object.fromEntries(
            Object.entries(res.data?.accounts)
              .filter(([key, account]: [string, any]) => {
                //console.log("Account:", account);
                return account.status === "Approved";
              })
          );

          const numbers = Object.keys(approvedAccounts);

          const recordPromises = numbers.map(async (userId) => {
            const id = Number(userId)
            console.log("ID Account: ",id);
            const record = await getEmpInfo(id);
            console.log("Each Record: ",record);
            return record;
          });

          const empRecord = await Promise.all(recordPromises);
          console.log("Records: ",empRecord);

           setMerchRec(empRecord);
         }
      })
      setTimeout(()=>{setIsLoading(true)},2500);
    }
  
    const getEmpInfo = async (empID: number) => {
        try {
        const col = "account_id";
        const val = empID;
        setIsLoading(false);
    
        const response = await axios.get(`${config.API}/user/retrieve?col=${col}&val=${val}`);
    
        if (response.status === 200) {
        const user = response.data.users[0];
    
        if (user) {
            const parsedDate = new Date(user.date_signedup);
            const formattedDate = parsedDate.toLocaleDateString();
            const formattedTime = parsedDate.toLocaleTimeString();
            const date = formattedDate + ' ' + formattedTime;
            const name = user.account_name;
            const fileId = user.file_id ? user.file_id : 0;
    
            console.log("File ID:", fileId);
    
            if (fileId !== 0) {
            const file :any = await getFile(fileId);
            console.log("File:", file);
    
            const newRecord = {
                username: name,
                dateRegistered: date,
                fileName: file?.filename || '',
                fileURL: file?.url || '',
            };
    
            setIsLoading(true);
            return newRecord;
            }
        }
        }
        setIsLoading(true);
        return {};
    } catch (error) {
        setIsLoading(true);
        return {};
    }
    };

    const getFile = async (file_id: number) => {
        try {
            if (file_id !== 0 && file_id !== undefined) {
            const res = await axios.get(`${config.API}/file/retrieve?col=file_id&val=${file_id}`);
            
            console.log("Retrieve response:", res);
        
            if (res.data.success === true && res.data.filedata) {
                console.log(`${config.API}/file/fetch?pathfile=${encodeURIComponent(res.data.filedata.path)}`);
                const response = await axios.get(`${config.API}/file/fetch?pathfile=${encodeURIComponent(res.data.filedata.path)}`, {
                responseType: 'arraybuffer',
                });
        
                const url = URL.createObjectURL(new Blob([response.data]));
                console.log("URL: ", url);
                const file = {
                filename: res.data.filedata.filename,
                url: url
                }
                console.log("File In: ", file);
                return file;
            }
            }
        
            return null;
        } catch (error) {
            console.error('Error fetching file:', error);
            return null;
        }
    };
    
    return (
      <div className='bg-[rgba(0,0,0,0.6)] w-[100vw] h-[100vh] absolute top-0 left-0 duration-100 animate-fade-in overflow-hidden xs:max-sm:z-[1001] xs:max-sm:h-[110vh] z-[1000]'>
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
                  <IoDocumentAttach className='text-[3.5em] ml-[2%] mr-[1%] xs:max-sm:text-[2em] xl:max-2xl:text-[2em]'/>
                  <div>
                      <h1 className='font-bold text-[1.5em] xs:max-sm:text-[1.2em] xl:max-2xl:text-[1.2em]'>Proof of Employment</h1>   
                  </div>
              </div>
              <div className='mt-[2.8%] mr-[3%]'>
                  <AiFillCloseCircle className='text-[2.5em] hover:cursor-pointer xs:max-sm:text-[1.8em] xl:max-2xl:text-[1.8em]'
                   onClick={()=>{
                    setOpenDocModal(false);
                  }}/>
              </div>
          </div>
          <hr className='h-[2px] w-full mt-[1.2%] mb-[3%] bg-gray-200 border-0'/>
          
          <h1 className='font-bold uppercase text-[1.5em] ml-[5%] bg-[#840705] inline-block text-white px-[1%] rounded-lg mb-[0.5%] xs:max-sm:text-[1.1em] xs:max-sm:mt-[3%] xs:max-sm:mb-[1%] xl:max-2xl:text-[1.0em]'>
            Documents</h1>
            <table className="w-full mt-4 mx-[5%] overflow-y-auto">
            <thead>
                <tr>
                <th className="text-left w-[18%]">Username</th>
                <th className="text-left w-[28%]">Date Registered</th>
                <th className="text-left">Proof of Employment</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(merchRec)
                .map((data,i)=>(
                    <tr>
                        <td>{merchRec[data]?.username}</td>
                        <td>{merchRec[data]?.dateRegistered}</td>
                        <td>
                            <a
                                style={{
                                display: 'block',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                maxWidth: '348px', 
                                }}

                                className='text-blue-600 underline hover:cursor-pointer'
                                href={merchRec[data].fileURL}
                                download={merchRec[data].fileName}
                            >
                                {merchRec[data].fileName}
                            </a>
                        </td>
                    </tr>
                ))
                }
            </tbody>
            </table>

            <hr className='fixed bottom-[8%] w-[100%] h-[1px] bg-black border-0'/> 
          </>
        }
        </div>
      </div>
    )
  }

export default DocumentsModal