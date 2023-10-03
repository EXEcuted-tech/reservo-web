const createPaymentValidator = (req,res,next)=>{
    const { balance } = req.body;

    const errors = {};

    if (!balance || typeof balance !== 'number') {
        errors.balance = ['Balance is required and must be a number'];
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

module.exports = createPaymentValidator;