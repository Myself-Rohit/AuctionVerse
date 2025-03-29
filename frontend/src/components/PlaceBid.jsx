import React, { useEffect, useState } from "react";
import "../styles/placeBid.css";
import usePlaceBid from "../hooks/usePlaceBid.js";
import { useParams } from "react-router";
import useGetItemById from "../hooks/useGetItemById.js";
import { createSocketConnection } from "../socket/socket.js";

const PlaceBid = () => {
	const { id } = useParams();
	const { data, setData } = useGetItemById(id);
	const [bid, setBid] = useState(0);
	useEffect(() => {
		const socket = createSocketConnection();
		socket.on("sendData", (data) => {
			setData(data);
		});
		return () => {
			socket.disconnect();
		};
	}, []);
	const { loading, placeBid } = usePlaceBid();
	const handleBid = () => {
		placeBid(bid, id);
		const socket = createSocketConnection();
		if (bid > data?.currentBid) {
			socket.emit("placeBid", { ...data, bid });
		}
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
