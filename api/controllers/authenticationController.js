const express = require('express');
const db = require('./a_db'); 
const saltRounds = 10;
const bcrypt = require('bcrypt');

const createAccount = async (req, res) => {
    try {
        const { account_name, account_email, password, account_type, contact_number } = req.body;

        const sql = "INSERT INTO account (account_name, email_address, passwd, account_type, contact_number) VALUES (?, ?, ?, ?, ?)";
        const hashedpassword = await bcrypt.hash(password, saltRounds)
        const values = [account_name, account_email, hashedpassword, account_type, contact_number];
        db.query(sql, values, (err, result) => {
            if (err) {
                res.status(404).json({
                    success: false,
                    message: "Account add fail",
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: "Account created successfully",
                    data: result,
                });
            }

        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Database Error",
            error: error.message
        });
    }
}

const login = (req,res)=>{
    try {
        const { account_email, password, account_type } = req.body;

        // Use a parameterized query to prevent SQL injection
        const sql = "SELECT * FROM account WHERE email_address = ?";
        const values = [account_email];
        db.query(sql, values, (err, dbresult) => {
            //console.log("W: " + account_type + " DB: "+dbresult[0].account_type);
            if (!err && dbresult.length === 1){
                if (account_type != dbresult[0].account_type){
                    res.status(200).json({
                        success: false,
                        error: "Account Type Mismatch! Check if you are logging in the right page.",
                    });
                }else{
                    const hash = dbresult[0].passwd;
                    bcrypt.compare(password,hash).then(function(result) {
                        if (result == true){
                            const updateLogin = "UPDATE account SET last_login = CURRENT_TIMESTAMP() WHERE account_id = ?";
                            const accountLogged = [dbresult[0].account_id];

                            db.query(updateLogin, accountLogged, (updateErr) => {
                                if (updateErr) {
                                    console.error("Error updating last_login:", updateErr);
                                }

                                res.status(201).json({
                                    success: true,
                                    message: "Retrieved",
                                    account_info: {
                                        userID: dbresult[0].account_id,
                                        user: dbresult[0].account_name,
                                        email: dbresult[0].email_address,
                                        type: dbresult[0].account_type,
                                        pic: dbresult[0].profile_picture,
                                    },
                                });
                            });
                        }else{
                            res.status(200).json({
                                success: false,
                                error: "Incorrect Credentials",
                            });
                        }
                    });
                }        
            }else{
                res.status(200).json({
                    success: false,
                    error: "Account does not exist!",
                });
            }

            
            
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Database Error",
        });
    }
    
}

module.exports = {
    createAccount,
    login,
}