import { useAuth } from "@/contexts/AuthProvider";
import { useCompany } from "@/contexts/CompanyProvider";
import { useEmployee } from "@/contexts/EmployeeProvider";
import React, { Suspense } from "react";
import { SkeletonCard } from "./ui/SkeletonCard";

// Correct lazy imports for components
const CompanyForm = React.lazy(() => import("./Company/CompanyForm"));
const CompanyDetails = React.lazy(() => import("./Company/CompanyDetails"));
const EmployeeForm = React.lazy(() => import("./Employee/EmployeeForm"));
const EmployeeDetails = React.lazy(() => import("./Employee/EmployeeDetails"));

function Profile() {
  const { company } = useCompany();
  const { employee } = useEmployee();
  const { user } = useAuth();

  // Render for employee role
  if (user?.role === "employee") {
    return (
      <Suspense fallback={<SkeletonCard />}>
        {employee ? <EmployeeDetails /> : <EmployeeForm />}
      </Suspense>
    );
  }

  // Render for employer role
  if (user?.role === "employer") {
    return (
      <Suspense fallback={<SkeletonCard />}>
        {company ? <CompanyDetails /> : <CompanyForm />}
      </Suspense>
    );
  }

  // Fallback for no role
  return <SkeletonCard />;
}

export default Profile;
