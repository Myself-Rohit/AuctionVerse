import React from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Landing from "./components/Landing";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
function App() {
	return (
		<div className="root">
			<Header />
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/signin" element={<SignIn />} />
			</Routes>
		</div>
	);
}

export default App;
