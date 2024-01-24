const express = require("express")
const app = express()
const cors = require("cors")
const dbConnect = require("./db/connection")
const router = require("./routes/router")
const bodyParser = require('body-parser');
const admins = require("./models/data")

// In your .mjs file
const dotenv = require('dotenv');
dotenv.config()



const port = process.PORT || 8000



app.use(cors());

app.use(express.json());

dbConnect()
app.get("/", (req, res) => {
    res.send("hello")
})

app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));


// -----------------------register------------------------
// app.post("/register", async (req, res) => {
//     try {
//         const user = await admins.create({
//             name: req.body.name,
//             email: req.body.email,
//             password: req.body.password,
//             cpassword: req.body.cpassword
//         });
//         res.send(user);
//     } catch (error) {
//         res.status(500).json(error)
//     }
// })


// ---log in -----

// app.post(
//     "/LogIn",
//     async (req, res) => {
//         const { email, password } = req.body;


//         console.log('Received email:', email);
//         console.log('Received password:', password);


//         const errors = validationResult(req);

//         if (!errors.isEmpty()) {
//             return res.status(400).json({ "error": errors.array() });
//         }
//         // const { email, password } = req.body;
//         console.log('Received login request with email:', email, 'and password:', password);
//         try {
//             console.log('Received login request for email:', email);
//             let user = await admins.findOne({ email });
//             if (!user) {
//                 console.log('User not found for email:', email);
//                 return res
//                     .status(400)
//                     .json({ "error": "please log in with correct details" });
//             }
//             const passwordcompare = await bcrypt.compare(password, user.password);
//             console.log('user password', typeof (user.password), passwordcompare)

//             if (password !==user.password) {
//                 console.log('Password does not match for email:', passwordcompare);
//                 return res
//                     .status(400)
//                     .json({ "error": "please log in with correct password" });
//             }


//             const data = {
//                 user: {
//                     id: user.id,
//                 },
//             };

//             const authtoken = await jwt.sign(data, JWT_SECRET);
//             console.log(authtoken + " and " + JWT_SECRET);


//             res.send({ "success": true, "user": user, "authToken": authtoken })
//         } catch (error) {
//             res.status(500).send({ "error": "some error occured" });
//         }
//     }
// );



// --------------------------python course------------------------------------

const course = require("./models/pythonSchema.js")
app.post("/courses", async (req, res) => {
    try {

        const addingconpanydata = new course(req.body)
        console.log(req.body)
        addingconpanydata.save();
        res.send(addingconpanydata)
    } catch (error) {
        console.log(error);
    }
})







// app.get("/courses", async (req, res) => {

//     // const searchTerm = req.query.q.toLowerCase();

//     // console.log("user search : ", searchTerm)     

//     try {
//         const searchTerm = req.query.q.toLowerCase();

//         console.log("user search : ", searchTerm)

//         const searchResults = await course.find({});
//         let storedata = searchResults
//         console.log("store data is ", storedata)
//         if (searchTerm) {

//             // Apply filter based on the searchTerm
//             filterStoreData = storedata.filter(item => {
//                 // Modify the condition as needed based on your data structure
//                 console.log('item =', item.courses, searchTerm, item.courses === searchTerm)
//                 return (
//                     item.courses === searchTerm // Example condition
                    
//                 )
//             });
//             console.log("filter store =", filterStoreData)

//         }



//         res.json({ "filterStoreData": filterStoreData, "storedata": storedata }); // it give the response to the front end  and send the all recevied value 

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "An error occurred" });
//     }

// });



// ------------------end to get particular courses-------------------------------

// ------------------Filter particular courses from DB-------------------------------



// otp varification

app.get("/courses", async (req, res) => {
    try {
        const searchTerm = req.query.q.toLowerCase();
        console.log("user search : ", searchTerm);

        const searchResults = await course.find({});
        let storedata = searchResults;
        console.log("store data ",storedata)

        if (searchTerm) {
            // Filter the data to find courses that match the searchTerm
            const filteredCourses = storedata.filter(item => {
                // Modify the condition as needed based on your data structure
                console.log('item =', item.courses, searchTerm, item.courses.includes(searchTerm))
                return item.courses.includes(searchTerm);
            });

            if (filteredCourses.length > 0) {
                // If matching courses are found, send them to the client
                res.json({ "filterStoreData": filteredCourses, "storedata": storedata }); // it give the response to the front end  and send the all recevied value 
                
            } else {
                // If no matching courses are found, you can send a message to the client
                res.json({ message: "No matching courses found."});
            }
        } else {
            // If no search term is provided, send the entire data to the client
            res.json({ "storedata": storedata });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    }
});





app.use("/user", router)












// ----------------------------live port------------------------------------------------

app.use(router)

// app.use('/',router)

app.listen(port, () => {
    console.log(`server is running at port no. ${port}`);
})