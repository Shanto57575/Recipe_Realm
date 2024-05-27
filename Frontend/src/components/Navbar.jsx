import React from "react";
import logo from "../assets/rr.png";
import { FaBars, FaCoins } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
} from "firebase/auth";
import { app } from "../Firebase/firebase.config";
import { useSelector, useDispatch } from "react-redux";
import {
	SignedOut,
	authFailure,
	authStart,
	authSuccess,
} from "../app/Features/userSlice";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { FaRegHeart } from "react-icons/fa";
import { useState } from "react";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

const Navbar = () => {
	const dispatch = useDispatch();
	const userData = useSelector((state) => state?.user);
	console.log(userData);
	const location = useLocation();
	const navigate = useNavigate();

	const [addReaction, setAddReaction] = useState(false);

	const handleSignIn = async () => {
		try {
			dispatch(authStart());
			const result = await signInWithPopup(auth, provider);
			const user = result.user;
			const userInfo = {
				name: user?.displayName,
				email: user?.email,
				photo: user?.photoURL,
			};
			const data = await axios.post("/api/user/login", userInfo);
			dispatch(authSuccess(data?.data?.user));
			navigate(location?.state?.previousUrl);
			setTimeout(() => {
				toast.success(data?.data?.message);
			}, 2000);
			if (data.status === 201) {
				setTimeout(() => {
					toast.success(`Congratulations! You got 50 Free coins`, {
						duration: 4000,
					});
				}, 3000);
			}
		} catch (error) {
			dispatch(authFailure(error.message));
			setTimeout(() => {
				toast.error(`Sorry, Something went wrong!`);
			}, 2000);
		}
	};

	const handleLogOut = async () => {
		try {
			await signOut(auth);
			const data = await axios.post("/api/user/logOut");
			toast.success(data?.data?.message);
			dispatch(SignedOut());
		} catch (error) {
			toast.error(error.message);
		}
	};

	const navItems = (
		<div className="md:flex items-center font-serif text-lg font-semibold">
			<li>
				<Link to="/">Home</Link>
			</li>
			<li>
				<Link to="/purchase-coin">Purchase Coin</Link>
			</li>
			<li>
				<Link to="/all-recipe">All Recipes</Link>
			</li>
			{userData?.userInfo ? (
				<li className="flex items-center gap-x-2">
					<Link to="/add-recipe">Add Recipe</Link>
				</li>
			) : (
				<li>
					<button disabled={userData?.isLoading} onClick={handleSignIn}>
						SignIn
					</button>
				</li>
			)}
		</div>
	);

	return (
		<div className="navbar">
			<div className="navbar-start">
				<div className="dropdown">
					<div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
						<FaBars size={22} />
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content mt-3 z-[1] shadow bg-black border-b-2 border-r-2 rounded w-60"
					>
						{navItems}
					</ul>
				</div>
				<section className="flex items-center">
					<img className="w-full h-20 hidden md:block" src={logo} alt="" />
					<span className="font-serif text-orange-400 mt-2">RecipeRealm</span>
				</section>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal md:border-b md:rounded-full shadow shadow-white">
					{navItems}
				</ul>
			</div>
			<div className="navbar-end">
				{userData?.userInfo && (
					<div className="dropdown dropdown-end">
						<div tabIndex={0} className="cursor-pointer">
							<img
								className="h-10 w-10 rounded-full"
								src={userData?.userInfo?.photo}
								alt="profileImage"
							/>
						</div>
						<ul
							tabIndex={0}
							className="dropdown-content z-[1] font-serif menu p-2 shadow bg-base-100 rounded-box w-52"
						>
							{addReaction ? (
								<button
									onClick={() => setAddReaction(!addReaction)}
									className="reaction-button"
								>
									<div
										className={`inline-block ${
											addReaction ? "bg-red-500" : ""
										} p-1 rounded-full`}
									>
										<FaRegHeart className="text-white" size={25} />
									</div>
								</button>
							) : (
								<button
									onClick={() => setAddReaction(!addReaction)}
									className="reaction-button"
								>
									<div
										className={`inline-block ${
											addReaction ? "bg-transparent" : ""
										} p-1 rounded-full`}
									>
										<FaRegHeart className="text-white" size={25} />
									</div>
								</button>
							)}
							<li className="p-2">{userData?.userInfo?.name}</li>
							<li className="p-2">{userData?.userInfo?.email}</li>
							<p className="flex items-center gap-x-1 text-xl">
								{userData?.userInfo?.coin}
								<FaCoins color="#FFBF00" />
							</p>
							<li className="p-0">
								<button onClick={handleLogOut} className="p-1">
									SignOut
								</button>
								<Toaster />
							</li>
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default Navbar;
