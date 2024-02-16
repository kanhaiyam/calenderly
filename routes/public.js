// routes.js
const express = require("express");
const router = express.Router();

const home = require("../controllers/public/HomeController.js");

router.get("/", home.home);
router.get("/second", home.second);

module.exports = router;