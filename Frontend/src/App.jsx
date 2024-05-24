import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorPage from "./Pages/ErrorPage";

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="*" element={<ErrorPage />}></Route>
				</Routes>
				<Footer />
			</BrowserRouter>
		</div>
	);
};

export default App;
