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

  // Render for employee role
  if (user?.role === "employee") {
    return employee ? <EmployeeDetails /> : <EmployeeForm />;
  }

  // Render for employer role
  if (user?.role === "employer") {
    return company ? <CompanyDetails /> : <CompanyForm />;
  }

  // Fallback for no role
  return <div>No result found</div>;
}

export default Profile;
