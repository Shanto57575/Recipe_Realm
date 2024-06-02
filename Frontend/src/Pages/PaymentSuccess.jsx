import React, { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const PaymentSuccess = () => {
	const userData = useSelector((state) => state?.user?.userInfo);
	const coins = JSON.parse(localStorage.getItem("money")) * 100;
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.post(
					"https://backend-alpha-lovat.vercel.app/api/payment/payment-success",
					{
						userId: userData?._id,
						token: "75757123",
						coins,
					}
				);
				console.log(response);
			} catch (error) {
				throw new Error("Error:", error.message);
			}
		};

		fetchData();
	}, [userData]);

	return (
		<div className="text-center borde h-96 w-96 mx-auto py-40 px-10 my-32 shadow-2xl shadow-white">
			<h1 className="text-xl">Congratulations ! Payment is Successfull</h1>
			<p className="text-3xl text-green-300">You Got {coins || 0} coins</p>
		</div>
	);
};

export default PaymentSuccess;
