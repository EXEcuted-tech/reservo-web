import React from 'react'
import {RiNewspaperFill} from 'react-icons/ri'
import {AiFillCloseCircle} from 'react-icons/ai'
import {BsFillTrashFill} from 'react-icons/bs'

const ViewModal:React.FC<ViewModalProps> = (props) => {
  const {setOpenModalView} = props;
  return (
    <div className="animate-slide-up font-poppins fixed top-[8%] left-[18%] right-0 bg-white z-50 bg-[rgba(0, 0, 0, 0.5)] w-[70%] p-4 overflow-x-hidden overflow-y-auto h-[80%] drop-shadow rounded-3xl">
        <div className='flex w-full h-[5vh]'>
            <div className='flex items-center w-[96%] mt-[0.5%]'>
                <RiNewspaperFill className='text-[2.8em] ml-[1%] mr-[1%]'/>
                <div>
                    <h1 className='font-bold text-[1.2em]'>Reservation Details</h1>   
                    <p className='mt-[-1%]'>ID: 1</p>
                </div>
            </div>
            <div className='mt-[0.5%]'>
                <AiFillCloseCircle className='text-[2.5em] hover:cursor-pointer'
                 onClick={()=>{setOpenModalView(false)}}/>
            </div>
        </div>
        <hr className='h-[2px] w-full my-[1.2%] bg-gray-200 border-0'/>
        
        <h1 className='font-bold uppercase text-[1.5em] ml-[2%] bg-[#840705] inline-block text-white px-[1%] rounded-lg mb-[0.5%]'>General Information</h1>
        <div className='flex mx-[2%] text-[1.2em]'>
          <div className='w-[50%]'>
            <p className='my-[1%]'><span className='font-bold'>Date: </span>{"January 13,2023"}</p>
            <p className='my-[1%]'><span className='font-bold'>Time: </span>{"January 13,2023"}</p>
            <p className='my-[1%]'><span className='font-bold'>Organizer: </span>{"January 13,2023"}</p>
            <p className='my-[1%]'><span className='font-bold'>Client Name: </span>{"January 13,2023"}</p>
          </div>
          <div className='w-[50%]'>
            <p className='my-[1%]'><span className='font-bold'>Event Size: </span>{"January 13,2023"}</p>
            <p className='my-[1%]'><span className='font-bold'>Email: </span>{"January 13,2023"}</p>
            <p className='my-[1%]'><span className='font-bold'>Contact Number: </span>{"January 13,2023"}</p>
            <p className='my-[1%]'><span className='font-bold'>Status: </span>{"January 13,2023"}</p> {/*Ako pani iedit ang ui ani pero pls insert the value na nya there*/}
          </div>
        </div>
        <p className='mx-[2%] text-[1.2em]'><span className='font-bold'>Remarks: </span>{"January 13,2023"}</p>


        <h1 className='font-bold uppercase text-[1.5em] ml-[2%] bg-[#840705] inline-block px-[1%] mt-[2%] text-white rounded-lg mb-[0.5%]'>Inventory</h1>
        <div className='flex mx-[2%] text-[1.2em]'>
          <div className='w-[33%]'>
            <p className='my-[1%]'><span className='font-bold'>Date: </span>{"January 13,2023"}</p>
            <p className='my-[1%]'><span className='font-bold'>Time: </span>{"January 13,2023"}</p>
            <p className='my-[1%]'><span className='font-bold'>Organizer: </span>{"January 13,2023"}</p>
            <p className='my-[1%]'><span className='font-bold'>Client Name: </span>{"January 13,2023"}</p>
          </div>
          <div className='w-[33%]'>
            <p className='my-[1%]'><span className='font-bold'>Event Size: </span>{"January 13,2023"}</p>
            <p className='my-[1%]'><span className='font-bold'>Email: </span>{"January 13,2023"}</p>
            <p className='my-[1%]'><span className='font-bold'>Contact Number: </span>{"January 13,2023"}</p>
            <p className='my-[1%]'><span className='font-bold'>Status: </span>{"January 13,2023"}</p>
          </div>
          <div className='w-[33%]'>
            <p className='my-[1%]'><span className='font-bold'>Event Size: </span>{"January 13,2023"}</p>
            <p className='my-[1%]'><span className='font-bold'>Email: </span>{"January 13,2023"}</p>
            <p className='my-[1%]'><span className='font-bold'>Contact Number: </span>{"January 13,2023"}</p>
            <p className='my-[1%]'><span className='font-bold'>Status: </span>{"January 13,2023"}</p>
          </div>
        </div>

        <h1 className='font-bold uppercase text-[1.5em] ml-[2%] bg-[#840705] inline-block px-[1%] mt-[2%] text-white text-center rounded-lg mb-[0.5%]'>Additional Information</h1>
        <div className='flex mx-[2%] text-[1.2em]'>
          <div className='w-[33%]'>
            <p className='my-[1%]'><span className='font-bold'>Date: </span>{"January 13,2023"}</p>
          </div>
          <div className='w-[33%]'>
            <p className='my-[1%]'><span className='font-bold'>Event Size: </span>{"January 13,2023"}</p>
          </div>
          <div className='w-[33%]'>
            <p className='my-[1%]'><span className='font-bold'>Event Size: </span>{"January 13,2023"}</p>
          </div>
        </div>

        <div className='fixed bottom-[2%] ml-[-1%] w-[100%]'>
          <hr className=' w-[100%] h-[1px] bg-black border-0'/>       
          <div className='flex justify-end mr-[3%] mt-[1%]'>
            <button className='flex text-white text-[1.1em] bg-[#DD2803] px-[2%] py-[0.5%] rounded-2xl hover:bg-[#840705]'><BsFillTrashFill className='mt-[2%]'/>Delete</button>
            
          </div>
        </div>
    </div>
  )
}

export default ViewModal