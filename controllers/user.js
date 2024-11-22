const {v4: uuidv4} = require("uuid")
const User = require("../models/user")
const {setUser}  = require("../service/auth")

handleUserSignup = async(req,res)=>{
     
    const {name,email,password} = req.body;  
    //create user
    await User.create({
        name,
        email,
        password,
    });
    // return res.json()
    return res.render("/");
}

handleUserLogin = async (req,res) =>{
    const {email, password} = req.body;
    const isUser = await User.findOne({email, password});
    // console.log("User", isUser);
    if(!isUser){
        return res.render("login", {
            error: "Invalid Username or Password",
        });     
    }
    const sessionId = uuidv4();    //session id
    setUser(sessionId, isUser);
    res.cookie("uid", sessionId);   //making cookie -- name of cookie here is - uid and passing -sessionId
    return res.redirect("/");
}

module.exports ={ handleUserSignup , handleUserLogin};