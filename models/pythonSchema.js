const mongoose = require("mongoose");



const courseSchema = new mongoose.Schema({
    name: {
        type: String
    },
    img:{
        type:String
    },
    ranking:{
        type: Number
    },
    Budget:{
        type: String
    },
    duration:{
        type: String
    },
    location:{
        type: String
    },
    mobile:{
        type: Number
    },
    email:{
        type :String
    },
    url:{
        type : String
    },
    courses:{
        type: [String]  // Array of strings
    },
    city: {
        type: String
    },
    budget: {
        type: String
    },
    placement:{
        type:String
    },
    time:{
        type: String
    }

})

const course = new mongoose.model("courses", courseSchema)  // model
module.exports = course
