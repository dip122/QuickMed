const { Certificate } = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    userId : {
        type :  mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true,
    },
    specialization : {
        type : String,
        required : true,
    },
    experience : {
        type : String,
        requried : true,
    },
    fees : {
        type : String,
        required : true,
    },
    isDoctor : {
        type : Boolean,
        default : false,
    },
    Certificate : {
        public_id : {
            type : String,
            requried : true,
        },
        url : {
            type : String,
            requried : true,
        }
    },
    registration : {
        type : String,
        required : true,
    }
}, { timestamps : true });

const DoctorModel = mongoose.model('doctor',Schema);

module.exports = DoctorModel;