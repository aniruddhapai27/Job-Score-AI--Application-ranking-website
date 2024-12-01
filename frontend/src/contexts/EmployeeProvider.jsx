import { BACKEND_URL } from "../utils";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";

const EmployeeContext = createContext();

export function EmployeeProvider({ children }) {
  const [employee, setEmployee] = useState();
  const { user } = useAuth();
  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/employee/get`, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response);
        setEmployee(response.data.employee);
      } catch (error) {
        console.log(error);
      }
    };
    if (user?._id && user?.role === "employee") fetchEmployeeDetails();
  }, [user]);

  return (
    <EmployeeContext.Provider value={{ employee, setEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
}

export const useEmployee = () => useContext(EmployeeContext);
