const express=require('express');
const router = express.Router();
const { retrieveAll } = require('../controllers/merchantSchedController');

router.get('/retrieve_sched',retrieveAll);

module.exports = router;