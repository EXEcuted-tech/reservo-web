const express=require('express');
const router = express.Router();
const createFeedbackValidator=require('../validations/feedbackValidator')
const { createFeedback, updateFeedback,retrieveAll,retrieveByParams } = require('../controllers/feedbackController');

router.post('/create',createFeedbackValidator,createFeedback);
router.post('/update',createFeedbackValidator,updateFeedback);
router.get('/retrieve',retrieveByParams);
router.get('/retrieve_all',retrieveAll);

module.exports = router;
