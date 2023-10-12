import React, { useEffect, useState } from 'react'
import Rating from '@mui/material/Rating';

const RatingModal: React.FC<MerchDeetsBackProps> = (props) => {
  const {setOpenRatingMod} = props;
  const [urlPart, setUrlPart] = useState('');
  
  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    if (pathParts.length >= 3) {
      setUrlPart(pathParts[2]);
    }
  }, [window.location.pathname,urlPart]);
  
  return (
    <div>
       <form className='animate-fade-in font-poppins fixed left-[35%] top-[35%] w-[100%] h-[100%] z-[100] overflow-auto drop-shadow bg-[rgba(0, 0, 0, 0.5)]'>
        <div className="bg-white w-[30%] p-4 text-center border border-black rounded-2xl">
            <div className='flex items-center'>
            <div className='w-[95%] text-center'>
                <h2 className='text-[1.5em] ml-[5%] text-black font-bold'>Rate Your Experience</h2>
            </div>
            <div>
            <span className="float-right font-bold text-[#aaa] text-[1.9em]
                hover:text-black hover:no-underline hover:cursor-pointer transition-colors delay-450 duration-[3000] ease-in-out transform scale-100"
                onClick={()=>{
                  if(urlPart === 'book'){
                    window.location.reload();
                  }else{
                    setOpenRatingMod(false)
                  }
                }}
                >&times;</span>
            </div>
          </div>
          <div>
            <p className='mt-[-0.6%] mb-[3%] text-lg'>Providing a feedback will help us improve our business.</p>
          </div>
          <div className="mb-[2%]">
            <Rating name='simple-controlled' size="large" value={null}/>
          </div>
          <div>
            <textarea className='w-[90%] border mb-[3%]' rows ={5} cols ={50} name = "feedback" placeholder="Enter feedback here..."> </textarea>
          </div>
          <button className='bg-green-600 text-white rounded-lg h-[2.5rem] w-[25%] p-[1%] mb-[2%] cursor-pointer hover:bg-green-700 transition-colors delay-450 duration-[3000] ease-in-out transform scale-100'>Submit Review</button>
        </div>
        </form>
    </div>
  )
}

export default RatingModal
