import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000); // Redirects after 3 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-2">Success!</h1>
        <p className="text-gray-600">Redirecting you to home...</p>
      </div>
    </div>
  );
};

export default Success;
