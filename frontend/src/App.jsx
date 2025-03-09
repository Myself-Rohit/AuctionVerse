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
import { ToastContainer } from "react-toastify";
import { useAuthContext } from "./context/AuthContext.jsx";
import AuctionItem from "./components/AuctionItem.jsx";
import UpdateAuctionItem from "./components/UpdateAuctionItem.jsx";
import PlaceBid from "./components/PlaceBid.jsx";
function App() {
	const { authUser } = useAuthContext();
	return (
		<div className="root">
			<Header />
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route
					path="/dashboard"
					element={authUser ? <Dashboard /> : <SignIn />}
				/>
				<Route
					path="/postAuction"
					element={authUser ? <PostAuction /> : <SignIn />}
				/>
				<Route
					path="/update/:id"
					element={authUser ? <UpdateAuctionItem /> : <SignIn />}
				/>
				<Route
					path="/item/:id"
					element={authUser ? <AuctionItem /> : <SignIn />}
				/>
				<Route path="/bid/:id" element={authUser ? <PlaceBid /> : <SignIn />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/signin" element={<SignIn />} />
			</Routes>
			<Footer />
			<ToastContainer />
		</div>
	);
}

export default App;
