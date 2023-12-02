const express = require('express');
const db = require('./a_db'); 

const retrieveAll = (req,res)=>{
    const {col} = req.query
    db.query('SELECT merchant_sched.settings, TIME(merchant_sched.time_open) as open_time, TIME(merchant_sched.time_closed) as close_time FROM merchant_sched JOIN merchant ON merchant.merchant_id = 1 AND merchant_sched.sched_id = merchant.sched_id',[col], (error, results) => {
        if(error){
            res.status(500).json({
                status: 500,
                success: false,
                error: 'Internal server error'
            })
        }else{
            const parsedSettingsArray = [];
            return res.json({
                success:true,
                merchant: results,
            })
        }
    })
}

const createSchedule = (req, res) => {
    const { settings, timeOpen, timeClose, merchID } = req.body;
    const insertQuery = `INSERT INTO merchant_sched (settings, time_open, time_closed) VALUES (?, ?, ?)`;

    db.query(insertQuery, [settings, timeOpen, timeClose], (err, result) => {
        if (err) {
            console.log("ERROR", err);
            return res.status(500).json({ success: false, status: 500, message: 'Failed to Add Schedule!' });
        }

        const schedID = result.insertId;

        const updateQuery = `UPDATE merchant SET sched_id = ? WHERE merchant_id = ?`;

        db.query(updateQuery, [schedID, merchID], (err, response) => {
            if (err) {
                console.log("ERROR", err);
                return res.status(500).json({ success: false, status: 500, message: 'Failed to Update Merchant Schedule ID!' });
            }

            return res.status(200).json({ success: true, status: 200, message: 'Added Schedule!', sched: response });
        });
    });
};

const updateSchedule = (req, res)=>{
    const {schedID, settings, schedStatus, timeOpen, timeClose} = req.body;
    console.log("BODEEHH: ", req.body)
    sql = `UPDATE merchant_sched SET settings = ?, sched_status = ?, time_open = ?, time_closed = ? WHERE sched_id = ?`
    db.query(sql, [settings, schedStatus, timeOpen, timeClose, schedID], (err, response)=>{
        if (err){
            return res.status(200).json({success:true,  status: 500,  message: 'Failed to Update Schedule!'});
        }else{
            console.log(response)
            return res.status(200).json({success:false, status: 200, message: 'Updated Schedule!' });
        }
    })
}

const retrieveByParams = (req, res) => {
    const {col} = req.query;
    const sql = `SELECT merchant_sched.*, merchant.*, merchant_sched.settings AS merchant_sched_settings
    FROM merchant_sched
    JOIN merchant ON merchant.merchant_id = ? AND merchant_sched.sched_id = merchant.sched_id;`
    console.log("SQL: ",sql);
    db.query(sql, [col], (err, response)=>{
        if (err){
            return res.status(200).json({success:false,  status: 500,  message: `Failed to Retrieve Schedule! at ${col} with value ${val}`});
        }else{
            return res.status(200).json({success:true, status: 200, message: response });
        }
    })
}

const retrieveByTwoParams = (req, res) => {
    const {col1, val1, col2, val2} = req.query;
    sql = `SELECT * FROM merchant_sched, merchant WHERE ?? = ? AND ?? = ?`
    db.query(sql, [col1, val1, col2, val2], (err, response)=>{
        if (err){
            return res.status(200).json({success:false,  status: 500,  message: `Failed to Retrieve Schedule! at ${col1} = ${val1} and ${col2} = ${val2}`});
        }else{
            return res.status(200).json({success:true, status: 200, message: response });
        }
    })
}


const deleteSchedByID = (req, res)=> {
    const schedID = req.body.schedID? req.body.schedID: 0;
    sql = `DELETE FROM merchant_sched, merchant WHERE sched_id = ?`;
    db.query(sql, schedID, (err, response)=>{
        if (err){
            return res.status(200).json({success:false,  status: 500,  message: `Failed to Delete! Schedule: ${schedID}`});
        }else{
            return res.status(200).json({success:true, status: 200, message: `Deleted` });
        }
    })
}

const deleteSchedByParams = (req, res)=> {
    const {col, val} = req.body;
    sql = `DELETE FROM merchant_sched, merchant WHERE ?? = ?`;
    db.query(sql, [col, val], (err, response)=>{
        if (err){
            return res.status(200).json({success:true,  status: 500,  message: `Failed to Delete! Schedule: ${col} = ${val}`});
        }else{
            return res.status(200).json({success:false, status: 200, message: `Deleted` });
        }
    })
}


module.exports = {
    retrieveAll,
    createSchedule,
    updateSchedule,
    retrieveByParams,
    retrieveByTwoParams,
    deleteSchedByID,
    deleteSchedByParams,
}