import { useCompany } from "@/contexts/CompanyProvider";
import { Link } from "react-router-dom";
import JobsPreview from "../Job/JobsPreview";
import { Pencil } from "lucide-react";

function CompanyDetails() {
  const { company } = useCompany();

  return (
    <>
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-600">Company Profile</h2>
          <Link
            to={`/dashboard/${company?.userId}/profile/edit`}
            className="bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700 transition flex items-center"
          >
            <Pencil />
          </Link>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Company Name:</h3>
          <p className="text-gray-600">{company.companyName}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Industry Type:
          </h3>
          <p className="text-gray-600">{company.industryType}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Overview:</h3>
          <p className="text-gray-600">{company.companyOverview}</p>
        </div>
      </div>
      <div className=" mx-auto bg-white p-6 rounded shadow-md mt-10">
        <JobsPreview />
      </div>
    </>
  );
}

export default CompanyDetails;
