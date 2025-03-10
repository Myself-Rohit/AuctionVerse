// import express from "express";
// import dotenv from "dotenv";
// import connectToDB from "./config/connectToDB.js";
// import authRoute from "./routes/auth.routes.js";
// import auctionRoute from "./routes/auction.routes.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";

// const app = express();
// dotenv.config();
// app.use(express.json());
// app.use(cookieParser());
// app.use(
// 	cors({
// 		origin: "https://auction-verse-mern.vercel.app",
// 		methods: "GET, POST, PATCH, DELETE",
// 		allowedHeaders: "Content-Type, Authorization",
// 		credentials: true,
// 	})
// );
// const PORT = process.env.PORT || 3001;
// app.options("*", (req, res) => {
// 	res.header(
// 		"Access-Control-Allow-Origin",
// 		"https://auction-verse-mern.vercel.app"
// 	);
// 	res.header(
// 		"Access-Control-Allow-Methods",
// 		"GET, POST, PATCH, DELETE, OPTIONS"
// 	);
// 	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
// 	res.header("Access-Control-Allow-Credentials", "true");
// 	res.sendStatus(204);
// });
// connectToDB()
// 	.then(() => {
// 		console.log("Connected to MonngoDB");
// 		app.listen(PORT, () => {
// 			console.log(`app listening at PORT: ${PORT}`);
// 		});
// 	})
// 	.catch((err) => console.log(`Error connecting MongoDB: ${err.message}`));

// app.use("/api/auth", authRoute);
// app.use("/api/auction", auctionRoute);

import express from "express";
import dotenv from "dotenv";
import connectToDB from "./config/connectToDB.js";
import authRoute from "./routes/auth.routes.js";
import auctionRoute from "./routes/auction.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
	cors({
		origin: "https://auction-verse-mern.vercel.app",
		methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	})
);

app.options("*", cors());

app.use(express.json());
app.use(cookieParser());

connectToDB()
	.then(() => {
		console.log("Connected to MongoDB");
		app.listen(PORT, () => {
			console.log(`App listening on PORT: ${PORT}`);
		});
	})
	.catch((err) => console.log(`Error connecting MongoDB: ${err.message}`));

app.use("/api/auth", authRoute);
app.use("/api/auction", auctionRoute);
