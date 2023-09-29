const express = require('express');
const db = require('./a_db'); 

const createReserve = (req,res)=>{
    const {date,timestart,location,size,settings,adddeets,acc_id,merch_id,sched_id,pack_id,pay_id} = req.body;
    
    const insertQuery = 
    'INSERT INTO reservation (res_date,res_time,res_location,date_received,party_size,settings,additional_details,account_id,merchant_id,sched_id,package_id,payment_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';

    const date_received = new Date();
    const data = [date,timestart,location,date_received,size,settings,adddeets,acc_id,merch_id,sched_id,pack_id,pay_id]
    db.query(insertQuery, data, (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ status: 500, success:false,error: 'Error inserting data' });
      }
  
      if (result.affectedRows > 0) {
        return res.status(200).json({
          status: 200,
          success: true,
          data: result,
        });
      } else {
        return res.status(500).json({ status: 500, success: false, error: 'Data insertion failed' });
      }
    });
}

const updateReserve = (req,res)=>{
    res.json({
        success:true,
        data:[{id:1,text:'Testing Purposes Only'}]
    })
}

const retrieveAll = (req,res)=>{
    res.json({
        success:true,
        data:[{id:1,text:'Testing Purposes Only'}]
    })
}

const retrieveByParams = (req,res)=>{
    res.json({
        success:true,
        data:[{id:1,text:'Testing Purposes Only'}]
    })
}

const deleteReserve = (req,res)=>{

}

module.exports = {
    createReserve,
    updateReserve,
    retrieveAll,
    retrieveByParams,
    deleteReserve,
}