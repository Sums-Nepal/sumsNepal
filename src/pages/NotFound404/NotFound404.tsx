import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {

  const navigate = useNavigate();

  const redirectToTheHomePage = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate("/");
  }, []);



  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-6">
        Page Not Found
      </h2>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        onClick={redirectToTheHomePage}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Back to Home
      </a>
    </div>
  );
}

export default NotFoundPage;
