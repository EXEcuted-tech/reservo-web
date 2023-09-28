const express=require('express');
const router = express.Router();
const createPaymentValidator=require('../validations/paymentValidator')
const {createPayment,updatePayment,retrieveAll,retrieveByParams,deletePayment} = require('../controllers/paymentController')

router.post('/create',createPaymentValidator,createPayment);
router.put('/update',createPaymentValidator,updatePayment);
router.get('/retrieve',retrieveByParams);
router.get('/retrieve_all',retrieveAll);
router.delete('/delete',deletePayment);

module.exports = router;
