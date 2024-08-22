import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Navbar({ isAuth, darkMode, setDarkMode }) {
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
  }, [setDarkMode]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
  };

  return (
    <nav
      className={`bg-purple-800 text-white py-4 px-6 shadow-md ${
        darkMode ? "bg-black" : ""
      }`}
    >
      <div className="w-full flex justify-between items-center container mx-auto">
        <Link
          to="/"
          className="text-2xl font-bold hover:text-orange-500 transition duration-300 ease-in-out"
        >
          CryptoKings
        </Link>
        <div className="space-x-4">
          <Link
            to="/"
            className="hover:text-orange-500 transition duration-300 ease-in-out"
          >
            Home
          </Link>
          {!isAuth ? (
            <Link
              to="/login"
              className="hover:text-orange-500 transition duration-300 ease-in-out"
            >
              Login
            </Link>
          ) : (
            <Link
              to="/profile"
              className="hover:text-orange-500 transition duration-300 ease-in-out"
            >
              Profile
            </Link>
          )}
          <button
            onClick={toggleDarkMode}
            className="bg-black text-white p-2 rounded-md hover:text-orange-500 transition duration-300 ease-in-out"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </nav>
  );
}
