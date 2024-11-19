const  shortid = require("shortid");
const URL = require("../models/url")

handleGeneratenewShortURL = async(req,res) =>{

    const body = req.body;
    if(!body.url) return res.status(400).json({error: "url is required"})

     const shortID = shortid();

     await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
     });
     
     return res.render("home", { id: shortID})
    //  return res.json({id: shortID});
}



handleShortId = async(req,res) =>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{$push: {
       visitHistory: {
        timestamp: Date.now()
       }, 
    }});
     res.redirect(entry.redirectURL);
}

handleGetAnalytics= async(req,res) =>{
    const shortId = req.params.shortId;  //shortID se database meh query kiya
    const result =  await URL.findOne({shortId});

    return res.json({
        totalClicks: result.visitHistory.length,
         analytics: result.visitHistory,
   });
}

serverSideTest = (req,res) => {
    return res.send("<h1> Hey from SErver </h1>")
}


module.exports = {handleGeneratenewShortURL ,handleShortId ,handleGetAnalytics , serverSideTest};

// use of nanoid = here we pass length and it provide same length word or string