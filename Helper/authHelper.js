const bcrypt = require('bcrypt');


const hashedPassword = async(password)=>{
    try{
        const slatrounds = 10;
        const hashedpassword = await bcrypt.hash(password,slatrounds);
        return hashedpassword
    }catch(error){
        console.log(error);
    }
};

const comparepassword = async(password,hashedpassword)=>{
    try{
        const isMatch = await bcrypt.compare(password,hashedpassword)
        if(isMatch)return true;
        return false;
    }catch(error){
        console.log(error);
    }
}

module.exports = {hashedPassword,comparepassword};