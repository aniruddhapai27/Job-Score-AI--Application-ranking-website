const express = require("express");

const { isAuthenticated } = require("../controllers/authController");
const {
  createCompanyDetails,
  editCompanyDetails,
  getCompanyDetails,
} = require("../controllers/companyController");
const {
  createJob,
  getAllJobs,
  editJob,
  deleteJob,
} = require("../controllers/jobController");

const router = express.Router();

router.post("/create", isAuthenticated, createCompanyDetails);
router.patch("/:companyId", isAuthenticated, editCompanyDetails);
router.get("/get/:companyId", isAuthenticated, getCompanyDetails);

router.post("/createJob", isAuthenticated, createJob);
router.get("/getAllJobs", isAuthenticated, getAllJobs);
router.patch("/editJob/:jobId", isAuthenticated, editJob);
router.delete("/deleteJob/:jobId", isAuthenticated, deleteJob);

module.exports = router;
