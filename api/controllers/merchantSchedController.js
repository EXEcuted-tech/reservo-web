const express = require('express');
const db = require('./a_db'); 

const retrieveAll = (req,res)=>{
    const merchID = req.query
    db.query('SELECT merchant_sched.settings, merchant_sched.sched_status, merchant_sched.time_open, merchant_sched.time_closed FROM merchant, merchant_sched WHERE merchant.merchant_id = ? AND merchant.sched_id = merchant_sched.sched_id',[merchID], (error, results) => {
        if(error){
            res.status(500).json({
                status: 500,
                success: false,
                error: 'Internal server error'
            })
        }
        else{
            //extracting objects
            const parsedSettingsArray = [];
            for(const result of results){
                const parsedSettings = JSON.parse(result.settings);
                parsedSettingsArray.push(parsedSettings)
            }

            return res.json({
                success:true,
                merchant: results,
                settings: parsedSettings,
            })
        }
    })
}

const createSchedule = (req, res)=>{
    const {settings, schedStatus, timeOpen, timeClose} = req.body;
    sql = `INSERT INTO merchant_sched (settings, sched_status, time_open, time_closed) VALUES (?, ?, ?, ?)`;
    db.query(sql, [settings, schedStatus, timeOpen, timeClose], (err, response)=>{
        console.log("ERROR", err)
        if (err){
            return res.status(200).json({success:false,  status: 500,  message: 'Failed to Add Schedule!'});
        }else{
            return res.status(200).json({success:true, status: 200, message: 'Added Schedule!' });
        }
        
    })
}

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
    sql = `SELECT * FROM merchant_sched, merchant WHERE merchant.merchant_id = ? AND merchant_sched.sched_id = merchant.sched_id`
    db.query(sql, [col], (err, response)=>{
        if (err){
            return res.status(200).json({success:true,  status: 500,  message: `Failed to Retrieve Schedule! at ${col} with value ${val}`});
        }else{
            return res.status(200).json({success:false, status: 200, message: response });
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