import React from 'react'

const MerchCardLoad = () => {
  return (
    <div>
      <div className={`flex h-[25vh]`}>
          <div role="status" className="flex rounded animate-pulse">
              <div>
                  <div className={`w-[262px] h-[219px] rounded-[50px] bg-gray-300 dark:bg-gray-600 mb-[20px]`}></div>
              </div>

              <div className='ml-[3%] mt-[0.5%] w-[80vw]'>
                <div className='h-[30px] w-[30vw] rounded-lg bg-gray-300 dark:bg-gray-600 mb-[10px]'></div>

                <div className='flex'>
                    {/* Left Side */}
                    <div>
                        <div className='flex'>
                          <div className='h-[25px] w-[20vw] rounded-lg bg-gray-300 dark:bg-gray-600 mb-[10px]'></div>
                        </div>
                        <div className='flex items-center mt-[1%] text-[1.1em]'>
                          <div className='h-[25px] w-[25vw] rounded-lg bg-gray-300 dark:bg-gray-600 mb-[10px]'></div>
                        </div>
                        <div className='w-[30vw]'>
                          <div className='h-[35px] w-[30vw] rounded-lg bg-gray-300 dark:bg-gray-600 mb-[5px]'></div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className='ml-[3%]'>
                        <div className='h-[25px] w-[25vw] rounded-lg bg-gray-300 dark:bg-gray-600 mb-[10px]'></div>
                        <div className='h-[25px] w-[25vw] rounded-lg bg-gray-300 dark:bg-gray-600 mb-[10px]'></div>
                    </div>

                    <div className='flex justify-end mt-[9%] mr-[2%] w-[100%]'>
                        <div className='h-[25px] w-[5vw] rounded-lg bg-gray-300 dark:bg-gray-600 mr-[10px]'></div>
                        <div className='h-[25px] w-[5vw] rounded-lg bg-gray-300 dark:bg-gray-600'></div>
                    </div>
                </div>
              </div>
             {/* Last */}
          </div>
      </div>
    </div>
  )
}

export default MerchCardLoad 