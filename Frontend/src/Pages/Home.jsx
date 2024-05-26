import React from "react";
import Banner from "../components/Banner";
import Stats from "../components/Stats";
import DevInfo from "../components/DevInfo";
import PurchaseCoin from "./PurchaseCoin";

const Home = () => {
	return (
		<div>
			<Banner />
			<Stats />
			<DevInfo />
		</div>
	);
};

export default Home;
