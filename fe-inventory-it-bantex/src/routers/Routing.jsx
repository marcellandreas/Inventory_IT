import React from "react";
import { Outlet, Navigate } from "react-router-dom";

// Fungsi untuk memeriksa token pengguna
const isAuthenticated = () => {
  return localStorage.getItem("token") ? true : false;
};

export function PrivateRoute() {
  if (isAuthenticated()) {
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
}

export function ProtectRoute() {
  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

// export default function ProtectedRoute() {
//   let { tokenAdmin, role } = AuthAdmin.isAuthorization();
//   let { token } = Auth.isAuthorization();
//   if (tokenAdmin && role === "admin") {
//     return <Navigate to="/dashboard-admin" replace />;
//   } else if (token) {
//     return <Navigate to="/dashboard-mitra" replace />;
//   }
//   return <Outlet />;
// }
