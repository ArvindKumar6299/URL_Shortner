const express = require("express");
const {handleGeneratenewShortURL} = require('../controllers/url')
const {handleShortId , handleGetAnalytics ,serverSideTest}  = require("../controllers/url")

const router = express.Router();

router.post("/",handleGeneratenewShortURL);

router.get("/:shortId", handleShortId)

router.get('/analytics/:shortId' ,handleGetAnalytics)

// router.get('/test', serverSideTest);

module.exports = router;