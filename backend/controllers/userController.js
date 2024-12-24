const Company = require("../models/companyModel");
const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  console.log(req);
  const users = await User.find();
  return res.status(200).json({ success: true, users });
};

exports.getUser = async (req, res) => {
  console.log(req);
  const user = await req.user;
  return res.status(200).json({ success: true, user });
};

exports.getCompanyData = async (req, res) => {
  // give company id
  try {
    console.log(req.user);
    // Get the userId from the authenticated user (provided by the auth middleware)
    const userId = req.user._id; // Assuming req.user is populated by authentication middleware
    console.log("Authenticated User ID:", userId);

    // Find the company by userId
    const company = await Company.findOne({ userId }).populate({
      path: "jobs", // Populating the userId reference
      select:
        "jobTitle jobDescription requiredSkills location salaryRange experienceLevel jobType", // Excluding sensitive fields from the user
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company details not found for the authenticated user",
      });
    }

    // Return the company details
    return res.status(200).json({
      success: true,
      company, // Return the company data
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error while retrieving company details",
    });
  }
};
