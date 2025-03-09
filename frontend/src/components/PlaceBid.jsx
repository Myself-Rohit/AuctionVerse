import React, { useState } from "react";
import "../styles/placeBid.css";
import usePlaceBid from "../hooks/usePlaceBid.js";
import { useParams } from "react-router";
import useGetItemById from "../hooks/useGetItemById.js";

const PlaceBid = () => {
	const { id } = useParams();
	const { data } = useGetItemById(id);
	const [bid, setBid] = useState(0);

	const { loading, placeBid } = usePlaceBid();
	const handleBid = () => {
		placeBid(bid, id);
		setBid("");
	};
	if (!data) {
		return <></>;
	}
	return (
		<div className="auction-container">
			<div className="auction-card">
				<h2 className="item-title">{data?.itemName}</h2>
				<p className="item-description">{data?.description}</p>

				<div className="bid-info">
					<p>
						<strong>Highest Bid:</strong> ${data?.currentBid}
					</p>
					<p>
						<strong>Highest Bidder: </strong>
						{data?.highestBidder?.userName || "Be the one"}
					</p>
				</div>

				<div className="bid-form">
					<input
						type="number"
						onChange={(e) => setBid(e.target.value)}
						placeholder="Enter your bid ($)"
						className="bid-input"
					/>
					<button
						className="button-primary"
						onClick={handleBid}
						disabled={loading}
					>
						{loading ? "Loading..." : "Place Bid"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default PlaceBid;
