import { Button } from "./ui/button";
import EmployeeSearchPage from "./Employee/Search/EmployeeSearchPage";
import { useAuth } from "@/contexts/AuthProvider";
import CompanySearchPage from "./Company/Search/CompanySearchPage";

function Search() {
  const { user } = useAuth();
  return (
    <>
      <div className="w-full mx-auto bg-white p-6 rounded shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-600">All jobs</h2>
          <Button>Check</Button>
        </div>
        <div className="mb-4 mt-10">
          {user?.role === "employee" ? (
            <EmployeeSearchPage />
          ) : (
            <CompanySearchPage />
          )}
        </div>
      </div>
    </>
  );
}

export default Search;
