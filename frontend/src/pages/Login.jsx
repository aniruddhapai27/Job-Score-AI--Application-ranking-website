import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthProvider";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const { isAuthenticated, setIsAuthenticated, setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/user/login`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        // Save token and user details
        localStorage.setItem("jwt", response.data.token);
        setIsAuthenticated(true);
        setUser(response.data.user);

        // Show success message
        toast.success(response.data.message || "User logged in successfully!", {
          duration: 3000,
        });

        // Redirect based on user role
        const user = response.data.user; // Assuming `role` is part of the response
        setUser(user);
        navigate(`/dashboard/${user._id}/profile`); // Default fallback
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred.");
      toast.error(
        error.response?.data?.message || "Please fill the required fields",
        {
          duration: 3000,
        }
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-xl font-bold text-center mb-4">Login</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
        <p className="mt-2 text-center">
          New User?{" "}
          <Link to="/signup" className="text-blue-600">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
