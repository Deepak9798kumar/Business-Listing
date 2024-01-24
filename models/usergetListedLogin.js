const mongoose = require("mongoose")

const usergetListedLogin = new mongoose.Schema({
    businessName:{
        type:String
    },
    services:{
        type:String
    },
    city:{
        type:String
    },
    phoneNumber:{
        type:Number
    }

})

const usergetListedLoginData = new mongoose.model("usergetListedLogin", usergetListedLogin)

module.exports = usergetListedLoginData