import React from "react";
import logo from "../assets/rr.png";
import { FaBars } from "react-icons/fa6";
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

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

const Navbar = () => {
	const dispatch = useDispatch();
	const userData = useSelector((state) => state?.user);
	console.log("userData :", userData);

	const handleSignIn = () => {
		dispatch(authStart());
		signInWithPopup(auth, provider)
			.then((result) => {
				const user = result.user;
				const userInfo = {
					name: user?.displayName,
					email: user?.email,
					photo: user?.photoURL,
				};
				dispatch(authSuccess(userInfo));
				toast.success(`${user?.displayName} Signed In Successfully`);
				console.log("token: ", token);
				console.log("user: ", user);
			})
			.catch((error) => {
				dispatch(authFailure(error.message));
				toast.error(`Sign In Failed`);
			});
	};

	const handleLogOut = () => {
		signOut(auth)
			.then(() => {
				dispatch(SignedOut());
				toast.success(`${user.displayName} Logged Out!`);
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
			{userData ? (
				<li>
					<button onClick={handleLogOut}>SignOut</button>
					<Toaster />
				</li>
			) : (
				<li>
					<button onClick={handleSignIn}>SignIn</button>
					<Toaster />
				</li>
			)}
		</div>
	);

	return (
		<div className="container mx-auto navbar bg-base-100">
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
					<img className="w-full h-20" src={logo} alt="" />
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
							<li>{userData?.userInfo?.name}</li>
							<li>{userData?.userInfo?.email}</li>
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default Navbar;
