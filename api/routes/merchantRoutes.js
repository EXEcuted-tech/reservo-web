const express=require('express');
const router = express.Router();
const createMerchantValidator=require('../validations/merchantValidator')
const { createMerchant,updateMerchant,retrieveByParams,retrieveAll, deleteMerchant,} = require('../controllers/merchantController');

router.post('/create',createMerchantValidator,createMerchant);
router.post('/update',createMerchantValidator,updateMerchant);
router.get('/retrieve',retrieveByParams);
router.get('/retrieve_all',retrieveAll);
router.post('/delete',deleteMerchant);

module.exports = router;
