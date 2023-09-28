import { Rating } from '@mui/material'
import React from 'react'

const CommentSec: React.FC<ReviewProps> = (props) => {
  return (
    <div className='bg-white px-[1.5%] drop-shadow-lg pb-[1.5%] mb-[1%] w-[85%] mx-[5%] h-[100%] rounded-2xl'>
        <h1 className='pt-[1%] text-[1.2em] font-medium'>{props.customerName}</h1>
        <div className='flex items-center'>
            <Rating value={props.rating} readOnly />
            <p className='ml-[0.5%] text-slate-400 text-[0.8em]'>({props.rating} out of 5)</p>
        </div>
        <p className=''>{props.comment}</p>
    </div>
  )
}

export default CommentSec