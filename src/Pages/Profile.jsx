import React, { useEffect, useState } from "react";
import { auth } from "../firebase-cfg";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Profile = ({ isAuth, setIsAuth, darkMode }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) navigate("/");

    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, [isAuth, navigate]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsAuth(false);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div
      className={`flex flex-col items-center p-4 min-h-[calc(100vh-72px)] ${
        darkMode ? "bg-black text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      {user ? (
        <div
          className={` p-6 rounded-lg shadow-lg w-full max-w-sm text-center border-2 border-black ${
            darkMode && "bg-black border-white"
          }`}
        >
          <img
            src={user.photoURL}
            alt="Profile"
            className={`w-32 h-32 rounded-full ${
              darkMode && "bg-white border-2 border-white"
            } mx-auto mb-4`}
          />
          <h3 className="text-xl font-semibold mb-2">
            {user.displayName || "No Name"}
          </h3>
          <p className="text-gray-600 mb-2">{user.email}</p>
          <p className="text-gray-600">
            {user.emailVerified ? "Email Verified" : "Email Not Verified"}
          </p>
          <button
            className="mt-6 bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
