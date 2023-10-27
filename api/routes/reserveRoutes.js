const express=require('express');
const router = express.Router();
const createReserveValidator=require('../validations/reserveValidator')
const {createReserve,retrieveAll,retrieveByParams,retrieveByTwoParams,updateReserve,deleteReserve,retrieveLikeByTwoParams, retrieveCountByParams, retrieveCountByTwoParams, retrieveCountByThreeParams, retrieveBookingsByMonth}=require('../controllers/reserveController')

router.post('/create',createReserveValidator,createReserve);
router.post('/update',updateReserve);
router.get('/retrieve',retrieveByParams);
router.get('/retrieve_all',retrieveAll);
router.post('/delete',deleteReserve);

router.get('/retrieveTwo',retrieveByTwoParams);
router.get('/retrieveLikeTwo',retrieveLikeByTwoParams);
router.get('/retrievecount', retrieveCountByParams);
router.get('/retrievecountparams', retrieveCountByTwoParams);
router.get('/retrievecount3params', retrieveCountByThreeParams);
router.get('/retrievebooks', retrieveBookingsByMonth);


module.exports = router;
