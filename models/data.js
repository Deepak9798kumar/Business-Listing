const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const AdminSchema = new mongoose.Schema({

    name: {
        type: String,

    },
    email: {
        type: String,

    },

    password: {
        type: String,

    }

});

AdminSchema.pre('save', async function (next){
    console.log("in side data.js")
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12)
    }
    next();
})

const admins = new mongoose.model("registers", AdminSchema);  // model


module.exports = admins;



// const courseSchema = new mongoose.Schema({
//     subject:{
//         type:String
//     },
//     ranking:{
//         type:Number
//     },
//     webSiteName:{
//         type:String
//     },
//     url:{
//         type:String
//     }
// })

// const course = new mongoose.model("courses", courseSchema)  // model
// module.exports=course
