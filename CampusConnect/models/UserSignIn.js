const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSignIn = new Schema({
    email:{
        type: String, required: true, unique: true
    },
    password:{
        type: String,
        required: true
    },
    userType:{
        type: String,
        enum:['student', 'teacher'] 
    },
    university:{
        type:String,
        enum:['FST', 'ENIT', 'FSEG']
       

    },
    fullName:{
        type:String
        
    },
    profileImage:{
        type:String
    },
    verificationCode: {
        type: String,
        default: null
    },
    dateCreated:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('UserSignIn', userSignIn);