import { useAuth } from "@/contexts/AuthProvider";
import { useCompany } from "@/contexts/CompanyProvider";
import { FolderPlus } from "lucide-react";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function JobsPreview() {
  const navigate = useNavigate();
  const { company, getJobsOfCompany, getJobs } = useCompany();
  const { user } = useAuth();
  const { jobs } = company || {};

  useEffect(() => {
    if (user?._id && company?._id) {
      getJobsOfCompany(); // Fetch jobs after user and company are available
    }
  }, []);

  const handleJobClick = (jobId) => {
    navigate(`/dashboard/${user?._id}/profile/job/${jobId}`);
  };

  return (
    <div className="h-auto p-6 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Your Jobs</h1>
        <Link
          to={`/dashboard/${user?._id}/profile/job/create`}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition "
        >
          <FolderPlus />
        </Link>
      </div>

      {jobs?.length === 0 ? (
        <p className="text-center text-gray-500">No jobs available</p>
      ) : (
        <div
          className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6 gap-4 overflow-y-auto sm:overflow-x-auto "
          style={{ flex: 1 }}
        >
          {jobs.map((job, i) => (
            <div
              key={i}
              className="flex-none sm:w-72 w-full h-40 p-4 border rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-shadow"
              onClick={() => handleJobClick(job._id)}
            >
              <h3 className="text-xl font-semibold mb-2">{job.jobTitle}</h3>
              <p className="text-gray-600 mb-1">
                <strong>Salary:</strong> {job.salaryRange}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Type:</strong> {job.jobType}
              </p>
              <p className="text-gray-600">
                <strong>Location:</strong> {job.location}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobsPreview;
