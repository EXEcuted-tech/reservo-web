const express = require('express');
const db = require('./a_db'); 

const createFeedback = (req,res)=>{
    const {date,timestart,location,size,settings,adddeets,acc_id,merch_id,sched_id,pack_id,pay_id,invent_id} = req.body;
    
    const insertQuery = 
    'INSERT INTO reservation (res_date,res_time,res_location,date_received,party_size,settings,additional_details,account_id,merchant_id,sched_id,package_id,payment_id,inventory_id,status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

    const date_received = new Date();
    const status = "Ongoing";
    const data = [date,timestart,location,date_received,size,settings,adddeets,acc_id,merch_id,sched_id,pack_id,pay_id,invent_id,status]
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
        return res.status(500).json({ status: 500, success: false, error: 'Record insertion failed' });
      }
    });
}

const updateFeedback = (req,res)=>{
  const {date,timestart,location,size,settings,adddeets,acc_id,merch_id,sched_id,pack_id,pay_id,res_id,invent_id,status} = req.body;
    
  const updateQuery = 'UPDATE reservation SET res_date=?,res_time=?,res_location=?,party_size=?,settings=?,additional_details=?,account_id=?,merchant_id=?,sched_id=?,package_id=?,payment_id=?,inventory_id=?,status=? WHERE reservation_id=?'

  const data = [date,timestart,location,size,settings,adddeets,acc_id,merch_id,sched_id,pack_id,pay_id,invent_id,status,res_id]
  db.query(updateQuery, data, (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).json({ status: 500, success:false,error: 'Error updating data' });
    }

    if (result.affectedRows > 0) {
      return res.status(200).json({
        status: 200,
        success: true,
        data: result,
      });
    } else {
      return res.status(500).json({ status: 500, success: false, error: 'Updating record failed' });
    }
  });
}

const retrieveAll = (req,res)=>{   
  const retrieveRecs = 'SELECT * FROM feedback'

  db.query(retrieveRecs, (err, rows) => {
    if (err) {
      console.error('Error retrieving all records:', err);
      return res.status(500).json({ status: 500, success:false,error: 'Error retrieving all records' });
    }else{
      return res.status(200).json({
        status: 200,
        success: true,
        records: rows,
      });
    }
  });
}

const retrieveByParams = (req,res)=>{
  const { col, val } = req.query; 

  const retrieveSpecific = 'SELECT * FROM feedback WHERE ?? = ?';

  db.query(retrieveSpecific, [col,val],(err, row) => {
    if (err) {
      console.error('Error retrieving records:', err);
      return res.status(500).json({ status: 500, success:false,error: 'Error retrieving records' });
    }else{
      return res.status(200).json({
        status: 200,
        success: true,
        records: row,
      });
    }
  });
}
const retrieveCountByParams = (req, res) => {
  const { col, val } = req.query;

  const retrieveSpecific = 'SELECT COUNT(*) AS record_count FROM feedback WHERE ?? = ?';

  db.query(retrieveSpecific, [col, val], (err, row) => {
      if (err) {
          console.error('Error retrieving records:', err);
          return res.status(500).json({ status: 500, success: false, error: 'Error retrieving records' });
      } else {
          const recordCount = row[0].record_count;

          return res.status(200).json({
              status: 200,
              success: true,
              ratingCount: recordCount,
          });
      }
  });
};

const retrieveAverage = (req,res)=>{
  const { merch_id } = req.query; 

  const retrieveSpecific = 'SELECT AVG(rating_value) FROM feedback WHERE merchant_id = ?';

  db.query(retrieveSpecific, [merch_id],(err, result) => {
    if (err) {
      console.error('Error retrieving average:', err);
      return res.status(500).json({ status: 500, success:false,error: 'Error retrieving records' });
    }else{
      return res.status(200).json({
        status: 200,
        success: true,
        average: result,
      });
    }
  });
}



module.exports = {
    createFeedback,
    updateFeedback,
    retrieveAll,
    retrieveByParams,
    retrieveAverage,
    retrieveCountByParams,
}