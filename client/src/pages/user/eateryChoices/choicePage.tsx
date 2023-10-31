import React, { useEffect, useState } from 'react'
import colors from '../../../common/colors'
import MerchCard from './merchCard'
import SingleCard from '../../../components/loaders/singleLoad';
import MerchCardLoad from '../../../components/loaders/merchCardLoad';
import axios from 'axios';
import config from '../../../common/config';
import UserNotification from '../../../components/alerts/UserNotification';
import {BsExclamationCircle} from 'react-icons/bs'

const ChoicePage = () => {
  const [isLoading,setLoading] = useState(false);
  
  const [merchantData,setMerchantData]= useState<MerchCardProps[]>([]);
  const [notif,setNotif] = useState(false);

  useEffect(()=>{
    retrieveMerchants();
  },[])
  
  const retrieveMerchants = () =>{
    setLoading(false);
    axios.get(`${config.API}/merchant/retrieve_all`)
    .then((res)=>{
        if(res.data.success == true){
          const merchantMap = res.data.merchant;

          const merchCardPropsArray = merchantMap.map((merchant: MerchCardProps) => {
            let parsedAddress: Address | null = null;
            let parsedSettings: Record<string,any> | null = null;
            let parsedAccounts: Record<string,any> | null = null;
        
            if (typeof merchant.address === 'string') {
              parsedAddress = JSON.parse(merchant.address);
            }

            if (typeof merchant.accounts === 'string') {
              parsedAccounts = JSON.parse(merchant.accounts);
            }

            if (typeof merchant.settings === 'string') {
              parsedSettings = JSON.parse(merchant.settings);
            }
        
            return {
                merchant_id: merchant.merchant_id,
                merchant_name: merchant.merchant_name,
                email_address: merchant.email_address,
                logo: merchant.logo,
                contact_number: merchant.contact_number,
                address: parsedAddress,
                settings: parsedSettings,
                sched_id: merchant.sched_id,
                accounts: parsedAccounts
            };
          });
          setMerchantData(merchCardPropsArray);
          setTimeout(()=>{setLoading(true)},2500);
        }
      }).catch((err)=>{
          setLoading(false);
      });
  }

  const triggerNotification = () =>{
      setTimeout(()=>{
        setNotif(true);
      },1500)
      setNotif(false);
  }

  return (
    <div className={`font-poppins bg-[#F9F2EA] h-[80vh] animate-fade-in`}>
        {notif &&
          <UserNotification
            icon={<BsExclamationCircle/>}
            logocolor='#ff0000'
            title="You are not authorized to do this action!"
            message="Log in or create an account first in order to access our features."
          />
        }
        <div className='text-center text-[#DD2803]'>
          <h1 className='text-[2em] pt-[0.2%] font-bold xl:max-2xl:text-[1.5em]'>Browse. Select. Reserve.</h1>
          <p className='text-[1.2em] pb-[0.2%] xl:max-2xl:text-[0.9em]'>Choose and book for your favorite occasion!</p>
        </div>
        
        <div className='flex bg-white h-[75vh] rounded-t-[4rem]'>
          {/* 1st Row of white container */}
          <div className='w-[100%]'>
            <div className='text-center mt-[1.5%]'>
              <input type='text' 
                     className='w-[95%] h-[5vh] bg-[#EDEDED] pl-[1%] text-[1.2em] rounded-2xl xl:max-2xl:text-[0.8em]' 
                     placeholder="🔍 Search Restaurant or Food Business"
                     />
            </div>

            {!isLoading
            ?
             <>
              <SingleCard props1={'px-[3%] py-[1%] my-[2%]]'} props2={'h-[35px]'}/>
              <div className='overflow-y-scroll h-[57vh] z-10 w-full'>
                  {merchantData.map((merchant, index) => (
                    <div className='px-[2%]'>
                      <MerchCardLoad />
                      <hr className='pb-[1%] w-full'/>
                    </div>
                   
                  ))}
                </div>
             </>
            :
            <>
              <div className='flex justify-between w-[100%] mt-[0.8%] mb-[1.2%]'>
                <div className='w-[50%] ml-[3%] text-[#969696] xl:max-2xl:text-[0.8em]'>
                  Showing
                  <input
                    type='text'
                    defaultValue={2}
                    className='w-[2%] text-center border mx-[0.4%] border-slate-400'
                  />
                  out of {"5"} businesses
                </div>
                <div className='mr-[4%]'>
                  <select className='border border-slate-300 rounded-2xl px-[3%] text-[#969696] xl:max-2xl:text-[0.7em]'>
                    <option value='option1'>Sort by A-Z</option>
                    <option value='option2'>Sort by Z-A</option>
                  </select>
                </div>
              </div>
              
              {/* List of Merchants */}
              <div className='overflow-y-scroll h-[57vh] z-10 '>
                {merchantData.map((merchant, index) => (
                  <div className='px-[2%]'>
                    <MerchCard key={index} {...merchant} trigger={triggerNotification} />
                    <hr className='pb-[1%]'/>
                  </div>
                ))}
              </div>
            </>
            }
          </div>


          
        </div>        
    </div>
  )
}

export default ChoicePage