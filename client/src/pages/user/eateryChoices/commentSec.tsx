import { Rating } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import config from '../../../common/config';

const CommentSec: React.FC<Feedback> = (props) => {
  const [name,setName] = useState('');
  useEffect(() => {
    retrieveName();
  }, []); 

  const retrieveName = () => {
    const col = "account_id"
    const val = props.account_id;
    axios.get(`${config.API}/user/retrieve?col=${col}&val=${val}`)
    .then((res)=>{
        if(res.data.success == true){
            setName(res.data.users[0].account_name);
        }
    })
  }

  return (
    <div className='bg-white px-[1.5%] drop-shadow-lg pb-[1.5%] mb-[1%] w-[85%] mx-[5%] h-[100%] rounded-2xl'>
        <h1 className='pt-[1%] text-[1.2em] font-medium xl:max-2xl:text-[0.8em]'>{name}</h1>
        <div className='flex items-center'>
            <Rating value={props.rating_value} className="xl:max-2xl:scale-[0.70] xl:max-2xl:ml-[-2%]" readOnly />
            <p className='ml-[0.5%] text-slate-400 text-[0.8em] xl:max-2xl:text-[0.67em] xl:max-2xl:ml-[-1%]'>({props.rating_value} out of 5)</p>
        </div>
        <p className={`${!props.comment && 'text-gray-400 italic xl:max-2xl:text-[0.7em]'}`}>{props.comment ? props.comment : "User did not leave a comment."}</p>
    </div>
  )
}

export default CommentSec