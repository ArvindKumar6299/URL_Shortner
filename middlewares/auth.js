const {getUser} = require("../service/auth")


function checkForAuthentication(req,res,next){
    const tokenCookie = req.cookies?.token;
    
    req.user = null;
    if(!tokenCookie)  return next();
    
    const token = tokenCookie;
     const user =  getUser(token);

     req.user = user;
     return next();
}

function restrictTo(roles=[]){
    return function(req, res, next){
        if(!req.user) return res.redirect("/login");

        if(!roles.includes(req.user.role)) return res.end("UnAuthorized");

        next();
    }
}

// async function restrictToLoggedinUserOnly(req,res,next){

//     // const userUid = req.cookies?.uid;
//     const userUid = req.headers['authorization']  //

//     if(!userUid) return res.redirect("/login");
//     const token = userUid.split('Bearer ')[1];  //
//     // const user = getUser(userUid); 
//     const user = getUser(token);

//     if(!user) return res.redirect("/login");

//     req.user = user;  //attach user to teh request object
//     next();
// }

// async function checkAuth(req , res, next){
//     // const userUid = req.cookies?.uid;
//     const userUid = req.headers['authorization']  //
    
//     if (!userUid || !userUid.startsWith('Bearer ')) { // Check if header exists and has 'Bearer'
//         req.user = null; // Set user to null if the header is invalid
//         return next(); // Continue to the next middleware
//     }
//     const token = userUid.split('Bearer ')[1];  //

//     const user = getUser(token);  //verify the token

//     req.user = user;
//     next();  // pass the control to the next middleware
// }

module.exports = {checkForAuthentication , restrictTo};