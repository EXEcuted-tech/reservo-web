const express = require('express');
const db = require('./a_db'); 

const createPayment = (req,res)=>{
    res.json({
        success:true,
        data: req.body,
    })
}

const updatePayment = (req,res)=>{
    res.json({
        success:true,
        data:[{id:1,text:'Testing Purposes Only'}]
    })
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

const deletePayment = (req,res)=>{

}

module.exports = {
    createPayment,
    updatePayment,
    retrieveAll,
    retrieveByParams,
    deletePayment,
}