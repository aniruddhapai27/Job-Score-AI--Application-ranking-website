import { useParams, useNavigate } from "react-router-dom";
import BackButton from "@/components/BackButton";
import { BACKEND_URL } from "@/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const JobDesc = ({ company }) => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/company/getJob/${jobId}`
        );
        console.log(response);
        setJob(response?.data?.job);
        console.log(job);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, []);

  if (!job) {
    return <div className="p-6">Job not found</div>;
  }

  return (
    <div className="h-screen flex flex-col mt-10 sm:mt-5">
      <BackButton onClick={() => navigate(-1)} />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">{job?.jobTitle}</h1>
      </div>
      <p className="text-gray-600 mb-2">
        <strong>Company:</strong> {job?.companyId?.companyName}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Salary:</strong> {job?.salaryRange}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Job Type:</strong> {job?.jobType}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Location:</strong> {job?.location}
      </p>
      <p className="text-gray-600 mb-4">
        <strong>Experience Level:</strong>{" "}
        {job?.experienceLevel || "Not specified"}
      </p>
      <p className="text-gray-700">
        <strong>Description:</strong> {job?.jobDescription}
      </p>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Required Skills:</h3>
        <ul className="list-disc list-inside text-gray-700">
          {job?.requiredSkills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
      <button className="w-20 mt-14 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700">
        Apply
      </button>
    </div>
  );
};

export default JobDesc;
