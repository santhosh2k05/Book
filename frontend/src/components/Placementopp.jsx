import React from "react";
import { Card, Button } from "flowbite-react";

const PlacementOpportunities = () => {
  const opportunities = [
    {
      id: 1,
      company: "Google",
      position: "Software Engineer",
      salary: "₹40,00,000",
      location: "Bangalore, India",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrq6VuU46ECIYfMcJ3kQnayNOrk5eRiLnpkg&s",
    },
    {
      id: 2,
      company: "Amazon",
      position: "Front-end Developer",
      salary: "₹25,00,000",
      location: "Hyderabad, India",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEfZOQHseAcDN2GAeXIyjtvMi6yZEN7XrLHw&s",
    },
    {
      id: 3,
      company: "Microsoft",
      position: "Cloud Architect",
      salary: "₹30,00,000",
      location: "Pune, India",
      image:
        "https://logos-world.net/wp-content/uploads/2020/09/Microsoft-Logo-2012-present.jpg",
    },
    {
      id: 4,
      company: "Zoho",
      position: "System Analyst",
      salary: "₹12,00,000",
      location: "Chennai, India",
      image:
        "https://i.pinimg.com/736x/36/76/4c/36764cad429d97090de6e08a7ef82c7b.jpg",
    },
  ];

  return (
    <div className="bg-gradient-to-r bg-black text-white">
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Placement Opportunities
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {opportunities.map((opportunity) => (
            <Card
              key={opportunity.id}
              className="hover:scale-105 transform transition-all duration-300 shadow-lg"
            >
              <img
                src={opportunity.image}
                alt={`${opportunity.company} Logo`}
                className="rounded-t-md h-40 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  {opportunity.company}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Position:</strong> {opportunity.position}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Salary:</strong> {opportunity.salary}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Location:</strong> {opportunity.location}
                </p>
                <div className="mt-4">
                  <Button className="w-full text-lg px-8 py-3 mb-5 bg-black font-extrabold text-white border-2 border-white hover:shadow-lg hover:shadow-white focus:outline-none focus:ring-2 focus:ring-white 
                  focus:ring-opacity-50 transform hover:scale-105 transition-transform duration-300" onClick={() => window.location.href = 'https://in.indeed.com/q-zoho,-amazon,-flipkart,-natwest-jobs.html?vjk=6944aa23f0349f43'}> 
                    Apply Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
  <Button
    onClick={() => window.history.back()}
    className="text-sm font-extrabold text-white border-2 border-white hover:shadow-lg hover:shadow-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transform hover:scale-105 transition-transform duration-300
    justify-center px-10 left-1/2 bottom-14"
  >
    Back
  </Button>



    </div>
    
  );
};

export default PlacementOpportunities;
