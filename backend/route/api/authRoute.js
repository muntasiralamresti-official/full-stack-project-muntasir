const express = require("express");
const router = express.Router();
const authController = require("../../controller/authController");
const upload = require("../../config/multerConfig");

router.get("/allusers", authController.getAllUsers);
router.post(
  "/registration",
  upload.single("image"),
  authController.registration,
);
router.delete("/delete/:id", authController.userDelete);
router.post("/update/:id", upload.single("image"), authController.userUpdate);

module.exports = router;
