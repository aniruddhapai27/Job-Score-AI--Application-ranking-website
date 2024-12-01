import { BACKEND_URL } from "../utils";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";

const CompanyContext = createContext();

export function CompanyProvider({ children }) {
  const [company, setCompany] = useState(null);
  const { user } = useAuth();
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/user/getCompanyData`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        setCompany(response.data?.company);
      } catch (error) {
        console.log(error);
      }
    };
    if (user?._id && user?.role === "employer") fetchCompanyDetails();
  }, [user]);

  return (
    <CompanyContext.Provider value={{ company, setCompany }}>
      {children}
    </CompanyContext.Provider>
  );
}

export const useCompany = () => useContext(CompanyContext);
