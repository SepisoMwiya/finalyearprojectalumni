import React from "react";

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col h-full w-64 bg-gray-300 animate-pulse rounded-lg">
      <div className="h-48 bg-gray-400 rounded-t-lg"></div>
      <div className="flex flex-col p-4">
        <div className="h-4 bg-gray-400 rounded mb-2"></div>
        <div className="h-4 bg-gray-400 rounded mb-2"></div>
        <div className="h-4 bg-gray-400 rounded mb-2"></div>
        <div className="h-4 bg-gray-400 rounded mb-2"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
