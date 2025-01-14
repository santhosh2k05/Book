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
   
    navigate("/login?type= admin");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r bg-black">
      <div className="w-full max-w-md bg-black shadow-lg border border-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Admin Registration</h2>
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
            label="Department"
            name="AdminDep"
            type="Department"
            value={adminDetails.AdminEmail}
            onChange={handleChange}
            required
            placeholder="Enter your department"
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
            value={adminDetails.AdminPhone}
            onChange={handleChange}
            required
            placeholder="Enter your phone number"
          />
          <Button
            type="submit"
            className="w-full text-lg px-8 py-3 font-extrabold text-white border-2 border-white hover:shadow-lg hover:shadow-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transform hover:scale-105 transition-transform duration-300"
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
