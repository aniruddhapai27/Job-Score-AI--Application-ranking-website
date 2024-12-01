const express = require("express");
const {
  signup,
  login,
  logout,

  isAuthenticated,
} = require("../controllers/authController");
const {
  getUser,
  getAllUsers,
  getCompanyData,
} = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);

router.get("/getUser", isAuthenticated, getUser);
router.get("/getAllUsers", getAllUsers);
router.get("/getCompanyData", isAuthenticated, getCompanyData);

module.exports = router;
