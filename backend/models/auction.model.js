import mongoose from "mongoose";

const AuctionSchema = new mongoose.Schema(
	{
		itemName: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		currentBid: {
			type: String,
			required: true,
		},
		highestBidder: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		closingTime: {
			type: Date,
		},
		isClosed: {
			type: Boolean,
			default: false,
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

const Auction = mongoose.model("Auction", AuctionSchema);
export default Auction;
