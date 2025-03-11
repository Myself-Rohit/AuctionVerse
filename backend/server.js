import express from "express";
import dotenv from "dotenv";
import connectToDB from "./config/connectToDB.js";
import authRoute from "./routes/auth.routes.js";
import auctionRoute from "./routes/auction.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:5173",
		methods: ["GET", "POST", "PATCH", "DELETE"],
		credentials: true,
	})
);
const PORT = process.env.PORT || 3001;
const __dirname = path.resolve();
connectToDB()
	.then(() => {
		console.log("Connected to MonngoDB");
		app.listen(PORT, () => {
			console.log(`app listening at PORT: ${PORT}`);
		});
	})
	.catch((err) => console.log(`Error connecting MongoDB: ${err.message}`));

app.use("/api/auth", authRoute);
app.use("/api/auction", auctionRoute);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
