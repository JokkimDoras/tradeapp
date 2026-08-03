const valiadateNews = (req,res,next) => {
    const authHeader = req.headers.authorizarion;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({
            success:false,
            message:'Unauthorized Invalid Token'
        })
    }


}

module.exports = {valiadateNews}