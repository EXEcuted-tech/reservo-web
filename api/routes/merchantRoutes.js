const express=require('express');
const router = express.Router();
const [createMerchantValidator, editMerchantValidator]=require('../validations/merchantValidator')
const { createMerchant,updateMerchant,retrieveByParams,retrieveAll, deleteMerchant,retrieveCountByParams} = require('../controllers/merchantController');

router.post('/create',createMerchantValidator,createMerchant);
router.post('/update',editMerchantValidator, updateMerchant);
router.get('/retrieve',retrieveByParams);
router.get('/retrieve_all',retrieveAll);
router.post('/delete',deleteMerchant);
router.get('/retrieve_count',retrieveCountByParams);

module.exports = router;
