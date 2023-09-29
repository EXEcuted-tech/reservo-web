const createPackageValidator = (req,res,next)=>{
    const {pack_name,pack_desc,date_start,date_end,time_start,time_end,visibility,list,imgUrl,tags,merch_id} = req.body;
    if(!req.body.text){
        return res.json({
            success:false,
            error:{text:['text is required']},
        })
    }
}

module.exports = createPackageValidator;