import React from "react";
import Layout from "./Layout";
import Card from "./ui/Card";
import Button from "./ui/Button";

const PlacementVideos = () => {
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const isPlaced = userData.StudentPlacedInfo;

  return (
    <Layout title="Placement Videos">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
            {isPlaced ? 'Share Your Success Story' : 'Interview Preparation'}
          </h1>
          <p className="text-lg text-gray-400">
            {isPlaced 
              ? 'Help other students by sharing your placement journey and interview experience'
              : 'Learn from placement success stories and prepare for your interviews'
            }
          </p>
        </div>

        {isPlaced ? (
          // Upload Section for Placed Students
          <Card className="mb-8">
            <div className="text-center p-8">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-rose-500/10 flex items-center justify-center">
                  <svg className="w-10 h-10 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Upload Your Video</h3>
                <p className="text-gray-400 mb-6">Share your interview experience and tips</p>
              </div>

              <div className="max-w-md mx-auto">
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  id="video-upload"
                />
                <label
                  htmlFor="video-upload"
                  className="block w-full p-4 border-2 border-dashed border-gray-800 rounded-lg hover:border-rose-500 transition-colors cursor-pointer"
                >
                  <span className="text-gray-400">Click to select video</span>
                </label>
                <Button variant="gradient" className="w-full mt-4">
                  Upload Video
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          // Video List for Unplaced Students
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample videos - replace with actual data */}
            {[1, 2, 3].map((video) => (
              <Card key={video} className="hover:border-rose-500 transition-colors duration-300">
                <div className="aspect-video bg-black/40 rounded-lg mb-4 flex items-center justify-center">
                  <PlayIcon className="w-12 h-12 text-rose-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Success Story #{video}</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Learn how our alumni cracked their dream job
                </p>
                <Button variant="primary" className="w-full">
                  Watch Video
                </Button>
              </Card>
            ))}
          </div>
        )}

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

const PlayIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default PlacementVideos; 