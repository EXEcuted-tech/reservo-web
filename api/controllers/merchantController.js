const express = require('express');
const db = require('./a_db'); 

const createMerchant = (req,res)=>{
    const { business_name, insert_id,email,position} = req.body;

    const newAccount = {
        [insert_id]: {
          email: email,
          position: position,
          status: 'Pending',
        },
      };

    db.query('SELECT * FROM merchant WHERE merchant_name = ?', [business_name], (error, results) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          success: false,
          error: 'Some error occurred while checking the records',
        });
      }
  
      if (results.length > 0) {
        const existingAccounts = JSON.parse(results[0].accounts);

        const updatedAccounts = { ...existingAccounts, ...newAccount };

        db.query(
          'UPDATE merchant SET accounts = ? WHERE merchant_name = ?',
          [JSON.stringify(updatedAccounts), business_name],
          (updateError, updateResult) => {
            if (updateError) {

              return res.status(500).json({
                status: 500,
                success: false,
                error: 'Error updating existing record',
              });
            }

            if (updateResult.affectedRows > 0) {
              return res.status(200).json({
                status: 200,
                success: true,
                data: updateResult,
              });
            } else {
              return res.status(500).json({
                status: 500,
                success: false,
                error: 'Data update failed',
              });
            }
          }
        );
      } else {
        db.query(
          'INSERT INTO merchant (merchant_name, accounts) VALUES (?, ?)',
          [business_name, JSON.stringify(newAccount)],
          (insertError, insertResult) => {
            if (insertError) {
              
              return res.status(500).json({
                status: 500,
                success: false,
                error: 'Error inserting new record',
              });
            }
            if (insertResult.affectedRows > 0) {
              return res.status(200).json({
                status: 200,
                success: true,
                data: insertResult,
              });
            } else {
              return res.status(500).json({
                status: 500,
                success: false,
                error: 'Data insertion failed',
              });
            }
          }
        );
      }
    });
}

const updateMerchant = (req,res)=>{
    const updatedMerchant = req.body.merchant;

    //objects
    const updatedAddress = req.body.address ? JSON.stringify(req.body.address) : null;
    const updatedSettings = req.body.settings ? JSON.stringify(req.body.settings) : null;
    const updatedAccounts = req.body.accounts ? JSON.stringify(req.body.accounts) : null;
    const updatedForm = req.body.form_deets ? JSON.stringify(req.body.form_deets) : null;
    const merchantId = updatedMerchant.merchant_id;
   
    updatedMerchant.address = updatedAddress;
    updatedMerchant.settings = updatedSettings;
    updatedMerchant.accounts = updatedAccounts;
    updatedMerchant.form_deets = updatedForm;

   
    const columns = Object.keys(updatedMerchant);
    const values = Object.values(updatedMerchant);

    const setClause = columns.map((column) => `${column} = ?`).join(', ');
    // console.log("setClause",setClause,"Values: ",values);
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
    db.query('SELECT * , DATEDIFF(DATE_ADD(date_registered, INTERVAL 30 DAY), CURDATE()) AS days_left FROM merchant', (error, results) => {
        if(error){

            res.status(500).json({error: 'Internal server error'})
        }
        else{
            //extracting objects
            const parsedAddressArray = [];
            const parsedSettingsArray = [];
            const parsedAccountsArray = [];
            for(const result of results){
                const parsedAddress = JSON.parse(result.address);
                const parsedSettings = JSON.parse(result.settings);
                const parsedAccounts = result.accounts && JSON.parse(result.accounts);
                parsedSettingsArray.push(parsedSettings);
                parsedAddressArray.push(parsedAddress);
                parsedAccountsArray.push(parsedAccounts);
            }

            return res.json({
                success:true,
                merchant: results,
                address: parsedAddressArray,
                settings: parsedSettingsArray,
                accounts: parsedAccountsArray,
            })
        }
    })
}

const retrieveByParams = (req,res)=>{
    const { col, val } = req.query;

    db.query('SELECT * FROM merchant WHERE ?? = ?', [col, val], (error, result) => {
        if(error){
            res.status(500).json({error: 'Error retrieving data'})
        }
        else{
            const parsedAddress = result[0].address && JSON.parse(result[0].address);
            const parsedSettings = result[0].settings && JSON.parse(result[0].settings);
            const parsedAccounts = result[0].accounts && JSON.parse(result[0].accounts);
            const parsedForm = result[0].form_deets && JSON.parse(result[0].form_deets);

            return res.status(200).json({
                status: 200,
                success: true,
                merchant: result[0],
                address: parsedAddress,
                settings: parsedSettings,
                accounts: parsedAccounts,
                formDeets: parsedForm,
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

const retrieveCountByParams = (req, res) => {
  const { col, val } = req.query;

  const retrieveSpecific = 'SELECT COUNT(*) AS record_count FROM merchant WHERE ?? = ?';

  db.query(retrieveSpecific, [col, val], (err, row) => {
      if (err) {
          console.error('Error retrieving records:', err);
          return res.status(500).json({ status: 500, success: false, error: 'Error retrieving records' });
      } else {
          const recordCount = row[0].record_count;

          return res.status(200).json({
              status: 200,
              success: true,
              merchCount: recordCount,
          });
      }
  });
};

const retrieveMerchAccountById = (req, res) => {
  const { merchid } = req.query

  const retrieveMerchAccs = 'SELECT accounts AS merchant_accounts FROM merchant WHERE merchant_id = ?'
  db.query(retrieveMerchAccs, [merchid], (err,acc) => {
    if (err){
      console.error('Error retrieve accounts:', err)
      return res.status(500).json({
        status: 500,
        success: false,
        error: 'Error retrieving accounts'
      })
    }else{
      const parsedMerchData = [];
      const accounts = JSON.parse(acc.merchant_accounts)
      for (const accID in accounts){
        if (accounts.hasOwnProperty(accID)){
          const accData = accounts[accID];
          parsedMerchData.push({
            id: accID,
            email: accData.email,
            position: accData.position
          })
        }
      }

      return res.status(200).json({
        status: 200,
        success: true,
        merchData: parsedMerchData 
      })
    }
  })
}

module.exports = {
    createMerchant,
    updateMerchant,
    retrieveAll,
    retrieveByParams,
    deleteMerchant,
    retrieveCountByParams,
    retrieveMerchAccountById
}