import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 px-6">
      <div className="flex flex-col items-center space-y-6">
        <AlertCircle className="w-20 h-20 text-red-500" />
        
        <h1 className="text-6xl font-extrabold">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-gray-500 max-w-md text-center">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>

        <button
          onClick={() => navigate("/products")}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-200"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
