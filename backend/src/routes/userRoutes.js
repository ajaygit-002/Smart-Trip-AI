const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.registerUser);
router.post("/verify-otp", userController.verifyOTP);
router.post("/resend-otp", userController.resendOTP);
router.post("/login", userController.loginUser);
router.get("/:id", userController.getUserProfile);
router.put("/:id", userController.updateUserProfile);

module.exports = router;
