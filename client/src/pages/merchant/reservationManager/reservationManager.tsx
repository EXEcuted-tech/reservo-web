import { Fragment, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaEdit } from "react-icons/lia";
import { BsPerson } from "react-icons/bs";
import { MdFormatListNumbered } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlinePhone } from "react-icons/ai";
import { LiaCommentSolid } from "react-icons/lia";
import { FiClock } from "react-icons/fi";
import {SiReacthookform} from 'react-icons/si'

const PAGE_MODE = {
  READ: 0,
  UPDATE: 1,
};

const ReservationManager = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [data, setData] = useState<{ type: string; label: string; value: string } | any>(null);

  const [fieldList, setFieldList] = useState<
    Array<{
      label: string;
      type: string;
      value: string;
    }>
  >([]);

  const [pageMode, setPageMode] = useState(PAGE_MODE.READ);

  const handleChange = (event: any) => {
    const newData = { ...data, [event.target.name]: event.target.value };

    setData(newData);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();


    if (data && (!Object.hasOwn(data, "label") || !Object.hasOwn(data, "type"))) return;
    console.log("DATA in Reservation Manager: ",data);
    formRef.current?.reset();
    dialogRef.current?.close();

    const newField = { label: data?.label ?? "", type: data?.type ?? "", value: "" };

    setFieldList((currentList) => [...currentList, newField]);

    console.log("Field List: ",fieldList);
  };

  const handleRemove = (fieldIndex: number) => {
    const filteredList = fieldList.filter((item, index) => index !== fieldIndex);

    setFieldList(filteredList);
  };

  const updateFieldList = ({ event, fieldIndex }: { event: any; fieldIndex: number }) => {
    const modifiedList = fieldList.map((item, index) => {
      return index === fieldIndex ? { ...item, value: event.target.value } : item;
    });

    setFieldList(modifiedList);
  };

  return (
    <div className="animate-fade-in font-poppins bg-[#F3F3F3] p-8 overflow-y-auto">
      <div className="flex items-center justify-center">
        <div className="rounded-lg bg-[#FFFFFF] w-full p-5 mt-[1rem]">
          <div className="flex w-full items-center ">
            <h1 className="flex items-center text-[1.5em] w-[80%] font-bold xl:max-2xl:text-[1.2em]"><SiReacthookform className="mr-[0.5%] text-[1.2em]"/> Current Reservation Form</h1>
            <button
              type="button"
              onClick={() => (pageMode === PAGE_MODE.READ ? setPageMode(PAGE_MODE.UPDATE) : setPageMode(PAGE_MODE.READ))}
              className="text-black p-0 cursor-pointer ml-auto"
            >
              <LiaEdit className="text-4xl xl:max-2xl:text-2xl" />
            </button>
          </div>
          <div className="flex flex-col text-xl text-black w-full h-full bg-[#F0E5D8] rounded-3xl mt-5 xl:max-2xl:mt-2">
          <h1 className='font-black ml-[3%] mt-[3%] text-[1.7em] text-[#840705] xl:max-2xl:text-[1.7em] underline'>GENERAL SECTION</h1>
            <div className="flex px-10 pb-10 pt-5">
              <div className="flex flex-col gap-5 w-1/2 font-bold">
                <div className="flex items-center gap-1">
                  <IoCalendarOutline className="text-[22px] mr-[0.5rem] xl:max-2xl:text-[1.1em]"/> <h3 className="xl:max-2xl:text-[0.8em]">Date: 
                    <span className="text-[20px] ml-[5%] text-[#363636] font-extralight">YYYY/MM/DD</span>
                  </h3>
                </div>
                <div className="flex items-center gap-1">
                  <FiClock className="mr-[0.5rem] xl:max-2xl:text-[1.1em]" /> <h3 className="xl:max-2xl:text-[0.8em]">Time:
                  <span className="text-[20px] ml-[5%] text-[#363636] font-extralight">mm:hh:ss</span>
                  </h3>
                </div>
                <div className="flex items-center">
                  <BsPerson className="text-[22px] mr-[0.5rem] xl:max-2xl:text-[1.1em]"/> <h3 className="w-full xl:max-2xl:text-[0.8em]">Client Name:
                    <span className="text-[20px] ml-[1%] text-[#363636] font-extralight">John Doe</span>
                  </h3>
                </div>
                <div className="flex items-center">
                  <LiaCommentSolid className="text-[22px] mr-[0.5rem]"/><h3 className="w-full xl:max-2xl:text-[0.8em]"> Remarks:
                    <span className="text-[20px] ml-[1%] text-[#363636] font-extralight">The service was swift and great!</span>
                  </h3>
                </div>
              </div>
              <div className="flex flex-col gap-5 w-1/2 font-bold">
                <div className="flex items-center">
                  <MdFormatListNumbered className="text-[22px] mr-[0.5rem] xl:max-2xl:text-[1.1em]"/> <h3 className="w-full xl:max-2xl:text-[0.8em]">Event Size:
                   <span className="text-[20px] ml-[1%] text-[#363636] font-extralight">100</span>
                  </h3>
                </div>
                <div className="flex items-center">
                  <HiOutlineMail className="text-[22px] mr-[0.5rem] xl:max-2xl:text-[1.1em]"/> <h3 className="xl:max-2xl:text-[0.8em]">Email:
                  <span className="text-[20px] ml-[3%] text-[#363636] font-extralight">john@abc.com</span>
                  </h3>
                </div>
                <div className="flex items-center">
                  <AiOutlinePhone className="text-[22px] mr-[0.5rem] xl:max-2xl:text-[1.1em]"/> <h3 className="w-full xl:max-2xl:text-[0.8em]">Contact Number:
                  <span className="text-[20px] ml-[1%] text-[#363636] font-extralight">09123456789</span>
                  </h3>
                </div>
              </div>
            </div>
            <h1 className='font-black ml-[3%] mb-[2%] text-[1.7em] text-[#840705] xl:max-2xl:text-[1.7em] underline'>ADDITIONAL SECTION</h1>
            
            
            {pageMode === PAGE_MODE.READ &&
                  !!fieldList.length &&
                  fieldList.map((item: any, index: number) => (
                    <Fragment key={index}>
                      <div className="flex px-10 pb-10">
                        <div className="flex items-center">
                          <h3>{`${item.label}: ${item.value}`}</h3>
                        </div>
                      </div>
                    </Fragment>
                  ))}
            
            {pageMode === PAGE_MODE.UPDATE && (
              <div className="px-5 pb-5 ml-[1rem] animate-fade-in">
                <button
                  onClick={() => {
                    dialogRef.current?.showModal();
                  }}
                  className="p-3 text-xl bg-[#008927] text-white rounded-lg  xl:max-2xl:text-[0.7em] xl:max-2xl:p-2
                    hover:bg-[#077827] transition-colors delay-250 duration-[3000] ease-in"
                >
                  Add Field
                </button>
                {!!fieldList.length &&
                  fieldList.map((item: any, index: number) => (
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
  onClick,
  handleFieldOnChange,
}: {
  type: string;
  label: string;
  index: number;
  onClick: any;
  handleFieldOnChange: any;
}) => {
  return (
    <>
      <div className="flex flex-col gap-1 grow">
        <label htmlFor="label">{label}</label>
        <div className="flex items-center gap-2">
          <input type={type} name={label} className="border p-2" onChange={(event: any) => handleFieldOnChange({ event, fieldIndex: index })} />
          <button onClick={onClick}>
            <AiOutlineClose />
          </button>
        </div>
      </div>
    </>
  );
};

export default ReservationManager;
