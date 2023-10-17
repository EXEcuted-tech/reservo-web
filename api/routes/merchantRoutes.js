const express=require('express');
const router = express.Router();
const createMerchantValidator=require('../validations/merchantValidator')
const { createMerchant,updateMerchant,retrieveByParams,retrieveAll, deleteMerchant,retrieveCountByParams, retrieveMerchAccountById } = require('../controllers/merchantController');

router.post('/create',createMerchantValidator,createMerchant);
router.post('/update',createMerchantValidator,updateMerchant);
router.get('/retrieve',retrieveByParams);
router.get('/retrieve_all',retrieveAll);
router.post('/delete',deleteMerchant);
router.get('/retrieve_count',retrieveCountByParams);
router.get('/retrieve_accounts',retrieveMerchAccountById);

module.exports = router;
