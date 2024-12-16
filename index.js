require('dotenv').config();

const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require("body-parser");
const User = require("./schemas/Users.js");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy= require("passport-local");
const flash = require("connect-flash");

const path = require("path");

const {HoldingsModel} = require("./models/HoldingModels");
const {PostionsModel} = require("./models/PostionsModels")
const {OrderModel} = require("./models/OrderModels");
const mongoose = require("mongoose");
const url= process.env.MONGO_URL;
const PORT = process.env.PORT || 8080;


app.use(cors({
    origin: ["https://zerodha-clone-gamma.vercel.app/","zerodha-dashboard-alpha.vercel.app","https://zerodhabackend-r6a5.onrender.com"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    domain: "zerodha-dashboard-alpha.vercel.app",
    allowedHeaders: ["Content-Type", "Authorization"]
  }))
app.use(bodyParser.json())
app.use(flash());


const sessionOptions = {
      secret: process.env.MONGO_URL;
      resave: "false",
      saveUninitialized: "true",
      cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      }
}

app.use(session(sessionOptions));
// const express = require("express");
// const app = express();
// const PORT =  8080;

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})

app.use(express.static(path.join(__dirname, "frontend", "b")));

app.get("/", (req, res) => {
    console.log("home page");
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});


app.post("/signup", async (req, res) => {
    // res.send("skdjflsdkjfls")
    console.log("successfully");
    try {
        const { username, email, password } = req.body;
        console.log(req.body.username);

        if (!username  ,!password) {
            req.flash("error", "All fields are required.");
            return res.redirect("/signup");
        }

        const newUser = new User({
            username: username,
            email: email,
        });

       let users =  await User.register(newUser, password);
       console.log(users);

        req.flash("success", "Successfully registered.");
        res.json({success: true});
        

    } catch (error) {
        console.error("Error during registration:", error);
        req.flash("error", "There was an issue with your registration. Please try again.");
        res.redirect("/signup");
    }
  
});


app.post("/login",passport.authenticate('local',{failureRedirect: "/login",failureFlash: true}),async(req,res)=>{
   
    res.json({success: true});
    console.log("welcome to home");
})


// app.get("/addholdings",async(req,res)=>{
//      const tempholdings = [
//         {
//           name: "BHARTIARTL",
//           qty: 2,
//           avg: 538.05,
//           price: 541.15,
//           net: "+0.58%",
//           day: "+2.99%",
//         },
//         {
//           name: "HDFCBANK",
//           qty: 2,
//           avg: 1383.4,
//           price: 1522.35,
//           net: "+10.04%",
//           day: "+0.11%",
//         },
//         {
//           name: "HINDUNILVR",
//           qty: 1,
//           avg: 2335.85,
//           price: 2417.4,
//           net: "+3.49%",
//           day: "+0.21%",
//         },
//         {
//           name: "INFY",
//           qty: 1,
//           avg: 1350.5,
//           price: 1555.45,
//           net: "+15.18%",
//           day: "-1.60%",
//           isLoss: true,
//         },
//         {
//           name: "ITC",
//           qty: 5,
//           avg: 202.0,
//           price: 207.9,
//           net: "+2.92%",
//           day: "+0.80%",
//         },
//         {
//           name: "KPITTECH",
//           qty: 5,
//           avg: 250.3,
//           price: 266.45,
//           net: "+6.45%",
//           day: "+3.54%",
//         },
//         {
//           name: "M&M",
//           qty: 2,
//           avg: 809.9,
//           price: 779.8,
//           net: "-3.72%",
//           day: "-0.01%",
//           isLoss: true,
//         },
//         {
//           name: "RELIANCE",
//           qty: 1,
//           avg: 2193.7,
//           price: 2112.4,
//           net: "-3.71%",
//           day: "+1.44%",
//         },
//         {
//           name: "SBIN",
//           qty: 4,
//           avg: 324.35,
//           price: 430.2,
//           net: "+32.63%",
//           day: "-0.34%",
//           isLoss: true,
//         },
//         {
//           name: "SGBMAY29",
//           qty: 2,
//           avg: 4727.0,
//           price: 4719.0,
//           net: "-0.17%",
//           day: "+0.15%",
//         },
//         {
//           name: "TATAPOWER",
//           qty: 5,
//           avg: 104.2,
//           price: 124.15,
//           net: "+19.15%",
//           day: "-0.24%",
//           isLoss: true,
//         },
//         {
//           name: "TCS",
//           qty: 1,
//           avg: 3041.7,
//           price: 3194.8,
//           net: "+5.03%",
//           day: "-0.25%",
//           isLoss: true,
//         },
//         {
//           name: "WIPRO",
//           qty: 4,
//           avg: 489.3,
//           price: 577.75,
//           net: "+18.08%",
//           day: "+0.32%",
//         },
//       ];

//       tempholdings.forEach((item)=>{
//         let newholding = new HoldingsModel({
//             name: item.name,
//             qty: item.qty,
//             avg: item.avg,
//             price: item.price,
//             net: item.net,
//             day: item.day,
//         })
//         newholding.save();
//       })
//       console.log("done")
//       res.send("done");    
//  });


// app.get("/addpositions",async(req,res)=>{

//     const addpositions = [
//         {
//           product: "CNC",
//           name: "EVEREADY",
//           qty: 2,
//           avg: 316.27,
//           price: 312.35,
//           net: "+0.58%",
//           day: "-1.24%",
//           isLoss: true,
//         },
//         {
//           product: "CNC",
//           name: "JUBLFOOD",
//           qty: 1,
//           avg: 3124.75,
//           price: 3082.65,
//           net: "+10.04%",
//           day: "-1.35%",
//           isLoss: true,
//         },
//       ];

//       addpositions.forEach((item)=>{
//         let newpositions = new PostionsModel({
//             product: item.product,
//             name: item.name,
//             qty: item.qty,
//             avg: item.avg,
//             price: item.price,
//             net: item.net,
//             day: item.day,
//             isLoss: item.isLoss,
//         })
//         newpositions.save();
//       })
//       res.send("data updated successfully");

// })


app.get("/allHoldings",async(req,res)=>{
    const allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
})

app.get("/allPositions",async(req,res)=>{
    const allpostions = await PostionsModel.find({});
    res.json(allpostions);
})

app.post("/newOrder",async(req,res)=>{
    let newOrder = await OrderModel({
         name: req.body.name,
         qty : req.body.qty,
         price:  req.body.price,
         mod:  req.body.mod
    })
    newOrder.save();
    res.send("Order saved successfully !")
})

// const ensureAuthenticated = (req, res, next) => {
//     if (req.isAuthenticated()) {
//       return next();
//     }
//     res.redirect("/login"); // Redirect to login if not authenticated
//   };
  
  // Example protected route
//   app.get("/dashboard", ensureAuthenticated, (req, res) => {
//     res.send("Welcome to your dashboard!");
//   });

app.listen(PORT,()=>{
    console.log("listning on port",port);
    mongoose.connect(url)
    console.log("DB Connected")
})
