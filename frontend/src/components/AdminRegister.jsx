import React, { useState } from "react";
import { Button, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const navigate = useNavigate();

  const [adminDetails, setAdminDetails] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setAdminDetails({
      ...adminDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Here you would handle the registration logic (e.g., API call)
    // For now, we are just redirecting to the login page
    navigate("/login?type= admin");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-cyan-400">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Registration</h2>
        <form className="space-y-4" onSubmit={handleRegister}>
          <TextInput
            label="Full Name"
            name="AdminName"
            type="text"
            value={adminDetails.AdminName}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
          />
          <TextInput
            label="Email"
            name="AdminEmail"
            type="email"
            value={adminDetails.AdminEmail}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
          <TextInput
            label="AdminPassword"
            name="password"
            type="password"
            value={adminDetails.AdminPassword}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
          <TextInput
            label="AdminPhone"
            name="phoneNumber"
            type="text"
            value={adminDetails.phoneNumber}
            onChange={handleChange}
            required
            placeholder="Enter your phone number"
          />
          <Button
            type="submit"
            gradientDuoTone="cyanToBlue"
            className="w-full py-3"
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
