const usergetListedLoginData = require('../models/usergetListedLogin');
const forgetOTP = require("../models/forgetOTP")
const LoginSchema = require("../models/data")
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken');




// Create a transporter for sending email


const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service provider
    auth: {
        user: 'vinaynayak525@gmail.com', // Your email address
        pass: 'trbd fike dwdw lcbm', // Your email password or app-specific password
    },
});

// Define a route for sending OTP emails
exports.emailSand = async (req, res) => {
    const { email } = req.body;
    console.log("email from client :", email)

    // Generate a random OTP (you can use a library like 'crypto' for this)
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    console.log("Random OTP Create :", otp);

    // Create a token from the OTP
    const token = jwt.sign({ otp }, 'NPfG7TZh607tRUIuMzP9SK8IA'); // Replace 'your-secret-key' with a secure secret key
    console.log("token is genrated :",token)

    

    // Email configuration
    const mailOptions = {
        from: 'vinaynayak525@gmail.com', // Sender's email address
        to: email, // Recipient's email address
        subject: 'OTP for Password Reset', // Email subject
        text: `hello there  Your OTP is: ${otp}`, // Email body (plain text)
    };

    const emailMatch = await LoginSchema.findOne({ email: req.body.email })
    console.log("email store  from the server :", emailMatch)
    if (emailMatch === null) {
        console.log("user not register please register first")
        res.status(500).json({ message: 'user not register please register first' })
    }else {

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: 'Failed to send OTP email' });
            } else {
                const match = emailMatch.email
                console.log("only email :", match)
                if (email === match) {
                    console.log('Email sent: ' + info.response);
                    res.status(200).json({ message: 'Success', otp, token });
                }
            }
        });
    };

}


// ----------------------------end for otp send-------------------------

// -------------------------------start for saving password-----------------------------


// Route for resetting a user's password


exports.changePassword = async (req, res) => {
    const {email,password } = req.body;
    console.log("newPassword from client site :", password)
    console.log("forget  email :",email)
   

    try {
        // Change password save 
        const findEmail = await LoginSchema.findOne({ email: req.body.email })
        console.log("find email :",findEmail)


        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Update the user's password in the database (replace 'User' with your user model)
        await LoginSchema.findOneAndUpdate({ email }, { $set: { password: hashedPassword } });

        res.status(200).json({ status: 'Success', message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Error', message: 'An error occurred while resetting the password' });
    }
};



