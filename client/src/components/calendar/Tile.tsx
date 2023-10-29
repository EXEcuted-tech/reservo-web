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
    setIsLoading: Function,
    isLoading: boolean,

}) {

    const [count, setCount] = useState(0);
    const merchant_id = localStorage.getItem('merch_id');
    useEffect (()=>{
       getCount(props.year, props.month, props.day);
       setTimeout(()=>{
        
       }, 50)
       
    }, [props.year, props.month, props.day, window.location.pathname]);

    const showReservations = () =>{
        props.showReservations();
    }

    const getCount = async (year:number, month:number, day:number)=>{
      props.setIsLoading(true);
        try {
          const urlPart = window.location.pathname.split("/");
          var filter:string = '%';
          switch (urlPart[2]){
            case 'upcoming':
                filter = 'Ongoing%'
                break
            case 'finished':
                filter = 'Finished%';
                break;
            default:
                 break;
          }
            const yy = String(year);
            const mm = String(month+1).padStart(2, '0'); // Ensure two digits for month
            const dd = String(day).padStart(2, '0'); //ensure two digits for day
            axios.get(`${config.API}/reserve/retrievecountnparams`, {
              params: {
                cols: `res_date AS res_date, COUNT(*) as count`,
                condition: `merchant_id = ${merchant_id} AND status LIKE '${filter}' AND res_date = '${yy}-${mm}-${dd}' `
              }
            }).then((response)=>{
                //console.log("COUNT ==> for date:", yy, "-", mm, "-", dd, "-->", response.data.data[0].count)
                setCount(response.data.data[0].count);
                props.setIsLoading(false);
                return;
            });
            
          } catch (err) {
            console.log("AXIOS ERROR!!: ", err);
          } 
          setCount(-1);
          props.setIsLoading(false)
    }
  return (
    <div>
      <div onClick={showReservations} className={`border-b-slate-950 border-solid d-flex align-items-end justify-content-end`}>
      <p className=' text-right'>{props.day}</p>
        {props.isLoading ? <p className='text-center'>...</p> :
          <div className={`flex justify-center duration-200 items-center w-[3vw] h-[3vw] rounded-full ${count > 0? 'bg-yellow-400 hover:bg-yellow-300': ''}`}>
            {count > 0 ? <p>{count}<BiSearchAlt /></p> : <></>}
          </div>
        }
        
       
      </div>
      
    </div>
  )
}

export default Tile
