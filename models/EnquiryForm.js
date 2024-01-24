const mongoose = require("mongoose")

const enquiryData = new mongoose.Schema({
    name :{
        type :String
    },
    phoneNumber:{
        type:Number
    },
    email:{
        type:String
    }
})

const enquiryDatas = new mongoose.model("enquiryDatas", enquiryData)

module.exports = enquiryDatas