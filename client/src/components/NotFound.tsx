import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-8">Página no encontrada</p>
        <a href="/home" className="px-4 py-2 bg-black text-white rounded hover:bg-emerald-500">
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;