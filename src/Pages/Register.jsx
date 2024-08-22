import React, { useEffect, useState } from "react";
import { auth } from "../firebase-cfg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Register({ isAuth, setIsAuth, darkMode }) {
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuth) navigate("/");
  }, [isAuth, navigate]);

  const handleSignUp = async () => {
    setError("");
    setLoading(true);
    try {
      if (!emailValue || !passwordValue) {
        setError("Missing Email or Password!");
        return;
      }

      await createUserWithEmailAndPassword(auth, emailValue, passwordValue);
      setIsAuth(true);
      navigate("/profile");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col justify-center items-center p-4 min-h-[calc(100vh-72px)] ${
        darkMode ? "bg-black" : "bg-gray-100"
      }`}
    >
      <div
        className={`p-6 rounded-lg shadow-lg w-full max-w-sm flex flex-col items-center justify-center ${
          darkMode
            ? "bg-black text-white border-4 border-white"
            : "bg-white text-gray-800 border border-gray-300"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Enter Email"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          className={`w-full p-3 mb-4 border rounded-lg ${
            darkMode
              ? "bg-gray-700 text-white border border-white"
              : "border-gray-300"
          }`}
          aria-label="Email"
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
          className={`w-full p-3 mb-4 border rounded-lg ${
            darkMode
              ? "bg-gray-700 text-white border border-white"
              : "border-gray-300"
          }`}
          aria-label="Password"
        />
        <button
          onClick={handleSignUp}
          disabled={loading}
          className={`w-full p-3 rounded-lg mt-4 transition duration-300 ease-in-out ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : darkMode
              ? "bg-black text-white hover:bg-gray-800 border border-white"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {loading ? "Sign Up..." : "Sign Up"}
        </button>
      </div>
    </div>
  );
}
