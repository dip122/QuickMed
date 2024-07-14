const jwt = require('jsonwebtoken');

const GenerateToken = (id)=>{
    const token = jwt.sign({_id : id},process.env.SECRET_KEY,{expiresIn : "2d"});
    return token;
};

const VerifyToken = (token) =>{
    const decode = jwt.verify(token,process.env.SECRET_KEY);
    return decode;
}

module.exports = {GenerateToken , VerifyToken};