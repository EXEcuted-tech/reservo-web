const createInventoryValidator = (req,res,next)=>{
    console.log(req.body.test)
    if (typeof req.body.test !== 'string') {
        return res.json({
          success: false,
          error: { text: ['value should be text'] },
        });
      }
    next()
}

module.exports = createInventoryValidator;