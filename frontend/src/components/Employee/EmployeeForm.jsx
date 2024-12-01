import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/utils";

function EmployeeForm() {
  const [employeeDetails, setEmployeeDetails] = useState({
    jobType: "",
    preferredLocation: "",
    desiredSalary: "",
    resume: null, // To store the uploaded resume
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "resume") {
      setEmployeeDetails({
        ...employeeDetails,
        resume: e.target.files[0], // Save the selected file
      });
    } else {
      setEmployeeDetails({
        ...employeeDetails,
        [name]: value,
      });
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { jobType, preferredLocation, desiredSalary, resume } =
      employeeDetails;

    // Basic validation
    if (!jobType || !preferredLocation || !desiredSalary) {
      alert("Please fill in all fields.");
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("jobType", jobType);
    formData.append("preferredLocation", preferredLocation);
    formData.append("desiredSalary", desiredSalary);

    // Append resume if provided
    if (resume) {
      formData.append("resume", resume);
    }

    try {
      // Make API call to backend to save employee details
      const response = await axios.post(
        `${BACKEND_URL}/api/employee/create`, // Your backend endpoint
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Employee Details Saved:", response.data);
      alert("Details saved successfully!");
    } catch (error) {
      console.error("Error saving employee details:", error);
      alert("An error occurred while saving your details.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-600">Your Profile</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="resume"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Resume
          </label>
          <input
            type="file"
            id="resume"
            name="resume"
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="jobType"
            className="block text-sm font-medium text-gray-700"
          >
            Job Type
          </label>
          <select
            id="jobType"
            name="jobType"
            value={employeeDetails.jobType}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select job type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Freelance">Freelance</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="preferredLocation"
            className="block text-sm font-medium text-gray-700"
          >
            Preferred Location
          </label>
          <input
            type="text"
            id="preferredLocation"
            name="preferredLocation"
            value={employeeDetails.preferredLocation}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter preferred location"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="desiredSalary"
            className="block text-sm font-medium text-gray-700"
          >
            Desired Salary
          </label>
          <input
            type="number"
            id="desiredSalary"
            name="desiredSalary"
            value={employeeDetails.desiredSalary}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter desired salary"
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700"
          >
            Save Details
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeForm;
