import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorPage from "./Pages/ErrorPage";
import AddRecipe from "./components/AddRecipe";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="" element={<PrivateRoute />}>
					<Route path="/add-recipe" element={<AddRecipe />} />
				</Route>
				<Route path="*" element={<ErrorPage />}></Route>
			</Routes>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
