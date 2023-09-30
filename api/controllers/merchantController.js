const express = require('express');
const db = require('./a_db'); 

const createMerchant = (req,res)=>{
    const newMerchant = req.body;

    db.query('INSERT INTO merchant (merchant_name,email_address,logo,contact_number,address,settings,sched_id) VALUES (?,?,?,?,?,?,?,?,?,?)',
    [
        newMerchant.merchant_name,
        newMerchant.email_address,
        newMerchant.logo,
        newMerchant.contact_number,
        JSON.stringify(newMerchant.address),
        JSON.stringify(newMerchant.settings),
        newMerchant.sched_id
    ], 
    (error, result) => {
        if(error){
            console.log("error inserting data", error);
            return res.status(500).json({
                status: 500,
                success: false, 
                error: 'Error inserting data'
            });
        }
        if(result.affectedRows > 0){
            return res.status(200).json({
              status: 200,
              success: true,
              data: result,
            });
        } 
        else{
            return res.status(500).json({ 
                status: 500, 
                success: false, 
                error: 'Data insertion failed' 
            });
        }
    }
    )
}

const updateMerchant = (req,res)=>{
    const updatedMerchant = req.body;

    const columns = Object.keys(updatedMerchant);
    const values = Object.values(updatedMerchant);

    const setClause = columns.map((column) => `${column} = ?`).join(', ');

    db.query(`UPDATE merchant SET ${setClause} WHERE merchant_id = ?`, [...values, merchantId],
    (error, result) => {
        if(error){
            console.error('Error updating merchant:', error);
            return res.status(500).json({
                status: 500,
                success: false,
                error: 'Error updating merchant',
            });
        }
    
        if(result.affectedRows > 0){
            return res.status(200).json({
                status: 200,
                success: true,
                data: result,
            });
        }
        else{
            return res.status(404).json({
                status: 404,
                success: false,
                error: 'Merchant not found',
            });
        }
    });
}


const retrieveAll = (req,res)=>{
    db.query('SELECT * FROM merchant', (error, results) => {
        if(error){
            console.log("error retrieving data");
            res.status(500).json({error: 'Internal server error'})
        }
        else{
            //extracting objects
            const parsedAddressArray = [];
            const parsedSettingsArray = [];
            for(const result of results){
                const parsedAddress = JSON.parse(result.address);
                const parsedSettings = JSON.parse(result.settings);
                parsedSettingsArray.push(parsedSettings);
                parsedAddressArray.push(parsedAddress);
            }

            return res.json({
                success:true,
                merchant: results,
                address: parsedAddressArray,
                settings: parsedSettingsArray
            })
        }
    })
}

const retrieveByParams = (req,res)=>{
    const { column, value } = req.query;
    db.query('SELECT * FROM merchant WHERE ?? = ?', [column, value], (error, result) => {
        if(error){
            console.log("error retrieving data");
            res.status(500).json({error: 'Error retrieving data'})
        }
        else{
            const parsedAddress = JSON.parse(result[0].address);
            const parsedSettings = JSON.parse(result[0].settings);

            return res.status(200).json({
                status: 200,
                success: true,
                merchant: result[0],
                address: parsedAddress,
                settings: parsedSettings
            })
        }
    })
}

const deleteMerchant = (req,res)=>{
    const { merch_id } = req.body;
    db.query('DELETE FROM merchant WHERE merchant_id = ?', merch_id,
    (error, result) => {
        if (error) {
            console.error('Error deleting data:', error);
            return res.status(500).json({ 
                status: 500, 
                success:false,
                error: 'Error deleting data' 
            });
        }
        else{
            return res.status(200).json({
                status: 200,
                success: true,
                data: result,
            });
        }
    });
}


module.exports = {
    createMerchant,
    updateMerchant,
    retrieveAll,
    retrieveByParams,
    deleteMerchant
}