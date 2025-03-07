import React, { useState } from "react";
import usePostItem from "../hooks/usePostItem";
import "../styles/postItem.css";

function PostAuction() {
	const [formData, setFormData] = useState({});
	const { loading, postItem } = usePostItem();
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		postItem(formData);
		const inputs = document.querySelectorAll(".input-field");
		inputs.forEach((inp) => {
			inp.value = "";
		});
	};
	return (
		<div className="post-page">
			<form onSubmit={handleSubmit} className="form">
				<h1>Post Auction</h1>
				<div>
					<label className="input-label" htmlFor="itemName">
						Auction Item:
					</label>
					<input
						className="input-field"
						onChange={(e) => handleChange(e)}
						name="itemName"
						placeholder="Enter Item name"
						type="text"
					/>
				</div>
				<div>
					<label className="input-label" htmlFor="description">
						Description:
					</label>
					<textarea
						rows="4"
						className="input-field description"
						onChange={(e) => handleChange(e)}
						name="description"
						placeholder="Type description..."
						type="text"
					/>
				</div>
				<div>
					<label className="input-label" htmlFor="currentBid">
						Starting Bid:
					</label>
					<input
						className="input-field"
						onChange={(e) => handleChange(e)}
						name="currentBid"
						placeholder="Enter starting bid"
						type="number"
					/>
				</div>
				<div>
					<label className="input-label" htmlFor="closingTime">
						Closing Time:
					</label>
					<input
						className="input-field"
						onChange={(e) => handleChange(e)}
						name="closingTime"
						placeholder="Enter bid closing time"
						type="datetime-local"
					/>
				</div>

				<button className="post-btn" type="submit">
					{loading ? "Loading..." : "Create Item"}
				</button>
			</form>
		</div>
	);
}

export default PostAuction;
