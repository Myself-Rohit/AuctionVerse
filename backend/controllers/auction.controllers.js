import Auction from "../models/auction.model.js";

export const getAuctionItems = async (req, res) => {
	try {
		const allItems = await Auction.find({});
		res.status(200).send(allItems);
	} catch (error) {
		res.status(400).send("ERROR : " + error.message);
	}
};

export const getSingleAuctionItem = async (req, res) => {
	try {
		const { id } = req.params;
		const item = await Auction.findById(id);
		res.status(200).send(item);
	} catch (error) {
		res.status(400).send("ERROR : " + error.message);
	}
};

export const postAuction = async (req, res) => {
	try {
		const { itemName, description, currentBid } = req.body;
		if (!itemName || !description || !currentBid) {
			throw new Error("All fields required");
		}
		const isItemExist = await Auction.findOne({ itemName });
		if (isItemExist) {
			throw new Error("Auction item already Exist");
		}
		const newAuctionItem = new Auction({
			itemName,
			description,
			currentBid,
			highestBidder: "",
			closingTime: "2025-05-18T14:10:30Z",
		});
		await newAuctionItem.save();
		res.status(200).send(newAuctionItem);
	} catch (error) {
		res.status(400).send("ERROR : " + error.message);
	}
};
