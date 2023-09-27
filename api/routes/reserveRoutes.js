const express=require('express');
const router = express.Router();
const createReserveValidator=require('../validations/reserveValidator')
const {createReserve,getReserve}=require('../controllers/reserveController')

router.post('/api',createReserveValidator,createReserve);
router.get('/api',getReserve);

module.exports = router;
