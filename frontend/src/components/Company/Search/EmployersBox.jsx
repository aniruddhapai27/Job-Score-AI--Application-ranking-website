import { useAuth } from "@/contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

function EmployersBox({ emps }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleJobClick = (empId) => {
    // navigate(`/dashboard/${user?._id}/profile/job/${jobId}`);
    navigate(`/dashboard/${user?._id}/search/emp/${empId}`);
  };

  return (
    <div className="h-auto flex flex-col">
      {/* <Link
            //   to={`/dashboard/${user?._id}/profile/job/create`}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition "
            >
              <FolderPlus />
            </Link> */}

      {emps?.length === 0 ? (
        <p className="text-center text-gray-500">No employers available</p>
      ) : (
        <div
          className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6 gap-4 overflow-y-auto sm:overflow-x-auto "
          style={{ flex: 1 }}
        >
          {emps?.map((emp, i) => (
            <div
              key={i}
              className="flex-none sm:w-72 w-full h-40 p-3 border rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-shadow overflow-auto"
              onClick={() => handleJobClick(emp?._id)}
            >
              <h3 className="text-xl font-semibold mb-2">
                {emp?.userId?.name}
              </h3>
              <p className="text-gray-600 mb-1">
                <strong>Job Type: </strong> {emp?.jobType}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Desired Salary range:</strong> {emp?.desiredSalary}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmployersBox;
