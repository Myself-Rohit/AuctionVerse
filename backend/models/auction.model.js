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
			type: String,
		},
		closingTime: {
			type: Date,
		},
		isClosed: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const Auction = mongoose.model("Auction", AuctionSchema);
export default Auction;
