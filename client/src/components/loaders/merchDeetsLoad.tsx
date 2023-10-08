import React from 'react'

const MerchDeetsLoad = () => {
  return (
    <div>
       <div className='bg-white h-[100%]'>

          {/* 1st Row of white container */}
          <div className='flex w-[100%] h-[30vh]'>
            <div className='animate-pulse mt-[2%] ml-[3%]'>
                <div className={`w-[262px] h-[219px] rounded-[50px] bg-gray-300 dark:bg-gray-600 mb-[20px]`}></div>
            </div>

            <div className='animate-pulse ml-[2%] mt-[2.5%] w-[80vw]'>
                <div className='h-[30px] w-[30vw] rounded-lg bg-gray-300 dark:bg-gray-600 mb-[10px]'></div>
                <div className='flex'>
                {/* Left Side */}
                    <div>
                        <div className='flex mt-[0.5%]'>
                            <div className='h-[25px] w-[25vw] rounded-lg bg-gray-300 dark:bg-gray-600 mb-[5px]'></div>
                        </div>
                        <div className='flex items-center mt-[1%] text-[1.1em]'>
                            <div className='h-[25px] w-[25vw] rounded-lg bg-gray-300 dark:bg-gray-600 mb-[10px]'></div>
                        </div>
                        <div className='w-[50vw]'>
                            <div className='h-[25px] w-[25vw] rounded-lg bg-gray-300 dark:bg-gray-600 mb-[10px]'></div>
                        </div>
                        <div className='w-[30vw]'>
                            <div className='h-[25px] w-[25vw] rounded-lg bg-gray-300 dark:bg-gray-600 mb-[10px]'></div>
                        </div>
                    </div>

                    <div className='flex flex-col relative justify-start mt-[-2.5%] mr-[2%] ml-[22%] w-[100%]'>
                          <div className='h-[35px] w-[10vw] rounded-[50px] bg-gray-300 dark:bg-gray-600 mb-[10px]'></div>
                          <div className='h-[35px] w-[10vw] rounded-[50px] bg-gray-300 dark:bg-gray-600 mb-[10px]'></div>
                    </div>
                </div>
            </div>
          </div>

          <hr className='h-[10px] mx-[3%]'/>
          {/* 2nd Row of white container */}
          <div className='animate-pulse ml-[3%]'>
            <div className='h-[35px] w-[20vw] rounded-lg bg-gray-300 dark:bg-gray-600 mb-[10px]'></div>
            <div className='h-[25px] w-[25vw] rounded-lg bg-gray-300 dark:bg-gray-600 mb-[10px]'></div>
            <div className='PublishedPackages mt-[-2%]'>
                <div className="animate-pulse PackageGallery flex flex-row  overflow-x-scroll overflow-y-hidden h-[60vh] mx-20 p-8 rounded-xl">
                    {/* Start */}
                    <div className='h-[100%] w-[21vw] rounded-lg bg-gray-300 dark:bg-gray-600 mt-[1%] mx-[1%]'></div>
                    <div className='h-[100%] w-[21vw] rounded-lg bg-gray-300 dark:bg-gray-600 mt-[1%] mx-[1%]'></div>
                    <div className='h-[100%] w-[21vw] rounded-lg bg-gray-300 dark:bg-gray-600 mt-[1%] mx-[1%]'></div>
                    <div className='h-[100%] w-[21vw] rounded-lg bg-gray-300 dark:bg-gray-600 mt-[1%] mx-[1%]'></div>
                    {/* End */}
                </div> 
            </div>
          </div>

           {/* 3rd Row of white container */}
           <hr className='h-[10px] mx-[3%] mt-[1%]'/>
           <div className='animate-pulse ml-[3%]'>
                <div className='h-[35px] w-[20vw] rounded-lg bg-gray-300 dark:bg-gray-600 mb-[10px]'></div>
                <div className='h-[25px] w-[25vw] rounded-lg bg-gray-300 dark:bg-gray-600 mb-[10px]'></div>
                <div className='h-[25px] w-[25vw] rounded-lg bg-gray-300 dark:bg-gray-600 mb-[10px]'></div>
                <div className='my-[1%] mr-[7%] ml-[4%]'>
                    <div className='h-[90px] w-[full] rounded-lg bg-gray-300 dark:bg-gray-600 mb-[10px]'></div>
                    <div className='h-[90px] w-[full] rounded-lg bg-gray-300 dark:bg-gray-600 mb-[10px]'></div>
                    <div className='h-[90px] w-[full] rounded-lg bg-gray-300 dark:bg-gray-600 mb-[10px]'></div>
                </div>
  
           </div>   
        </div> 
    </div>
  )
}

export default MerchDeetsLoad