import React, { useState } from "react";
import { Button, TextInput, Radio } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [registrationDetails, setRegistrationDetails] = useState({
        username: "",
        email: "",
        password: "",
        hackerRankLink: "",
        cgpa: "",
        leetcodeLink: "",
        isPlaced: "nonPlaced", 
        projectsCount: "",
    });

    const handleChange = (e) => {
        setRegistrationDetails({
            ...registrationDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        // Here you would handle user registration logic (e.g., API call)
        // For now, we are just redirecting to the login page
        navigate("/login?type=student");
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r bg-black ">
            <div className="w-full max-w-md bg-black shadow-lg border border-white p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-white text-center mb-6">Student Registration</h2>
                <form className="space-y-4" onSubmit={handleRegister}>
                    {/* Username */}
                    <TextInput
                        label="Username"
                        name="StudentName"
                        type="text"
                        value={registrationDetails.StudentName}
                        onChange={handleChange}
                        required
                        placeholder="Enter your username"
                    />
                     {/* Date of Birth (DOB) */}
                     <TextInput
                        label="Date of Birth"
                        name="dob"
                        type="date"
                        value={registrationDetails.dob}
                        onChange={handleChange}
                        required
                    />

                    {/* Email */}
                    <TextInput
                        label="Email"
                        name="StudentEmail"
                        type="email"
                        value={registrationDetails.StudentEmail}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                    />

                    {/* Password */}
                    <TextInput
                        label="Password"
                        name="StudentPassword"
                        type="password"
                        value={registrationDetails.StudentPassword}
                        onChange={handleChange}
                        required
                        placeholder="Enter your password"
                    />
                    {/* CGPA */}
                    <TextInput
                        label="CGPA"
                        name="CGPA"
                        type="text"
                        value={registrationDetails.CGPA}
                        onChange={handleChange}
                        required
                        placeholder="Enter your CGPA"
                    />
                    {/* HackerRank Profile Link */}
                    <TextInput
                        label="Department"
                        name="DepartmentName"
                        type="text"
                        value={registrationDetails.DepartmentName}
                        onChange={handleChange}
                        required
                        placeholder="Enter your Department Name"
                    />

                    {/* LeetCode Profile Link */}
                    <TextInput
                        label="LeetCode Profile Link"
                        name="PlatformLink"
                        type="text"
                        value={registrationDetails.PlatformLink}
                        onChange={handleChange}
                        required
                        placeholder="Enter your Online Platform link"
                    />

                    {/* Placement Status */}
                            <TextInput
                                label="Placement Status"
                                name="placedInfo"
                                type="text"
                                checked={registrationDetails.placedinfo}
                                onChange={handleChange}
                                required
                                placeholder="Placed Yes/No"
                            />
                    

                    {/* Number of Projects */}
                    <TextInput
                        label="Enter your skills"
                        name="skills"
                        type="text"
                        value={registrationDetails.skills}
                        onChange={handleChange}
                        required
                        placeholder="List your skills separated by commas"
                        multiline
                        rows={4} // To provide enough space for the user to input multiple skills
                    />


                    {/* Register Button */}
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

export default Register;