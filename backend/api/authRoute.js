const express = require("express");
const router = express.Router()
const authController = require("../controller/authController");


router.get("/allusers", authController.getAllUsers)
router.post("/registration", authController.registration)
router.delete("/delete/:id", authController.userDelete)
router.post("/update/:id", authController.userUpdate)

module.exports = router