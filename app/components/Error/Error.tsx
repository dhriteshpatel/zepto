import React from 'react';

interface ErrorComponentProps {
  message: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-red-500 text-white p-6 rounded-md">
        <p className="text-lg font-semibold">Error</p>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorComponent;
