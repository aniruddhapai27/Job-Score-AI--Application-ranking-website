const Employee = require("../models/employeeModel");
const cloudinary = require("cloudinary").v2;

// Create employee controller
exports.createEmployeeDetails = async (req, res) => {
  try {
    const { jobType, preferredLocation, desiredSalary, skills } = req.body; // Destructure the individual fields
    const userId = req?.user?._id;

    const resume = req.files?.resume; // Get the resume file from the request
    console.log("Resume: ");
    console.log(resume); // Logs the file data

    // Check if resume is provided
    if (!resume) {
      return res.status(400).json({ message: "Resume is required" });
    }

    // Check if the file is a PDF by its MIME type
    const allowedFormats = ["application/pdf", "jimage/pg", "image/png"];
    if (!allowedFormats.includes(resume.mimetype)) {
      return res.status(400).json({
        message: "Invalid file format. Only PDF files are allowed",
      });
    }

    const existingEmployee = await Employee.findOne({ userId });
    if (existingEmployee) {
      return res.status(400).json({
        message: "Employee details already exist for this user",
      });
    }

    // Upload resume to Cloudinary
    const folderPath = "JobScheduler/"; // Cloudinary will automatically create this folder if it doesn't exist.

    const cloudinaryResult = await cloudinary.uploader.upload(
      resume.tempFilePath,
      {
        resource_type: "auto", // Automatically detect the file type (pdf, image, etc.)
        folder: folderPath, // Specify the folder to store the file
      }
    );
    console.log(cloudinaryResult);

    // Create a new Employee record
    const newEmployee = new Employee({
      userId,
      resume: cloudinaryResult.secure_url, // Cloudinary URL of the uploaded resume
      jobType, // Individual jobType field from the request
      preferredLocation, // Individual preferredLocation field from the request (Array of strings)
      desiredSalary, // Individual desiredSalary field from the request
    });

    // Save the employee to the database
    await newEmployee.save();

    res.status(201).json({
      message: "Employee created successfully",
      employee: newEmployee,
    });
  } catch (error) {
    console.error("Error during employee creation:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message || error, // Send error message or the error itself
    });
  }
};

// Get employee details by employee ID
exports.getEmployeeDetails = async (req, res) => {
  try {
    const userId = req?.user?._id;

    // Find the employee by userId
    const employee = await Employee.findOne({ userId }) // Find employee by userId
      .populate("userId", "name email"); // Populate userId with name and email from the User model

    // Check if employee exists
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Respond with the employee details
    res.status(200).json({
      message: "Employee details retrieved successfully",
      employee,
    });
  } catch (error) {
    console.error("Error during fetching employee details:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message || error, // Send error message or the error itself
    });
  }
};

// Update employee details controller
exports.editEmployeeDetails = async (req, res) => {
  try {
    const { jobType, preferredLocation, desiredSalary } = req.body; // Destructure the updated fields
    console.log("Body:");
    console.log(req.body);
    const resume = req.files?.resume; // Get the resume file from the request if provided
    const userId = req?.user?._id;

    // Find the employee by ID
    const employee = await Employee.findOne({ userId });

    // Check if the employee exists
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Check if a new resume is provided and upload it to Cloudinary
    if (resume) {
      // Check if the file is a PDF by its MIME type
      const allowedFormats = ["application/pdf", "image/png", "image/jpg"];
      if (!allowedFormats.includes(resume.mimetype)) {
        return res.status(400).json({
          message: "Invalid file format. Only PDF files are allowed",
        });
      }

      // Upload the new resume to Cloudinary
      const folderPath = "JobScheduler/"; // Cloudinary will automatically create this folder if it doesn't exist.

      const cloudinaryResult = await cloudinary.uploader.upload(
        resume.tempFilePath,
        {
          resource_type: "auto", // Automatically detect the file type (pdf, image, etc.)
          folder: folderPath, // Specify the folder to store the file
        }
      );

      // Update the resume URL
      employee.resume = cloudinaryResult.secure_url; // Cloudinary URL of the uploaded resume
    }

    // Update other employee details
    employee.jobType = jobType || employee.jobType;
    employee.preferredLocation =
      preferredLocation || employee.preferredLocation;
    employee.desiredSalary = desiredSalary || employee.desiredSalary;

    // Save the updated employee details
    await employee.save();

    res.status(200).json({
      message: "Employee details updated successfully",
      employee,
    });
  } catch (error) {
    console.error("Error during updating employee details:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message || error, // Send error message or the error itself
    });
  }
};

exports.getAllResumes = async (req, res) => {
  try {
    // console.log("Hi");
    const resumes = await Employee.find({}, "resume");
    // console.log(resumes);
    return res.status(200).json({
      success: true,
      message: "Resumes fetched successfully.",
      resumes,
    });
  } catch (error) {
    console.error("Error fetching resumes:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch resumes.",
      error: error.message,
    });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate("userId", "name");

    return res.status(200).json({
      success: true,
      size: employees.length,
      message: "Employee details fetched successfully.",
      employees,
    });
  } catch (error) {
    console.error("Error fetching employee details:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch employee details.",
      error: error.message,
    });
  }
};

exports.getEmployeeDetailsById = async (req, res) => {
  try {
    const { empId } = req.params;
    console.log(empId);
    const employee = await Employee.findById(empId).populate("userId");
    console.log("Employee");
    console.log(employee);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Employee found successfully",
      employee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
