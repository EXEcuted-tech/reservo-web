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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
  const [clickTen,setClickTen] = useState(false);
  const [clickEleven,setClickEleven] = useState(false);
  const [clickElevenTriggered, setClickElevenTriggered] = useState(false);

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
  const [firstList, setFirstList] = useState<
  Array<{
    label: string;
    type: string;
    value: string;
  }>
  >([]); 

  const [existingList, setExistingList] = useState<
  Array<{
    label: string;
    type: string;
    value: string;
  }>
  >([]); 

  const [unavailableDoW,setUnavailableDoW] = useState<any[]>([]);

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
            const list = res.data.formDeets?.form
            setFirstList(res.data.formDeets?.form)

            const newExistingList = list?.map((item:any) => ({
                label: item.label,
                type: item.type,
                value: '',
              }));
            
              setExistingList(newExistingList);
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

    if(email == matchEmail){
        await createPayment();
        await createInventory();
        const formattedTime = convertTime(timestart);
        const formattedDate = formatToYYYYMMDD(date);
        await axios.post(`${config.API}/reserve/create`, {
            date: formattedDate,
            timestart: formattedTime,
            location: location,
            size: size,
            settings: {additional_details: existingList},
            adddeets: add == '' ? null : add,
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

  function formatToYYYYMMDD(dateString: string | number | Date) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleAdditionalChange = ({ event, fieldIndex }: { event: any; fieldIndex: number }) =>{
    const modifiedList = existingList.map((item, index) => {
        return index === fieldIndex ? { ...item, value: event.target.value } : item;
      });
  
      setExistingList(modifiedList);
  }

//   const resetExistingList = () => {
//     const newExistingList = existingList.map((item) => ({
//       label: item.label,
//       type: item.type,
//       value: '',
//     }));
  
//     setExistingList(newExistingList);
//   };

    useEffect(() => {
        const timer = setTimeout(() => {getUnavailableDays()}, 500);
        return () => clearTimeout(timer);
    }, [name]);

const mapAbbreviatedToFull = (daysOfWeek: any[]) => {
    console.log("Hello?!",daysOfWeek);
    const dayMapping:any = {
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6,
      Sun: 7,
    };
  
    return daysOfWeek.map((abbreviatedDay) => dayMapping[abbreviatedDay]);
  };

const getUnavailableDays = () =>{
    axios.get(`${config.API}/merchantsched/retrieve?col=${merchantId}`)
    .then((res)=>{
        if(res.data.success==true){
            if (res.data.message[0]?.merchant_sched_settings) {
                const merchantSchedSettings = JSON.parse(res.data.message[0]?.merchant_sched_settings);
            
                if (merchantSchedSettings && merchantSchedSettings.merchsched.settings.cases) {
                    const newSettings = merchantSchedSettings.merchsched.settings;
                    const unavailableDoW = newSettings?.cases
                        .map((caseItem: { Unavailable_DoW: any }) => caseItem.Unavailable_DoW)
                        .flatMap((dayString: string) => dayString.split(',').map((day) => day.trim()));
            
                    console.log(unavailableDoW);
                    setUnavailableDoW(unavailableDoW);
                }
            } else {
                setUnavailableDoW([]);
            }
        }
    })
}

  const isDisabledDay = (date: { getDay: () => any }) => {
    const notAvailable = mapAbbreviatedToFull(unavailableDoW);
    console.log("Not Available:" , notAvailable);
    const dayOfWeek = date.getDay();
    return !notAvailable.includes(dayOfWeek);
  };

  return (
    <div className=' animate-fade-in font-poppins bg-[#F9F2EA] h-[100%]'>

    {openRatingMod && 
        <>
            <div className='fixed top-0 left-0 w-full h-full bg-[rgb(0,0,0,0.5)] opacity-0.5 z-[101]'></div>
            <RatingModal setOpenRatingMod={setOpenRatingMod} openRatingMod={openRatingMod}/>
        </>
        }

       <div className='text-[#DD2803] ml-[2%]'>
         <h1 className='text-[2.5em] py-[1%] font-bold flex items-center xs:max-sm:text-[1.7em] xs:max-sm:py-[0.5%] xl:max-2xl:text-[1.7em] xl:max-2xl:py-[0.5%]'>
            <AiOutlineArrowLeft className='text-black mr-[1%] hover:text-[#DD2803] '
            onClick={()=>{
                window.history.back(); 
                // navigate('/eaterychoice')
            }}/>
            Reservation Form
        </h1>
       </div>
       <div className='bg-white py-[1.5%]'>
        <div className='flex justify-center items-center'>
                <img src={starleft} className="xs:max-sm:w-[30px] xs:max-sm:h-[30px] xl:max-2xl:w-[40px] xl:max-2xl:h-[40px] "/>
                <h1 className='text-[2em] font-bold mx-[1%] xs:max-sm:text-[1.7em] xl:max-2xl:text-[1.7em]'>{name}</h1>
                <img src={starright} className="xs:max-sm:w-[30px] xs:max-sm:h-[30px] xl:max-2xl:w-[40px] xl:max-2xl:h-[40px]"/>
        </div>
        <p className='italic text-center text-[1.1em] xs:max-sm:text-[1em] xl:max-2xl:text-[0.8em]'>Fill the form to book for {name}.</p>
            {errMess !='' && <DangerReserve message={errMess}/>}
       </div>
       <div className='flex items-center bg-[#840705] pl-[4%] py-[1%] xs:max-sm:py-[0.5%] xl:max-2xl:py-[0.5%]'>
        <SiGoogleforms className='text-white text-[2.0em] xs:max-sm:text-[1.4em] xl:max-2xl:text-[1.6em]'/>
        <h1 className='ml-[0.5%] text-[2.0em] text-white font-semibold xs:max-sm:text-[1.7em] xl:max-2xl:text-[1.7em]'>GENERAL SECTION</h1>
       </div>
       {/* General Form */}
       <div className='bg-white'>

         {/* First Row */}
         <div className='flex px-[4%] py-[2%] xs:max-sm:flex-col xs:max-sm:py-[7%] xs:max-sm:pb-0'>
            <div className='w-[20%] pl-[0.5%] mr-[6%] xs:max-sm:w-[95%]'>
                {clickOne && <label className='animate-slide-up absolute mt-[-1%] text-[#838383] xs:max-sm:mt-[-5%]'>Date</label>}
                <DatePicker
                    selected={date ? new Date(date) : null}
                    value={date}
                    onChange={(date:any) => setDate(date)}
                    placeholderText='Date'
                    dateFormat='yyyy-MM-dd'
                    onFocus={(e) => {
                        e.target.style.outline = 'none';
                        setClickOne(true)
                    }}
                    filterDate={isDisabledDay}
                    className='text-[#B7B7B7] text-[1.1em] w-[155%] border-b-2 border-[#B7B7B7] xs:max-sm:mb-[0%] xl:max-2xl:text-[0.9em] mb-[3%]'
                />
                
                {/* <input 
                className='text-[#B7B7B7] text-[1.1em] w-[100%] border-b-2 border-[#B7B7B7] xs:max-sm:mb-[0%] xl:max-2xl:text-[0.9em]
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
                /> */}
            </div>
            <br/>
            <div className='w-[20%] pl-[0.5%] mr-[6%] xs:max-sm:w-[95%] xs:max-sm:mt-[2%]'>
                {clickTwo && <label className='animate-slide-up absolute mt-[-1%] text-[#838383] xs:max-sm:mt-[-5%] '>Time Start</label>}
                <input 
                    className='text-[#B7B7B7] text-[1.1em] w-[100%] border-b-2 border-[#B7B7B7] xl:max-2xl:text-[0.9em]
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

            <div className='w-[20%] pl-[0.5%] mr-[6%] xs:max-sm:w-[95%] xs:max-sm:mt-[5%]'>
                {clickThree && <label className='animate-slide-up absolute mt-[-1%] text-[#838383] xs:max-sm:mt-[-5%] '>Time End</label>}
                <input 
                    className='text-[#B7B7B7] text-[1.1em] w-[100%] border-b-2 border-[#B7B7B7] xl:max-2xl:text-[0.9em]
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

            <div className='w-[20%] pl-[0.5%] mr-[3%] xs:max-sm:w-[95%] xs:max-sm:mt-[5%]'>
                {clickFour && <label className='animate-slide-up absolute mt-[-1%] text-[#838383] xs:max-sm:mt-[-5%] '>Event Size</label>}
                <input 
                    className='text-[#B7B7B7] text-[1.1em] w-[100%] border-b-2 border-[#B7B7B7] xl:max-2xl:text-[0.9em]
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
          <div className='flex px-[4%] py-[2%] xs:max-sm:flex-col xs:max-sm:py-[5%]'>
            <div className='w-[20%] pl-[0.5%] mr-[6%] xs:max-sm:w-[95%] xs:max-sm:mt-[5%]'>
                {clickFive && <label className='animate-slide-up absolute mt-[-1%] text-[#838383] xs:max-sm:mt-[-5%] '>Package</label>}
                <select 
                    className='text-[#B7B7B7] text-[1.1em] w-[100%] border-b-2 border-[#B7B7B7] xl:max-2xl:text-[0.9em]
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
            <div className='w-[20%] pl-[0.5%] mr-[6%] xs:max-sm:w-[95%] xs:max-sm:mt-[5%]'>
                {clickSix && <label className='animate-slide-up absolute mt-[-1%] text-[#838383] xs:max-sm:mt-[-5%] '>Location</label>}
                <input 
                    className='text-[#B7B7B7] text-[1.1em] w-[100%] border-b-2 border-[#B7B7B7] xl:max-2xl:text-[0.9em]
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
            <div className='w-[20%] pl-[0.5%] mr-[6%] xs:max-sm:w-[95%] xs:max-sm:mt-[5%]'>
                {clickSeven && <label className='animate-slide-up absolute mt-[-1%] text-[#838383] xs:max-sm:mt-[-5%] '>Email Address</label>}
                <input 
                    className='text-[#B7B7B7] text-[1.1em] w-[100%] border-b-2 border-[#B7B7B7] xl:max-2xl:text-[0.9em]
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
            <div className='w-[20%] pl-[0.5%] mr-[3%] xs:max-sm:w-[95%] xs:max-sm:mt-[5%]'>
                {clickEight && <label className='animate-slide-up absolute mt-[-1%] text-[#838383] xs:max-sm:mt-[-5%] '>Amount Payment</label>}
                <input 
                    className='text-[#B7B7B7] text-[1.1em] w-[100%] border-b-2 border-[#B7B7B7] xl:max-2xl:text-[0.9em]
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
            <div className='w-[100%] pl-[0.5%] mr-[3%] xs:max-sm:mt-[5%]'>
                {clickNine && <label className='animate-slide-up absolute mt-[-1%] text-[#838383] xs:max-sm:mt-[-5%]'>Additional Requests</label>}
                <input 
                    className='text-[#B7B7B7] text-[1.1em] w-[100%] border-b-2 border-[#B7B7B7] xl:max-2xl:text-[0.9em]
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
       <div className='flex items-center bg-[#840705] pl-[4%] py-[1%] xs:max-sm:py-[0.5%] xl:max-2xl:py-[0.5%]'>
            <SiFormstack className='text-white text-[2.0em] xs:max-sm:text-[1.6em] xl:max-2xl:text-[1.6em]'/>
            <h1 className='ml-[0.5%] text-[2.0em] text-white font-semibold xs:max-sm:text-[1.7em] xl:max-2xl:text-[1.7em]'>ADDITIONAL DETAILS</h1>
        </div>
        {/* Additional Form */}
        <div className='bg-white'>
            {/* Add ug one click */}
            <div className='flex flex-wrap px-[4%] py-[1%]'>
                {existingList?.length > 0 &&
                  existingList?.map((item: any, index: number) => (
                    <div className='w-[20%] pl-[0.5%] mr-[5%] my-[2%]'>
                    {clickTen && 
                    <div className='relative'>
                        <label className='animate-slide-up absolute mt-[-10%] text-[#838383]'>{item.label}</label>
                        <p className='animate-slide-up absolute text-[0.8em] mt-[-5%] text-[#a3a3a3] italic'>e.g. {firstList[index]?.value}</p>
                    </div>
                    }
                    <input 
                        className='text-[#B7B7B7] text-[1.1em] w-[100%] border-b-2 border-[#B7B7B7] xl:max-2xl:text-[0.9em]
                        mb-[3%] '
                        type={`${item.type}`}
                        onChange={(event:any)=>{
                            // setClickEleven(false)
                            // setClickElevenTriggered(true);
                            handleAdditionalChange({event,fieldIndex:index})
                        }}
                        placeholder={`${clickTen ? '' : item.label}`}
                        onFocus={(e) => {
                            e.target.style.outline = 'none';
                            e.target.value = ''
                            setClickTen(true);
                            // if (!clickElevenTriggered) {
                            //     setClickEleven(true);
                            // }
                    }}
                />    
                </div>
                  ))}
            </div>
        </div>

        <div className='bg-white text-center flex justify-center'>
            <button className='flex items-center justify-center w-[14%] bg-[#840705] text-white rounded-3xl py-[0.5%] mb-[2%] text-[1.3em]
                hover:bg-[#DD2803] transition-colors delay-250 duration-[3000] ease-in xs:max-sm:text-[1.4em] xs:max-sm:w-[40%]  xl:max-2xl:text-[1em] xl:max-2xl:w-[12%]'
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