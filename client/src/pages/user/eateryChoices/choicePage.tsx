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
  const [searchQuery,setSearchQuery] = useState('');
  const [filter, setFilter] = useState('option1');

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
    setTimeout(() => {
      setNotif(true);
      
      setTimeout(() => {
        setNotif(false);
      }, 5000); 
    }, 500);
  }

  const HandleSearchQuery = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchQuery(e.target.value);
  }

  const HandleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const filteredMerchants = merchantData.filter((merchant) =>
    merchant.merchant_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedMerchants = [...filteredMerchants];

  if(filter === 'option1'){
    sortedMerchants.sort((a,b) => a.merchant_name.localeCompare(b.merchant_name));
  }
  else if(filter === 'option2'){
    sortedMerchants.sort((a,b) => b.merchant_name.localeCompare(a.merchant_name));
  }



  return (
    <div className={`font-poppins bg-[#F9F2EA] h-[80vh] animate-fade-in overscroll-y-none`}>
        {notif &&
          <UserNotification
            icon={<BsExclamationCircle/>}
            logocolor='#ff0000'
            title="You are not authorized to do this action!"
            message="Log in or create an account first in order to access our features."
          />
        }
        <div className='text-center text-[#DD2803] w-[100%]'>
          <h1 className='text-[2em] pt-[0.2%] font-bold xs:max-sm:text-[1em] xl:max-2xl:text-[1.5em]'>Browse. Select. Reserve.</h1>
          <p className='text-[1.2em] pb-[0.2%] xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.9em]'>Choose and book for your favorite occasion!</p>
        </div>
        
        <div className='flex bg-white h-[75vh] xs:max-sm:h-[70vh]'>
          {/* 1st Row of white container */}
          <div className='w-[100%] h-[80%]'>
            <div className='text-center mt-[1.5%]'>
              <input type='text' 
                     className='w-[95%] h-[5vh] bg-[#EDEDED] pl-[1%] text-[1.2em] rounded-2xl xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.8em]' 
                     placeholder="🔍 Search Restaurant or Food Business"
                     value={searchQuery}
                     onChange={HandleSearchQuery}
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
                <div className='w-[50%] ml-[3%] text-[#969696] xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.8em]'>
                  Showing
                  <input
                    type='text'
                    defaultValue={2}
                    className='w-[2%] text-center border mx-[0.4%] border-slate-400'
                  />
                  out of {"5"} businesses
                </div>
                <div className='mr-[4%]'>
                  <select className='border border-slate-300 rounded-2xl px-[3%] text-[#969696] xs:max-sm:text-[0.7em] xl:max-2xl:text-[0.7em]' value={filter} onChange={HandleFilter}>
                    <option value='option1'>Sort by A-Z</option>
                    <option value='option2'>Sort by Z-A</option>
                  </select>
                </div>
              </div>
              
              {/* List of Merchants */}
              <div className='overflow-y-scroll snap-y h-[100%] z-10'>
                {sortedMerchants.map((merchant, index) => (
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