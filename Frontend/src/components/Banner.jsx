import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";

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
				className="w-full h-[500px]"
				style={{ filter: "brightness(0.5)" }}
				src="https://media.istockphoto.com/id/1956865885/photo/homemade-raw-pasta-with-olive-oil-tomato-garlic-and-basil.jpg?s=612x612&w=0&k=20&c=-_y6YWFvOwd2J89L0pD6gqBE-cDJjSLVZKGzTalJXzw="
				alt="Banner"
			/>
			<div className="absolute inset-24 flex items-center justify-center text-center mt-20">
				<div className="font-bold tracking-wide text-center">
					<div className="text-base text-white space-y-2 md:space-y-5">
						<p className="font-serif text-base md:text-lg uppercase text-center">
							Traditional & Hygine
						</p>
						<hr className="w-full md:w-1/3 mx-auto border" />
						<p className="font-serif text-base md:text-3xl lg:text-5xl">
							Welcome to Recipe Realm <br /> Where Flavor Meets Simplicity!
						</p>
					</div>
					<div>
						<p className="w-full md:w-1/2 mx-auto text-sm md:text-xl text-white font-serif my-5">
							Come with family & feel the joy of mouthwatering food
						</p>
						<div className="flex items-center justify-center">
							<Link to="/all-recipe">
								<button className="btn md:my-5 md:mr-2 hover:bg-black hover:text-white border-0 border-b-4 border-white bg-black font-serif md:font-extrabold">
									See Recipes
								</button>
							</Link>
							<button
								onClick={handleRecipe}
								className="btn md:my-5 hover:bg-black hover:text-white border-0 border-b-4 border-white bg-black font-serif md:font-extrabold"
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
