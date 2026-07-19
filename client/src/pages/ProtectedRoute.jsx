import React, { useEffect } from "react";
import { useAuthStore } from "../store/store";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    setUser();
  }, [setUser]);

  if (!user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
