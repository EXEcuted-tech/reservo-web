const createMerchantValidator = (req,res,next)=>{
    if(req.body.business_name.length < 8 || !req.body.business_name){
        return res.status(400).json({
            success:false,
            error:{text:['business name is invalid']},
        })
    }
    if(req.body.password < 8 || !req.body.password){
        return res.status(400).json({
            success:false,
            error:{text:['account name is invalid']},
        })
    }
    if(req.body.position < 8 || !req.body.position){
        return res.status(400).json({
            success:false,
            error:{text:['account name is invalid']},
        })
    }
}

module.exports = createMerchantValidator;