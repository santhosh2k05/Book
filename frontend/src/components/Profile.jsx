import React from "react";

const ProfileChecker = () => {
 
  const profiles = [
    {
      id: 1,
      name: "John Doe",
      skills: ["React", "JavaScript", "CSS"],
      progress: 80,
      placed: true,
      company: "Google",
    },
    {
      id: 2,
      name: "Jane Smith",
      skills: ["Python", "Django", "SQL"],
      progress: 65,
      placed: false,
      company: null,
    },
    {
      id: 3,
      name: "Samuel Green",
      skills: ["Java", "Spring Boot", "MySQL"],
      progress: 90,
      placed: true,
      company: "Microsoft",
    },
    {
      id: 4,
      name: "Emily Brown",
      skills: ["HTML", "CSS", "Figma"],
      progress: 70,
      placed: false,
      company: null,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 to-pink-400 p-8 text-white">
      <h1 className="text-4xl font-bold mb-6">Profile Checker</h1>
      <div className="space-y-6">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="bg-white text-black p-6 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold mb-2">{profile.name}</h2>
            <p className="text-lg">
              <strong>Skills:</strong> {profile.skills.join(", ")}
            </p>
            <p className="text-lg">
              <strong>Progress:</strong> {profile.progress}%
            </p>
            <p className="text-lg">
              <strong>Status:</strong>{" "}
              {profile.placed
                ? `Placed at ${profile.company}`
                : "Not Placed Yet"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileChecker;
