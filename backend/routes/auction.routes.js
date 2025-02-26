import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import {
	bidItem,
	getAuctionItems,
	getSingleAuctionItem,
	postAuction,
	removeAuctionItem,
	updateAuctionItem,
} from "../controllers/auction.controllers.js";
const router = express.Router();

router.get("/", getAuctionItems);
router.get("/:id", getSingleAuctionItem);
router.post("/create", verifyToken, postAuction);
router.patch("/update/:id", verifyToken, updateAuctionItem);
router.delete("/remove/:id", verifyToken, removeAuctionItem);
router.post("/bid/:id", verifyToken, bidItem);

export default router;
