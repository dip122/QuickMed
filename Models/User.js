const mongoose = require('mongoose');
const validator = require('validator');

const Schema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true,
        minLength :3,
    },
    lastname : {
        type : String,
        required : true,
        minLength : 3,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid");
            }
        }
    },
    password : {
        type : String,
        required : true ,
        minLength : 6,
    },
    role : {
        type : Number,
        default : 0,
    },
    isDoctor : {
        type : Boolean,
        default : false,
    },
    contact : {
        type : String,
        required : true,
    },
    address : {
        type : String,
        required : true,
    },
    profile_pic : {
        public_id : {
            type : String,
        },
        url : {
            type : String,
        }
    },
    status : {
        type : String,
        default : "pending" //accepted means doctor , pending means not a doctor till now
    }
},{timestamps : true});

const usermodel = new  mongoose.model('user',Schema);
module.exports = usermodel;