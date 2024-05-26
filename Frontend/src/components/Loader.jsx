import React from "react";
import { Bars } from "react-loader-spinner";

const Loader = () => {
	return (
		<div className="flex justify-center my-3">
			<Bars
				height="80"
				width="80"
				color="skyblue"
				ariaLabel="bars-loading"
				wrapperStyle={{}}
				wrapperClass=""
				visible={true}
			/>
		</div>
	);
};

export default Loader;
