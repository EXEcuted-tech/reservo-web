const express=require('express');
const router = express.Router();
const createReserveValidator=require('../validations/reserveValidator')
const {createReserve,getReserve}=require('../controllers/reserveController')

router.post('/create',createReserveValidator,createReserve);
router.get('/retrieve',getReserve);

module.exports = router;
