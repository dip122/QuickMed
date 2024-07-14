const { VerifyToken } = require("../Config/Token");

const requireSignIn = async(req,res,next)=>{
    try{
        const token = req.headers.authorization;
        if(!token){
            return res.status(200).send({
                success : false,
                message : "token is not received"
            })
        }
        const decode = VerifyToken(token);
        // console.log(decode);
        req.user = decode;
        next();
    }catch(error){
        return res.status(500).send({
            success : false,
            message : "Server side error in case of middleware",
            error
        })
    }
}

module.exports = {requireSignIn}