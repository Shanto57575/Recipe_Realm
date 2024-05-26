import React from "react";
import { FaCoins } from "react-icons/fa";

const PurchaseCoin = () => {
	return (
		<div>
			<h1 className="text-center text-2xl font-extrabold underline my-10">
				Purchase Coin to View Recipe
			</h1>
			<div className="lg:flex items-center justify-center lg:justify-evenly gap-10 my-10">
				<div className="card w-72 shadow-2xl border-2 border-blue-500 translate-x-6 skew-x-12 hover:-skew-x-6 hover:-translate-y-4 duration-500 shadow-cyan-500 bg-black">
					<figure>
						<img
							src="https://media.istockphoto.com/id/1503371245/photo/percentage-sign-on-top-of-coin-stacks-before-blue-financial-graph.jpg?s=612x612&w=0&k=20&c=T9YGg7XIZTG_8E2h1xsTaQkdLGCTjkX_rnMr0adtAQk="
							alt="coin"
						/>
					</figure>
					<div className="card-body">
						<h2 className="card-title">
							100 <FaCoins color="#F7EF8A" />
							<div className="badge badge-primary">NEW</div>
						</h2>
						<p>1 USD</p>
					</div>
					<button className="btn hover:text-blue-500 border-0 border-y-4 bg-black font-serif font-extrabold">
						Purchase Coin
					</button>
				</div>
				<div className="card w-72 shadow-2xl border-2 border-green-500 translate-x-6 skew-x-12 hover:-skew-x-6 hover:-translate-y-4 duration-500 shadow-green-500 bg-black">
					<figure>
						<img
							src="https://media.istockphoto.com/id/1503371245/photo/percentage-sign-on-top-of-coin-stacks-before-blue-financial-graph.jpg?s=612x612&w=0&k=20&c=T9YGg7XIZTG_8E2h1xsTaQkdLGCTjkX_rnMr0adtAQk="
							alt="Shoes"
						/>
					</figure>
					<div className="card-body">
						<h2 className="card-title">
							500 <FaCoins color="#F7EF8A" />
							<div className="badge badge-primary">NEW</div>
						</h2>
						<p>5 USD</p>
					</div>
					<button className="btn hover:text-green-500 border-0 border-y-4 bg-black font-serif font-extrabold">
						Purchase Coin
					</button>
				</div>
				<div className="card w-72 shadow-2xl border-2 border-red-500 translate-x-6 skew-x-12 hover:-skew-x-6 hover:-translate-y-4 duration-500 shadow-red-500 bg-black">
					<figure>
						<img
							src="https://media.istockphoto.com/id/1503371245/photo/percentage-sign-on-top-of-coin-stacks-before-blue-financial-graph.jpg?s=612x612&w=0&k=20&c=T9YGg7XIZTG_8E2h1xsTaQkdLGCTjkX_rnMr0adtAQk="
							alt="Shoes"
						/>
					</figure>
					<div className="card-body">
						<h2 className="card-title">
							1000 <FaCoins color="#F7EF8A" />
							<div className="badge badge-primary">NEW</div>
						</h2>
						<p>10 USD</p>
					</div>
					<button className="btn hover:text-red-500 border border-y-4 bg-black font-serif font-extrabold">
						Purchase Coin
					</button>
				</div>
			</div>
		</div>
	);
};

export default PurchaseCoin;
