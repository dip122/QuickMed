const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    userId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'user',
        requried : true,
    },
    doctorId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'user',
        requried : true,
    },
    date : {
        type : String,
        requried : true,
    },
    time : {
        type : String,
        requried : true,
    },
    status : {
        type : String,
        default : "pending"
    }
}, { timestamps : true });

const appointmodel = mongoose.model('appoint',Schema);

module.exports = appointmodel;