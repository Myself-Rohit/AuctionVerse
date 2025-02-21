import React from "react";
import "../styles/landing.css";
import { Link } from "react-router";

function Landing() {
	return (
		<div className="landing">
			<div>
				<h1 className="heading">
					Welcome to <span>AuctionVerse</span>
				</h1>
				<p className="sub-heading"> Where Bidding Meets Opportunity!</p>
				<Link className="btn" to="/dashboard">
					Get Started
				</Link>
			</div>
		</div>
	);
}

export default Landing;
