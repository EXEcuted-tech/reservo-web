import { Fragment, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";

import { IoCalendarOutline } from "react-icons/io5";
import { LiaEdit } from "react-icons/lia";

import { FiClock } from "react-icons/fi";
import {RiReservedFill} from 'react-icons/ri'
import MerchAdHeader from "../../../components/headers/MerchAdHeader";

const NAV_BAR = [
  { title: "Reservation Form", url: "reservationManager" },
  { title: "Merchant Calendar", url: "merchantCalendar" },
];

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

    formRef.current?.reset();
    dialogRef.current?.close();

    const newField = { label: data?.label ?? "", type: data?.type ?? "", value: "" };

    setFieldList((currentList) => [...currentList, newField]);
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
    <div className="h-screen font-poppins bg-[#F3F3F3] p-8 h-[90vh]">
      <nav className="flex gap-8 border-b-2 border-black">
        {NAV_BAR.map(({ title, url }, index) => (
          <Fragment key={index}>
            <a href={url} className={`font-xl text-[1.5em] font-semibold p-2 cursor:pointer ${index === 0 && `border-b-4 border-red-900`}`}>
              {title}
            </a>
          </Fragment>
        ))}
      </nav>

      <div className="flex items-center justify-center">
        <div className="rounded-lg bg-[#FFFFFF] w-full p-5 mt-[6rem]">
          <div className="flex w-full ">
            <h1 className="text-[1.5em] font-bold">Current Reservation Form</h1>
            <button
              type="button"
              onClick={() => (pageMode === PAGE_MODE.READ ? setPageMode(PAGE_MODE.UPDATE) : setPageMode(PAGE_MODE.READ))}
              className="text-black p-0 cursor-pointer ml-auto"
            >
              <LiaEdit size={40} />
            </button>
          </div>
          <div className="flex flex-col text-xl text-black w-full h-full bg-[#F0E5D8] rounded mt-5">
            <div className="flex p-10">
              <div className="flex flex-col gap-5 w-1/2 font-bold">
                <div className="flex items-center gap-1">
                  <IoCalendarOutline className="text-[22px]"/> <h3 className="">Date:</h3>
                </div>
                <div className="flex items-center gap-1">
                  <FiClock />
                  <h3>Time:</h3>
                </div>
                <div className="flex items-center">
                  <h3>Client Name:</h3>
                </div>
                <div className="flex items-center mt-[10%]">
                  <h3>Remarks:</h3>
                </div>
                {pageMode === PAGE_MODE.READ &&
                  !!fieldList.length &&
                  fieldList.map((item: any, index: number) => (
                    <Fragment key={index}>
                      <div className="flex items-center">
                        <h3>{`${item.label}: ${item.value}`}</h3>
                      </div>
                    </Fragment>
                  ))}
              </div>
              <div className="flex flex-col gap-5 w-1/2 font-bold">
                <div className="flex items-center">
                  <h3>Event Size:</h3>
                </div>
                <div className="flex items-center">
                  <h3>Email:</h3>
                </div>
                <div className="flex items-center">
                  <h3>Contact Number:</h3>
                </div>
              </div>
            </div>

            {pageMode === PAGE_MODE.UPDATE && (
              <div className="p-10">
                <button
                  onClick={() => {
                    dialogRef.current?.showModal();
                  }}
                  className="p-3 text-xl bg-[#189A3D] text-white rounded-lg"
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
        <div className="">
          <div className="flex font-bold bg-red-900 text-white p-3">
            <h1 className="">Field Info</h1>
            <button
              className="ml-auto"
              onClick={() => {
                dialogRef.current?.close();
              }}
            >
              X
            </button>
          </div>
          <div className="p-3">
            <form onSubmit={(event) => handleSubmit(event)} ref={formRef}>
              <div className="flex flex-col gap-1">
                <label htmlFor="label">Input Label</label>
                <input type="text" name="label" className="border p-2" onChange={handleChange} />
              </div>
              <div className="flex gap-5 mt-3">
                <div className="flex gap-1">
                  <input type="radio" name="type" value="text" className="border p-2" onChange={handleChange} />
                  <label htmlFor="label">Text</label>
                </div>
                <div className="flex gap-1">
                  <input type="radio" name="type" value="number" className="border p-2" onChange={handleChange} />
                  <label htmlFor="label">Number</label>
                </div>
              </div>
              <div className="flex gap-2 text-white mt-5">
                <button
                  className="ml-auto bg-red-900 p-2 rounded-lg"
                  type="reset"
                  onClick={() => {
                    dialogRef.current?.close();
                  }}
                >
                  Cancel
                </button>
                <button className="bg-[#189A3D] p-2 rounded-lg" type="submit">
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
