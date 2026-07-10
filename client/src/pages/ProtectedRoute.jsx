import React from "react";
import { useEffect } from "react";
import { useAuthStore } from "../store/store";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    setUser();
  }, [setUser]);

  if (!user) return <Navigate to={"/"} replace />;
else return <Navigate to={'/q'} replace/>
  return <Outlet />;
}

export default ProtectedRoute;
