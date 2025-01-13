const Company = require("../models/companyModel");
const Job = require("../models/jobModel");
const mongoose = require("mongoose");

// Create a new job
exports.createJob = async (req, res) => {
  try {
    const {
      jobTitle,
      jobDescription,
      requiredSkills,
      location,
      salaryRange,
      experienceLevel,
      jobType,
    } = req.body;

    // Check if the company exists for the logged-in user
    const company = await Company.findOne({ userId: req.user._id });
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found for the logged-in user",
      });
    }
    const companyId = company._id;

    // Create a new job entry
    const newJob = new Job({
      companyId,
      jobTitle,
      jobDescription,
      requiredSkills,
      location,
      salaryRange,
      experienceLevel,
      jobType,
    });

    await newJob.save();
    company.jobs.push(newJob._id);
    await company.save();

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job: newJob,
    });
  } catch (error) {
    console.error("Error creating job:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error, unable to create job",
      error: error.message,
    });
  }
};

// Get all jobs
exports.getAllJobsOfCompany = async (req, res) => {
  try {
    // Assuming the user is authenticated and their companyId is available in req.user
    //   const { companyId } = req.user; // Extract companyId from the authenticated user
    const company = await Company.findOne({ userId: req.user._id }).populate(
      "jobs"
    );

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found for the logged-in user",
      });
    }
    const companyId = company._id;
    console.log("company");
    console.log(company);

    // Find jobs associated with the user's companyId
    const jobs = await Job.find({ companyId });

    if (jobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No jobs found for this company",
      });
    }

    res.status(200).json({
      success: true,
      jobs: jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching jobs",
      error: error.message,
    });
  }
};

exports.editJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, {
      new: true,
    });
    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a job by ID
exports.deleteJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const job = await Job.findByIdAndDelete(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting job",
      error: error.message,
    });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const company = await Company.find().populate("jobs");

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
    // const allJobs = company?.map((elem) => {
    //   // console.log(elem);
    //   elem?.jobs?.map((job) => {
    //     console.log(job);
    //   });
    // });/
    const jobs = [];
    const extractJobs = company.map((elem) => {
      elem?.jobs?.map((job) => {
        jobs.push(job);
      });
    });

    // console.log(allJobs);
    // const allJob = company.map.jobs.map((job) => ({
    //   // jobId: job,
    //   // companyName: job.companyId.companyName,
    //   // industryType: job.companyId.industryType,
    // }));
    // console.log(allJobs);

    res.status(200).json({
      success: true,
      size: jobs.length,
      message: "All jobs found",
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getSingleJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const job = await Job.findById(jobId).populate("companyId");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching job",
    });
  }
};
exports.getSkillsById = async (req, res) => {
  try {
    const { JobId } = req.params; // Retrieve the companyId from the URL parameters

    // Fetch the company with the provided companyId and populate the 'jobs' field
    const job = await Job.findById(JobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // Map through the jobs to extract skills
    const result = {
      jobId: JobId,
      skills: job?.requiredSkills,
    };

    return res.status(200).json({
      success: true,
      message: "Skills and job IDs of the company retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching company skills:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
