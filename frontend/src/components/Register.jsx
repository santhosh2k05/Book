import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "./Layout";
import Card from "./ui/Card";
import Button from "./ui/Button";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    StudentName: "",
    StudentRegNo: "",
    StudentEmail: "",
    StudentPassword: "",
    StudentDEPT: "",
    StudentCGPA: "",
    StudentSkills: "",
    StudentPhone: "",
    StudentAddress: "",
    StudentDOB: "",
    StudentGender: "",
    StudentYear: "",
    StudentSemester: "",
    StudentSection: "",
    StudentBatch: "",
    StudentPlacedInfo: false,
    StudentCompany: ""
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    // Special handling for radio buttons
    if (type === 'radio' && name === 'StudentPlacedInfo') {
      setFormData(prev => ({
        ...prev,
        [name]: value === 'true', // Convert string to boolean
        // Clear company if not placed
        StudentCompany: value === 'false' ? '' : prev.StudentCompany
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch('/api/UserRegistration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful! Please login to continue.");
        navigate('/login?type=student');
      } else {
        // Show specific error for duplicate email
        if (response.status === 400 && data.message.includes("Email already registered")) {
          setError("This email is already registered. Please use a different email or login.");
        } else {
          setError(data.message || "Registration failed");
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError("An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout title="Student Registration" showLogout={false}>
      <div className="max-w-3xl mx-auto">
        <Card>
          <h2 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
            Student Registration
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="StudentName"
                    value={formData.StudentName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg 
                             focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    name="StudentRegNo"
                    value={formData.StudentRegNo}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg 
                             focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="StudentDOB"
                    value={formData.StudentDOB}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg 
                             focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Gender
                  </label>
                  <select
                    name="StudentGender"
                    value={formData.StudentGender}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg 
                             focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="StudentEmail"
                    value={formData.StudentEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg 
                             focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="StudentPhone"
                    value={formData.StudentPhone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg 
                             focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Address
                  </label>
                  <textarea
                    name="StudentAddress"
                    value={formData.StudentAddress}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg 
                             focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
                Academic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Department
                  </label>
                  <input
                    type="text"
                    name="StudentDEPT"
                    value={formData.StudentDEPT}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg 
                             focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    CGPA
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="StudentCGPA"
                    value={formData.StudentCGPA}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg 
                             focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Year
                  </label>
                  <input
                    type="text"
                    name="StudentYear"
                    value={formData.StudentYear}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg 
                             focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Semester
                  </label>
                  <input
                    type="text"
                    name="StudentSemester"
                    value={formData.StudentSemester}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg 
                             focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Section
                  </label>
                  <input
                    type="text"
                    name="StudentSection"
                    value={formData.StudentSection}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg 
                             focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Batch
                  </label>
                  <input
                    type="text"
                    name="StudentBatch"
                    value={formData.StudentBatch}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg 
                             focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                name="StudentPassword"
                value={formData.StudentPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg 
                         focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                required
              />
            </div>

            {/* Placement Status */}
            <div>
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
                Placement Status
              </h3>
              <div className="flex gap-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="StudentPlacedInfo"
                    value="false"
                    checked={!formData.StudentPlacedInfo}
                    onChange={handleChange}
                    className="w-4 h-4 text-rose-500 border-gray-800 focus:ring-rose-500 focus:ring-offset-gray-900"
                  />
                  <span className="ml-2 text-gray-300">Not Placed</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="StudentPlacedInfo"
                    value="true"
                    checked={formData.StudentPlacedInfo}
                    onChange={handleChange}
                    className="w-4 h-4 text-rose-500 border-gray-800 focus:ring-rose-500 focus:ring-offset-gray-900"
                  />
                  <span className="ml-2 text-gray-300">Placed</span>
                </label>
              </div>
            </div>

            {/* Company field shows only if placed */}
            {formData.StudentPlacedInfo && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  name="StudentCompany"
                  value={formData.StudentCompany || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg 
                           focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                  required={formData.StudentPlacedInfo}
                />
              </div>
            )}

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Skills (comma-separated)
              </label>
              <textarea
                name="StudentSkills"
                value={formData.StudentSkills}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg 
                         focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                rows="3"
                placeholder="React, Node.js, JavaScript, etc."
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
                  <span>Registering...</span>
                </div>
              ) : (
                "Register"
              )}
            </Button>

            <p className="text-center text-gray-400">
              Already have an account?{" "}
              <Link to="/" className="text-rose-500 hover:text-rose-400">
                Login here
              </Link>
            </p>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default Register;