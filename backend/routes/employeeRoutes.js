const express = require("express");
const router = express.Router();

const {
  createEmployeeDetails,
  getEmployeeDetails,
  editEmployeeDetails,
  getAllEmployees,
  getAllResumes,
  getEmployeeDetailsById,
} = require("../controllers/employeeController");
const { isAuthenticated } = require("../controllers/authController");
// Route to create an employee and upload resume
router.post("/create", isAuthenticated, createEmployeeDetails);
router.get("/get", isAuthenticated, getEmployeeDetails);
router.patch("/edit", isAuthenticated, editEmployeeDetails);
router.get("/getAllEmployees", getAllEmployees);
router.get("/getResumes ", getAllResumes);
router.get("/getEmployee/:empId", getEmployeeDetailsById);

module.exports = router;
