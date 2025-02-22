import React from "react";
import "../styles/dashboard.css";
function Dashboard() {
	const data = [
		{ bidName: "bid1", price: 100, status: "closed" },
		{ bidName: "bid2", price: 200, status: "open" },
		{ bidName: "bid3", price: 200, status: "closed" },
	];
	return (
		<div className="dashboard">
			<ul className="container">
				{data.map((bid) => (
					<li key={bid.bidName} className="card">
						<span>Name: {bid.bidName} </span>
						<span>Price: ${bid.price} </span>
						<span>{bid.status}</span>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Dashboard;
