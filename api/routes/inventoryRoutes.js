const express=require('express');
const router = express.Router();
const createInventoryValidator=require('../validations/inventoryValidator')
const {createInventory,updateInventory,retrieveAll,retrieveByParams,deleteInventory} = require('../controllers/inventoryController')

router.post('/create',createInventoryValidator,createInventory);
router.post('/update',createInventoryValidator,updateInventory);
router.get('/retrieve',retrieveByParams);
router.get('/retrieve_all',retrieveAll);
router.post('/delete',deleteInventory);

module.exports = router;
