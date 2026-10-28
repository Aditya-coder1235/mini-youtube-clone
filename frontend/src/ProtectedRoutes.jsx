import React from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = () => {
    let token = localStorage.getItem("token");
    return token ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default ProtectedRoutes;
