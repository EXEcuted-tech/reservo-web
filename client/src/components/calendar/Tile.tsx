import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import config from '../../common/config';
import { BiSearchAlt } from "react-icons/bi";
import GenSpinner from '../loaders/genSpinner';
import colors from '../../common/colors';

function Tile(props:{
    year: number,
    month: number,
    day: number,
    today: boolean,
    showReservations: Function,

}) {
    const [isLoading, setIsLoading] = useState(false);
    const [count, setCount] = useState(-1);
    const merchant_id = localStorage.getItem('merch_id');
    useEffect (()=>{
        setIsLoading(true);
       getCount(props.year, props.month, props.day);
       setTimeout(()=>{
        setIsLoading(false);
       }, 50)
       
    }, [props.year, props.month, props.day]);

    const showReservations = () =>{
        props.showReservations();
    }

    const getCount = async (year:number, month:number, day:number)=>{
        try {
            const yy = String(year);
            const mm = String(month+1).padStart(2, '0'); // Ensure two digits for month
            const dd = String(day).padStart(2, '0'); //ensure two digits for day
            const response = axios.get(`${config.API}/reserve/retrievecountparams`, {
              params: {
                col1: 'res_date',
                val1: yy + '-' + mm + '-' + dd,
                col2: 'merchant_id',
                val2: merchant_id,
                orderVal: 'res_time',
                order: 'ASC'
              }
            }).then((response)=>{
                //console.log("COUNT ==> for date:", yy, "-", mm, "-", dd, "-->", response.data.count)
                setCount(response.data.count);
                return;
            });
            
          } catch (err) {
            console.log("AXIOS ERROR!!: ", err);
          } 
          setCount(-2);
    }
  return (
    <div>
      <div onClick={showReservations} className={`border-b-slate-950 border-solid d-flex align-items-end justify-content-end`}>
      <p className=' text-right'>{props.day}</p>
        {isLoading ? <p className='text-center'>...</p> :
          <div className={`flex justify-center duration-200 items-center w-[3vw] h-[3vw] rounded-full ${count > 0? 'bg-yellow-400 hover:bg-yellow-300': ''}`}>
            {count > 0 ? <p>{count}<BiSearchAlt /></p> : <></>}
          </div>
        }
        
       
      </div>
      
    </div>
  )
}

export default Tile
