import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Add this import at the top of your file or in a global CSS file
// This is needed because we're using Tailwind via CDN and can't configure custom fonts
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
`;

const Navbar: React.FC = () => {
  const { user, setUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <style>{fontStyles}</style>

      <nav
        className="bg-gray-900 text-white sticky top-0 z-50"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo section */}
            <div className="flex-1">
              <Link to="/dashboard" className="flex-shrink-0 flex items-center">
                <span className="font-bold text-xl text-white">FootieGate</span>
              </Link>
            </div>

            {/* Menu section - centered */}
            <div className="hidden md:flex justify-center flex-1">
              <div className="flex items-center space-x-6">
                <Link
                  to="/dashboard"
                  className="flex items-center h-20 px-3 text-sm font-medium text-white hover:text-gray-300 transition-all duration-200"
                >
                  HOME
                </Link>
                <Link
                  to="/matches/user"
                  className="flex items-center h-20 px-3 text-sm font-medium text-white hover:text-gray-300 transition-all duration-200"
                >
                  PERTANDINGAN
                </Link>
                {isAuthenticated && (
                  <Link
                    to="/my-tickets"
                    className="flex items-center h-20 px-3 text-sm font-medium text-white hover:text-gray-300 transition-all duration-200"
                  >
                    TIKET SAYA
                  </Link>
                )}
              </div>
            </div>

            {/* User/Auth section */}
            <div className="hidden md:flex justify-end flex-1">
              <div className="flex items-center space-x-4">
                {/* Auth buttons or user info */}
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-300">{user?.email}</span>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-1 bg-gray-600 text-white rounded-md text-sm font-medium hover:bg-gray-700 transition-all duration-200"
                    >
                      LOGOUT
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link
                      to="/login"
                      className="px-3 py-2 text-sm font-medium text-white hover:text-gray-300 transition-all duration-200"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="px-4 py-1 bg-gray-600 text-white rounded-md text-sm font-medium hover:bg-gray-700 transition-all duration-200"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 hover:bg-gray-700 focus:outline-none transition-all duration-200"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900 border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/dashboard"
                className="block px-3 py-3 rounded-md text-base font-medium text-white hover:text-gray-300 hover:bg-gray-700 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                HOME
              </Link>
              <Link
                to="/matches/user"
                className="block px-3 py-3 rounded-md text-base font-medium text-white hover:text-gray-300 hover:bg-gray-700 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                PERTANDINGAN
              </Link>
              {isAuthenticated && (
                <Link
                  to="/my-tickets"
                  className="block px-3 py-3 rounded-md text-base font-medium text-white hover:text-gray-300 hover:bg-gray-700 transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  TIKET SAYA
                </Link>
              )}
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-3 text-base font-medium text-gray-300">
                    {user?.email}
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-white hover:text-gray-300 hover:bg-gray-700 transition-all duration-200"
                  >
                    LOGOUT
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-3 rounded-md text-base font-medium text-white hover:text-gray-300 hover:bg-gray-700 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-3 rounded-md text-base font-medium text-white hover:text-gray-300 hover:bg-gray-700 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
