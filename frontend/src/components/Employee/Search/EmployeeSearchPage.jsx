import { useEffect, useState } from "react";
import JobsBox from "./JobsBox";
import { BACKEND_URL } from "@/utils";
import axios from "axios";

function EmployeeSearchPage({ skills }) {
  const [jobs, setJobs] = useState([]); // Initialize jobs with an empty array

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/company/getAllJobs`
        );
        const jobs = response?.data?.jobs || [];
        console.log("Fetched Jobs:", jobs);
        setJobs(filter(jobs));
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []); // Fetch jobs only once when the component mounts

  useEffect(() => {
    const fetchAndFilterJobs = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/company/getAllJobs`
        );
        const jobs = response?.data?.jobs || [];
        const filteredArray = filter(jobs);
        setJobs(filteredArray);
      } catch (error) {
        console.error("Error fetching filtered jobs:", error);
      }
    };

    fetchAndFilterJobs();
  }, [skills]); // Re-run when skills change

  function filter(jobs) {
    console.log("Jobs to filter:", jobs);
    if (!skills.length) {
      return jobs; // If no skills, return all jobs
    }

    const filteredArr = jobs.filter((job) =>
      job.requiredSkills.some((requiredSkill) =>
        skills.includes(requiredSkill.toLowerCase())
      )
    );

    console.log("Filtered Jobs:", filteredArr);
    return filteredArr;
  }

  return (
    <div>
      <JobsBox jobs={jobs} />
    </div>
  );
}

export default EmployeeSearchPage;
