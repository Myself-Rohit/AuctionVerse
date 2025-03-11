import React, { useState } from "react";
import useGetAuctionItems from "../hooks/useGetAutionItems.js";
import { Link } from "react-router";
import "../styles/dashboard.css";
import moment from "moment";
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
							<div className="card-head">
								<span>{bid.itemName} </span>
								<span
									className={`${
										new Date().toISOString() > bid?.closingTime
											? "closed-bid"
											: "bid"
									}`}
								>
									{new Date().toISOString() > bid?.closingTime
										? "closed"
										: "$" + bid?.currentBid}
								</span>
							</div>
							<div className="card-body">
								<span>{bid?.description}</span>
							</div>
							<div className="card-foot">
								Closing Date {moment(bid.closingTime).format("DD/MM/YYYY")}
							</div>
						</Link>
					))}
			</ul>
		</div>
	);
}

export default Dashboard;
