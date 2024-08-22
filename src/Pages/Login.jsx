import React, { useEffect, useState } from "react";
import { auth, provider } from "../firebase-cfg";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login({ isAuth, setIsAuth, darkMode }) {
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuth) navigate("/");
  }, [isAuth, navigate]);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, emailValue, passwordValue);
      setIsAuth(true);
      navigate("/profile");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithPopup(auth, provider);
      setIsAuth(true);
      navigate("/profile");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const goRegister = () => {
    navigate("/register");
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
            ? "bg-black text-white border-2 border-white"
            : "bg-white text-gray-800"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Enter Email"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          className={`w-full p-3 mb-4 border border-gray-300 rounded-lg ${
            darkMode
              ? "bg-gray-700 text-white border-gray-600"
              : "border-gray-300"
          }`}
          aria-label="Email"
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
          className={`w-full p-3 mb-4 border border-gray-300 rounded-lg ${
            darkMode
              ? "bg-gray-700 text-white border-gray-600"
              : "border-gray-300"
          }`}
          aria-label="Password"
        />
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full p-3 rounded-lg mt-4 transition duration-300 ease-in-out ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : darkMode
              ? "bg-purple-600 text-white hover:bg-purple-700 border-2 border-white"
              : "bg-purple-500 text-white hover:bg-purple-600"
          }`}
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className={`w-full p-3 rounded-lg mt-4 transition duration-300 ease-in-out ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : darkMode
              ? "bg-red-600 text-white hover:bg-red-700 border-2 border-white"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
        >
          {loading ? "Loading..." : "Login with Google"}
        </button>
        <button
          onClick={goRegister}
          className={`w-full p-3 rounded-lg mt-4 transition duration-300 ease-in-out ${
            darkMode
              ? "bg-black text-white hover:bg-gray-700 border-2 border-white"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}
