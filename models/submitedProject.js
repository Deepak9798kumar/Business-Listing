const mongoose = require("mongoose")

const submiteproject = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    country: {
        type: String
    },
    pnumber: {
        type: Number
    },
    massage: {
        type: String
    },
    budget: {
        type: String
    },
    file: {
        type: String
    },
    // servicesInterested:{
    //     type:String
    // }
})


const submiteprojectData = new mongoose.model("submitedproject", submiteproject)

module.exports = submiteprojectData