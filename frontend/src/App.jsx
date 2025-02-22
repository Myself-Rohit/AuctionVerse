import React from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Landing from "./components/Landing";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import PostAuction from "./components/PostAuction";
function App() {
	const token = localStorage.getItem("authToken") || null;
	return (
		<div className="root">
			<Header />
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/dashboard" element={token ? <Dashboard /> : <SignIn />} />
				<Route
					path="/postAuction"
					element={token ? <PostAuction /> : <SignIn />}
				/>
				<Route path="/signup" element={<SignUp />} />
				<Route path="/signin" element={<SignIn />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
