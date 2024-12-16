import React from "react";
import LoginPage from "./pages/loginPage";
import HomePage from "./pages/homePage";
import { Navigate, Route, Router, Routes } from "react-router-dom";

const App = () => {
  const isAuthenticated = localStorage.getItem("userData");

  return (
    <Routes>
      <Route
        path="/login"
        element={
          !isAuthenticated ? <LoginPage /> : <Navigate to="/main" replace />
        }
      />
      <Route
        path="/main"
        element={
          isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
