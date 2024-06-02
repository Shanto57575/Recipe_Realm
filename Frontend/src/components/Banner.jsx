import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Banner = () => {
	const userData = useSelector((state) => state?.user?.userInfo);
	const navigate = useNavigate();

	const handleRecipe = () => {
		toast.error(`Please Login First!`);
		{
			userData ? navigate("/add-recipe") : " ";
		}
	};

	return (
		<div>
			<img
				className="w-full h-screen mt-10 shadow-2xl hover:shadow-cyan-800"
				style={{ filter: "brightness(0.4)" }}
				src="https://media.istockphoto.com/id/953140058/photo/cooking-nd-seasoning-spices-border-on-black-slate-background.jpg?s=612x612&w=0&k=20&c=O6qm_B41xGdtAjzoqvA4pyHGqg8p7ZOgwnPZMMKzPU4="
				alt="Banner"
			/>
			<div className="absolute inset-24 flex items-center justify-center text-center pt-52">
				<div className="font-bold tracking-wide text-center">
					<div className="text-base text-white space-y-4 mb-5">
						<p className="font-serif text-base md:text-lg uppercase text-center">
							Traditional & Hygine
						</p>
						<hr className="w-full md:w-1/3 mx-auto border" />
						<p className="font-serif text-base md:text-3xl lg:text-5xl">
							Welcome to Recipe Realm <br /> Where Flavor Meets Simplicity!
						</p>
					</div>
					<div className="space-y-7">
						<p className="w-full md:w-1/2 mx-auto text-sm md:text-xl text-white font-serif">
							Come with family & feel the joy of mouthwatering food
						</p>
						<div className="flex flex-wrap gap-x-2 items-center justify-center">
							<Link to="/all-recipe">
								<button className="btn mb-2 md:mb-0 hover:bg-black hover:text-white border-0 border-b-4 border-white bg-black font-serif md:font-extrabold">
									See Recipes
								</button>
							</Link>
							<button
								className="btn hover:bg-black hover:text-white border-0 border-b-4 border-white bg-black font-serif md:font-extrabold"
								onClick={handleRecipe}
							>
								Add Recipes
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Banner;
