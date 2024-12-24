import { useEffect, useState } from "react";
import JobsBox from "./JobsBox";
import { BACKEND_URL } from "@/utils";
import axios from "axios";

function EmployeeSearchPage() {
  const [jobs, setJobs] = useState();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/company/getAllJobs`
        );
        console.log(response);
        setJobs(response?.data?.jobs);
        console.log(jobs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div>
      <JobsBox jobs={jobs} />
    </div>
  );
}

export default EmployeeSearchPage;
