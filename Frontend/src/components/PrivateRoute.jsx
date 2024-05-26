import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
	const userData = useSelector((state) => state?.user);

	return userData.userInfo ? <Outlet /> : <Navigate to="/" replace={true} />;
};

export default PrivateRoute;
