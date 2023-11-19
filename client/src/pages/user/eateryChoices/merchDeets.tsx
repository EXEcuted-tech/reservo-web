import React, { useEffect, useState } from 'react'
import Card from '../../../components/card/viewCard.tsx'
import Rating from '@mui/material/Rating';
import {GrLocation} from 'react-icons/gr'
import {AiOutlineFolderView, AiFillStar, AiOutlineArrowLeft} from 'react-icons/ai'
import {BsBookFill, BsExclamationCircle} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import CommentSec from './commentSec.tsx';
import RatingModal from '../../../components/modals/ratingModal/RatingModal';
import MerchDeetsLoad from '../../../components/loaders/merchDeetsLoad.tsx';
import axios from 'axios';
import config from '../../../common/config.ts';
import UserNotification from '../../../components/alerts/UserNotification.tsx';

const MerchDeets = () =>{
    const [openRatingMod,setOpenRatingMod]= useState(false);
    const [notif,setNotif] = useState(false);

    const triggerNotification = () =>{
        setTimeout(() => {
          setNotif(true);
          
          setTimeout(() => {
            setNotif(false);
          }, 5000); 
        }, 500);
      }
    return (
        <div>
            {notif &&
            <UserNotification
                icon={<BsExclamationCircle/>}
                logocolor='#ff0000'
                title="You are not authorized to do this action!"
                message="Log in or create an account first in order to access our features."
            />
            }
            {openRatingMod && 
            <>
                <div className='fixed top-0 left-0 w-full h-full bg-[rgb(0,0,0,0.5)] opacity-0.5 z-[100] overscroll-none'></div>
                <RatingModal setOpenRatingMod={setOpenRatingMod} openRatingMod={openRatingMod}/>
            </>
            }
            <MerchDeetsBack setOpenRatingMod={setOpenRatingMod} openRatingMod={openRatingMod} trigger={triggerNotification}/>
        </div>
    )
}

const MerchDeetsBack: React.FC<MerchDeetsBackProps> = (props) => {
    const { setOpenRatingMod, openRatingMod} = props;
    const [isLoading,setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [concAddress,setConcAddress] = useState("");
    const [minPrice,setMinPrice] = useState(0);
    const [maxPrice,setMaxPrice] = useState(0);
    const [ratingCount,setRatingCount] = useState(0);
    const [avg,setAvg] = useState(0);
    const [merchantData, setMerchantData] = useState<MerchCardProps | null>(null);
    const [feedback, setFeedback] = useState<Feedback[]>([]);
    const [packages, setPackages] = useState<PackageItem[]>([]);
    const merchIdString = sessionStorage.getItem('merch_idtoView');
    const merchantId = merchIdString !== null ? parseInt(merchIdString) : 0;
    const storedAcc = localStorage.getItem('userDetails');

    useEffect(() => {
        retrieveMerchant();
      }, []); 

    useEffect(() => {
        if (merchantData) {
            const address = (
                (merchantData.address?.barangay ? `${merchantData.address.barangay}, ` : '') +
                (merchantData.address?.municipality ? `${merchantData.address.municipality}, ` : '') +
                (merchantData.address?.province ? `${merchantData.address.province}, ` : '') +
                (merchantData.address?.country ? merchantData.address.country : '')
            );
            setConcAddress(address);
            retrieveRatingCount();
            retrieveRatingAvg();
            retrievePriceRange();
            retrieveFeedbacks();
            fetchData();
            setTimeout(()=>{setIsLoading(true)},2200);
        }
    }, [merchantData]); 

    const fetchData = async () =>{
        const publishedPackages = await fetchPublishedPackages();
        setPackages(publishedPackages)
    }

  const retrieveMerchant = async () =>{
    const col = "merchant_id";
    const val = merchantId;

    setIsLoading(false);
    await axios.get(`${config.API}/merchant/retrieve?col=${col}&val=${val}`)
    .then((res)=>{
        if(res.data.success == true){
            const merchant = res.data.merchant;

            const merchCard: MerchCardProps ={
                merchant_id: merchant.merchant_id,
                merchant_name: merchant.merchant_name,
                email_address: merchant.email_address,
                logo: merchant.logo,
                contact_number: merchant.contact_number,
                address: res.data.address,
                settings: res.data.settings,
                sched_id: merchant.sched_id,
                accounts: res.data.settings
            };
          setMerchantData(merchCard);
        }
      }).catch((err)=>{
          setIsLoading(false);
      });
  }

  const retrievePriceRange = async () =>{
    const merchId = merchantData?.merchant_id;
    await axios.get(`${config.API}/package/retrieve_price?merch_id=${merchId}`)
    .then((res)=>{
       if(res.data.success === true){
        setMinPrice(res.data.minPrice);
        setMaxPrice(res.data.maxPrice);
       }
    })
  }

  const retrieveRatingCount = async () =>{
    const col = "merchant_id" 
    const val = merchantData?.merchant_id;
    await axios.get(`${config.API}/feedback/retrieve_count?col=${col}&val=${val}`)
    .then((res)=>{
       if(res.data.success === true){
        setRatingCount(res.data.ratingCount)
       }
    })
  }

  const retrieveRatingAvg = async () =>{
    const merchId = merchantData?.merchant_id;
    await axios.get(`${config.API}/feedback/retrieve_avg?merch_id=${merchId}`)
    .then((res)=>{
       if(res.data.success === true){
        setAvg(res.data.average);
       }
    })
  }

  const retrieveFeedbacks = async () =>{
    const col = "merchant_id"
    const val = merchantData?.merchant_id;
    await axios.get(`${config.API}/feedback/retrieve?col=${col}&val=${val}`)
    .then((res)=>{
        if(res.data.success == true){
            setFeedback(res.data.records);
        }
    })
  }

  const fetchPublishedPackages = async () => {
    try {
      const response = await axios.get(`${config.API}/package/retrieveparams`, {
        params: {
          col1: 'merchant_id',
          val1: merchantData?.merchant_id, // Replace with the actual merchant ID
          col2: 'visibility',
          val2: 'PUBLISHED',
        },
      });
  
      return response.data.data;
    } catch (error) {
      console.error('Error fetching published packages:', error);
      return [];
    }
  };

  const parseTags = (tags:string) =>{
    const parsed = JSON.parse(tags);
    const retval = parsed.tags;
    return retval;
  }

  const parseItems = (items:string) =>{
    const parsed = JSON.parse(items);
    const retval = parsed.items
    return retval;
  }

  return (
    <div className={`animate-fade-in font-poppins bg-[#F9F2EA] h-[100%] overflow-x-hidden ${openRatingMod ? 'z-[-10]' : 'z-1'}`}>
       <div className='text-[#DD2803] ml-[2%]'>
         <h1 className='text-[2.5em] py-[1%] font-bold flex items-center xs:max-2xl:text-[1.6em] xl:max-2xl:py-[0.5%] xl:max-2xl:text-[1.7em] xl:max-2xl:py-[0.5%]'>
            <AiOutlineArrowLeft className='text-black mr-[1%] hover:text-[#DD2803]'
            onClick={()=>{navigate('/eaterychoice')}}/>
            Merchant Details
        </h1>
       </div>

        {!isLoading
        ?
            <MerchDeetsLoad/>
        :
       <div className='bg-white h-[100%]'>

          {/* 1st Row of white container */}
          <div className='flex w-[100%] h-[30vh] xs:max-sm:h-[40vh] xs:max-sm:mb-[10%] xl:max-2xl:h-[35vh]'>
            <div className='mt-[2%] ml-[3%]'>
                <img className='w-[262px] h-[219px] rounded-[50px] xs:max-sm:w-[300px] xs:max-sm:h-[100px] xs:max-sm:mt-[5%] xl:max-2xl:w-[180px] xl:max-2xl:h-[150px]' src={merchantData?.logo || ''}/>
            </div>

            <div className='ml-[2%] mt-[2.5%] w-[80vw] xs:max-sm:w-[65vw]'>
                <h1 className='font-bold text-[2em] xs:max-sm:text-[1.7em] xl:max-2xl:text-[1.5em]'>{merchantData?.merchant_name}</h1>
                <div className='flex xs:max-sm:w-[100%]'>
                {/* Left Side */}
                    <div className='xs:max-sm:w-[100%]'>
                        <div className='flex ml-[2vh]'>
                            <Rating value={avg} className="xs:max-sm:ml-[-5%] xs:max-sm:mr-[-8%] xl:max-2xl:scale-[0.70] xl:max-2xl:ml-[-3%]" readOnly />
                            <p className='ml-[1%] xs:max-sm:text-[0.8em] xs:max-sm:pt-1 xs:max-2xl:sm-[-2%] xs:max-2xl:ml-[10%] xl:max-2xl:text-[0.8em] xl:max-2xl:pt-1 xl:max-2xl:ml-[-2%]'>({ratingCount} Reviews)</p>
                        </div>
                        <div className='flex items-center mt-[1%] text-[1.1em] xs:max-sm:text-[0.8em] xs:max-sm:w-[90%] xl:max-2xl:text-[0.8em]'>
                            <GrLocation className='text-[1.3em] mr-[0.5%] xs:max-sm:mt-0 xl:max-2xl:text-[1em]'/>
                            {concAddress}
                        </div>
                        <div className='w-[50vw]'>
                            <p className='mt-[1%] text-[1.1em] xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.8em]'><span className='font-bold mr-[0.5%]'>Description:</span>
                            {merchantData?.settings ? merchantData?.settings?.description : "Coming Soon!"}</p>
                        </div>
                        <div className='w-[30vw] xs:max-sm:w-[65vw]'>
                        <p className='mt-[2%] text-[1.1em] xs:max-sm:text-[1em] xl:max-2xl:text-[0.8em]'>
                            <span className='font-bold mr-[0.8%]'>Tags:</span>
                            {merchantData?.settings?.tags.map((tag:string, index:number) => (
                                <span key={index} 
                                 className='rounded-3xl bg-[#D9EFFF] border border-[#06F] text-[#06F] ml-[0.5%] mr-[1.5%]
                                            text-[0.9em] py-[0.5%] px-[1%] xs:max-sm:mx-[1%] xl:max-2xl:mx-[1%]'>
                                    {tag}
                                </span>
                            ))}
                        </p>
                    </div>
                    {/* For Mobile Responsiveness */}
                    <div className='flex flex-row relative justify-start mt-[5%] mr-[2%] ml-[-5%] w-[100%] z-[50] invisible xs:max-sm:visible'>
                        <button className='w-[100%] flex items-center justify-center text-black bg-[#f8c93f] mb-[4%] px-[1%] 
                            py-[2%] rounded-3xl hover:bg-[#ffd950] font-medium text-[1.0em] transition-colors delay-250 duration-[3000] ease-in xl:max-2xl:text-[0.9em] xl:max-2xl:h-[2.5rem]'
                            onClick={()=>{
                                navigate('/eaterychoice/book');
                                if (typeof merchIdString === 'string') {
                                    sessionStorage.setItem('merch_idtoBook', merchIdString);
                                }
                            }}>
                            <BsBookFill className='text-center text-[1em] mr-[2%]'/>Book Now
                        </button>
                        <button className='w-[100%] h-[2.25em] flex items-center justify-center text-white bg-[#FF8A00] px-[1%] z-[50] rounded-3xl
                            hover:bg-[#df9148] hover:text-black font-medium text-[1.0em] transition-colors delay-250 duration-[3000] ease-in xl:max-2xl:text-[0.9em] xl:max-2xl:h-[2.5rem]'
                            onClick={()=>{
                                setOpenRatingMod(true)
                                if (typeof merchIdString === 'string') {
                                    sessionStorage.setItem('merch_idtoRate', merchIdString);
                                }
                            }}>
                            <AiFillStar className='text-[1.5em] xs:max-sm:text-[1.3em]'/>Rate Here
                        </button>
                    </div>
                    </div>
                    {/* For PC Responsiveness*/}
                    <div className='flex flex-col relative justify-start mt-[-2.5%] mr-[2%] ml-[22%] w-[100%] z-[50] xs:max-sm:invisible'>
                        <button className='w-[100%] flex items-center justify-center text-black bg-[#f8c93f] mb-[4%] px-[3%] 
                            py-[4%] rounded-3xl hover:bg-[#ffd950] font-medium text-[1.3em] transition-colors delay-250 duration-[3000] ease-in xl:max-2xl:text-[0.9em] xl:max-2xl:h-[2.5rem]'
                            onClick={()=>{
                                if(storedAcc!=null){
                                    navigate('/eaterychoice/book');
                                    if (typeof merchIdString === 'string') {
                                        sessionStorage.setItem('merch_idtoBook', merchIdString);
                                    }
                                }else{
                                    props.trigger?.();
                                }
                            }}>
                            <BsBookFill className='text-center text-[1em] mr-[2%]'/>Book Now
                        </button>
                        <button className='w-[100%] flex items-center justify-center text-white bg-[#FF8A00] px-[3%] py-[4%] z-[50] rounded-3xl
                            hover:bg-[#df9148] hover:text-black font-medium text-[1.3em] transition-colors delay-250 duration-[3000] ease-in xl:max-2xl:text-[0.9em] xl:max-2xl:h-[2.5rem]'
                            onClick={()=>{
                                if(storedAcc!=null){
                                    setOpenRatingMod(true)
                                    if (typeof merchIdString === 'string') {
                                        sessionStorage.setItem('merch_idtoRate', merchIdString);
                                    }
                                }else{
                                    props.trigger?.();
                                }
                            }}>
                            <AiFillStar className='text-[1.5em]'/>Rate Here
                        </button>
                    </div>
                </div>
            </div>
          </div>

          <hr className='h-[10px] mx-[3%]'/>
          {/* 2nd Row of white container */}
          <div className='ml-[3%]'>
            <h1 className='text-[2em] font-bold xl:max-2xl:text-[1.3em]'>MENU AND PACKAGES</h1>
            <p className='text-[1.1em] xl:max-2xl:text-[0.8em]'><span className='font-bold mr-[0.5%]'>Price Range:</span>{"₱ "+minPrice+" - "+"₱ "+maxPrice}</p>
            <div className='PublishedPackages mt-[-2%]'>
            <div className="PackageGallery flex flex-row overflow-x-scroll overflow-y-hidden h-[60vh] mx-20 p-8 rounded-xl xs:max-sm:flex-col xs:max-sm:overflow-y-scroll xs:max-sm:overscroll-x-hidden xs:max-sm:mx-10 xs:max-sm:my-10 xs:max-sm:w-[80%] xl:max-2xl:h-[66vh]">
                
             {packages.map((packageItem)=>(
                <Card
                  key={packageItem.package_id}
                  package_id={packageItem.package_id}
                  packageName={packageItem.package_name}
                  date_start={new Date(packageItem.date_start)}
                  date_end={new Date(packageItem.date_end)}
                  description={packageItem.package_desc}
                  price={packageItem.price} 
                  tags={parseTags(packageItem.tags)} // Handle empty or null tags
                  visibility={packageItem.visibility}
                  items={parseItems(packageItem.item_list)} // Handle empty or null item_list
                  filePath={packageItem.image_filepath}
                  oneButton={false} 
                  time_start={packageItem.time_start} 
                  time_end={packageItem.time_end}                
                  />
                ))}
            </div> 
            </div>
          </div>

           {/* 3rd Row of white container */}
           <hr className='h-[10px] mx-[3%] mt-[1%]'/>
           <div className='ml-[3%]'>
                <h1 className='text-[2em] font-bold xl:max-2xl:text-[1.3em]'>CUSTOMER REVIEWS</h1>
                <p className='text-[1.1em] xl:max-2xl:text-[0.8em]'><span className='font-bold mr-[0.5%]'>Average Rating:</span>{avg} Stars</p>
                <p className='text-[1.1em] xl:max-2xl:text-[0.8em]'><span className='font-bold mr-[0.5%]'>Total Reviews:</span>{ratingCount} Total</p>
                <div className='max-h-[82vh] my-[1.1%] w-[85%] ml-[5%] overflow-auto'>
                {feedback.map((review,index)=>(
                    <div className={`my-[1%] ${openRatingMod ? 'opacity-0.5 z-[-1]' : 'z-1'}`} >
                        <CommentSec key={index} {...review}/>
                    </div>
                ))}
                </div>
           </div>   
        </div>   
        }     
    </div>
  )
}

export default MerchDeets