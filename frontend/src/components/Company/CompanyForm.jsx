import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/utils";
import { useAuth } from "@/contexts/AuthProvider";
import { useCompany } from "@/contexts/CompanyProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CompanyForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { setCompany } = useCompany();
  const [formData, setFormData] = useState({
    companyName: "",
    industryType: "",
    companyOverview: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    console.log(user);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/company/create`,
        {
          userId: user?._id, // Passed from parent or global state
          ...formData,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setCompany(response.data?.company);

      setMessage(response.data.message || "Company created successfully!");
      toast.success("Company details added successfully!");
      setFormData({
        companyName: "",
        industryType: "",
        companyOverview: "",
      });
      navigate(`/dashboard/${user._id}/profile`);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Create Company</h2>
      {message && (
        <div
          className={`p-2 mb-4 text-sm ${
            message.toLowerCase().includes("success")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {/* Company Name */}
        <div className="mb-4">
          <label
            htmlFor="companyName"
            className="block text-sm font-medium text-gray-700"
          >
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Industry Type */}
        <div className="mb-4">
          <label
            htmlFor="industryType"
            className="block text-sm font-medium text-gray-700"
          >
            Industry Type
          </label>
          <select
            id="industryType"
            name="industryType"
            value={formData.industryType}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Industry Type</option>
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
            <option value="Education">Education</option>
            <option value="Retail">Retail</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Hospitality">Hospitality</option>
            <option value="Construction">Construction</option>
          </select>
        </div>

        {/* Company Overview */}
        <div className="mb-4">
          <label
            htmlFor="companyOverview"
            className="block text-sm font-medium text-gray-700"
          >
            Company Overview
          </label>
          <textarea
            id="companyOverview"
            name="companyOverview"
            value={formData.companyOverview}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Create Company"}
        </button>
      </form>
    </div>
  );
};

export default CompanyForm;
