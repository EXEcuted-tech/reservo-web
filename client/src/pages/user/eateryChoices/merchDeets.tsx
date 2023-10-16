import React, { useEffect, useState } from 'react'
import Card from '../../../components/card/viewCard'
import Rating from '@mui/material/Rating';
import {GrLocation} from 'react-icons/gr'
import {AiOutlineFolderView, AiFillStar, AiOutlineArrowLeft} from 'react-icons/ai'
import {BsBookFill} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import CommentSec from './commentSec';
import RatingModal from '../../../components/modals/ratingModal/RatingModal';
import MerchDeetsLoad from '../../../components/loaders/merchDeetsLoad';
import axios from 'axios';
import config from '../../../common/config';

const MerchDeets = () =>{
    const [openRatingMod,setOpenRatingMod]= useState(false);
    return (
        <div>
            
            {openRatingMod && 
            <>
                <div className='fixed top-0 left-0 w-full h-full bg-[rgb(0,0,0,0.5)] opacity-0.5 z-[100] overscroll-none'></div>
                <RatingModal setOpenRatingMod={setOpenRatingMod} openRatingMod={openRatingMod}/>
            </>
            }
            <MerchDeetsBack setOpenRatingMod={setOpenRatingMod} openRatingMod={openRatingMod}/>
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

  return (
    <div className={`animate-fade-in font-poppins bg-[#F9F2EA] h-[100%] ${openRatingMod ? 'z-[-10]' : 'z-1'}`}>
       <div className='text-[#DD2803] ml-[2%]'>
         <h1 className='text-[2.5em] py-[1%] font-bold flex items-center'>
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
          <div className='flex w-[100%] h-[30vh]'>
            <div className='mt-[2%] ml-[3%]'>
                <img className='w-[262px] h-[219px] rounded-[50px]' src={merchantData?.logo || ''}/>
            </div>

            <div className='ml-[2%] mt-[2.5%] w-[80vw]'>
                <h1 className='font-bold text-[2em]'>{merchantData?.merchant_name}</h1>
                <div className='flex'>
                {/* Left Side */}
                    <div>
                        <div className='flex mt-[0.5%]'>
                            <Rating value={avg} readOnly />
                            <p className='ml-[1%]'>({ratingCount} Reviews)</p>
                        </div>
                        <div className='flex items-center mt-[1%] text-[1.1em]'>
                            <GrLocation className='text-[1.3em] mr-[0.5%]'/>
                            {concAddress}
                        </div>
                        <div className='w-[50vw]'>
                            <p className='mt-[1%] text-[1.1em]'><span className='font-bold mr-[0.5%]'>Description:</span>
                            {merchantData?.settings ? merchantData?.settings?.description : "Coming Soon!"}</p>
                        </div>
                        <div className='w-[30vw]'>
                        <p className='mt-[2%] text-[1.1em]'>
                            <span className='font-bold mr-[0.8%]'>Tags:</span>
                            {merchantData?.settings?.tags.map((tag:string, index:number) => (
                                <span key={index} 
                                 className='rounded-3xl bg-[#D9EFFF] border border-[#06F] text-[#06F] ml-[0.5%] mr-[1.5%]
                                            text-[0.9em] py-[0.5%] px-[1%]'>
                                    {tag}
                                </span>
                            ))}
                        </p>
                    </div>
                    </div>

                    <div className='flex flex-col relative justify-start mt-[-2.5%] mr-[2%] ml-[22%] w-[100%] z-[50]'>
                        <button className='w-[100%] flex items-center justify-center text-black bg-[#f8c93f] mb-[4%] px-[3%] 
                            py-[4%] rounded-3xl hover:bg-[#ffd950] font-medium text-[1.3em] transition-colors delay-250 duration-[3000] ease-in'
                            onClick={()=>{
                                navigate('/eaterychoice/book');
                                if (typeof merchIdString === 'string') {
                                    sessionStorage.setItem('merch_idtoBook', merchIdString);
                                }
                            }}>
                            <BsBookFill className='text-center text-[1em] mr-[2%]'/>Book Now
                        </button>
                        <button className='w-[100%] flex items-center justify-center text-white bg-[#FF8A00] px-[3%] py-[4%] z-[50] rounded-3xl
                            hover:bg-[#df9148] hover:text-black font-medium text-[1.3em] transition-colors delay-250 duration-[3000] ease-in'
                            onClick={()=>{
                                setOpenRatingMod(true)
                                if (typeof merchIdString === 'string') {
                                    sessionStorage.setItem('merch_idtoRate', merchIdString);
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
            <h1 className='text-[2em] font-bold'>MENU AND PACKAGES</h1>
            <p className='text-[1.1em]'><span className='font-bold mr-[0.5%]'>Price Range:</span>{"₱ "+minPrice+" - "+"₱ "+maxPrice}</p>
            <div className='PublishedPackages mt-[-2%]'>
            <div className="PackageGallery flex flex-row  overflow-x-scroll overflow-y-hidden h-[60vh] mx-20 p-8 rounded-xl">
                
             {packages.map((packageItem)=>(
                <Card
                  key={packageItem.package_id}
                  package_id={packageItem.package_id}
                  packageName={packageItem.package_name}
                  date_start={new Date(packageItem.date_start)}
                  date_end={new Date(packageItem.date_end)}
                  description={packageItem.package_desc}
                  price={packageItem.price} 
                  tags={packageItem.tags ? (packageItem.tags as any).split(',').map((tag: string) => tag.trim()) : []} // Handle empty or null tags
                  visibility={packageItem.visibility}
                  items={packageItem.item_list ? (packageItem.item_list as any).split(',').map((item: string) => item.trim()) : []} // Handle empty or null item_list
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
                <h1 className='text-[2em] font-bold'>CUSTOMER REVIEWS</h1>
                <p className='text-[1.1em]'><span className='font-bold mr-[0.5%]'>Average Rating:</span>{avg}</p>
                <p className='text-[1.1em]'><span className='font-bold mr-[0.5%]'>Total Reviews:</span>{ratingCount} Total</p>
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