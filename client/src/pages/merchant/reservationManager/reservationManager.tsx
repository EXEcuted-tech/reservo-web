import { Fragment, useEffect, useRef, useState } from "react";
import { IoCalendarOutline,IoAddCircle } from "react-icons/io5";
import { LiaEdit } from "react-icons/lia";
import { BsPerson } from "react-icons/bs";
import { MdFormatListNumbered } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlinePhone} from "react-icons/ai";
import { LiaCommentSolid } from "react-icons/lia";
import { FiClock } from "react-icons/fi";
<<<<<<< HEAD
import {SiReacthookform} from 'react-icons/si'
=======
import {PiClipboardText} from 'react-icons/pi'
>>>>>>> 06ca8cae86c22581cb74dab8a7dfdd536ad85e0a
import {IoIosSave} from 'react-icons/io'
import {TbTrashXFilled} from 'react-icons/tb'
import axios from "axios";
import config from "../../../common/config";
import Notification from '../../../components/alerts/Notification'
<<<<<<< HEAD
import {PiClipboardText} from 'react-icons/pi'
=======
>>>>>>> 06ca8cae86c22581cb74dab8a7dfdd536ad85e0a

const PAGE_MODE = {
  READ: 0,
  UPDATE: 1,
};

const ReservationManager = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const merchID = Number(localStorage.getItem('merch_id'));

  const [data, setData] = useState<{ type: string; label: string; value: string } | any>(null);
  const [merchData,setMerchData] = useState<MerchData>()
  const [notif,setNotif] = useState(false);
  const [notifMess,setNotifMess] = useState("");

  const [existingList, setExistingList] = useState<
  Array<{
    label: string;
    type: string;
    value: string;
  }>
  >([]);  

  const merchant = {
    "merchant_id": merchData?.merchant_id,
    "merchant_name": merchData?.merchant_name,
    "email_address": merchData?.email_address,
    "logo": merchData?.logo,
    "contact_number": merchData?.contact_number,
    "sched_id":merchData?.sched_id,
  }

  const accounts = merchData?.accounts && JSON.parse(merchData.accounts);
  const settings = merchData?.settings && JSON.parse(merchData?.settings);
  const address = merchData?.address && JSON.parse(merchData?.address);

  useEffect (()=>{
    // console.log("Retrieved!",existingList);
    retrieveExisting();
  },[])

  const [pageMode, setPageMode] = useState(PAGE_MODE.READ);

  const handleChange = (event: any) => {
    setNotif(false);
    setNotifMess("");
    const newData = { ...data, [event.target.name]: event.target.value };

    setData(newData);
  };

  const handleSubmit = (event: any) => {
    setNotif(false);
    event.preventDefault();

    if (!data || !data.label || !data.type) {
      setNotif(true);
      setNotifMess("Fill in all details!");
      return;
    }

    formRef.current?.reset();

    const newField = { label: data?.label ?? "", type: data?.type ?? "", value: "" };

    const isDuplicate = existingList.some(item => item.label === newField.label && item.type === newField.type);

    if (!isDuplicate) {
      const updatedExistingList = [...existingList || [], newField];
      setExistingList(updatedExistingList);

      const form_deets = updatedExistingList ? updatedExistingList : null;
      axios.post(`${config.API}/merchant/update`,{
        "merchant":merchant,
        "accounts":accounts,
         "settings":settings,
         "address":address,
         "form_deets":{form:form_deets},
       }).then((res)=>{
         console.log("Update: \n",res);
         if(res.data.success==true){
          setNotif(false);
          setData(null);
          formRef.current?.reset();
          dialogRef.current?.close();
         }
       })
    }else{
      setNotif(true);
      setNotifMess("Label and Type given already exists!");
    }
  };

  const retrieveExisting = () =>{
    setNotif(false);
    setNotifMess("");
    const col = "merchant_id"
    const val = merchID
    axios.get(`${config.API}/merchant/retrieve?col=${col}&val=${val}`)
    .then((res)=>{
      console.log("Response: ", res.data);
      setMerchData(res.data.merchant);
      setExistingList(res.data.formDeets?.form);
    })
  }

  const handleRemove = (fieldIndex: number) => {
    setNotif(false);
    setNotifMess("");
    const filteredList = existingList.filter((item, index) => index !== fieldIndex);
    setExistingList(filteredList);

    const form_deets = filteredList ? filteredList : null;
    axios.post(`${config.API}/merchant/update`,{
      "merchant":merchant,
      "accounts":accounts,
       "settings":settings,
       "address":address,
       "form_deets":{form:form_deets},
     }).then((res)=>{
       
     })
  };

  const updateFieldList = ({ event, fieldIndex }: { event: any; fieldIndex: number }) => {
    setNotif(false);
    setNotifMess("");
    const modifiedList = existingList.map((item, index) => {
      return index === fieldIndex ? { ...item, value: event.target.value } : item;
    });

    setExistingList(modifiedList);
  };

  const saveForm = () =>{
    const form_deets = existingList ? existingList : null;

    axios.post(`${config.API}/merchant/update`,{
      "merchant":merchant,
      "accounts":accounts,
       "settings":settings,
       "address":address,
       "form_deets":{form:form_deets},
     }).then((res)=>{
       setNotif(true);
       setNotifMess("Reservation Form Updated!");
     })
  }
  return (
    <div className="animate-fade-in font-poppins bg-[#F3F3F3] p-8 overflow-y-auto xs:max-sm:flex xs:max-sm:w-[135%] xs:max-sm:mr-[5%] xs:max-sm:p-2 xs:max-sm:ml-[-2%]">
<<<<<<< HEAD
=======
      {notif && <Notification message={notifMess} color="#660605"/>}
>>>>>>> 06ca8cae86c22581cb74dab8a7dfdd536ad85e0a
      <div className="flex items-center justify-center">
        <div className="rounded-lg bg-[#FFFFFF] w-full p-5 mt-[1rem]">
          <div className="flex w-full items-center ">
            <h1 className="flex items-center text-[1.5em] w-[80%] font-bold xs:max-sm:text-[1em] xl:max-2xl:text-[1.2em]">
              <PiClipboardText className="mr-[0.5%] text-[1.2em]"/> Current Reservation Form</h1>
            <button
              type="button"
              onClick={() => (pageMode === PAGE_MODE.READ ? setPageMode(PAGE_MODE.UPDATE) : setPageMode(PAGE_MODE.READ))}
              className="text-black p-0 cursor-pointer ml-auto"
            >
<<<<<<< HEAD
              <LiaEdit className="hover:animate-zoom-in text-4xl xl:max-2xl:text-2xl" />
            </button>
          </div>
          <div className="flex flex-col text-xl text-black w-full h-full bg-[#F0E5D8] rounded-3xl mt-5 xl:max-2xl:mt-2">
          <h1 className='font-black ml-[3%] mt-[3%] text-[1.7em] text-[#840705] xl:max-2xl:text-[1.7em] underline'>GENERAL SECTION</h1>
            <div className="flex px-10 pb-10 pt-5">
              <div className="flex flex-col gap-5 w-1/2 font-bold">
=======
              <LiaEdit className="hover:animate-zoom-in text-4xl xs:max-sm:text-3xl xl:max-2xl:text-2xl" />
            </button>
          </div>

          <div className="flex flex-col text-xl text-black w-full h-full bg-[#F0E5D8] rounded-3xl mt-5 xl:max-2xl:mt-2">
          <h1 className='font-black ml-[3%] mt-[3%] text-[1.7em] text-[#840705] xs:max-sm:text-[1em] xl:max-2xl:text-[1.3em] underline'>
            GENERAL SECTION</h1>
            <div className="flex px-10 pb-10 xs:max-sm:p-5 pt-5">
              <div className="flex flex-col gap-5 w-1/2 font-bold xs:max-sm:mr-[10%]">
>>>>>>> 06ca8cae86c22581cb74dab8a7dfdd536ad85e0a
                <div className="flex items-center gap-1">
                  <IoCalendarOutline className="text-[22px] mr-[0.5rem] xs:max-sm:text-[1.1em] xl:max-2xl:text-[1.1em]"/> 
                  <h3 className="xs:max-sm:text-[0.9em] xl:max-2xl:text-[0.8em]">Date: 
                    <span className="text-[20px] ml-[5%] text-[#363636] font-extralight xs:max-sm:text-[0.9em]  xl:max-2xl:text-[1em]
                    ">YYYY/MM/DD</span>
                  </h3>
                </div>
                <div className="flex items-center gap-1">
                  <FiClock className="mr-[0.5rem] xs:max-sm:text-[1.1em] xl:max-2xl:text-[1.1em]" /> 
                  <h3 className="xs:max-sm:text-[0.9em] xl:max-2xl:text-[0.8em]">Time:
                  <span className="text-[20px] ml-[5%] text-[#363636] font-extralight xs:max-sm:text-[0.9em] xl:max-2xl:text-[1em]
                  ">mm:hh:ss</span>
                  </h3>
                </div>
                <div className="flex items-center">
                  <BsPerson className="text-[22px] mr-[0.5rem] xs:max-sm:text-[1.6em] xl:max-2xl:text-[1.1em]"/> 
                  <h3 className="w-full xs:max-sm:text-[0.9em] xl:max-2xl:text-[0.8em]">Client Name:
                    <span className="text-[20px] ml-[1%] text-[#363636] font-extralight xs:max-sm:text-[0.9em] xl:max-2xl:text-[1em]
                    ">John Doe</span>
                  </h3>
                </div>
                <div className="flex items-center">
                  <LiaCommentSolid className="text-[22px] mr-[0.5rem] xs:max-sm:text-[1.6em] xs:max-sm:mb-[2rem] xl:max-2xl:text-[1.1em] "/>
                  <h3 className="w-full xs:max-sm:text-[0.9em] xl:max-2xl:text-[0.8em]"> Remarks:
                    <span className="text-[20px] ml-[1%] text-[#363636] font-extralight xs:max-sm:text-[0.9em] xl:max-2xl:text-[1em]
                    ">The service was swift and great!</span>
                  </h3>
                </div>
              </div>
              <div className="flex flex-col gap-5 w-1/2 font-bold">
                <div className="flex items-center">
                  <MdFormatListNumbered className="text-[22px] mr-[0.5rem] xs:max-sm:text-[1.6em] xl:max-2xl:text-[1.1em]"/>
                  <h3 className="w-full xs:max-sm:text-[0.9em] xl:max-2xl:text-[0.8em]">Event Size:
                   <span className="text-[20px] ml-[1%] text-[#363636] font-extralight xs:max-sm:text-[0.9em] xl:max-2xl:text-[1em]
                   ">100</span>
                  </h3>
                </div>
                <div className="flex items-center">
                  <HiOutlineMail className="text-[22px] mr-[0.5rem] xs:max-sm:text-[1.1em] xl:max-2xl:text-[1.1em]"/> 
                  <h3 className="xs:max-sm:text-[0.9em] xl:max-2xl:text-[0.8em]">Email:
                  <span className="text-[20px] ml-[3%] text-[#363636] font-extralight xs:max-sm:text-[0.9em] xl:max-2xl:text-[1em]
                  ">john@abc.com</span>
                  </h3>
                </div>
                <div className="flex items-center">
                  <AiOutlinePhone className="text-[22px] mr-[0.5rem] xs:max-sm:text-[1.4em] xs:max-sm:mb-[2rem] xl:max-2xl:text-[1.1em]"/> 
                  <h3 className="w-full xs:max-sm:text-[0.9em] xl:max-2xl:text-[0.8em]">Contact Number:
                  <span className="text-[20px] ml-[1%] text-[#363636] font-extralight xs:max-sm:text-[0.9em] xl:max-2xl:text-[1em]
                  ">09123456789</span>
                  </h3>
                </div>
              </div>
            </div>
<<<<<<< HEAD
            <h1 className='font-black ml-[3%] mb-[2%] text-[1.7em] text-[#840705] xl:max-2xl:text-[1.7em] underline'>ADDITIONAL SECTION</h1>
=======
            <h1 className='font-black ml-[3%] mb-[2%] text-[1.7em] text-[#840705]  xs:max-sm:text-[1em] xl:max-2xl:text-[1.3em] underline'>
              ADDITIONAL SECTION</h1>
>>>>>>> 06ca8cae86c22581cb74dab8a7dfdd536ad85e0a
            
            
            {pageMode === PAGE_MODE.READ &&
                  existingList?.length > 0 && (
                    <div className="flex flex-wrap">
                  {existingList.map((item: any, index: number) => (
                    <Fragment key={index}>
                      <div className="w-1/2 pb-5 px-10">
                        <div className="flex items-center gap-1">
                          <h3 className="font-bold xl:max-2xl:text-[0.8em]">{`${item.label}:`} 
                            <span className="text-[20px] ml-[5%] text-[#363636] font-extralight">{`${item.value}`} </span>
                          </h3>
                        </div>
                      </div>
                    </Fragment>
                  ))}
                  </div>
                  )
              }
            {pageMode === PAGE_MODE.UPDATE && (
              <div className="px-5 pb-5 ml-[1rem] animate-fade-in xs:max-sm:ml-[0rem]">
                <div className="flex items-center w-full">
                <button
                  onClick={() => {
                    dialogRef.current?.showModal();
                  }}
<<<<<<< HEAD
                  className="p-3 text-xl bg-[#008927] text-white rounded-lg xs:max-sm:text-[0.8em] xs:max-sm:p-2  xl:max-2xl:text-[0.7em] xl:max-2xl:p-2
=======
                  className="flex justify-center items-center p-3 text-[1em] bg-[#008927] text-white rounded-3xl xs:max-sm:text-[0.8em] xs:max-sm:p-2  xl:max-2xl:text-[0.7em] xl:max-2xl:p-2
>>>>>>> 06ca8cae86c22581cb74dab8a7dfdd536ad85e0a
                    hover:bg-[#077827] transition-colors delay-250 duration-[3000] ease-in"
                >
                  <IoAddCircle/> Add Field
                </button>
                {/* SAVE button */}
                <button
                  onClick={() => {
                    saveForm();
                  }}
                  className="flex justify-center items-center p-3 text-[1em] ml-[1%] bg-[#f78d02] text-white rounded-3xl  xl:max-2xl:text-[0.7em] xl:max-2xl:p-2
                    hover:bg-[#d17802] transition-colors delay-250 duration-[3000] ease-in"
                >
                  <IoIosSave className="mr-[2%]"/>
                  Save
                </button>
                </div>
                {existingList?.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mt-[1%]">
                  {existingList.map((item: any, index: number) => (
                    <Fragment key={index}>
                      <Field
                        {...item}
                        index={index}
                        onClick={() => handleRemove(index)}
                        handleFieldOnChange={(values: any) => updateFieldList(values)}
                      />
                    </Fragment>
                  ))}
                  </div>
                  )}
              </div>
            )}
          </div>
        </div>
      </div>
      <dialog ref={dialogRef}>
        <div className="animate-fade-in">
          <div className="flex font-bold bg-red-900 text-white p-3">
            <h1 className="xl:max-2xl:text-[0.8em]">Field Info</h1>
            <button
              className="ml-auto xl:max-2xl:text-[0.8em]"
              onClick={() => {
                dialogRef.current?.close();
              }}
            >
              X
            </button>
          </div>
          <div className="p-3 w-[100%]">
            <form onSubmit={(event) => handleSubmit(event)} ref={formRef}>
              <div className="flex flex-col gap-1 ">
                <label htmlFor="label" className="xl:max-2xl:text-[0.8em]">Input Label</label>
                <input type="text" name="label" className="border p-2 xl:max-2xl:text-[0.7em]" onChange={handleChange} />
              </div>
              <div className="flex gap-5 mt-3">
                <div className="flex gap-1">
                  <input type="radio" name="type" value="text" className="border p-2" onChange={handleChange} />
                  <label htmlFor="label" className="xl:max-2xl:text-[0.7em]">Text</label>
                </div>
                <div className="flex gap-1">
                  <input type="radio" name="type" value="number" className="border p-2" onChange={handleChange} />
                  <label htmlFor="label" className="xl:max-2xl:text-[0.7em]">Number</label>
                </div>
              </div>
              <div className="flex gap-2 text-white mt-5">
                <button
                  className="ml-auto bg-red-900 p-2 rounded-lg hover:bg-[#A01B00] transition-colors delay-250 duration-[3000] ease-in xl:max-2xl:text-[0.6em] xl:max-2xl:p-1"
                  type="reset"
                  onClick={() => {
                    dialogRef.current?.close();
                  }}
                >
                  Cancel
                </button>
                <button className="bg-[#189A3D] p-2 rounded-lg hover:bg-[#077827] transition-colors delay-250 duration-[3000] ease-in xl:max-2xl:text-[0.6em] xl:max-2xl:p-1" type="submit">
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

const Field = ({
  type,
  label,
  index,
  value,
  onClick,
  handleFieldOnChange,
}: {
  type: string;
  label: string;
  value: string;
  index: number;
  onClick: any;
  handleFieldOnChange: any;
}) => {
  return (
    <>
      <div className="flex flex-col gap-1 grow">
        <label htmlFor="label" className="font-bold">{label}</label>
        <div className="flex items-center gap-2">
          <input type={type} name={label} value={value} 
              className="border border-black rounded-2xl bg-[#fff7ed] w-[85%] p-2" 
              onChange={(event: any) => handleFieldOnChange({ event, fieldIndex: index})} />
          <button onClick={onClick}>
            {/* <AiOutlineClose className="hover:text-[#e60000] hover:animate-zoom-in" /> */}
            <TbTrashXFilled className="text-[1.2em] hover:text-[#e60000] hover:animate-zoom-in" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ReservationManager;
