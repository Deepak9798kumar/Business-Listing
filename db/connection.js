const mongoose = require("mongoose")


// Connect to MongoDB
async function dbConnect(){
    mongoose.connect("mongodb+srv://sdeepakncy:deepaksharma@cluster0.sdlfzzw.mongodb.net/Listing")
    .then(()=> console.log("Mongodb Connect"))
    .catch((err)=> console.log("Mongo Error", err))
}

module.exports = dbConnect;