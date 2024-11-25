const jwt = require("jsonwebtoken");
const secret = "Arvind$6299@$";


//this function will create token for me
function setUser(user){
    const payload = {
       _id: user._id,
       email: user.email,
       role: user.role,
        // ...user,
    }
    return jwt.sign(payload, secret )
}

function getUser(token){
    if(!token) return null;
    try {
        return jwt.verify(token, secret); //verify the token with the secret
    } catch (error) {
        console.error("JWT verification error:", error.message);
        return null;
    }
   
    
}

module.exports = {setUser,getUser};