const express=require('express');
const router = express.Router();
const createReserveValidator=require('../validations/reserveValidator')
const {createReserve,retrieveAll,retrieveByParams,updateReserve,deleteReserve}=require('../controllers/reserveController')

router.post('/create',createReserveValidator,createReserve);
router.post('/update',createReserveValidator,updateReserve);
router.get('/retrieve',retrieveByParams);
router.get('/retrieve_all',retrieveAll);
router.post('/delete',deleteReserve);

module.exports = router;
