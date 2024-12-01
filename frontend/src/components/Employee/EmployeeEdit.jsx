import { useEmployee } from "@/contexts/EmployeeProvider";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // for navigation
import { BACKEND_URL } from "@/utils";
import BackButton from "../BackButton";

function EmployeeEdit() {
  const { employee, setEmployee } = useEmployee();
  const [formData, setFormData] = useState({
    jobType: "",
    preferredLocation: [],
    desiredSalary: "",
    resume: null, // To store the uploaded resume
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // To navigate back after submission

  // Populate form with existing employee details
  useEffect(() => {
    if (employee) {
      setFormData({
        jobType: employee.jobType || "",
        preferredLocation: employee.preferredLocation || [],
        desiredSalary: employee.desiredSalary || "",
        resume: null, // Ensure previous resume is not carried over
      });
    }
  }, [employee]);

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "preferredLocation") {
      setFormData((prevState) => ({
        ...prevState,
        preferredLocation: value.split(",").map((location) => location.trim()),
      }));
    } else if (name === "resume") {
      setFormData((prevState) => ({
        ...prevState,
        resume: e.target.files[0], // Save the selected file
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error before making the request

    // Basic validation
    if (
      !formData.jobType ||
      !formData.desiredSalary ||
      formData.preferredLocation.length === 0
    ) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    // Form data including the resume
    const formDataToSend = new FormData();
    formDataToSend.append("jobType", formData.jobType);
    formDataToSend.append(
      "preferredLocation",
      formData.preferredLocation.join(",")
    );
    formDataToSend.append("desiredSalary", formData.desiredSalary);

    // Append the new resume file if present, otherwise keep the old one
    if (formData.resume) {
      formDataToSend.append("resume", formData.resume);
    } else if (employee?.resume) {
      formDataToSend.append("resume", employee.resume); // Pass old resume if no new one is uploaded
    }

    try {
      const response = await axios.patch(
        `${BACKEND_URL}/api/employee/edit`,
        formDataToSend,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setEmployee(response.data.employee); // Update context with new employee data
      navigate(-1); // Navigate back to the profile page after update
    } catch (error) {
      console.error("Error updating employee details:", error);
      setError("An error occurred while updating your details.");
    } finally {
      setLoading(false);
    }
  };

  // Render loading state, error, or form
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <BackButton />
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Edit Employee Details
      </h2>

      {error && <div className="text-red-500 text-center mb-6">{error}</div>}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        encType="multipart/form-data"
      >
        <div>
          <label className="text-xl font-semibold">Job Type:</label>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
          >
            <option value="">Select a job type</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="internship">Internship</option>
            <option value="remote">Remote</option>
          </select>
        </div>

        <div>
          <label className="text-xl font-semibold">Preferred Locations:</label>
          <input
            type="text"
            name="preferredLocation"
            value={formData.preferredLocation.join(", ")}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            placeholder="Enter locations separated by commas"
          />
        </div>

        <div>
          <label className="text-xl font-semibold">Desired Salary:</label>
          <input
            type="text"
            name="desiredSalary"
            value={formData.desiredSalary}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
          />
        </div>

        <div>
          <label className="text-xl font-semibold">Upload Resume:</label>
          <input
            type="file"
            name="resume"
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeEdit;
