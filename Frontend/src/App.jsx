import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorPage from "./Pages/ErrorPage";
import AddRecipe from "./components/AddRecipe";
import PrivateRoute from "./components/PrivateRoute";
import AllRecipe from "./Pages/AllRecipe";
import RecipeDetails from "./components/RecipeDetails";
import PurchaseCoin from "./Pages/PurchaseCoin";
import PaymentSuccess from "./Pages/PaymentSuccess";
import PaymentFailure from "./Pages/PaymentFailure";

const App = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/purchase-coin" element={<PurchaseCoin />}></Route>
				<Route path="/payment-success" element={<PaymentSuccess />}></Route>
				<Route path="/payment-failure" element={<PaymentFailure />}></Route>
				<Route path="/all-recipe" element={<AllRecipe />}></Route>
				<Route path="" element={<PrivateRoute />}>
					<Route path="/add-recipe" element={<AddRecipe />} />
					<Route
						path="/all-recipe/:recipeId"
						element={<RecipeDetails />}
					></Route>
				</Route>
				<Route path="*" element={<ErrorPage />}></Route>
			</Routes>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
