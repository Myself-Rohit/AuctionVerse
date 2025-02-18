import User from "../models/user.model.js";
import bcrypt, { genSalt } from "bcryptjs";
import jwt from "jsonwebtoken";
export const signup = async (req, res) => {
	try {
		const { userName, email, password } = req.body;
		if (!userName || !email || !password) {
			throw new Error("All fields are required");
		}
		if (userName.length < 4) {
			throw new Error("userName must have at least 4 characters");
		}
		if (password.length < 4) {
			throw new Error("password must have at least 4 characters");
		}
		const salt = await genSalt(10);
		const passwordHash = await bcrypt.hash(password, salt);

		const newUser = await new User({
			userName,
			email,
			password: passwordHash,
		});
		if (newUser) {
			await newUser.save();
			const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
				expiresIn: "15d",
			});
			res.cookie("token", token, {
				httpOnly: true,
			});
			res.status(200).send(newUser);
		}
	} catch (error) {
		res.status(400).send(error);
	}
};
