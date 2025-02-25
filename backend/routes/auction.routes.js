import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import {
	getAuctionItems,
	getSingleAuctionItem,
	postAuction,
} from "../controllers/auction.controllers.js";
const router = express.Router();

router.get("/", verifyToken, getAuctionItems);
router.get("/:id", verifyToken, getSingleAuctionItem);
router.post("/create", verifyToken, postAuction);
export default router;
