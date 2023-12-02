const express = require('express');
const app = express();

const createSchedValidator = (req,res,next)=>{
    console.log("REQUEST PAYLOAD: \n", req.body)

    if((req.body.timeOpen || req.body.timeClose) == null || ''){
        return res.status(200).json({success:false, status: 400, message: 'Time is invalid' });
    }
    next();
}

const retrieveParamsValidator = (req, res, next)=>{
    switch(req.query.col){
        case 'sched_id':
        case 'settings':
        case 'time_open':
        case 'time_closed':
            if (req.query.val1 && req.query.val2){
                next();
            }
            break;
        default:
            return res.status(200).json({success: false, status: 400, message: "Bad Request"})
    }
}


const retrieveTwoParamsValidator = (req, res, next)=>{
    switch(req.query.col1){
        case 'sched_id':
        case 'settings':
        case 'time_open':
        case 'time_closed':
            break;
        default:
            return res.status(200).json({success: false, status: 400, message: "Bad Request"})
    }
    switch(req.query.col2){
        case 'sched_id':
        case 'settings':
        case 'time_open':
        case 'time_closed':
            break;
        default:
            return res.status(200).json({success: false, status: 400, message: "Bad Request"})
    }

    if (req.query.val1 && req.query.val2){
        next();
    }
}

const deleteParamsValidator = (req, res, next)=>{
    switch(req.body.col){
        case 'sched_id':
        case 'settings':
        case 'time_open':
        case 'time_closed':
            break;
        default:
            return res.status(200).json({success: false, status: 400, message: "Bad Request"})
    }
    if (req.body.val){
        next();
    }
}

module.exports = [createSchedValidator, retrieveParamsValidator, retrieveTwoParamsValidator, deleteParamsValidator];