import React from "react";
import useGetAuctionItems from "../hooks/useGetAutionItems";
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
								<span>{bid?.isClosed ? "closed" : "$" + bid?.currentBid} </span>
							</div>
							<div className="card-body">
								<span>{bid?.description}</span>
							</div>
							<div className="card-foot">
								Last updated {moment(bid.updatedAt).format("DD/MM/YYYY")}
							</div>
						</Link>
					))}
			</ul>
		</div>
	);
}

export default Dashboard;
