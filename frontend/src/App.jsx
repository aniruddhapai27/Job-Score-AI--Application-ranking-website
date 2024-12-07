import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import Profile from "./components/Profile";
import Search from "./components/Search";
import { CompanyProvider } from "./contexts/CompanyProvider";
import EditCompany from "./components/Company/EditCompany";
import JobDetails from "./components/Job/JobDetails";
import JobCreate from "./components/Job/JobCreate";
import JobEdit from "./components/Job/JobEdit";
import { EmployeeProvider } from "./contexts/EmployeeProvider";
import EmployeeEdit from "./components/Employee/EmployeeEdit";
import Temp from "./components/Employee/Temp";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/temp" element={<Temp />} />
        <Route
          path="/dashboard/:id"
          element={
            <CompanyProvider>
              <EmployeeProvider>
                <Dashboard />
              </EmployeeProvider>
            </CompanyProvider>
          }
        >
          <Route index element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit" element={<EditCompany />} />
          <Route path="profile/job/:jobId" element={<JobDetails />} />
          <Route path="profile/job/:jobId/edit" element={<JobEdit />} />
          <Route path="profile/job/create" element={<JobCreate />} />

          <Route path="profile/employee/edit" element={<EmployeeEdit />} />

          <Route path="search" element={<Search />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
