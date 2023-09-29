const express = require('express');
const db = require('./a_db'); 

const updateUser = (req,res)=>{
    try {
        const { account_email} = req.body;

        // Use a parameterized query to prevent SQL injection
        const sql = "SELECT * FROM account WHERE email_address = ?";
        const values = [account_email];
        db.query(sql, values, (err, dbresult) => {
            if (!err && dbresult.length === 1){
                const hash = dbresult[0].passwd;
            bcrypt.compare(password,hash).then(function(result) {
                if (result == true){
                    res.json({
                        success: true,
                        message: "Retrieved",
                        userID: dbresult[0].account_id,
                        user: dbresult[0].account_name,
                    });
                }else{
                    res.json({
                        success: false,
                        message: "Incorrect Credentials",
                    });
                }
            });
                
        }else{
            console.log(err);
        }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Database Error",
        });
    }
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

module.exports = {
    updateUser,
    retrieveAll,
    retrieveByParams,
}