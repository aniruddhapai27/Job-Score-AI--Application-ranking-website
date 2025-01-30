const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
    unique: true,
  },
  resume: {
    type: String, // URL or path to the uploaded resume
    required: true,
  },
  jobType: {
    type: String, // E.g., Full-time, Part-time, Remote
    // required: true,
  },
  preferredLocation: {
    type: [String], // Array of strings for preferred locations (e.g., ["Bangalore", "Remote"])
    // required: true,
  },
  desiredSalary: {
    type: Number, // Desired salary
    // required: true,
  },
  skills: [String],
  // appliedJobs: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Job", // Reference to a Job model
  //   },
  // ],
});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
