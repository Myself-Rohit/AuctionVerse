import React from "react";
import "../styles/dashboard.css";
import useGetAuctionItems from "../hooks/useGetAutionItems";
import { Link } from "react-router";
function Dashboard() {
	const { loading, data } = useGetAuctionItems();

	if (loading) {
		return <div>No Item to display</div>;
	}
	return (
		<div className="dashboard">
			<ul className="container">
				{data &&
					data.map((bid) => (
						<Link to={`/item/${bid._id}`} key={bid.itemName} className="card">
							<span>Name: {bid.itemName} </span>
							<span>Description : {bid.description} </span>
							<span>Price: ${bid.currentBid} </span>
						</Link>
					))}
			</ul>
		</div>
	);
}

export default Dashboard;
