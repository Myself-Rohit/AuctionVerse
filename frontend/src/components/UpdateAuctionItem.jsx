import React, { useEffect, useState } from "react";
import "../styles/postItem.css";
import { useParams } from "react-router";
import useGetItemById from "../hooks/useGetItemById.js";
import useUpdateItem from "../hooks/useUpdateItem";

function UpdateAuctionItem() {
	const { id } = useParams();
	const { data } = useGetItemById(id);
	const [formData, setFormData] = useState({
		itemName: "",
		description: "",
		currentBid: "",
		closingTime: "",
	});
	const { loading, updateItem } = useUpdateItem();
	useEffect(() => {
		setFormData({
			...data,
			closingTime: data?.closingTime.slice(0, 16),
		});
	}, [data]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		updateItem(formData, data?._id);
		const inputs = document.querySelectorAll(".info-field");
		inputs.forEach((inp) => {
			inp.value = "";
		});
	};
	return (
		<div className="post-page">
			<form onSubmit={handleSubmit} className="form">
				<h1>Update Auction</h1>
				<div>
					<label className="input-label" htmlFor="itemName">
						Auction Item:
					</label>
					<input
						className="info-field"
						onChange={(e) => handleChange(e)}
						name="itemName"
						placeholder="Enter Item name"
						type="text"
						value={formData?.itemName || ""}
					/>
				</div>
				<div>
					<label className="input-label" htmlFor="description">
						Description:
					</label>
					<textarea
						rows="4"
						className="info-field description"
						onChange={(e) => handleChange(e)}
						name="description"
						placeholder="Type description..."
						type="text"
						value={formData?.description || ""}
					/>
				</div>
				<div>
					<label className="input-label" htmlFor="currentBid">
						Starting Bid:
					</label>
					<input
						className="info-field"
						onChange={(e) => handleChange(e)}
						name="currentBid"
						placeholder="Enter starting bid"
						type="number"
						value={formData?.currentBid || ""}
					/>
				</div>
				<div>
					<label className="input-label" htmlFor="closingTime">
						Closing Time:
					</label>
					<input
						className="info-field"
						onChange={(e) => handleChange(e)}
						name="closingTime"
						placeholder="Enter bid closing time"
						type="datetime-local"
						value={formData?.closingTime || ""}
					/>
				</div>

				<button className="button-primary" type="submit">
					{loading ? "Loading..." : "Update Item"}
				</button>
			</form>
		</div>
	);
}

export default UpdateAuctionItem;
