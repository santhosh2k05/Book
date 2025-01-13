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
        isPlaced: "nonPlaced", // default is nonPlaced
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
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-cyan-400">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Student Registration</h2>
                <form className="space-y-4" onSubmit={handleRegister}>
                    {/* Username */}
                    <TextInput
                        label="Username"
                        name="StudentName"
                        type="text"
                        value={registrationDetails.username}
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
                        value={registrationDetails.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                    />

                    {/* Password */}
                    <TextInput
                        label="Password"
                        name="StudentPassword"
                        type="password"
                        value={registrationDetails.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter your password"
                    />
                    {/* CGPA */}
                    <TextInput
                        label="CGPA"
                        name="CGPA"
                        type="text"
                        value={registrationDetails.cgpa}
                        onChange={handleChange}
                        required
                        placeholder="Enter your CGPA"
                    />
                    {/* HackerRank Profile Link */}
                    <TextInput
                        label="HackerRank Profile Link"
                        name="hackerRankLink"
                        type="text"
                        value={registrationDetails.hackerRankLink}
                        onChange={handleChange}
                        required
                        placeholder="Enter your HackerRank profile link"
                    />

                    {/* LeetCode Profile Link */}
                    <TextInput
                        label="LeetCode Profile Link"
                        name="leetcodeLink"
                        type="text"
                        value={registrationDetails.leetcodeLink}
                        onChange={handleChange}
                        required
                        placeholder="Enter your LeetCode profile link"
                    />

                    {/* Placement Status */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <TextInput
                                label="Placement Status"
                                name="placedInfo"
                                type="text"
                                checked={registrationDetails.Placement}
                                onChange={handleChange}
                                required
                                placeholder="Placed Yes/No"
                            />
                            </div>
                    </div>

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

export default Register;
