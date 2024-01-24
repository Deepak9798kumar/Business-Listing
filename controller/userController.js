// Adjust the path as needed
const usergetListedLoginData = require('../models/usergetListedLogin'); 
const enquiryDatas = require("../models/EnquiryForm") 
const forgetOTP = require("../models/forgetOTP")
const LoginSchema = require("../models/data")
const nodemailer = require('nodemailer');


// Send OTP to user
const dotenv = require('dotenv');
dotenv.config()

const messagebird = require('messagebird').initClient(process.env.MessageBird_API_KEY);

exports.userLogin = async (req, res) => {
    const {phonenumber} = req.body
    const newPhoneNumber = "+91"+ phonenumber
    var params = {
        templete:"Your Top Software Company Varification  OTP is %token",
        timeout:300
    };
    messagebird.verify.create(newPhoneNumber,params,
        (err,response) => {
            if(err){
                return console.log("OTP send error is : ",err)
                res.status(200).send({"status":"failed","message":"Unable to send OTP"})
            }
            console.log( "OTP send reponse :",response)
            res.status(200).send({ "status": "success", "message": "OTP Send Successfully","id":response.id })
        }
        )





    // res.status(200).send({ message: "OTP Send Successfully" });
};





// user get Listed Login Data Start 
exports.userListedLogin = async (req,res) =>{
    try{
        const listedLogin = await usergetListedLoginData.create({
            businessName: req.body.businessName,
            services: req.body.services,
            city: req.body.city,
            phoneNumber: req.body.phoneNumber
        });
        res.send(listedLogin);
       

    }catch(error){

        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while processing your request." });
    }
}

// user get Listed Login Data end 
// Enquiry Data filled
exports.enquireDatas = async (req,res)=>{
    try{
        const enquireData = await enquiryDatas.create({
            name:req.body.name,
            phoneNumber:req.body.phoneNumber,
            email:req.body.email

        });
        res.send(enquireData);
    } catch (error){
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while processing your request." });

    }
}





// forget Password throught the email  

// exports.emailSand = async (req,res) =>{
//     console.log(req.body.email)
//     const emailData = await LoginSchema.findOne({email:req.body.email})
//     console.log("emailData is :",emailData)
//     const responseType = {};
//     console.log("show the response :",responseType)
//     if(emailData){
//         let otpCode = Math.floor((Math.random()*10000)+1)
//         let otpData = new forgetOTP({
//             email:req.body.email,
//             code:otpCode,
//             expireIn:new Date().getTime()+300*1000 
//         })
//         console.log("otp Data send to the user",otpData)
//         let otpResponse = await otpData.save();
//         console.log("otp Reaponse :",otpResponse)
//         responseType.statusText = 'Success'
//         responseType.message = 'OTP is Send Successfully Please Check Your Email id '
//     }else{
//         responseType.statusText = 'error'
//         responseType.message = 'Email id is not Exist'  
//     }
//     res.status(200).json(responseType)
// }

// change Pass word

// exports.changePassword = async (req, res) => {
//     console.log("email:", req.body.email);
   
  
//     let changePass = await forgetOTP.find({ email: req.body.email, code: req.body.code })
//     console.log("Change password :",changePass)
//     const response = {}
//     console.log("response",response)

//     if(changePass){
//         let currentTime = new Date().getTime();
//         let diff = changePass.expireIn - currentTime;

//         if(diff < 0){
//             response.message = 'Token Expire'
//             response.statusText = 'error'
//         }else{
//             let user = await LoginSchema.findOne({email:req.body.email})
//             console.log("user pass",user)
//             user.password = req.body.password
//             user.save();
//             response.message = 'password Change Successfully'
//             response.statusText = 'success'
//         }
//     }else{
//         response.message = 'invalid Otp'
//         response.statusText = 'error'

//     }
//     res.status(200).json(response)
// }

// exports.changePassword = async (req, res) => {
//     let email = await forgetOTP.findOne({ email: req.body.email })
//     console.log("email from forget otp :" , email)

//     let changePass = await forgetOTP.find({ email: req.body.email,code:req.body.code });
//     console.log("Change password:", changePass);
//     const response = {};
//     console.log("response", response);

//     if (changePass) {
//         let currentTime = new Date().getTime();
//         let diff = changePass.expireIn - currentTime;

//         if (diff < 0) {
//             response.message = 'Token Expire';
//             response.statusText = 'error';
//             console.log("diffrence time")
//         } else {
//             let user = await LoginSchema.findOne({email: req.body.email});
//             console.log("user pass", user);

//             if (user) {
//                 user.password = req.body.password;
//                 user.save();
//                 response.message = 'Password Change Successfully';
//                 response.statusText = 'success';
//             } else {
//                 response.message = 'User not found';
//                 response.statusText = 'error';
//             }
//         }
//     } else {
//         response.message = 'Invalid OTP';
//         response.statusText = 'error';
//         console.log("invalid otp")
//     }
//     res.status(200).json(response);
// }





// Node mailer 

// const nodemailer = require("nodemailer");

//  const mailer = (email,otp)=>{

//   let transporter = nodemailer.createTransport({
//     service:"gmail",
//     port:587,
//     secure:true,
//     auth :{
//         user:'nayakvinay855@gmail.com',
//         pass :'989898'
//     }
//   })
//   let mailOptions ={
//       from:'nayakvinay855@gmail.com',
//       to:'hello@gmail.com',
//       subject:'sending Email using node.js',
//       text :"Thanks you "
//   }
//      transporter.sendMail(mailOptions,function(error,info){
//         if(error){
//             console.log(error)
//         }else{
//             console.log('Email sent :' + info.response)
//         }
//      })


//  }




// module.exports = mailer;




