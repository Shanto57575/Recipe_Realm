import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const RecipeDetails = () => {
	const { recipeId } = useParams();
	const [recipe, setRecipe] = useState(null);

	useEffect(() => {
		const fetchRecipes = async () => {
			try {
				const response = await axios.get(`/api/recipe/all-recipe/${recipeId}`);
				setRecipe(response.data);
			} catch (error) {
				toast.error(error.message);
			}
		};
		fetchRecipes();
	}, []);

	return (
		<div>
			{recipe && (
				<div>
					<h1 className="text-center text-3xl font-extrabold my-10 underline">
						{recipe.recipeName} Details
					</h1>
					<section className="max-w-5xl mx-auto">
						<div
							key={recipe._id}
							className="card md:card-side mb-6 hover:bg-gradient-to-r from-gray-700 via-gray-950 to-black shadow-md shadow-cyan-700 hover:shadow-white mx-5"
						>
							<figure>
								<img
									className="w-full h-72"
									src={recipe.image}
									alt={recipe.recipeName}
								/>
							</figure>
							<div className="card-body w-1/2">
								<p>Category: {recipe.category}</p>
								<p>Country: {recipe.country}</p>
								<p>Details: {recipe.details}</p>
								<p>Creator Email: {recipe.email}</p>
								<div>
									<h4 className="underline mb-1">Purchased By:</h4>
									{recipe.purchased_by.length > 0 ? (
										<>
											<ul>
												{recipe.purchased_by.slice(0, 3).map((user, index) => (
													<li key={index}>
														{index + 1}. {user}
													</li>
												))}
											</ul>
											{recipe.purchased_by.length > 3 && (
												<span>{` and ${
													recipe.purchased_by.length - 3
												} others`}</span>
											)}
										</>
									) : (
										" None"
									)}
								</div>

								<p>Watch Count: {recipe.watchCount}</p>
							</div>
						</div>
						<div className="rounded-full mx-5 mb-10">
							<iframe
								className="w-full h-64 rounded-lg shadow-md shadow-white"
								src={`https://www.youtube.com/embed/${recipe?.ytvideocode}`}
								title="YouTube video player"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								referrerPolicy="strict-origin-when-cross-origin"
								allowFullScreen
							></iframe>
						</div>
					</section>
				</div>
			)}
		</div>
	);
};

export default RecipeDetails;
