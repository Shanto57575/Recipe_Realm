import React from "react";
import logo from "../assets/rr.png";
import { FaBars, FaCoins } from "react-icons/fa6";
import { Link } from "react-router-dom";
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
import { PiCoins } from "react-icons/pi";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

const Navbar = () => {
	const dispatch = useDispatch();
	const userData = useSelector((state) => state?.user);

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
			console.log(data);
			dispatch(authSuccess(data?.data?.user));
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
				toast.error(`Sign In Failed`);
			}, 2000);
		}
	};

	const handleLogOut = () => {
		signOut(auth)
			.then(() => {
				dispatch(SignedOut());
				toast.success(`User Logged Out!`);
			})
			.catch((error) => {
				toast.error(error.message);
			});
	};

	const navItems = (
		<div className="md:flex items-center font-serif text-lg font-semibold">
			<li>
				<Link to="/">Home</Link>
			</li>
			<li>
				<Link to="/recipes">Recipes</Link>
			</li>
			{userData.userInfo ? (
				<ul className="flex items-center gap-x-2">
					<li>
						<Link to="/add-recipe">Add Recipes</Link>
					</li>
				</ul>
			) : (
				<li>
					<button onClick={handleSignIn}>SignIn</button>
					<Toaster />
				</li>
			)}
		</div>
	);

	return (
		<div className="container mx-auto navbar md:py-5">
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
								alt=""
							/>
						</div>
						<ul
							tabIndex={0}
							className="dropdown-content z-[1] font-serif menu p-2 shadow bg-base-100 rounded-box w-52"
						>
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
