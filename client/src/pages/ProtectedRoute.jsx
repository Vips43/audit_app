import React, { useEffect } from "react";
import { useAuthStore } from "../store/store";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

function ProtectedRoute() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  
  useEffect(() => {
    if (!user && user === null) {
      navigate("/");
    }
  }, [user, navigate]);
  return <Outlet />;
}

export default ProtectedRoute;
