import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/utils";
import axios from "axios";
import EmployersBox from "./EmployersBox";

function CompanySearchPage({ skills }) {
  const [emps, setEmps] = useState([]); // Initialize emps with an empty array

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/employee/getAllEmployees`
        );
        const employees = response?.data?.employees || [];
        console.log("Fetched Employees:", employees);
        setEmps(filter(employees));
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []); // Fetch employees only once when the component mounts

  useEffect(() => {
    const fetchAndFilterEmployees = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/employee/getAllEmployees`
        );
        const employees = response?.data?.employees || [];
        const filteredArray = filter(employees);
        setEmps(filteredArray);
      } catch (error) {
        console.error("Error fetching filtered employees:", error);
      }
    };

    fetchAndFilterEmployees();
  }, [skills]); // Re-run when skills change

  function filter(employees) {
    console.log("Employees to filter:", employees);
    if (!skills.length) {
      return employees; // If no skills, return all employees
    }

    const filteredArr = employees.filter((employee) =>
      employee.skills.some((employeeSkill) =>
        skills.includes(employeeSkill.toLowerCase())
      )
    );

    console.log("Filtered Employees:", filteredArr);
    return filteredArr;
  }

  return (
    <div>
      <EmployersBox emps={emps} />
    </div>
  );
}

export default CompanySearchPage;
