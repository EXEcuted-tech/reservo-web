const createReserveValidator = (req,res,next)=>{
    if(!req.body.text){
        return res.json({
            success:false,
            error:{text:['text is required']},
        })
    }
}

module.exports = createReserveValidator;