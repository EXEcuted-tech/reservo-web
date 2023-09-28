const express = require('express');
const db = require('../index'); 

const createMerchant = (req,res)=>{
    res.json({
        success:true,
        data: req.body,
    })
}

const updateMerchant = (req,res)=>{
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

const deleteMerchant = (req,res)=>{

}


module.exports = {
    createMerchant,
    updateMerchant,
    retrieveAll,
    retrieveByParams,
    deleteMerchant
}