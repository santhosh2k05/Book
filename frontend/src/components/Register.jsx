import React, { useState } from "react";
import { Button, TextInput, Radio } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [registrationDetails, setRegistrationDetails] = useState({
        StudentName : "",
        StudentRegNo:"",
        StudentDOB: "",
        StudentEmail : "",
        StudentPassword: "",
        StudentCGPA: "",
        StudentDEPT: "",
        StudentPlatform: "",
        StudentPlacedInfo : "",
        StudentSkills : "",
    });

    const handleChange =  (e) => {
        setRegistrationDetails({
            ...registrationDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/UserRegistration', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                StudentName : registrationDetails.StudentName,
                StudentRegNo : registrationDetails.StudentRegNo,
                StudentDOB : registrationDetails.StudentDOB,
                StudentEmail : registrationDetails.StudentEmail,
                StudentPassword:registrationDetails.StudentPassword,
                StudentCGPA: registrationDetails.StudentCGPA,
                StudentDEPT: registrationDetails.StudentDEPT,
                StudentPlatform: registrationDetails.StudentPlatform,
                StudentPlacedInfo : registrationDetails.StudentPlacedInfo,
                StudentSkills : registrationDetails.StudentSkills,
              })
            }) 
            const result = await response.json();
      
            if (response.ok) {
              // Navigate on successful registration
              navigate("/login?type=student");
            } else {
              // Handle the error response
              console.error(result.message || "An unknown error occurred during registration.");
              alert(result.message || "Registration failed. Please try again.");
            }
            
          } catch (error) {
            console.error('Error during registration:', error);
          }
        
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
                   
                     
                     <TextInput
                        label="RollNo"
                        name="StudentRegNo" // Fix name to match state key
                        type="text"
                        value={registrationDetails.StudentRegNo}
                        onChange={handleChange}
                        required
                        placeholder="Enter your RegNo"
                        />

                        <TextInput
                        label="Date of Birth"
                        name="StudentDOB" // Fix name to match state key
                        type="date"
                        value={registrationDetails.StudentDOB}
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
                        name="StudentCGPA"
                        type="text"
                        value={registrationDetails.StudentCGPA}
                        onChange={handleChange}
                        required
                        placeholder="Enter your CGPA"
                    />
                    {/* HackerRank Profile Link */}
                    <TextInput
                        label="Department"
                        name="StudentDEPT"
                        type="text"
                        value={registrationDetails.StudentDEPT}
                        onChange={handleChange}
                        required
                        placeholder="Enter your Department Name"
                    />

                    {/* LeetCode Profile Link */}
                    <TextInput
                        label="LeetCode Profile Link"
                        name="StudentPlatform"
                        type="text"
                        value={registrationDetails.StudentPlatform}
                        onChange={handleChange}
                        required
                        placeholder="Enter your Online Platform link"
                    />

                    {/* Placement Status */}
                            <TextInput
                                label="Placement Status"
                                name="StudentPlacedInfo"
                                type="text"
                                checked={registrationDetails.StudentPlacedInfo}
                                onChange={handleChange}
                                required
                                placeholder="Placed Yes/No"
                            />
                    

                    {/* Number of Projects */}
                    <TextInput
                        label="Enter your skills"
                        name="StudentSkills"
                        type="text"
                        value={registrationDetails.StudentSkills}
                        onChange={handleChange}
                        required
                        placeholder="List your skills separated by commas"
                        multiline
                        rows={4} // To provide enough space for the user to input multiple skills
                    />


                    {/* Register Button */}
                    <Button
                        type="submit"
                        onClick={handleRegister}
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