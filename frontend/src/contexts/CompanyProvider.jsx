import { BACKEND_URL } from "../utils";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";

const CompanyContext = createContext();

export function CompanyProvider({ children }) {
  const [company, setCompany] = useState(null);
  const { user } = useAuth();

  // Fetch company details on mount or when the user changes
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/user/getCompanyData`,
          {
            withCredentials: true,
          }
        );
        console.log(response);
        setCompany(response.data?.company);
      } catch (error) {
        console.log(error);
      }
    };

    if (user?._id && user?.role === "employer") {
      fetchCompanyDetails();
    }
  }, [user]);

  // Fetch jobs from backend
  const getJobs = async () => {
    if (!company?._id) return; // Ensure company is fetched first

    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/company/getAllJobs`, // Modify with correct endpoint for fetching jobs
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setCompany((prev) => ({
        ...prev,
        jobs: response.data.jobs || [], // Update jobs in company state
      }));
    } catch (error) {
      console.log("Error fetching jobs:", error);
    }
  };

  const editCompany = (updatedCompany) => {
    setCompany((prev) => ({
      ...prev,
      ...updatedCompany,
    }));
  };

  const createJob = (newJob) => {
    setCompany((prev) => ({
      ...prev,
      jobs: [...(prev?.jobs || []), newJob],
    }));
  };

  // Method to delete a job by ID
  const deleteJob = (jobId) => {
    setCompany((prev) => ({
      ...prev,
      jobs: prev?.jobs?.filter((job) => job._id !== jobId),
    }));
  };

  // Method to update a job by ID
  const updateJob = (updatedJob) => {
    setCompany((prev) => ({
      ...prev,
      jobs: prev?.jobs?.map((job) =>
        job._id === updatedJob._id ? updatedJob : job
      ),
    }));
  };

  return (
    <CompanyContext.Provider
      value={{
        company,
        setCompany,
        getJobs,
        editCompany,
        deleteJob,
        updateJob,
        createJob,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}

export const useCompany = () => useContext(CompanyContext);
