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
		const { itemName, description, currentBid, closingTime } = req.body;
		const userId = req.user?._id;
		if (!itemName || !description || !currentBid || !closingTime) {
			throw new Error("All fields required");
		}
		const isItemExist = await Auction.findOne({ itemName });
		if (isItemExist) {
			throw new Error("Auction item already Exist");
		}
		const newAuctionItem = await new Auction({
			itemName,
			description,
			currentBid,
			closingTime,
			createdBy: userId,
		}).populate("createdBy");
		await newAuctionItem.save();
		res.status(201).send(newAuctionItem);
	} catch (error) {
		res.status(400).send("ERROR : " + error.message);
	}
};

export const bidItem = async (req, res) => {
	try {
		const { id } = req.params;
		const { bid } = req.body;

		const item = await Auction.findById(id);
		if (!item) {
			throw new Error("Item not found");
		}
		if (item.isClosed) {
			throw new Error("bid closed for this item");
		}
		if (new Date() > new Date(item.closingTime)) {
			item.isClosed = true;
			await item.save();
			throw new Error("bid closed for this item");
		}
		if (bid > item.currentBid) {
			item.currentBid = bid;
			highestBidder = req.user._id;
			await item.save();
		}
	} catch (error) {
		res.status(400).send("ERROR : " + error);
	}
};

export const updateAuctionItem = async (req, res) => {
	const { itemName, description, closingTime } = req.body;
	const { id } = req.params;
	try {
		if (!itemName || !description || !closingTime)
			throw new Error("All fields required");
		const item = await Auction.findById(id);
		if (!item) {
			throw new Error("Auction item not found");
		}

		if (String(req.user?._id) !== String(item.createdBy)) {
			throw new Error("You are not allowed to update this item");
		}
		const updatedItem = await Auction.findByIdAndUpdate(id, {
			itemName,
			description,
			closingTime,
		});
		if (updatedItem) await updatedItem.save();
		res.status(200).send("updated successfully" + updatedItem);
	} catch (error) {
		res.status(400).send("ERROR : " + error.message);
	}
};

export const removeAuctionItem = async (req, res) => {
	const { id } = req.params;
	try {
		const item = await Auction.findById(id);
		if (String(req.user?._id) !== String(item.createdBy)) {
			throw new Error("You are not allowed to update this item");
		}
		await Auction.findByIdAndDelete(id);
		res.status(200).send("Auction item deleted successfully");
	} catch (error) {
		res.status(400).send("ERROR : " + error.message);
	}
};
