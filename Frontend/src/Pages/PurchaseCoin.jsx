import React from "react";
import { FaCoins } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const PurchaseCoin = () => {
	const userData = useSelector((state) => state?.user?.userInfo);
	const navigate = useNavigate();

	const makePayment = async (money) => {
		if (!userData) {
			toast.error(`Please Login First`);
		}

		const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHED_KEY);

		try {
			const response = await axios.post("/api/payment/checkout", { money });
			const session = await response?.data;

			const result = stripe.redirectToCheckout({
				sessionId: session.id,
			});

			if (result.error) {
				console.error("Error redirecting to checkout:", result.error.message);
			}
		} catch (error) {
			console.error("Error making payment:", error);
		}
	};

	return (
		<div>
			<h1 className="text-center text-2xl font-extrabold underline my-10">
				Purchase Coin
			</h1>
			<div className="md:flex items-center justify-center lg:justify-evenly mt-10 mb-20 w-full mx-auto">
				<div className="card w-72 mb-5 mx-auto shadow-2xl border-2 border-blue-500 translate-x-6 hover:-hue-rotate-180 hover:-translate-y-4 duration-500 shadow-cyan-500 bg-black">
					<figure>
						<img
							className="w-full h-48"
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
					<button
						onClick={() => makePayment(1)}
						className="btn hover:text-blue-500 border-0 border-y-4 bg-black font-serif font-extrabold"
					>
						Buy Now
					</button>
				</div>
				<div className="card w-72 mb-5 mx-auto shadow-2xl border-2 border-green-500 translate-x-6 hover:-hue-rotate-180 hover:-translate-y-4 duration-500 shadow-green-500 bg-black">
					<figure>
						<img
							className="w-full h-48"
							src="https://media.istockphoto.com/id/1327569515/photo/financial-investment-concept-stack-of-coins-for-finance-investor-with-trading-graph-growth.jpg?s=612x612&w=0&k=20&c=SUft-WS1n1qc7E0AUUztenWIvA8wJtP9BgVnETRl-Zc="
							alt="5USD"
						/>
					</figure>
					<div className="card-body">
						<h2 className="card-title">
							500 <FaCoins color="#F7EF8A" />
							<div className="badge badge-primary">NEW</div>
						</h2>
						<p>5 USD</p>
					</div>
					<button
						onClick={() => makePayment(5)}
						className="btn hover:text-green-500 border-0 border-y-4 bg-black font-serif font-extrabold"
					>
						Buy Now
					</button>
				</div>
				<div className="card w-72 mb-5 mx-auto shadow-2xl border-2 border-red-500 translate-x-6 hover:-hue-rotate-180 hover:-translate-y-4 duration-500 shadow-red-500 bg-black">
					<figure>
						<img
							className="w-full h-48"
							src="https://media.istockphoto.com/id/902643844/photo/bitcoin-symbol-over-financial-chart-crypto-currency-concept.jpg?s=612x612&w=0&k=20&c=gwaz-ndzZWnaUAWq3BFXbsQe3EEHUQYwqV5xil_JWcc="
							alt="10USD"
						/>
					</figure>
					<div className="card-body">
						<h2 className="card-title">
							1000 <FaCoins color="#F7EF8A" />
							<div className="badge badge-primary">NEW</div>
						</h2>
						<p>10 USD</p>
					</div>
					<button
						onClick={() => makePayment(10)}
						className="btn hover:text-red-500 border border-y-4 bg-black font-serif font-extrabold"
					>
						Buy Now
					</button>
				</div>
			</div>
		</div>
	);
};

export default PurchaseCoin;
