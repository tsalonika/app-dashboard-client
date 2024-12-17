import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Login } from "./pages";

const root = ReactDOM.createRoot(document.getElementById("root"));

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("successLogin");

  return isAuthenticated ? children : <Navigate to="/login" />;
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <App />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
