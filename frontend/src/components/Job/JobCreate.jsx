import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/utils";
import { useCompany } from "@/contexts/CompanyProvider";
import { useNavigate } from "react-router-dom";
import BackButton from "../BackButton";

function JobCreate() {
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    requiredSkills: "",
    location: "",
    salaryRange: "",
    experienceLevel: "",
    jobType: "",
    companyId: "", // Should be dynamically set, e.g., from context or props
  });

  const [message, setMessage] = useState("");

  const { company } = useCompany();
  formData.companyId = company?._id;

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/company/createJob`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      ); // Replace with your API endpoint
      setMessage("Job created successfully!");
      console.log(response.data);
      navigate(-1);
    } catch (error) {
      console.error(error);
      setMessage("Failed to create the job. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-lg">
      <BackButton />
      <h1 className="text-2xl font-bold mb-6">Create a Job</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="jobTitle" className="block font-medium mb-2">
            Job Title
          </label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="jobDescription" className="block font-medium mb-2">
            Job Description
          </label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="requiredSkills" className="block font-medium mb-2">
            Required Skills (comma-separated)
          </label>
          <input
            type="text"
            id="requiredSkills"
            name="requiredSkills"
            value={formData.requiredSkills}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block font-medium mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="salaryRange" className="block font-medium mb-2">
            Salary Range
          </label>
          <input
            type="text"
            id="salaryRange"
            name="salaryRange"
            value={formData.salaryRange}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="experienceLevel" className="block font-medium mb-2">
            Experience Level
          </label>
          <input
            type="text"
            id="experienceLevel"
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="jobType" className="block font-medium mb-2">
            Job Type
          </label>
          <select
            id="jobType"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          >
            <option value="">Select job type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Create Job
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}

export default JobCreate;
