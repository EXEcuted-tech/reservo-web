import React from 'react'
import {GrUpdate} from 'react-icons/gr'
import {AiFillCloseCircle, AiFillSave} from 'react-icons/ai'

const EditModal:React.FC<EditModalProps> = (props) => {
  const {setOpenModalEdit} = props;
  return (
    <div className="animate-slide-up font-poppins fixed top-[8%] left-[18%] right-0 bg-white z-50 bg-[rgba(0, 0, 0, 0.5)] w-[70%] p-4 overflow-x-hidden overflow-y-auto h-[80%] drop-shadow rounded-3xl">
        <div className='flex w-full h-[5vh]'>
            <div className='flex items-center w-[96%] mt-[0.5%]'>
                <div className='flex items-center w-[100%] ml-[1%]'>
                    <GrUpdate className='mr-[1%] text-[2em]'/>
                    <h1 className='font-bold text-[1.5em]'>Update Reservation Record</h1>   
                </div>
            </div>
            <div className='mt-[0.5%]'>
                <AiFillCloseCircle className='text-[2.5em] hover:cursor-pointer'
                 onClick={()=>{setOpenModalEdit(false)}}/>
            </div>
        </div>
        <hr className='h-[2px] w-full my-[1.2%] bg-gray-200 border-0'/>

        {/* General Information */}
        <h1 className='font-bold uppercase text-[1.5em] ml-[2%] bg-[#840705] inline-block text-white px-[1%] rounded-lg mb-[0.5%]'>General Section</h1>
        <div className='flex mx-[2%] text-[1.2em]'>
          <div className='w-[33%]'>
            <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
            <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
            <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
            <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
          </div>
          <div className='w-[33%]'>
          <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
            <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
            <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
            <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
          </div>
          <div className='w-[33%]'>
          <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
            <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
            <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
            <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
          </div>
        </div>

        {/* Inventory */}
        <h1 className='font-bold uppercase text-[1.5em] ml-[2%] bg-[#840705] inline-block text-white px-[1%] mt-[2%] rounded-lg mb-[0.5%]'>Inventory</h1>
        <div className='flex mx-[2%] text-[1.2em]'>
          <div className='w-[33%]'>
            <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
            <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
            <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
          </div>
          <div className='w-[33%]'>
          <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
            <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
            <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
          </div>
          <div className='w-[33%]'>
          <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
            <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
            <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
          </div>
        </div>  

        {/* Additional Details */}
        <h1 className='font-bold uppercase text-[1.5em] ml-[2%] bg-[#840705] inline-block text-white px-[1%] mt-[2%] rounded-lg mb-[0.5%]'>Additional Details</h1>
        <div className='flex mx-[2%] text-[1.2em]'>
          <div className='w-[33%]'>
            <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
            <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
          </div>
          <div className='w-[33%]'>
          <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
            <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
          </div>
          <div className='w-[33%]'>
          <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
            <div className='flex mb-[1%]'>
                <p className='my-[1%] mr-[1%]'>Date</p>
                <input type="date" className='border border-gray-500 w-[70%] pl-[1%] rounded-lg text-[0.9em]'/>
            </div>
          </div>
        </div>  


        <div className='fixed bottom-[2%] ml-[-1%] w-[100%]'>
          <hr className=' w-[100%] h-[1px] bg-black border-0'/>       
          <div className='flex justify-end mr-[3%] mt-[1%]'>
            <button className='flex text-white text-[1.1em] bg-[#17A200] px-[2%] py-[0.5%] rounded-2xl hover:bg-[#117600]'><AiFillSave className='mt-[2%] text-[1.2em] mr-[1%]'/>Save</button>
            
          </div>
        </div>
    </div>
  )
}

export default EditModal