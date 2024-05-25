import React from "react";
import CountUp from "react-countup";

const Stats = () => {
	return (
		<div className="text-center my-10">
			<div className="stats stats-vertical lg:stats-horizontal shadow-sm shadow-white rounded-2xl hover:shadow-md hover:shadow-white duration-700 hover:bg-gradient-to-r from-black via-slate-900 group">
				<div className="stat my-8 rounded-full text-white">
					<div className="stat-title group-hover:text-blue-500">
						Recipes Uploaded
					</div>
					<div className="stat-value">
						<CountUp end={25} duration={60} />K
					</div>
					<div className="stat-desc group-hover:text-blue-500">
						<CountUp end={18} duration={3} decimals={1} />% increase from last
						month
					</div>
				</div>
				<div className="stat my-8 rounded-full text-white">
					<div className="stat-title group-hover:text-blue-500">
						Active Users
					</div>
					<div className="stat-value">
						<CountUp end={32000} duration={3} />
					</div>
					<div className="stat-desc group-hover:text-blue-500">
						↗︎ <CountUp end={25} duration={3} />% growth rate
					</div>
				</div>
				<div className="stat my-8 rounded-full text-white">
					<div className="stat-title group-hover:text-blue-500">
						Average Ratings
					</div>
					<div className="stat-value">4.7</div>
					<div className="stat-desc group-hover:text-blue-500">
						Based on user feedback
					</div>
				</div>
			</div>
		</div>
	);
};

export default Stats;
