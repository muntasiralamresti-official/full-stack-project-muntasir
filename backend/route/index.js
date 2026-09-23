const express = require("express");
const router = express.Router();
const authRoute = require("./api/authRoute");

router.use("/api/v1", authRoute);

module.exports = router;
