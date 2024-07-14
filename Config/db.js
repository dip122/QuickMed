
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL_DB,{
        });

        console.log("mongoDB successfully connected");
        console.log(`mongoDB is running at ${conn.connection.port}`);
    }catch(error){
        console.log(error);
    }
}

module.exports = connectDB;