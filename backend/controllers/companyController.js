const Company = require("../models/companyModel");
const User = require("../models/userModel");

// Create Company
exports.createCompanyDetails = async (req, res) => {
  // finds from userId
  try {
    const { userId, companyName, industryType, companyOverview, jobs } =
      req.body;

    // Find the user in the User model (optional check)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Create a new company document
    const company = new Company({
      userId,
      companyName,
      industryType,
      companyOverview,
      jobs,
    });

    await company.save();

    return res.status(201).json({
      success: true,
      message: "Company details added successfully",
      company,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

// Edit company
exports.editCompanyDetails = async (req, res) => {
  try {
    const { companyId } = req.params; // company ID from the URL parameter
    const { companyName, industryType, companyOverview, jobs } = req.body;

    // Find the company by ID
    const company = await Company.findById({ _id: companyId });
    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "company not found" });
    }

    // Update company details
    if (companyName) company.companyName = companyName;
    if (industryType) company.industryType = industryType;
    if (companyOverview) company.companyOverview = companyOverview;
    if (jobs) company.jobs = jobs; // Can validate jobs array if needed

    // Save the updated company document
    await company.save();

    return res.status(200).json({
      success: true,
      message: "Company details updated successfully",
      company,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getCompanyDetails = async (req, res) => {
  // give company id
  try {
    console.log(req.user);
    // Get the userId from the authenticated user (provided by the auth middleware)
    const userId = req.user._id; // Assuming req.user is populated by authentication middleware
    console.log("Authenticated User ID:", userId);

    // Find the company by userId
    const company = await Company.findOne({ userId }).populate("jobs");

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
