import React, { useState } from "react";
import "../styles/auctionItem.css";
import { useAuthContext } from "../context/AuthContext";
import { Link, useNavigate, useParams } from "react-router";
import useGetItemById from "../hooks/useGetItemById.js";
import useDeleteItem from "../hooks/useDeleteItem.js";
import moment from "moment";

const AuctionItem = () => {
	const { authUser } = useAuthContext();
	const { id } = useParams();
	const { data } = useGetItemById(id);
	const [showModel, setShowModel] = useState(false);
	const { loading, deleteItem } = useDeleteItem();
	const navigate = useNavigate();
	const handleDelete = async () => {
		await deleteItem(id);
		setShowModel(false);
		navigate("/dashboard");
	};

	if (!data) {
		return <></>;
	}

	return (
		<div className="item-container">
			{showModel && (
				<div className="model">
					<h1>Do you want to Delete this Auction Item?</h1>
					<div>
						<button className="yes-btn" onClick={handleDelete}>
							Yes, I am sure!
						</button>
						<button className="no-btn" onClick={() => setShowModel(false)}>
							No, Cancel!
						</button>
					</div>
				</div>
			)}
			<div className="item-card">
				<h1 className="item-title">
					{data?.itemName}

					{String(data?.createdBy?._id) === String(authUser._id) && (
						<img
							className="delete-btn"
							onClick={() => setShowModel(true)}
							src="https://img.icons8.com/?size=48&id=102550&format=png"
							alt="delete button"
						/>
					)}
				</h1>
				<p className="item-description">{data?.description}</p>

				<div className="bid-section">
					<p className="current-bid">
						Current Bid: <span>${data?.currentBid}</span>
					</p>
					{data?.highestBidder && (
						<p className="highest-bidder">
							Highest Bidder: {data?.highestBidder?.userName || "Anonymous"}
						</p>
					)}
				</div>

				<div className="auction-status">
					{new Date() > moment(data?.closingTime) ? (
						<span className="closed">Auction Closed</span>
					) : (
						<>
							<p className="closing-time">
								{"Closes at:" +
									moment(data?.closingTime).format("hh:mm:ss DD/MM/YYYY")}
							</p>
							{String(data?.createdBy?._id) === String(authUser._id) ? (
								<Link className="button-primary" to={`/update/${data?._id}`}>
									Update Item
								</Link>
							) : (
								<Link className="button-primary" to={`/bid/${data?._id}`}>
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
