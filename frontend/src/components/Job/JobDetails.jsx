import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useCompany } from "@/contexts/CompanyProvider";
import { useAuth } from "@/contexts/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import BackButton from "../BackButton";
import { Pencil, Trash2 } from "lucide-react";
import ConfirmModal from "../ConfirmModal"; // Import the modal
import { BACKEND_URL } from "@/utils";

const JobDetails = () => {
  const { jobId } = useParams();
  const { company, deleteJob } = useCompany();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const job = company?.jobs?.find((job) => job._id === jobId);

  const handleDelete = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/api/company/deleteJob/${jobId}`, {
        withCredentials: true,
      });
      toast.success("Job deleted successfully!");
      deleteJob(jobId);
      setIsModalOpen(false); // Close the modal
      navigate(-1); // Navigate back after deletion
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete the job.");
    }
  };

  if (!job) {
    return <div className="p-6">Job not found</div>;
  }

  return (
    <div className="h-screen flex flex-col mt-10 sm:mt-5">
      <BackButton />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">{job.jobTitle}</h1>
        <div className="flex gap-2">
          <Link
            to={`/dashboard/${user?._id}/profile/job/${job?._id}/edit`}
            className="bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700 transition"
          >
            <Pencil />
          </Link>
          <button
            onClick={() => setIsModalOpen(true)} // Open modal
            className="bg-red-600 text-white py-1 px-4 rounded hover:bg-red-700 transition"
          >
            <Trash2 />
          </button>
        </div>
      </div>
      <p className="text-gray-600 mb-2">
        <strong>Company:</strong> {company.companyName}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Salary:</strong> {job.salaryRange}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Job Type:</strong> {job.jobType}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Location:</strong> {job.location}
      </p>
      <p className="text-gray-600 mb-4">
        <strong>Experience Level:</strong>{" "}
        {job.experienceLevel || "Not specified"}
      </p>
      <p className="text-gray-700">
        <strong>Description:</strong> {job.jobDescription}
      </p>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Required Skills:</h3>
        <ul className="list-disc list-inside text-gray-700">
          {job.requiredSkills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>

      {/* Modal for delete confirmation */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close modal
        onConfirm={handleDelete} // Confirm delete
        title="Confirm Deletion"
        message={`Are you sure you want to delete the job "${job.jobTitle}"?`}
      />
    </div>
  );
};

export default JobDetails;
