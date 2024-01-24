const mongoose = require("mongoose")

const getListed = new mongoose.Schema({
    companyName: {
        type: String
    },
    file: {
        type: String
    },
    courses: {
        type: [String]  // Array of strings
    },
    companyFees: {
        type: String
    },
    companyDuration: {
        type: String
    },
    companyLocation: {
        type: String
    },
    companyEmail: {
        type: String
    },
    companyPhone: {
        type: Number
    },
    companyAbout: {
        type: String
    },
    companyReview: {
        type: String
    },
    companyTime: {
        type: String
    },
    companyPlacement: {
        type: String
    },

})



const getListedData = new mongoose.model("getlisteds", getListed)

module.exports = getListedData


