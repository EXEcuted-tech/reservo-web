const express = require('express');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
const authenticationValidator = (req,res,next)=>{
    if(!req.body.account_email){
        return res.status(400).json({
            success:false,
            error:{text:['email is required']},
        })
    }

    if(!req.body.password){
        return res.status(400).json({
            success:false,
            error:{text:['password is required']},
        })
    }

    if(req.body.password.length < 8){
        return res.status(400).json({
            success:false,
            error:{text:['password is too short']},
        })
    }

    if(req.body.account_name.length < 8 || !req.body.account_name){
        return res.status(400).json({
            success:false,
            error:{text:['account name is invalid']},
        })
    }

    if(!req.body.contact_number){
        return res.status(400).json({
            success:false,
            error:{text:['contact number is empty']},
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
                error:{text:['Err_account Type']},
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
