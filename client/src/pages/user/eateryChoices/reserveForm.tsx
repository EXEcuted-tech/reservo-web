import React, { useEffect, useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router'
import starleft from '../../../assets/starleft.png'
import starright from '../../../assets/starright.png'
import {SiFormstack, SiGoogleforms} from 'react-icons/si'
import axios from 'axios'
import config from '../../../common/config'
import DangerReserve from '../../../components/box/dangerReserve'
import { convertTime } from '../../../common/functions'
import Spinner from '@material-tailwind/react/components/Spinner'
import RatingModal from '../../../components/modals/ratingModal/RatingModal'

const ReserveForm = () => {
  const navigate = useNavigate();
  let payId = 0;
  let invId = 0;
  const [clickOne,setClickOne] = useState(false);
  const [clickTwo,setClickTwo] = useState(false);
  const [clickThree,setClickThree] = useState(false);
  const [clickFour,setClickFour] = useState(false);
  const [clickFive,setClickFive] = useState(false);
  const [clickSix,setClickSix] = useState(false);
  const [clickSeven,setClickSeven] = useState(false);
  const [clickEight,setClickEight] = useState(false);
  const [clickNine,setClickNine] = useState(false);

  const [date,setDate] = useState("");
  const [timestart,setTimeStart] = useState("");
  const [location,setLocation] = useState("");
  const [size,setSize] = useState(0);
  const [add,setAdd] = useState("");
  const [packId,setPackId] = useState(0);
  const [packages, setPackages] = useState<PackageItem[]>([]);

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [matchEmail,setMatchEmail] = useState("");
  const [payment,setPayment]=useState(0);
  const [userId,setUserId] = useState(0);
//   const [payId,setPayId] = useState(0);
//   const [invId,setInvId] = useState(0);

  const [errMess , setErrMess] = useState('');
  const [isLoading,setIsLoading] = useState(false);
  const [openRatingMod,setOpenRatingMod]= useState(false);
  const merchIdString = sessionStorage.getItem('merch_idtoBook');
  const merchantId = merchIdString !== null ? parseInt(merchIdString) : 0;
  const storedAcc = localStorage.getItem('userDetails');

  useEffect (()=>{
    retrieveMerchant();

    if(storedAcc){
        setMatchEmail(JSON.parse(storedAcc).email);
        setUserId(JSON.parse(storedAcc).userID);
    }
  },[])

  useEffect (()=>{
    fetchData();
  },[name])

  const fetchData = async () =>{
    const publishedPackages = await retrievePackage();
    setPackages(publishedPackages)
  }

  const retrieveMerchant = async () =>{
    const col = "merchant_id";
    const val = merchantId;

    await axios.get(`${config.API}/merchant/retrieve?col=${col}&val=${val}`)
    .then((res)=>{
        if(res.data.success == true){
            setName(res.data.merchant.merchant_name);
        }
      })
  }

  const retrievePackage = async () => {
    try {
        const response = await axios.get(`${config.API}/package/retrieveparams`, {
          params: {
            col1: 'merchant_id',
            val1: merchantId, 
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

  const createPayment = async () =>{
    await axios.post(`${config.API}/payment/create`, {
        balance: payment
    }).then((response) => {
        if(response.data.success == true){
             payId = response.data.data.insertId;
        }
    })

  }

  const createInventory = async () =>{
    await axios.post(`${config.API}/inventory/create`, {

    }).then((response) => {
        if(response.data.success == true){
            invId = response.data.data.insertId;
        }
    })

  }

  const submitReservation = async (event: { preventDefault: () => void }) =>{
    event.preventDefault();
    setIsLoading(true);
    if(date=='' || timestart=='' || location == '' || size==0 || email=='' || payment==0 || packId==0 ){
        setErrMess("Please fill in all the details.")
    }
    console.log("MERCHANT:",merchantId);

    if(email == matchEmail){
        await createPayment();
        await createInventory();
        const formattedTime = convertTime(timestart);
        console.log("CREATING PAYMENT:",payId);
        console.log("CREATING INVENTORY:",invId);
        await axios.post(`${config.API}/reserve/create`, {
            date: date,
            timestart: formattedTime,
            location: location,
            size: size,
            adddeets: add,
            acc_id: userId,
            merch_id: merchantId,
            pack_id: packId,
            pay_id: payId,
            invent_id:invId,
        }).then((response) => {
            if(response.data.success == true){
                setErrMess('');
                setTimeout(()=>{
                    setIsLoading(false);
                    setOpenRatingMod(true);
                },1000)
                
            }else{
                if(response.data.error.timestart){
                    setErrMess("Start time is required.");
                }else if(response.data.error.date){
                    setErrMess("Date is required.")
                }else if(response.data.error.location){
                    setErrMess("Location is required.")
                }else{
                    console.log(response.data.error);
                    setErrMess("Incorrect or missing details. Please double-check.")
                }
            }
        }).catch((error)=>{
            console.error(error);
        });
    }else{
        setErrMess("Account inputted is invalid. You should enter your own account details.")
    }
  }

  return (
    <div className=' animate-fade-in font-poppins bg-[#F9F2EA] h-[100%]'>

    {openRatingMod && 
        <>
            <div className='fixed top-0 left-0 w-full h-full bg-[rgb(0,0,0,0.5)] opacity-0.5 z-100'></div>
            <RatingModal setOpenRatingMod={setOpenRatingMod} openRatingMod={openRatingMod}/>
        </>
        }

       <div className='text-[#DD2803] ml-[2%]'>
         <h1 className='text-[2.5em] py-[1%] font-bold flex items-center'>
            <AiOutlineArrowLeft className='text-black mr-[1%] hover:text-[#DD2803]'
            onClick={()=>{
                window.history.back(); 
                // navigate('/eaterychoice')
            }}/>
            Reservation Form
        </h1>
       </div>
       <div className='bg-white py-[1.5%]'>
        <div className='flex justify-center items-center'>
                <img src={starleft}/>
                <h1 className='text-[2em] font-bold mx-[1%]'>{name}</h1>
                <img src={starright}/>
        </div>
        <p className='italic text-center text-[1.1em]'>Fill the form to book for {name}.</p>
            {errMess !='' && <DangerReserve message={errMess}/>}
       </div>
       <div className='flex items-center bg-[#840705] pl-[4%] py-[1%]'>
        <SiGoogleforms className='text-white text-[2.0em]'/>
        <h1 className='ml-[0.5%] text-[2.0em] text-white font-semibold'>GENERAL SECTION</h1>
       </div>
       {/* General Form */}
       <div className='bg-white'>

         {/* First Row */}
         <div className='flex px-[4%] py-[2%]'>
            <div className='w-[20%] pl-[0.5%] mr-[6%]'>
                {clickOne && <label className='animate-slide-up absolute mt-[-1%] text-[#838383]'>Date</label>}
                <input 
                className='text-[#B7B7B7] text-[1.1em] w-[100%] border-b-2 border-[#B7B7B7]
                mb-[3%] '
                type="text"
                placeholder='Date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
                onFocus={(e) => {
                    e.target.type = 'date';
                    e.target.style.outline = 'none';
                    setClickOne(true)
                }}
                />
            </div>

            <div className='w-[20%] pl-[0.5%] mr-[6%]'>
                {clickTwo && <label className='animate-slide-up absolute mt-[-1%] text-[#838383]'>Time Start</label>}
                <input 
                    className='text-[#B7B7B7] text-[1.1em] w-[100%] border-b-2 border-[#B7B7B7]
                    mb-[3%] pl-[0.5%] mr-[6%]'
                    type="text"
                    placeholder='Time Start'
                    value={timestart}
                    onChange={(e) => setTimeStart(e.target.value)}
                    onFocus={(e) => {
                        e.target.type = 'time';
                        e.target.style.outline = 'none';
                        setClickTwo(true)
                    }}
                />
            </div>

            <div className='w-[20%] pl-[0.5%] mr-[6%]'>
                {clickThree && <label className='animate-slide-up absolute mt-[-1%] text-[#838383]'>Time End</label>}
                <input 
                    className='text-[#B7B7B7] text-[1.1em] w-[100%] border-b-2 border-[#B7B7B7]
                    mb-[3%] pl-[0.5%] mr-[6%]'
                    type="text"
                    placeholder='Time End'
                    onFocus={(e) => {
                        e.target.type = 'time';
                        e.target.style.outline = 'none';
                        setClickThree(true)
                    }}
                />    
            </div>

            <div className='w-[20%] pl-[0.5%] mr-[3%]'>
                {clickFour && <label className='animate-slide-up absolute mt-[-1%] text-[#838383]'>Event Size</label>}
                <input 
                    className='text-[#B7B7B7] text-[1.1em] w-[100%] border-b-2 border-[#B7B7B7]
                    mb-[3%] pl-[0.5%]'
                    type="number"
                    placeholder='Event Size'
                    value={size === 0 ? "" : size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    onFocus={(e) => {
                        e.target.style.outline = 'none';
                        e.target.placeholder = '';
                        setClickFour(true)
                }}
            />    
            </div>
         </div>

          {/* Second Row */}
          <div className='flex px-[4%] py-[2%]'>
            <div className='w-[20%] pl-[0.5%] mr-[6%]'>
                {clickFive && <label className='animate-slide-up absolute mt-[-1%] text-[#838383]'>Package</label>}
                <select 
                    className='text-[#B7B7B7] text-[1.1em] w-[100%] border-b-2 border-[#B7B7B7]
                    mb-[3%] pl-[0.5%]'
                    value={packId}
                    onChange={(e) => setPackId(Number(e.target.value))}
                    placeholder='Package'
                    onFocus={(e) => {
                        e.target.style.outline = 'none';
                        setClickFive(true)
                    }}>
                    <option value="0" hidden>Package</option>
                    {packages.map((packageItem) => (
                        <option key={packageItem.package_id} value={packageItem.package_id}>
                            {packageItem.package_name}
                        </option>
                    ))}
                </select>
                
                
            </div>
            <div className='w-[20%] pl-[0.5%] mr-[6%]'>
                {clickSix && <label className='animate-slide-up absolute mt-[-1%] text-[#838383]'>Location</label>}
                <input 
                    className='text-[#B7B7B7] text-[1.1em] w-[100%] border-b-2 border-[#B7B7B7]
                    mb-[3%] pl-[0.5%]'
                    type="Text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder='Location'
                    onFocus={(e) => {
                        e.target.style.outline = 'none';
                        e.target.placeholder = '';
                        setClickSix(true)
                }}
            />    
            </div>
            <div className='w-[20%] pl-[0.5%] mr-[6%]'>
                {clickSeven && <label className='animate-slide-up absolute mt-[-1%] text-[#838383]'>Email Address</label>}
                <input 
                    className='text-[#B7B7B7] text-[1.1em] w-[100%] border-b-2 border-[#B7B7B7]
                    mb-[3%] pl-[0.5%]'
                    type="email"
                    placeholder='Email Address'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={(e) => {
                        e.target.style.outline = 'none';
                        e.target.placeholder = '';
                        setClickSeven(true)
                }}
            />    
            </div>
            <div className='w-[20%] pl-[0.5%] mr-[3%]'>
                {clickEight && <label className='animate-slide-up absolute mt-[-1%] text-[#838383]'>Amount Payment</label>}
                <input 
                    className='text-[#B7B7B7] text-[1.1em] w-[100%] border-b-2 border-[#B7B7B7]
                    mb-[3%] pl-[0.5%]'
                    type="number"
                    step=".01"
                    placeholder='Amount Payment'
                    value={payment === 0 ? "" : payment}
                    onChange={(e) => setPayment(Number(e.target.value))}
                    onFocus={(e) => {
                        e.target.style.outline = 'none';
                        e.target.placeholder = '';
                        setClickEight(true)
                }}
            />    
            </div>
         </div>

          {/* Third Row */}
          <div className='flex px-[4%] py-[2%]'>
            <div className='w-[100%] pl-[0.5%] mr-[3%]'>
                {clickNine && <label className='animate-slide-up absolute mt-[-1%] text-[#838383]'>Additional Requests</label>}
                <input 
                    className='text-[#B7B7B7] text-[1.1em] w-[100%] border-b-2 border-[#B7B7B7]
                    mb-[3%] pl-[0.5%]'
                    type="text"
                    placeholder='Additional Requests'
                    value={add}
                    onChange={(e) => setAdd(e.target.value)}
                    onFocus={(e) => {
                        e.target.style.outline = 'none';
                        e.target.placeholder = '';
                        setClickNine(true)
                }}
            />    
            </div>
         </div>

         
       </div>
       <div className='flex items-center bg-[#840705] pl-[4%] py-[1%]'>
            <SiFormstack className='text-white text-[2.0em]'/>
            <h1 className='ml-[0.5%] text-[2.0em] text-white font-semibold'>ADDITIONAL DETAILS</h1>
        </div>
        {/* Additional Form */}
        <div className='bg-white'>
            <div className='flex px-[4%] py-[2%]'>
                <p className='font-bold text-[2em]'>Coming Soon</p>
                {/* <div className='w-[20%] pl-[0.5%] mr-[3%]'>
                <label className='absolute mt-[-1%] text-[#838383]'>Number of Tables</label>
                    <input 
                        className='text-[#B7B7B7] text-[1.1em] w-[100%] border-b-2 border-[#B7B7B7]
                        mb-[3%] pl-[0.5%]'
                        type="text"
                        placeholder=''
                        onFocus={(e) => {
                            e.target.style.outline = 'none';
                    }}
                />    
                </div> */}
            </div>
        </div>

        <div className='bg-white text-center flex justify-center'>
            <button className='flex items-center justify-center w-[14%] bg-[#840705] text-white rounded-3xl py-[0.5%] mb-[2%] text-[1.3em]
                hover:bg-[#DD2803] transition-colors delay-250 duration-[3000] ease-in'
                onClick={(e)=>{
                    submitReservation(e)
                }}>
                    {isLoading && <Spinner className='mr-[1%]'/>}
                    Book Now</button>
        </div>
    </div>
  )
}

export default ReserveForm