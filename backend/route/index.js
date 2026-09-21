const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const authRoute = require("../api/authRoute");
const api = process.env.BASE_URL || "/";

router.use(api, authRoute);

module.exports = router;
