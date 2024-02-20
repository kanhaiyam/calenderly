// routes.js
const express = require("express");
const router = express.Router();
const { validateSignUpRequest } = require('../middleware/validators/validateSignUp.js'); 

const homeController = require("../controllers/public/HomeController.js");

router.get("/", homeController.home);
router.get("/second", homeController.second);
router.post("/sign-up", validateSignUpRequest, homeController.signUp);
router.get("/list/:_id?", homeController.list);

module.exports = router;