import React from "react";
import { Outlet, Navigate } from "react-router-dom";

// Fungsi untuk memeriksa token pengguna dan perannya
const isAuthenticated = (allowedRoles) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (token && userRole && allowedRoles.includes(userRole)) {
    console.log(userRole);
    return true;
  }
  return false;
};

export function PrivateRoute({ roles }) {
  const isUserAuthenticated = isAuthenticated(roles);

  if (isUserAuthenticated) {
    return <Outlet />;
  } else if (!isUserAuthenticated && window.location.pathname === "/") {
    return <Navigate to="/login" replace />;
  } else if (!isUserAuthenticated && window.location.pathname !== "/login") {
    return <Navigate to="/not-authorityzation" replace />;
  }

  return null;
}

export function ProtectRoute({ roles }) {
  if (isAuthenticated(roles)) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
