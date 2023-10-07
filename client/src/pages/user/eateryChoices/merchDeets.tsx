import React, { useEffect, useState } from 'react'
import Card from '../../../components/card/card'
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


/*Insertan panig back end para ma fully functional*/

const MerchDeets = () =>{
    const [openRatingMod,setOpenRatingMod]= useState(false);
    return (
        <div>
            
            {openRatingMod && 
            <>
                <div className='fixed top-0 left-0 w-full h-full bg-[rgb(0,0,0,0.5)] opacity-0.5 z-100'></div>
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
    const merchantId = sessionStorage.getItem('merch_idtoView');

  useEffect(() => {
    // const address = (
    //     (props.address?.barangay ? `${props.address.barangay}, ` : '') +
    //     (props.address?.municipality ? `${props.address.municipality}, ` : '') +
    //     (props.address?.province ? `${props.address.province}, ` : '') +
    //     (props.address?.country ? props.address.country : '')
    // );
    // setConcAddress(address);
    // retrievePriceRange();
    // retrieveRatingCount();
    // retrieveRatingAvg();
    console.log("ID: ",merchantId);
    retrieveMerchant();
  }, []); 

  const retrieveMerchant = () =>{
    const col = "merchant_id";
    const val = merchantId;

    setIsLoading(false);
    axios.get(`${config.API}/merchant/retrieve?col=${col}&val=${val}`)
    .then((res)=>{
        if(res.data.success == true){
            console.log("RESULT: ",res);
          const merchantMap = res.data.merchant;

        //   const merchCardProps: MerchCardProps ={
        //     merchant_id: merchant.merchant_id,
        //     merchant_name: merchant.merchant_name,
        //     email_address: merchant.email_address,
        //     logo: merchant.logo,
        //     contact_number: merchant.contact_number,
        //     address: parsedAddress,
        //     settings: parsedSettings,
        //     sched_id: merchant.sched_id,
        //     accounts: parsedAccounts
        // };

        //   setMerchantData(merchCardPropsArray);
        //   setTimeout(()=>{setLoading(true)},2500);
        }
      }).catch((err)=>{
          setIsLoading(false);
      });
  }

//   const retrievePriceRange = () =>{
//     const merchId = props.merchant_id;
//     axios.get(`${config.API}/package/retrieve_price?merch_id=${merchId}`)
//     .then((res)=>{
//        if(res.data.success === true){
//         setMinPrice(res.data.minPrice);
//         setMaxPrice(res.data.maxPrice);
//        }
//     }).catch((err)=>{

//     })
//   }

//   const retrieveRatingCount = () =>{
//     const col = "merchant_id" 
//     const val = props.merchant_id;
//     axios.get(`${config.API}/feedback/retrieve_count?col=${col}&val=${val}`)
//     .then((res)=>{
//        if(res.data.success === true){
//         setRatingCount(res.data.ratingCount)
//        }
//     })
//   }

//   const retrieveRatingAvg = () =>{
//     const merchId = props.merchant_id;
//     axios.get(`${config.API}/feedback/retrieve_avg?merch_id=${merchId}`)
//     .then((res)=>{
//        if(res.data.success === true){
//         setAvg(res.data.average);
//        }
//     })
//   }
  
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
                <img className='w-[262px] h-[219px] rounded-[50px]' src={"picture"}/>
            </div>

            <div className='ml-[2%] mt-[2.5%] w-[80vw]'>
                <h1 className='font-bold text-[2em]'>{"businessName"}</h1>
                <div className='flex'>
                {/* Left Side */}
                    <div>
                        <div className='flex mt-[0.5%]'>
                            <Rating className={`${openRatingMod ? 'z-[-1]' : 'z-1'}`} value={3} readOnly />
                            <p className='ml-[1%]'>({"reviewCount"} Reviews)</p>
                        </div>
                        <div className='flex items-center mt-[1%] text-[1.1em]'>
                            <GrLocation className='text-[1.3em] mr-[0.5%]'/>
                            {"location"}
                        </div>
                        <div className='w-[50vw]'>
                            <p className='mt-[1%] text-[1.1em]'><span className='font-bold mr-[0.5%]'>Description:</span>{"description"}</p>
                        </div>
                        <div className='w-[30vw]'>
                        <p className='mt-[2%] text-[1.1em]'>
                            <span className='font-bold mr-[0.5%]'>Tags:</span>
                            {/* {data.tags.map((tag:string, index:number) => (
                                <span key={index} 
                                 className='rounded-3xl bg-[#D9EFFF] border border-[#06F] text-[#06F] ml-[0.5%] mr-[1.5%]
                                            text-[0.9em] py-[0.5%] px-[1%]'>
                                    {tag}
                                </span>
                            ))} */}
                        </p>
                    </div>
                    </div>

                    <div className='flex flex-col relative justify-start mt-[-2.5%] mr-[2%] ml-[22%] w-[100%]'>
                        <button className='w-[100%] flex items-center justify-center text-black bg-[#f8c93f] mb-[4%] px-[3%] 
                            py-[4%] rounded-3xl hover:bg-[#ffd950] font-medium text-[1.3em] transition-colors delay-250 duration-[3000] ease-in'
                            onClick={()=>{navigate('/eaterychoice/book')}}>
                            <BsBookFill className='text-center text-[1em] mr-[2%]'/>Book Now
                        </button>
                        <button className='w-[100%] flex items-center justify-center text-white bg-[#FF8A00] px-[3%] py-[4%] rounded-3xl
                            hover:bg-[#df9148] hover:text-black font-medium text-[1.3em] transition-colors delay-250 duration-[3000] ease-in'
                            onClick={()=>{setOpenRatingMod(true)}}>
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
            <p className='text-[1.1em]'><span className='font-bold mr-[0.5%]'>Price Range:</span>{"priceRange"}</p>
            <div className='PublishedPackages mt-[-2%]'>
            <div className="PackageGallery flex flex-row  overflow-x-scroll overflow-y-hidden h-[60vh] mx-20 p-8 rounded-xl">
                {/* <Card
                  key={packageItem.package_id}
                  package_id={packageItem.package_id}
                  packageName={packageItem.package_name}
                  date_start={new Date(packageItem.date_start)}
                  date_end={new Date(packageItem.date_end)}
                  description={packageItem.package_desc} // Make sure to use the correct property name
                  price={packageItem.price} // Make sure to use the correct property name
                  tags={packageItem.tags ? (packageItem.tags as any).split(',').map((tag: string) => tag.trim()) : []} // Handle empty or null tags
                  visibility={packageItem.visibility}
                  items={packageItem.item_list ? (packageItem.item_list as any).split(',').map((item: string) => item.trim()) : []} // Handle empty or null item_list
                  filePath={packageItem.image_filepath}
                  oneButton={false} 
                  time_start={packageItem.time_start} 
                  time_end={packageItem.time_end}                
                  /> */}
            </div> 
            </div>
          </div>

           {/* 3rd Row of white container */}
           <hr className='h-[10px] mx-[3%] mt-[1%]'/>
           <div className='ml-[3%]'>
                <h1 className='text-[2em] font-bold'>CUSTOMER REVIEWS</h1>
                <p className='text-[1.1em]'><span className='font-bold mr-[0.5%]'>Average Rating:</span>4.5</p>
                <p className='text-[1.1em]'><span className='font-bold mr-[0.5%]'>Total Reviews:</span>5,021 Total</p>
                {/* {reviewData.map((review,index)=>(
                    <div className={`my-[1%] ${openRatingMod ? 'opacity-0.5 z-[-1]' : 'z-1'}`}>
                        <CommentSec key={index} {...review}/>
                    </div>
                ))} */}
           </div>   
        </div>   
        }     
    </div>
  )
}

export default MerchDeets