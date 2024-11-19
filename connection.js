const mongoose = require("mongoose")

connectDb = async (url) =>{
    return mongoose.connect(url)
     .then(()=> console.log(`Database connected successfully!`))
     .catch((err)=> console.log(err))
    
}



module.exports = connectDb;