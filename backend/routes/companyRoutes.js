const express = require("express");

const { isAuthenticated } = require("../controllers/authController");
const {
  createCompanyDetails,
  editCompanyDetails,
  getCompanyDetails,
  getSkills,
} = require("../controllers/companyController");
const {
  createJob,
  getAllJobsOfCompany,
  editJob,
  deleteJob,
  getAllJobs,
  getSingleJob,
  getSkillsById,
} = require("../controllers/jobController");

const router = express.Router();

router.post("/create", isAuthenticated, createCompanyDetails);
router.patch("/:companyId", isAuthenticated, editCompanyDetails);
router.get("/get", isAuthenticated, getCompanyDetails);
router.get("/getAllJobs", getAllJobs);

router.post("/createJob", isAuthenticated, createJob);
router.get("/getJob/:jobId", getSingleJob);
router.get("/getAllJobsOfCompany", isAuthenticated, getAllJobsOfCompany);
router.patch("/editJob/:jobId", isAuthenticated, editJob);
router.delete("/deleteJob/:jobId", isAuthenticated, deleteJob);
router.get("/getSkill", getSkills);
router.get("/getSkillsById/:JobId", getSkillsById);

module.exports = router;
