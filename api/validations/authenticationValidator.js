const express = require('express');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

//I-object ni nako ang mga errors later - kath

const authenticationValidator = (req,res,next)=>{
    let error = "";

    if(!req.body.account_name || req.body.account_name.length < 5){
        error = 'Account name is invalid'
    }

    if(!req.body.account_email){
       error = 'Email is required'
    }

    if(!req.body.password){
       error = 'Password is required'
    }

    if(req.body.password && req.body.password.length < 8){
        error = 'Password is too short'
    }

    if(!req.body.contact_number){
        error = 'Contact number is empty'
    }

    switch(req.body.account_type){
        case 1:
        case 10:
        case 50:
            break;
        default:
          error = 'Account Type Does not Exist'
    }

    if (error !== '') {
        return res.json({
            status: 404,
            success: false,
            error: error,
        });
    }
    next();
}

const loginValidator = (req, res, next) => {
    let error = "";
    
    if (!req.body.account_email) {
        error = 'Email is required'
    }

    if (!req.body.password) {
        error = 'Password is required'
    }

    if (error !== '') {
        return res.json({
            status: 404,
            success: false,
            error: error,
        });
    }
    next();
}

module.exports = [authenticationValidator, loginValidator];
