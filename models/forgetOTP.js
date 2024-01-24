const mongoose = require('mongoose')


const OTPSchema = new mongoose.Schema({
    email :{
        type:String
    },
    code :{
        type:String
    },
    expireIn:{
        type:String 
    }
})

const forgetOTP = new mongoose.model("forgetOTP", OTPSchema)

module.exports = forgetOTP;