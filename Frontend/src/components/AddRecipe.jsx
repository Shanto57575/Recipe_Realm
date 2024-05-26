import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const AddRecipe = () => {
	const [imageUrl, setImageUrl] = useState("");
	const userData = useSelector((state) => state?.user?.userInfo);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const handleFileUpload = async (event) => {
		try {
			const formData = new FormData();
			formData.append("image", event.target.files[0]);

			const response = await axios.post(
				`https://api.imgbb.com/1/upload?key=${
					import.meta.env.VITE_IMG_API_KEY
				}`,
				formData
			);
			if (response?.data?.data && response?.data?.data?.image) {
				setImageUrl(response?.data?.data?.image?.url);
			}
		} catch (error) {
			console.error("Error uploading image:", error);
		}
	};

	const onSubmit = async (formData) => {
		formData.email = userData?.email;
		formData.image = imageUrl;
		formData.watchCount = 0;
		formData.purchased_by = [];

		try {
			const response = await axios.post("/api/recipe/add-recipe", formData);
			console.log(response);
			toast.success("Recipe added successfully!");
		} catch (error) {
			toast.error(error.message);
			console.log(error);
		}
		reset();
	};

	return (
		<div className="flex items-center justify-center mt-10">
			<div className="w-full max-w-2xl">
				<h1 className="text-center text-2xl font-bold mb-5">
					Contribute Your Favorite Dish
				</h1>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="shadow-md bg-black shadow-white rounded px-8 pt-6 pb-8 mb-4 my-auto"
				>
					<div className="mb-4 pt-5">
						<div className="flex flex-wrap -mx-2">
							<div className="w-full lg:w-1/2 px-2 mb-4 lg:mb-0">
								<label
									className="block  text-sm font-bold mb-2"
									htmlFor="recipeName"
								>
									Recipe Name
								</label>
								<input
									{...register("recipeName", {
										required: "Recipe name is required",
										maxLength: {
											value: 20,
											message: "Recipe name should not exceed 20 characters",
										},
									})}
									className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
									id="recipeName"
									type="text"
									placeholder="Recipe Name"
								/>
								{errors.recipeName && (
									<span className="text-rose-600 my-1.5">
										{errors.recipeName.message}
									</span>
								)}
							</div>
							<div className="w-full lg:w-1/2 px-2">
								<label
									className="block  text-sm font-bold mb-2"
									htmlFor="image"
								>
									Recipe Image
								</label>
								<input
									{...register("image", {
										required: "Image is required",
									})}
									onChange={handleFileUpload}
									className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
									id="image"
									type="file"
									accept="image/*"
								/>
								{errors.image && (
									<span className="text-rose-600 my-1.5">
										{errors.image.message}
									</span>
								)}
							</div>
						</div>
					</div>
					<div className="mb-4">
						<div className="flex flex-wrap -mx-2">
							<div className="w-full lg:w-1/2 px-2 mb-4 lg:mb-0">
								<label
									className="block  text-sm font-bold mb-2"
									htmlFor="details"
								>
									Recipe Details
								</label>
								<input
									{...register("details", {
										required: "Details are required",
									})}
									className="shadow appearance-none border rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
									id="details"
									type="text"
									placeholder="Recipe Details"
								/>
								{errors.details && (
									<span className="text-rose-600 my-1.5">
										{errors.details.message}
									</span>
								)}
							</div>
							<div className="w-full lg:w-1/2 px-2">
								<label
									className="block  text-sm font-bold mb-2"
									htmlFor="ytvideocode"
								>
									Embedded Video Code
								</label>
								<input
									{...register("ytvideocode", {
										required: "Embedded video code is required",
									})}
									className="shadow appearance-none border rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
									id="ytvideocode"
									type="text"
									placeholder="Embedded Video Code"
								/>
								{errors.ytvideocode && (
									<span className="text-rose-600 my-1.5">
										{errors.ytvideocode.message}
									</span>
								)}
							</div>
						</div>
					</div>
					<div className="mb-6">
						<div className="flex flex-wrap -mx-2">
							<div className="w-full lg:w-1/2 px-2 mb-4 lg:mb-0">
								<label
									className="block  text-sm font-bold mb-2"
									htmlFor="country"
								>
									Country
								</label>
								<select
									{...register("country", {
										required: "Country is required",
									})}
									className="shadow appearance-none border rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
									id="country"
								>
									<option value="">Select Country</option>
									<option value="Bangladesh">Bangladesh</option>
									<option value="Indian">India</option>
									<option value="Italian">Italia</option>
								</select>
								{errors.country && (
									<span className="text-rose-600 my-1.5">
										{errors.country.message}
									</span>
								)}
							</div>
							<div className="w-full lg:w-1/2 px-2">
								<label
									className="block  text-sm font-bold mb-2"
									htmlFor="category"
								>
									Category
								</label>
								<select
									{...register("category", {
										required: "Category is required",
									})}
									className="shadow appearance-none border rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
									id="category"
								>
									<option value="">Select Category</option>
									<option value="Sweet">Sweet</option>
									<option value="Sour">Sour</option>
									<option value="Spicy">Spicy</option>
								</select>
								{errors.category && (
									<span className="text-rose-600 my-1.5">
										{errors.category.message}
									</span>
								)}
							</div>
						</div>
					</div>
					<div className="mb-6">
						<section className="text-center">
							<input
								type="submit"
								className="bg-gray-900 cursor-pointer text-white hover:bg-slate-700 duration-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							/>
						</section>
					</div>
					<Toaster />
				</form>
				<p className="text-center text-sm my-5">
					©{new Date().getFullYear()} RecipeRealm. All rights reserved.
				</p>
			</div>
		</div>
	);
};

export default AddRecipe;
