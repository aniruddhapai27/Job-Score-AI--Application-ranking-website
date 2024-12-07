import { useState } from "react";
import axios from "axios";
import { useCompany } from "@/contexts/CompanyProvider";
import { BACKEND_URL } from "@/utils";
import { useNavigate } from "react-router-dom";
import BackButton from "../BackButton";

function EditCompany() {
  const { company, setCompany, editCompany } = useCompany();
  const [formData, setFormData] = useState({
    companyName: company?.companyName || "",
    industryType: company?.industryType || "",
    companyOverview: company?.companyOverview || "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    console.log(formData);
    try {
      const response = await axios.patch(
        `${BACKEND_URL}/api/company/${company?._id}`, // Replace with your actual URL
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setCompany(response?.data?.company); // Update context with the new data
      setMessage("Company details updated successfully!");
      editCompany(response?.data);
      console.log(response?.data?.company);
      navigate(`/dashboard/${company.userId}/profile`);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to update company details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 mt-10 rounded shadow-md">
      <BackButton />
      <h2 className="text-xl font-bold mb-4 text-blue-600">Edit Company</h2>

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
          {loading ? "Updating..." : "Update Company"}
        </button>
      </form>
    </div>
  );
}

export default EditCompany;
