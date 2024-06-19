import React, { useEffect } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/authContext";

function ProtectedMedicoP() {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <h1>Cargando...</h1>;

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (user && user.role !== 'MedicoPersonal') {
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
}

export default ProtectedMedicoP;
