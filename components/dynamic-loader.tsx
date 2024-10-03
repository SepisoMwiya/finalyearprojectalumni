import React from "react";

interface DynamicLoaderProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const DynamicLoader: React.FC<DynamicLoaderProps> = ({
  isLoading,
  children,
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col h-full w-full animate-pulse">
        {React.Children.map(children, (child) => (
          <div className="flex flex-col mb-4">
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
          </div>
        ))}
      </div>
    );
  }

  return <>{children}</>;
};

export default DynamicLoader;
