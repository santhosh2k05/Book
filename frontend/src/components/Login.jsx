import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, TextInput } from "flowbite-react";

const Login = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const type = new URLSearchParams(search).get("type"); // Determine if "student" or "admin"

  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    if (type === "student") {
      navigate("/student-dashboard");
    } else if (type === "admin") {
      navigate("/admin-dashboard");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-cyan-400">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          {type === "student" ? "Student Login" : "Admin Login"}
        </h2>
        <form className="space-y-4">
          <TextInput
            label="Username"
            name="username"
            type="text"
            value={credentials.username}
            onChange={handleChange}
            required
            placeholder="Enter your username"
          />
          <TextInput
            label="Password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
          <Button
            onClick={handleLogin}
            gradientDuoTone="cyanToBlue"
            className="w-full py-3"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
