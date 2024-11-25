const express = require("express");
const path = require("path");
const connectDb = require("./connection");
const URL = require("./models/url");
const cookieParser = require("cookie-parser");
const {checkForAuthentication , restrictTo} = require("./middlewares/auth")

const staticRoute = require("./routes/staticRouter");
const  urlRoute = require("./routes/url")
const  userRoute = require("./routes/user");

const app = express();
const PORT = 8000;

connectDb("mongodb://localhost:27017/short-url")
// .then(()=> console.log("MongoDb connected"));

app.use(express.json());  //middleware to parse incoming body
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthentication);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

// app.get("/test", async(req,res)=> {
//     const allUrls = await URL.find({});
//     return res.render('home' ,{
//         urls: allUrls,
//     })
// });

app.use("/url",restrictTo(["NORMAL" , "ADMIN"]), urlRoute);    //restrictTo(["NORMAL"]) ensures that only users with the role "NORMAL" can access the route. 
app.use("/",staticRoute);
app.use("/user", userRoute);


app.listen(PORT,(err)=>{
    if(err) console.log(err)
        console.log(`Server is running at PORT: ${PORT}`)
})