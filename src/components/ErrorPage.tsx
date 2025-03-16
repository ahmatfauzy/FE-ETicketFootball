import React from "react";

const ErrorPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-gray-700 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-white mb-4">404</h1>
        <p className="text-white text-lg">
          Halaman yang Anda cari tidak ditemukan.
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
