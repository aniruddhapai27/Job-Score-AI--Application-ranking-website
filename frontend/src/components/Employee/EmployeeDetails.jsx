import { useEmployee } from "@/contexts/EmployeeProvider";
import { Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "../BackButton";
import { useAuth } from "@/contexts/AuthProvider";

function EmployeeDetails() {
  const { employee } = useEmployee(); // Use the hook to access employee data
  const { user } = useAuth();
  console.log(employee);

  if (!employee) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-blue-600">Loading...</div>
      </div>
    ); // Show loading if employee data isn't available yet
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-center text-blue-600">
          Your Profile
        </h2>
        <Link
          to={`/dashboard/${employee?.userId?._id}/profile/employee/edit`}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition flex items-center"
        >
          <Pencil className="mr-2" /> Edit
        </Link>
      </div>

      <div className="space-y-6">
        <div className="sm:flex sm:items-center sm:space-x-4">
          <h3 className="text-xl font-semibold">User Name:</h3>
          <p className="text-lg">{user?.name}</p>
        </div>

        <div className="sm:flex sm:items-center sm:space-x-4">
          <h3 className="text-xl font-semibold">User Email:</h3>
          <p className="text-lg">{user?.email}</p>
        </div>

        <div className="sm:flex sm:items-center sm:space-x-4">
          <h3 className="text-xl font-semibold">Resume:</h3>
          <a
            href={employee?.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline text-lg"
          >
            View Resume
          </a>
        </div>

        <div className="sm:flex sm:items-center sm:space-x-4">
          <h3 className="text-xl font-semibold">Job Type:</h3>
          <p className="text-lg">{employee?.jobType}</p>
        </div>

        <div className="sm:flex sm:items-center sm:space-x-4">
          <h3 className="text-xl font-semibold">Preferred Locations:</h3>
          <ul className=" ml-6">
            {employee?.preferredLocation?.map((location, index) => (
              <li key={index} className="text-lg">
                {location}
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:flex sm:items-center sm:space-x-4">
          <h3 className="text-xl font-semibold">Desired Salary:</h3>
          <p className="text-lg">{employee?.desiredSalary}</p>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
