const {isValidDate,isValidTime}=require('../helpers/date-time')

const createReserveValidator = (req,res,next)=>{
    const { date, timestart, location, size, adddeets, acc_id, merch_id, sched_id, pack_id, pay_id } = req.body;

    const errors = {};

    if (!date || !isValidDate(date)) {
        errors.date = ['Date is required and must be a valid date (YYYY-MM-DD)'];
    }
    if (!timestart || !isValidTime(timestart)) {
        errors.timestart = ['Start time is required and must be a valid timestamp'];
    }
    if (!location || typeof location !== 'string') {
        errors.location = ['Location is required and must be a string'];
    }
    if (!size || typeof size !== 'number') {
        errors.size = ['Event Size is required and must be a number'];
    }
    if (!acc_id || typeof acc_id !== 'number') {
        errors.acc_id = ['User Account is required and must be a number'];
    }
    if (!merch_id || typeof merch_id !== 'number') {
        errors.merch_id = ['Merchant is required and must be a number'];
    }
    if (!pack_id || typeof pack_id !== 'number') {
        errors.pack_id = ['Package is required and must be a number'];
    }
    if (!pay_id || typeof pay_id !== 'number') {
        errors.pay_id = ['Payment is required and must be a number'];
    }


    if (Object.keys(errors).length > 0) {
        return res.json({
            status: 404,
            success: false,
            error: errors,
        });
    }

    next();
}

module.exports = createReserveValidator;