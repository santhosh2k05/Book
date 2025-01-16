import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import Card from "./ui/Card";
import Button from "./ui/Button";

const AdminRegister = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [adminDetails, setAdminDetails] = useState({
    AdminName: "",
    AdminEmail: "",
    AdminPassword: "",
    AdminPhone: "",
    AdminDEPT: ""
  });

  const handleChange = (e) => {
    setAdminDetails({
      ...adminDetails,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch('/api/AdminRegistration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminDetails)
      });

      const result = await response.json();

      if (response.ok) {
        navigate("/login?type=admin");
      } else {
        setError(result.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setError('Error during registration. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputFields = [
    { name: "AdminName", label: "Full Name", type: "text", placeholder: "Enter your full name" },
    { name: "AdminEmail", label: "Email", type: "email", placeholder: "Enter your email" },
    { name: "AdminDEPT", label: "Department", type: "text", placeholder: "Enter your department" },
    { name: "AdminPassword", label: "Password", type: "password", placeholder: "Enter your password" },
    { name: "AdminPhone", label: "Phone Number", type: "tel", placeholder: "Enter your phone number" }
  ];

  return (
    <Layout title="Admin Registration" showLogout={false}>
      <div className="max-w-2xl mx-auto">
        <Card>
          <h2 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
            Admin Registration
          </h2>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inputFields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={adminDetails[field.name]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg 
                             focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                    placeholder={field.placeholder}
                    required
                  />
                </div>
              ))}
            </div>

            {error && (
              <p className="text-rose-500 text-sm text-center">{error}</p>
            )}

            <Button
              type="submit"
              variant="gradient"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminRegister;
