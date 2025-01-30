const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
    unique: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  industryType: {
    type: String,
    required: true, //"Technology", "Healthcare", "Finance", "Education", "Retail", "Manufacturing", "Hospitality", "Construction"
  },
  //companyLogo: String, // URL of the company logo (optional)
  companyOverview: String, // Description of the company (optional)
  jobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job", // Reference to a Job model, which stores job details
    },
  ],
});

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;
