import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button, TextInput } from "flowbite-react";

const Login = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const type = new URLSearchParams(search).get("type");

  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault(); 
    if (type === "student") {
      if(!credentials.username || !credentials.password) alert("Fields are Required")
      const LoggedIn = await fetch("/api/User", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          StudentName: credentials.username,
          Studentpassword: credentials.password
        })
      })
      console.log(LoggedIn)
      if(LoggedIn.status == 404) alert("User Not Found");
      else if(LoggedIn.status == 401) alert("Password Wrong");
      else navigate("/student-dashboard")
    } else if (type === "admin") {
      if(!credentials.username || !credentials.password) alert("Fields are Required")
        const LoggedIn = await fetch("/api/Admin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            AdminName: credentials.username,
            AdminPassword: credentials.password
          })
        })
        console.log(LoggedIn)
        if(LoggedIn.status == 404) alert("User Not Found");
        else if(LoggedIn.status == 401) alert("Password Wrong");
        else navigate("/admin-dashboard")
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-cyan-400">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          {type === "student" ? "Student Login" : "Admin Login"}
        </h2>
        <form className="space-y-4" onSubmit={handleLogin}>
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
            type="submit"
            gradientDuoTone="cyanToBlue"
            className="w-full py-3"
          >
            Login
          </Button>
        </form>

        {type === "student" && (
          <p className="mt-4 text-center">
            Are you a new user?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        )}
        {type === "admin" && (
          <p className="mt-4 text-center">
            Are you a new admin?{" "}
            <Link to="/AdminRegister" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
