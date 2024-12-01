import { useCompany } from "@/contexts/CompanyProvider";
import CompanyForm from "./Company/CompanyForm";
import EditCompany from "./Company/EditCompany";
import { Link } from "react-router-dom";
import CompanyDetails from "./Company/CompanyDetails";
import { useAuth } from "@/contexts/AuthProvider";
import { useEmployee } from "@/contexts/EmployeeProvider";
import EmployeeForm from "./Employee/EmployeeForm";
import EmployeeDetails from "./Employee/EmployeeDetails";

function Profile() {
  const { company } = useCompany();
  const { employee } = useEmployee();
  const { user } = useAuth();

  // If user role is employee
  if (user?.role === "employee") {
    // If employee details are not available, show EmployeeForm
    if (!employee) {
      return <EmployeeForm />;
    }
    // If employee details are available, show EmployeeDetails
    return <EmployeeDetails />;
  }

  // If user role is employer
  if (user?.role === "employer") {
    // If company details are not available, show CompanyForm
    if (!company) {
      return <CompanyForm />;
    }
    // If company details are available, show CompanyDetails
    return <CompanyDetails />;
  }

  // Fallback if no role matches
  return <div>No result found</div>;
}

export default Profile;
