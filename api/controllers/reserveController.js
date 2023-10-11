const express = require('express');
const db = require('./a_db'); 

const createReserve = (req,res)=>{
    const {date,timestart,location,size,settings,adddeets,acc_id,merch_id,sched_id,pack_id,pay_id,invent_id} = req.body;
    
    const insertQuery = 
    'INSERT INTO reservation (res_date,res_time,res_location,date_received,party_size,settings,additional_details,account_id,merchant_id,sched_id,package_id,payment_id,inventory_id,status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

    const date_received = new Date();
    const status = "Ongoing";
    const data = [date,timestart,location,date_received,size,settings,adddeets,acc_id,merch_id,sched_id,pack_id,pay_id,invent_id,status]
    try{
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
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ status: 500, success: false, error: 'An error occurred' });
  }
}

const updateReserve = (req,res)=>{
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
  const retrieveRecs = 'SELECT * FROM reservation'

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
  const { orderVal, order }= req.body;

  const orderValue = orderVal ? orderVal : col;
  const orderBy = order ? order : 'ASC';
  console.log("SQL Syntax: ", col,val,orderValue,orderBy);
  const retrieveSpecific = `SELECT * FROM reservation WHERE ?? = ? ORDER BY ${orderValue} ${orderBy}`;

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

  const retrieveSpecific = 'SELECT COUNT(*) as count FROM reservation WHERE ?? = ?';

  db.query(retrieveSpecific, [col, val], (err, rows) => {
    if (err) {
      console.error('Error retrieving records:', err);
      return res.status(500).json({
         status: 500, 
         success: false, 
         error: 'Error retrieving records' 
        });
    } else {
      // Extract the count from the result
      const count = rows[0].count;

      return res.status(200).json({
        status: 200,
        success: true,
        count: count,
      });
    }
  });
};

const retrieveBookingsByMonth = (req, res) =>{
  const { year, merchID } = req.query

  const retrieveYear = 'SELECT YEAR(date_received) as year, MONTH(date_received) as month, COUNT(*) as books FROM reservation WHERE YEAR(date_received) = ? AND merchant_id = ? GROUP BY reservation.date_received;'

  db.query(retrieveYear,[year , merchID], (err,books) => {
    if (err) {
      console.error('Error retrieving records:', err)
      return res.status(500).json({
        status: 500,
        success: false,
        error: err.message()
      })
    }else{
      const count = books

      return res.status(200).json({
        status: 200,
        success: true,
        count: count,
      })
    }
  })
}

const retrieveCountByTwoParams = (req, res) => {
  const { col1, val1, col2, val2 } = req.query;

  const retrieveSpecific = 'SELECT COUNT(*) as count FROM reservation WHERE ?? = ? AND ?? = ?';

  db.query(retrieveSpecific, [col1, val1, col2, val2], (err, rows) => {
    if (err) {
      console.error('Error retrieving records:', err);
      return res.status(500).json({
         status: 500, 
         success: false, 
         error: 'Error retrieving records' 
        });
    } else {
      // Extract the count from the result
      const count = rows[0].count;

      return res.status(200).json({
        status: 200,
        success: true,
        count: count,
      });
    }
  });
};

const retrieveCountByThreeParams = (req, res) => {
  const { col1, val1, col2, val2, col3, val3 } = req.query;

  const retrieveSpecific = 'SELECT COUNT(*) as count FROM reservation WHERE ?? = ? AND ?? = ? AND ??  = ?';

  db.query(retrieveSpecific, [col1, val1, col2, val2, col3, val3], (err, rows) => {
    if (err) {
      console.error('Error retrieving records:', err);
      return res.status(500).json({
         status: 500, 
         success: false, 
         error: 'Error retrieving records' 
        });
    } else {
      // Extract the count from the result
      const count = rows[0].count;

      return res.status(200).json({
        status: 200,
        success: true,
        count: count,
      });
    }
  });
};

const deleteReserve = (req,res)=>{
  const {res_id} = req.body;

  const deleteQuery = 'DELETE FROM reservation WHERE reservation_id = ?';

  db.query(deleteQuery, res_id,(err, result) => {
    if (err) {
      console.error('Error deleting record:', err);
      return res.status(500).json({ status: 500, success:false,error: 'Error deleting records' });
    }else{
      return res.status(200).json({
        status: 200,
        success: true,
        data: result,
      });
    }
  });
}

module.exports = {
    createReserve,
    updateReserve,
    retrieveAll,
    retrieveByParams,
    deleteReserve,
    retrieveCountByParams,
    retrieveCountByTwoParams,
    retrieveCountByThreeParams,
    retrieveBookingsByMonth
}