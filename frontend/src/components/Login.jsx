import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Layout from "./Layout";
import Card from "./ui/Card";
import Button from "./ui/Button";

const Login = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const type = new URLSearchParams(search).get("type") || "student";

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const requestBody = type === "admin" 
        ? {
            AdminName: credentials.username,
            AdminPassword: credentials.password
          }
        : {
            StudentName: credentials.username,
            StudentPassword: credentials.password
          };

      const response = await fetch(`/api/${type === "admin" ? "Admin" : "User"}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (response.ok) {
        // Store user data in localStorage with type and all user data
        localStorage.setItem('user', JSON.stringify({
          type,
          ...(type === "admin" ? {
            AdminName: data.admin.AdminName,
          } : {
            ...data.user,  // Include all student data including StudentPlacedInfo
            type: 'student' // Explicitly set type as student
          })
        }));
        
        navigate(type === "admin" ? "/admin-dashboard" : "/student-dashboard");
      } else {
        if (response.status === 404) {
          setError(`${type === "admin" ? "Admin" : "Student"} not found`);
        } else if (response.status === 401) {
          setError("Invalid credentials. Please check your username and password.");
        } else {
          setError(data.message || "Login failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout title="Login" showLogout={false}>
      <div className="max-w-md mx-auto">
        <Card>
          <h2 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
            {type === "admin" ? "Admin Login" : "Student Login"}
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg 
                         focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                placeholder={`Enter your ${type === "admin" ? "admin" : "student"} username`}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg 
                         focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
                <p className="text-rose-500 text-sm text-center">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="gradient"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Logging in...</span>
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-gray-400">
            Don't have an account?{" "}
            <Link
              to={type === "admin" ? "/admin-register" : "/register"}
              className="text-rose-500 hover:text-rose-400"
            >
              Register here
            </Link>
          </p>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;
