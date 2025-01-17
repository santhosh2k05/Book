import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import Card from "./ui/Card";
import Button from "./ui/Button";

const EditProfile = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    StudentName: userData.StudentName || '',
    StudentEmail: userData.StudentEmail || '',
    StudentDEPT: userData.StudentDEPT || '',
    StudentCGPA: userData.StudentCGPA || '',
    StudentSkills: userData.StudentSkills || '',
    StudentRegNo: userData.StudentRegNo || '',
    StudentPhone: userData.StudentPhone || '',
    StudentAddress: userData.StudentAddress || '',
    StudentDOB: userData.StudentDOB || '',
    StudentGender: userData.StudentGender || '',
    StudentYear: userData.StudentYear || '',
    StudentSemester: userData.StudentSemester || '',
    StudentSection: userData.StudentSection || '',
    StudentBatch: userData.StudentBatch || '',
    StudentLinkedIn: userData.StudentLinkedIn || '',
    StudentGitHub: userData.StudentGitHub || '',
    StudentPortfolio: userData.StudentPortfolio || '',
    StudentPlacedInfo: userData.StudentPlacedInfo || false,
    StudentCompany: userData.StudentCompany || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Validate CGPA
      const cgpa = parseFloat(formData.StudentCGPA);
      if (isNaN(cgpa) || cgpa < 0 || cgpa > 10) {
        setError("CGPA must be a number between 0 and 10");
        setIsLoading(false);
        return;
      }

      // Validate company name if placed
      if (formData.StudentPlacedInfo && !formData.StudentCompany?.trim()) {
        setError("Company name is required when marked as placed");
        setIsLoading(false);
        return;
      }

      // Prepare the data
      const updatedFormData = {
        ...formData,
        StudentCGPA: cgpa.toFixed(2),
        StudentPlacedInfo: Boolean(formData.StudentPlacedInfo),
        StudentCompany: formData.StudentPlacedInfo ? formData.StudentCompany.trim() : null
      };

      console.log("Sending update request:", updatedFormData); // Debug log

      const response = await fetch(`/api/students/update/${formData.StudentRegNo}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData)
      });

      const data = await response.json();
      console.log("Received response:", data); // Debug log

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      // Update localStorage with new data
      const updatedUserData = {
        ...userData,
        ...updatedFormData
      };
      localStorage.setItem('user', JSON.stringify(updatedUserData));
      
      alert("Profile updated successfully!");
      navigate('/student-profile');
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.message || "Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout title="Edit Profile">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
            Edit Profile
          </h1>
          <p className="text-lg text-gray-400">
            Update your profile information
          </p>
        </div>

        <Card className="mb-8">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

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
                  />
                </div>
              </div>
            </div>

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
                    min="0"
                    max="10"
                    name="StudentCGPA"
                    value={formData.StudentCGPA}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '' || (parseFloat(value) >= 0 && parseFloat(value) <= 10)) {
                        handleChange(e);
                      }
                    }}
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
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
                Professional Links
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    name="StudentLinkedIn"
                    value={formData.StudentLinkedIn}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg 
                             focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    GitHub Profile
                  </label>
                  <input
                    type="url"
                    name="StudentGitHub"
                    value={formData.StudentGitHub}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg 
                             focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                    placeholder="https://github.com/username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Portfolio Website
                  </label>
                  <input
                    type="url"
                    name="StudentPortfolio"
                    value={formData.StudentPortfolio}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg 
                             focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
                Skills
              </h3>
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
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
                Placement Status
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Are you placed?
                  </label>
                  <select
                    name="StudentPlacedInfo"
                    value={formData.StudentPlacedInfo ? "true" : "false"}
                    onChange={(e) => {
                      const isPlaced = e.target.value === "true";
                      setFormData({
                        ...formData,
                        StudentPlacedInfo: isPlaced,
                        StudentCompany: isPlaced ? formData.StudentCompany : ""
                      });
                    }}
                    className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg 
                             focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                  >
                    <option value="false">Not Placed</option>
                    <option value="true">Placed</option>
                  </select>
                </div>

                {formData.StudentPlacedInfo && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="StudentCompany"
                      value={formData.StudentCompany}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg 
                               focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                      placeholder="Enter company name"
                      required={formData.StudentPlacedInfo}
                    />
                  </div>
                )}
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
                <p className="text-rose-500 text-sm text-center">{error}</p>
              </div>
            )}

            <div className="flex justify-center gap-4">
              <Button
                variant="secondary"
                onClick={() => navigate('/student-profile')}
                type="button"
              >
                Cancel
              </Button>
              <Button
                variant="gradient"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default EditProfile; 