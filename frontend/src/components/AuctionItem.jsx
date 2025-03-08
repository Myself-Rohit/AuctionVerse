import React from "react";
import "../styles/auctionItem.css";
import { useAuthContext } from "../context/AuthContext";
import { Link, useParams } from "react-router";
import useGetItemById from "../hooks/useGetItemById.js";
import useUpdateItem from "../hooks/useUpdateItem.js";

const AuctionItem = () => {
	const { authUser } = useAuthContext();
	const { id } = useParams();
	const { data } = useGetItemById(id);

	if (!data) {
		return <></>;
	}

	return (
		<div className="item-container">
			<div className="item-card">
				<h1 className="item-title">{data?.itemName}</h1>
				<p className="item-description">{data?.description}</p>

				<div className="bid-section">
					<p className="current-bid">
						Current Bid: <span>${data?.currentBid}</span>
					</p>
					{data?.highestBidder && (
						<p className="highest-bidder">
							Highest Bidder: {data?.highestBidder.username || "Anonymous"}
						</p>
					)}
				</div>

				<div className="auction-status">
					{data?.isClosed ? (
						<span className="closed">Auction Closed</span>
					) : (
						<>
							<p className="closing-time">
								Closes at: {new Date(data?.closingTime).toLocaleTimeString()}
							</p>
							{String(data?.createdBy) === String(authUser._id) ? (
								<Link className="button-primary" to={`/update/${data?._id}`}>
									Update Item
								</Link>
							) : (
								<Link className="button-primary" to={`/update/${data?._id}`}>
									Place a Bid
								</Link>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default AuctionItem;
