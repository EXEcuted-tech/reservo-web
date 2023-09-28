const express = require('express');
const db = require('../index'); 

const createInventory = (req,res)=>{
    res.json({
        success:true,
        data: req.body,
    })
}

const updateInventory = (req,res)=>{
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

const deleteInventory = (req,res)=>{

}

module.exports = {
    createInventory,
    updateInventory,
    retrieveAll,
    retrieveByParams,
    deleteInventory,
}