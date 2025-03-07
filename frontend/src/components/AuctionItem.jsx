import React from "react";
import useGetItemById from "../hooks/useGetItemById";
import { Link, useParams } from "react-router";
import "../styles/auctionItem.css";

function AuctionItem() {
	const { id } = useParams();
	const { loading, data } = useGetItemById(id);
	if (!data) {
		return <></>;
	}
	return (
		<div className="page">
			<div>{data?.itemName}</div>
			<Link to={`/update/${data?._id}`}>
				<button className="edit-btn">Edit</button>
			</Link>
		</div>
	);
}

export default AuctionItem;
