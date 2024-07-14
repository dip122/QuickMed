const { timeStamp } = require('console');
const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    userId : {
        type :  mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true,
    },
    Read : {
        type : Boolean,
        default : false,
    },
    message : {
        type : String,
        default : "",
    }
}, {timestamps : true});

const Notification = mongoose.model('Notify',Schema);

module.exports = Notification;