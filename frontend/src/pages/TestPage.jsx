import React from 'react';

const TestPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4">SAP Project Test</h1>
        <p className="text-gray-600 text-center mb-6">
          Frontend is working! 🎉
        </p>
        <div className="space-y-2 text-sm">
          <p>✅ React is running</p>
          <p>✅ Tailwind CSS is working</p>
          <p>✅ Components are loading</p>
        </div>
        <div className="mt-6 text-center">
          <a 
            href="/login" 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default TestPage; 