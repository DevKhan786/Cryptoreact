import React, { useState, useEffect } from "react";
import "./App.css";
import Homepage from "./Pages/Homepage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Coin from "./Pages/Coin";
import Navbar from "./Components/Navbar";
import Profile from "./Pages/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebase-cfg";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuth(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar isAuth={isAuth} darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className={`app-container ${darkMode ? "dark" : ""}`}>
        <Routes>
          <Route
            path="/"
            element={
              <Homepage
                isAuth={isAuth}
                setIsAuth={setIsAuth}
                darkMode={darkMode}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                isAuth={isAuth}
                setIsAuth={setIsAuth}
                darkMode={darkMode}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                isAuth={isAuth}
                setIsAuth={setIsAuth}
                darkMode={darkMode}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                isAuth={isAuth}
                setIsAuth={setIsAuth}
                darkMode={darkMode}
              />
            }
          />
          <Route
            path="/coin/:id"
            element={
              <Coin isAuth={isAuth} setIsAuth={setIsAuth} darkMode={darkMode} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
