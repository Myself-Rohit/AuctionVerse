import React from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
function App() {
	return (
		<div className="root">
			<Routes>
				<Route path="/signup" element={<SignUp />} />
				<Route path="/signin" element={<SignIn />} />
			</Routes>
		</div>
	);
}

export default App;
