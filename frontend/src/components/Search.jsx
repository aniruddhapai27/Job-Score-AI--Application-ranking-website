import { Button } from "./ui/button";
import EmployeeSearchPage from "./Employee/Search/EmployeeSearchPage";
import { useAuth } from "@/contexts/AuthProvider";
import CompanySearchPage from "./Company/Search/CompanySearchPage";
import { IoMdSearch } from "react-icons/io";
import { useState } from "react";

function Search() {
  const { user } = useAuth();
  const [input, setInput] = useState(""); // Collect the raw input string
  const [parseInputs, setParseInputs] = useState([]);
  // Handle input change
  function handleChange(e) {
    setInput(e.target.value); // Update state with the input value
  }

  // Handle button click
  function handleClick() {
    const parsedInputs = input
      .toLowerCase()
      .split(",") // Split by commas
      .map((item) => item.trim()) // Trim whitespace from each input
      .filter((item) => item); // Remove empty values
    setParseInputs(parsedInputs);
  }
  console.log(parseInputs);

  return (
    <>
      <div className="w-full mx-auto bg-white p-6 rounded shadow-md">
        <div className="flex flex-col justify- sm:flex-row sm:justify-between sm:items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-600">All jobs</h2>
          <div className="flex gap-3  relative mt-10">
            <div className="absolute bottom-12 text-sm">
              Search jobs based upon your skills
            </div>
            <input
              type="text"
              className="w-56 p-2 border-black outline-none border-2"
              placeholder="Web Development, AIML, ...."
              onChange={handleChange}
            />
            <Button onClick={handleClick} className="w-10 mr-2">
              <IoMdSearch />
            </Button>
          </div>
        </div>
        <div className="mb-4 mt-10">
          {user?.role === "employee" ? (
            <EmployeeSearchPage skills={parseInputs} />
          ) : (
            <CompanySearchPage />
          )}
        </div>
      </div>
    </>
  );
}

export default Search;
