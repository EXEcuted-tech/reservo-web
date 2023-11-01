const express=require('express');
const router = express.Router();
const createReserveValidator=require('../validations/reserveValidator')
const {retrievecountnparams, retrieveNParams, retrieveThreeParams, retrieveCountLikeByTwoParams, retrieveCountLikeByThreeParams, createReserve,retrieveAll,retrieveByParams,retrieveByTwoParams,updateReserve,deleteReserve,retrieveLikeByTwoParams, retrieveCountByParams, retrieveCountByTwoParams, retrieveCountByThreeParams, retrieveBookingsByMonth}=require('../controllers/reserveController')

router.post('/create',createReserveValidator,createReserve);
router.post('/update',updateReserve);
router.get('/retrieve',retrieveByParams);
router.get('/retrieve_all',retrieveAll);
router.post('/delete',deleteReserve);

router.get('/retrieveTwo',retrieveByTwoParams);
router.get('/retrieveLikeTwo',retrieveLikeByTwoParams);
router.get('/retrievecount', retrieveCountByParams);
router.get('/retrieveCountLikeTwo', retrieveCountLikeByTwoParams)
router.get('/retrievecountparams', retrieveCountByTwoParams);
router.get('/retrievecount3params', retrieveCountByThreeParams);
router.get('/retrieveCountLikeThree', retrieveCountLikeByThreeParams)
router.get('/retrieveThree', retrieveThreeParams)
router.get('/retrievebooks', retrieveBookingsByMonth);
router.get('/retrievenparams', retrieveNParams);
router.get('/retrievecountnparams', retrievecountnparams)


module.exports = router;
