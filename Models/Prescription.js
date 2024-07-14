const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true,
    },
    DoctorName : {
        type : String,
        requried : true,
    },
    Medicines : {
        type : String,
    },
    Date : {
        type : Date,
        required : true,
    },
    image : {
        public_id : {
            type : String,
            requried : true,
        },
        url : {
            type : String,
            requried : true,
        }
    }
},{timestamps : true});

const presmodel = mongoose.model('pres',Schema);
module.exports = presmodel;