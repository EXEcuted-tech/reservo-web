const createMerchantValidator = (req,res,next)=>{
    const errors = {};

    if(!req.body.business_name || req.body.business_name.length < 8){
        errors.business_name= 'Business name is invalid'
    }
    // if(req.body.password < 8 || !req.body.password){
    //     return res.status(400).json({
    //         success:false,
    //         error:{text:['account name is invalid']},
    //     })
    // }

    //change this to switch
    if(!req.body.position || req.body.position < 8){
        errors.position= 'Position is invalid'
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

module.exports = createMerchantValidator;