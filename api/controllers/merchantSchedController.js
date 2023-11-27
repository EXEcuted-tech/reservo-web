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
    
module.exports = {
    retrieveAll,
}