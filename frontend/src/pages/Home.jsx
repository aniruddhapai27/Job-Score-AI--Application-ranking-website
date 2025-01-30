import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "../utils";
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthProvider";

const Home = () => {
  const { isAuthenticated, setIsAuthenticated, setUser, user } = useAuth();
  const navigate = useNavigate();

  //Temporary logout function
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      console.log("user", user);

      const { data } = await axios.get(`${BACKEND_URL}/api/user/logout`, {
        withCredentials: true,
      });
      console.log(data);
      localStorage.removeItem("jwt"); // deleting token in localStorage so that if user logged out it will goes to login page

      toast.success(data.message);
      setIsAuthenticated(false);
      setUser(null);

      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Failed to logout");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Welcome to Our App!
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Please sign up or log in to continue.
      </p>
      <div className="space-x-4">
        <Link to="/signup">
          <Button variant="default" className="px-6 py-2">
            Signup
          </Button>
        </Link>
        <Link to="/login">
          <Button variant="outline" className="px-6 py-2">
            Login
          </Button>
        </Link>

        {/* Temporary logout button */}
        {/* <Button className="px-6 py-2" onClick={(e) => handleLogout(e)}>
          Logout
        </Button> */}
      </div>
    </div>
  );
};

export default Home;
