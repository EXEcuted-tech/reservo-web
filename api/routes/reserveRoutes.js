const express=require('express');
const router = express.Router();
const createReserveValidator=require('../validations/reserveValidator')
const {createReserve,retrieveAll,retrieveByParams,retrieveByTwoParams,updateReserve,deleteReserve, retrieveCountByParams, retrieveCountByTwoParams, retrieveCountByThreeParams, retrieveBookingsByMonth}=require('../controllers/reserveController')

router.post('/create',createReserveValidator,createReserve);
router.post('/update',createReserveValidator,updateReserve);
router.get('/retrieve',retrieveByParams);
router.get('/retrieve_all',retrieveAll);
router.post('/delete',deleteReserve);

router.get('/retrieve/:col1/:val1/:col2/:val2/:orderVal/:order',retrieveByTwoParams);
router.get('/retrievecount', retrieveCountByParams);
router.get('/retrievecountparams', retrieveCountByTwoParams);
router.get('retrievecount3params', retrieveCountByThreeParams);
router.get('/retrievebooks', retrieveBookingsByMonth);


module.exports = router;
