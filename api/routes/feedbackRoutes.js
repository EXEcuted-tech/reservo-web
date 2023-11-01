const express=require('express');
const router = express.Router();
const createFeedbackValidator=require('../validations/feedbackValidator')
const { createFeedback, updateFeedback,retrieveAll,retrieveByParams,retrieveAverage,retrieveCountByParams} = require('../controllers/feedbackController');

router.post('/create',createFeedbackValidator,createFeedback);
router.post('/update',createFeedbackValidator,updateFeedback);
router.get('/retrieve',retrieveByParams);
router.get('/retrieve_all',retrieveAll);
router.get('/retrieve_avg',retrieveAverage);
router.get('/retrieve_count',retrieveCountByParams);

module.exports = router;
