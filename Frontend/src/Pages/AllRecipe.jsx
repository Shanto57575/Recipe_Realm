import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { FiSearch } from "react-icons/fi";
import InfiniteScroll from "react-infinite-scroll-component";
import { authSuccess } from "../app/Features/userSlice";

const AllRecipe = () => {
	const [category, setCategory] = useState(null);
	const [country, setCountry] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");

	const [allRecipe, setAllRecipe] = useState([]);
	const userData = useSelector((state) => state?.user?.userInfo);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const filterRecipes = (recipes) => {
		return recipes?.filter((recipe) => {
			if (category && recipe?.category !== category) {
				return false;
			}
			if (country && recipe?.country !== country) {
				return false;
			}
			return true;
		});
	};

	const handleSearch = (e) => {
		setSearchQuery(e?.target?.value);
	};

	const searchRecipes = (recipes) => {
		return recipes?.filter((recipe) =>
			recipe?.recipeName?.toLowerCase()?.includes(searchQuery?.toLowerCase())
		);
	};

	useEffect(() => {
		const fetchRecipes = async () => {
			const allRecipes = await axios.get(
				"https://backend-alpha-lovat.vercel.app/api/recipe/all-recipe"
			);
			setAllRecipe(allRecipes?.data?.recipes);
		};
		fetchRecipes();
	}, [category, country, searchQuery]);

	const fetchData = async () => {
		try {
			const response = await axios.get(
				"https://backend-alpha-lovat.vercel.app/api/recipe/all-recipe"
			);
			const newRecipes = response?.data?.recipes;
			setAllRecipe((prevRecipes) => [...prevRecipes, ...newRecipes]);
		} catch (error) {
			throw new Error(error.message);
		}
	};

	const handlePurchaseRecipe = async (recipeId) => {
		try {
			if (userData?.coin >= 10) {
				const newCoinValue = userData.coin - 10;

				const updatedUserData = {
					...userData,
					coin: newCoinValue,
				};

				const updatedData = {
					recipeId,
					email: userData?.email,
					newCoin: newCoinValue,
				};

				const response = await axios.put(
					`https://backend-alpha-lovat.vercel.app/api/user/${userData?._id}`,
					updatedData
				);

				if (response.status === 200) {
					toast.success("You Spent 10 Coins!");
					setTimeout(() => {
						navigate(`/all-recipe/${recipeId}`);
					}, 800);
				} else {
					throw new Error("Insufficient coins");
				}

				dispatch(authSuccess(response?.data?.user[1]?.user));
			} else {
				throw new Error("Insufficient coins");
			}
		} catch (error) {
			toast.error("Failed to purchase recipe. Please try again later.");
		}
	};

	const checkLogin = (id) => {
		toast.error(`Please Login First!`);
		const prevUrl = `/all-recipe/${id}`;
		navigate("/", { state: { previousUrl: prevUrl } });
	};

	const purchaseCoin = () => {
		toast.error("Insufficient coins... Please Purchase!");
		setTimeout(() => {
			navigate("/purchase-coin");
		}, 800);
	};

	const handleReset = () => {
		setCategory(null);
		setCountry(null);
		setSearchQuery("");
	};

	return (
		<div>
			<h1 className="text-center text-3xl font-extrabold my-10 underline">
				Our Recipe Repository
			</h1>

			<div className="mx-4 md:mx-auto md:flex items-center justify-between max-w-5xl mb-7">
				<div className="border-y-2">
					<select
						onChange={(e) => setCategory(e.target.value)}
						value={category}
						className="select select-ghost w-full max-w-xs rounded-none"
					>
						<option disabled selected>
							Filter By Category
						</option>
						<option>Sweet</option>
						<option>Sour</option>
						<option>Spicy</option>
					</select>
				</div>
				<div className="border-y-2">
					<select
						onChange={(e) => setCountry(e.target.value)}
						value={country}
						className="select select-ghost w-full max-w-xs rounded-none"
					>
						<option disabled selected>
							Filter By Country
						</option>
						<option>Bangladesh</option>
						<option>Italy</option>
						<option>India</option>
					</select>
				</div>
				<div>
					<label className="input input-bordered flex items-center gap-2 rounded-none border-y-2 border-white border-x-0">
						<input
							type="text"
							value={searchQuery}
							onChange={(e) => handleSearch(e)}
							placeholder="Search"
							className="grow"
						/>
						<FiSearch />
					</label>
				</div>
				<button
					onClick={handleReset}
					className="btn w-full md:w-32 mt-2 md:mt-0"
				>
					reset Filter
				</button>
			</div>

			<section className="max-w-5xl mx-auto">
				{filterRecipes(searchRecipes(allRecipe))?.length === 0 ? (
					<p className="text-center text-3xl my-20">
						No recipe found matching the selected filters.
					</p>
				) : null}
				<InfiniteScroll
					dataLength={allRecipe?.length}
					next={fetchData}
					hasMore={true}
					loader={<Loader />}
					endMessage={<p>No more data to load.</p>}
				>
					{filterRecipes(searchRecipes(allRecipe))?.map((recipe, idx) => (
						<div
							key={idx}
							className="card md:card-side mb-6 hover:bg-gradient-to-r from-gray-700 via-gray-950 to-black shadow-md shadow-cyan-700 hover:shadow-white mx-5"
						>
							<figure>
								<img
									className="w-full md:w-96 h-72"
									src={recipe?.image}
									alt="Album"
								/>
							</figure>
							<div className="card-body">
								<h2 className="card-title">{recipe?.recipeName}</h2>
								<h3>Purchased By : {recipe?.purchased_by?.length}</h3>
								<h3>creatorEmail : {recipe?.email}</h3>
								<h3>Country : {recipe?.country}</h3>
								<div className="card-actions">
									{userData ? (
										<div>
											{userData?.coin < 10 ? (
												<>
													<button
														onClick={purchaseCoin}
														className="btn my-5 mr-2 hover:bg-black hover:text-white border-0 border-b-4 border-white bg-black font-serif font-extrabold"
													>
														View Recipe
													</button>
													<Toaster />
												</>
											) : (
												<>
													<button
														onClick={() => handlePurchaseRecipe(recipe?._id)}
														className="btn my-5 mr-2 hover:bg-black hover:text-white border-0 border-b-4 border-white bg-black font-serif font-extrabold"
													>
														View Recipe
													</button>
													<Toaster />
												</>
											)}
										</div>
									) : (
										<button
											onClick={() => checkLogin(recipe?._id)}
											className="btn my-5 mr-2 hover:bg-black hover:text-white border-0 border-b-4 border-white bg-black font-serif font-extrabold"
										>
											View Recipe
										</button>
									)}
								</div>
							</div>
						</div>
					))}
				</InfiniteScroll>
			</section>
		</div>
	);
};

export default AllRecipe;
