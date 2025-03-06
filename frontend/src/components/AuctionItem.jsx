import React from "react";
import useGetItemById from "../hooks/useGetItemById";
import { useParams } from "react-router";
import "../styles/auctionItem.css";

function AuctionItem() {
	const { id } = useParams();
	console.log(id);
	const { loading, data } = useGetItemById(id);

	return (
		<div className="page">
			<div>{data && data?.itemName}</div>
			<button className="edit-btn">Edit</button>
		</div>
	);
}

export default AuctionItem;
