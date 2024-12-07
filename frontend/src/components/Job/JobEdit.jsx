import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useCompany } from "@/contexts/CompanyProvider";
import { BACKEND_URL } from "@/utils";
import toast from "react-hot-toast";
import BackButton from "../BackButton";

const JobEdit = () => {
  const { jobId } = useParams(); // Retrieve job ID from the URL
  const navigate = useNavigate();
  const { company, updateJob } = useCompany();
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    requiredSkills: "",
    location: "",
    salaryRange: "",
    experienceLevel: "",
    jobType: "",
  });

  // Fetch job details to pre-fill the form
  const job = company?.jobs?.find((job) => job?._id === jobId);

  useEffect(() => {
    if (job) {
      // Update formData with job data
      setFormData({
        jobTitle: job.jobTitle,
        jobDescription: job.jobDescription,
        requiredSkills: job.requiredSkills,
        location: job.location,
        salaryRange: job.salaryRange,
        experienceLevel: job.experienceLevel,
        jobType: job.jobType,
      });
    }
  }, [job]);

  if (!job) {
    return <div className="p-6">Job not found</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${BACKEND_URL}/api/company/editJob/${jobId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Job updated successfully!");
      updateJob(response?.data);
      console.log(response);
      navigate(-1); // Redirect to jobs list or another desired page
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Failed to update the job.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <BackButton />
      <h1 className="text-2xl font-bold mb-4">Update Job</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Job Description</label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Required Skills</label>
          <input
            type="text"
            name="requiredSkills"
            value={formData.requiredSkills}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Salary Range</label>
          <input
            type="text"
            name="salaryRange"
            value={formData.salaryRange}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Experience Level</label>
          <input
            type="text"
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Job Type</label>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Job
        </button>
      </form>
    </div>
  );
};

export default JobEdit;
