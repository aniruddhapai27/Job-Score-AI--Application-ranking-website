import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/utils";
import axios from "axios";
import EmployersBox from "./EmployersBox";

function CompanySearchPage() {
  const [emps, setEmps] = useState();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/employee/getAllEmployees`
        );
        console.log(response);
        setEmps(response?.data?.employees);
        console.log(emps);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployees();
  }, []);
  console.log("Employees");
  return (
    <div>
      <EmployersBox emps={emps} />
    </div>
  );
}

export default CompanySearchPage;
