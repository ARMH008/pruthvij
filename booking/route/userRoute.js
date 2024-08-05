// routes/userRoutes.js

const express = require("express");
const authController = require("../controllers/authController");
const userController = require("./../controllers/userController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
//for only admin part
router.get("/role", authController.isLoggedIn, authController.role);
//for any navbar and user profile
router.get("/user", authController.isLoggedIn, authController.user);

router.use(authController.protect);

router.get("/searchuser", userController.searchUsers);
router.patch("/updatepassword", authController.updatePassword);

router.patch(
  "/updateme",
  userController.resizeUserImage,
  userController.updateMe
);

router.delete("/deleteme", userController.deleteme);

router.route("/").get(userController.getAllUsers);
router.patch(
  "/:id",
  authController.restrictTo("admin"),
  userController.updateUser
);
router.delete(
  "/:id",
  authController.restrictTo("admin"),
  userController.deleteUser
);

module.exports = router;
