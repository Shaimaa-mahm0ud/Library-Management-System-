exports.errhandler=(err,req,res,next)=>{
    const msg = err.message
    res.status(500).json({error:msg})
}