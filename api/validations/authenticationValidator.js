const express = require('express');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

//I-object ni nako ang mga errors later - kath

const authenticationValidator = (req,res,next)=>{
    if(!req.body.account_email){
        return res.status(400).json({
            success:false,
            error:'Email is required'
        })
    }

    if(!req.body.password){
        return res.status(400).json({
            success:false,
            error:'Password is required'
        })
    }

    if(req.body.password.length < 8){
        return res.status(400).json({
            success:false,
            error:'Password is too short'
        })
    }

    if(req.body.account_name.length < 5 || !req.body.account_name){
        return res.status(400).json({
            success:false,
            error:'Account name is invalid'
        })
    }

    if(!req.body.contact_number){
        return res.status(400).json({
            success:false,
            error:'Contact number is empty'
        })
    }

    switch(req.body.account_type){
        case 1:
        case 10:
        case 50:
            break;
        default:
            return res.status(400).json({
                success:false,
                error:'Account Type Does not Exist'
            })
    }
    next();
}

const loginValidator = (req, res, next) => {
    if (!req.body.account_email) {
        return res.status(400).json({
            success: false,
            error: { text: ['Email is required'] },
        });
    }

    if (!req.body.password) {
        return res.status(400).json({
            success: false,
            error: { text: ['Password is required'] },
        });
    }

    if (req.body.password.length < 8){
        return res.status(400).json({
            success: false,
            error: { text: ['Password is too short'] },
        });
    }

    next();
}

module.exports = [authenticationValidator, loginValidator];
