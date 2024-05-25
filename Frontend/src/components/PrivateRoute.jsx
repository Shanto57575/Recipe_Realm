import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
	const userData = useSelector((state) => state?.user);
	console.log(userData);

	return userData.userInfo ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
