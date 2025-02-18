import express from "express";
import dotenv from "dotenv";
import connectToDB from "./config/connectToDB.js";
import authRoute from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
app.use(cookieParser());
app.use(express.json());
const PORT = process.env.PORT || 3001;

connectToDB()
	.then(() => {
		console.log("Connected to MonngoDB");
		app.listen(PORT, () => {
			console.log(`app listening at PORT: ${PORT}`);
		});
	})
	.catch((err) => console.log(`Error connecting MongoDB: ${err.message}`));

app.use("/api/auth", authRoute);
