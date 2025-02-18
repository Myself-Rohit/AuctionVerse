import express from "express";
import dotenv from "dotenv";
import connectToDB from "./config/connectToDB.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3001;

connectToDB()
	.then(() => {
		console.log("Connected to MonngoDB");
		app.listen(PORT, () => {
			console.log(`app listening at PORT: ${PORT}`);
		});
	})
	.catch((err) => console.log(`Error connecting MongoDB: ${err.message}`));
