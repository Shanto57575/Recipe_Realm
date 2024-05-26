import React from "react";
import error from "../assets/404.png";

const ErrorPage = () => {
	return (
		<div className="h-screen flex flex-col items-center justify-center">
			<img src={error} alt="" />
			<p className="text-xl">Sorry, Something Went Wrong!</p>
		</div>
	);
};

export default ErrorPage;
