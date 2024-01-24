const express = require("express")
const multer = require('multer');
const UserController = require("../controller/userController")
const userOTP = require("../controller/userOTP")
const app = express()
const bcrypt = require("bcryptjs")
const router = express.Router();
const admins = require("../models/data")
const getListedData = require("../models/getlisted")
const submitedproject = require("../models/submitedProject")
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
JWT_SECRET = "mmm"






//-------------------------------Start Register router--------------------------------------------

// router.post("/register", async (req, res) => {
//     try {
//         const user = await admins.create({
//             name: req.body.name,
//             email: req.body.email,
//             password: req.body.password,

//         });
//         await user.save()
//         res.send(user);
//     } catch (error) {
//         res.status(500).json(error)
//     }
// })

router.post("/register", async (req, res) => {

    const { email } = req.body; // Extract email from the request body

    
    try {
        const existingUser = await admins.findOne({ email });

        if (existingUser) {
            // Email is already registered
            return res.status(400).json({ message: "Email already registered" });
        }
     
        const user = await admins.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,

        });
        await user.save()
        res.send(user);
    } catch (error) {
        res.status(500).json(error)
    }
})




router.post("/LogIn", async (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ "error": errors.array() });
    }

    console.log('Received login request with email:', email, 'and password:', password);
    try {
        console.log('Received login request for email:', email);
        let user = await admins.findOne({ email });
        if (!user) {
            console.log('User not found for email:', email);
            return res
                .status(400)
                .json({ "error": "User not found for email" });
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {

            return res
                .status(400)
                .json({ "error": "please log in with correct password" });
        }


        const data = {
            user: {
                id: user.id,
            },
        };

        const authtoken = await jwt.sign(data, JWT_SECRET);
        console.log(authtoken + " and " + JWT_SECRET);


        res.send({ "success": true, "user": user, "authToken": authtoken })
    } catch (error) {
        res.status(500).send({ "error": error.message });
    }
}
);

//-----------------------End LogIN Router----------------------------------------

//-----------------------start Get Listed  Router----------------------------------------

//------------------------ multer start----------------

const uploadimg = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads/")
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }

    })
}).single("file")

//-------------------multer end-------------------

router.post("/getlisted", uploadimg, async (req, res) => {
    try {
        const {
            companyName, courses, companyFees, companyDuration, companyLocation, companyEmail, companyPhone, companyAbout, companyReview, companyTime, companyPlacement } = req.body;

        const newUser = new getListedData({ companyName, courses, companyFees, companyDuration, companyLocation, companyEmail, companyPhone, companyTime, companyAbout, companyPlacement, companyReview, file: req.file.filename });
        console.log("Received request:", req.body);
        const savedUser = await newUser.save();
        console.log("New user:", savedUser);
        res.send({ status: 200, savedUser: savedUser })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});


//----------------------------------- multer   code another ways-----------------------------

// Set up Multer to handle image uploads other ways
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/"); // Specify the destination folder for uploaded files
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     },
// });
// const upload = multer({ storage: storage });


// ---------------------------multer  code ianother ways---------------------------------





//-----------------------End Get listed  Router----------------------------------------



// -----------------------submited project Router start----------------------------------------
router.post("/submitedproject", uploadimg, async (req, res) => {
    try {
        const {
            name, email, country, pnumber, message, budget, } = req.body;

        const newUser = new submitedproject({ name, email, country, pnumber, message, budget, servicesInterested, file: req.file.filename });
        console.log("Received request:", req.body);
        const savedUser = await newUser.save();
        console.log("New user:", savedUser);
        res.send({ status: 200, savedUser: savedUser })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});



// -----------------------submited project Router end----------------------------------------


// otp varification start 

router.post('/getListedLogin', UserController.userLogin)


// otp varification end


// user get Listed Login Data Start 

router.post("/getListedLoginData", UserController.userListedLogin)

// Enquiry Data 
router.post("/enqiryData", UserController.enquireDatas)


// user get Listed Login Data end 


router.post("/emailsend", userOTP.emailSand)

router.post("/changepassword", userOTP.changePassword)








module.exports = router;