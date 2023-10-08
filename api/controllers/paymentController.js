const express = require('express');
const db = require('./a_db'); 

const createPayment = (req,res)=>{
  const {balance} = req.body;
    
  const insertPay = 
  'INSERT INTO payment (balance,payment_status) VALUES (?,?)';

  const payment_status= 'PENDING'

  const data = [balance,payment_status]
  db.query(insertPay, data, (err, result) => {
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

const updatePayment = (req,res)=>{
  const {total_expense,balance,payment_status,payment_date} = req.body;
    
  const updatePay = 
  'UPDATE payment SET total_expense=?,balance=?,payment_status=?,payment_date=? WHERE payment_id=?';

  const data = [total_expense,balance,payment_status,payment_date]
  db.query(updatePay, data, (err, result) => {
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

const retrieveAll = (req,res)=>{
  const retrieveRecs = 'SELECT * FROM payment'

  db.query(retrieveRecs, (err, rows) => {
    if (err) {
      console.error('Error retrieving all records:', err);
      return res.status(500).json({ status: 500, success:false,error: 'Error retrieving all records' });
    }else{
      return res.status(200).json({
        status: 200,
        success: true,
        data: rows,
      });
    }
  });
}

const retrieveByParams = (req,res)=>{
  const { col, val } = req.query; 

  const retrieveSpecific = 'SELECT * FROM payment WHERE ?? = ?';

  db.query(retrieveSpecific, [col,val],(err, row) => {
    if (err) {
      console.error('Error retrieving records:', err);
      return res.status(500).json({ status: 500, success:false,error: 'Error retrieving records' });
    }else{
      return res.status(200).json({
        status: 200,
        success: true,
        data: row,
      });
    }
  });
}

const deletePayment = (req,res)=>{
  const {pay_id} = req.body;

  const deleteQuery = 'DELETE FROM payment WHERE payment_id = ?';

  db.query(deleteQuery, pay_id,(err, result) => {
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

const retrieveCountByParams = (req, res) => {
  const { col, val } = req.query;

  const retrieveSpecific = 'SELECT COUNT(*) AS record_count FROM payment WHERE ?? = ?';

  db.query(retrieveSpecific, [col, val], (err, row) => {
      if (err) {
          console.error('Error retrieving records:', err);
          return res.status(500).json({ status: 500, success: false, error: 'Error retrieving records' });
      } else {
          const recordCount = row[0].record_count;

          return res.status(200).json({
              status: 200,
              success: true,
              payCount: recordCount,
          });
      }
  });
};

module.exports = {
    createPayment,
    updatePayment,
    retrieveAll,
    retrieveByParams,
    deletePayment,
    retrieveCountByParams
}