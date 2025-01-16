import React from "react";
import Layout from "./Layout";
import Card from "./ui/Card";
import Button from "./ui/Button";

const PlacementOpportunities = () => {
  // Sample data - replace with actual API call
  const opportunities = [
    {
      id: 1,
      company: "Google",
      role: "Software Development Engineer",
      date: "May 15, 2024",
      package: "₹25-40 LPA",
      eligibility: "CGPA > 8.0",
      status: "Open",
      website: "https://careers.google.com"
    },
    {
      id: 2,
      company: "Microsoft",
      role: "Full Stack Developer",
      date: "May 20, 2024",
      package: "₹20-35 LPA",
      eligibility: "CGPA > 7.5",
      status: "Open",
      website: "https://careers.microsoft.com"
    },
    // Add more opportunities as needed
  ];

  return (
    <Layout title="Placement Opportunities">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
            Placement Opportunities
          </h1>
          <p className="text-lg text-gray-400">
            Explore available job opportunities and company profiles
          </p>
        </div>

        {/* Opportunities List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((opportunity) => (
            <Card key={opportunity.id} className="hover:border-rose-500 transition-colors duration-300">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{opportunity.company}</h3>
                <p className="text-gray-400 mb-4">{opportunity.role}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date</span>
                    <span className="text-white">{opportunity.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Package</span>
                    <span className="text-white">{opportunity.package}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Eligibility</span>
                    <span className="text-white">{opportunity.eligibility}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status</span>
                    <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-500">
                      {opportunity.status}
                    </span>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    variant="gradient"
                    className="w-full"
                    onClick={() => window.open(opportunity.website, '_blank')}
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Button 
            variant="secondary"
            onClick={() => window.history.back()}
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default PlacementOpportunities;
