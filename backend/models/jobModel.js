const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company", // Reference to the Company model
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  requiredSkills: {
    type: [String], // List of skills needed
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salaryRange: {
    type: String, // E.g., "₹5,00,000 - ₹8,00,000"
    required: true,
  },
  experienceLevel: String, // E.g., "Fresher", "2-5 years", "5+ years"
  jobType: String, // E.g., "Full-time", "Part-time", "Contract", "Internship"
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.model("Job", JobSchema);

module.exports = Job;
