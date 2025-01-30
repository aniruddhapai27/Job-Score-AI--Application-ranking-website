import BackButton from "@/components/BackButton";
import { BACKEND_URL } from "@/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EmpDesc() {
  const { empId } = useParams();
  const navigate = useNavigate();
  const [emp, setEmp] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/employee/getEmployee/${empId}`
        );
        console.log(response);
        setEmp(response?.data?.employee);
        console.log(emp);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployee();
  }, []);

  if (!emp) {
    return <div className="p-6">Employee not found</div>;
  }

  return (
    <div className="h-screen flex flex-col mt-10 sm:mt-5">
      <BackButton onClick={() => navigate(-1)} />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">{emp?.userId?.name}</h1>
      </div>

      <p className="text-gray-600 mb-2">
        <strong>Job Type:</strong> {emp?.jobType}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Salary range:</strong> {emp?.desiredSalary}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Location: </strong>
        {emp?.preferredLocation}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Resume: </strong>
        <a
          href={emp?.resume}
          download
          className="text-blue-600 hover:underline"
        >
          View Resume
        </a>
      </p>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Skills:</h3>
        <ul className="list-disc list-inside text-gray-700">
          {emp?.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
      <button className="w-28 mt-14 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700">
        Send Message
      </button>
    </div>
  );
}

export default EmpDesc;
