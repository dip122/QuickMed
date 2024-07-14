const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please provide correect email address")
            }
        }
    },
    description : {
        type : String,
        required : true,
    }
});

const contactModel = mongoose.model('contact',Schema);
module.exports = contactModel;