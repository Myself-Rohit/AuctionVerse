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

		const userExit = await User.findOne({ email });
		if (userExit) {
			throw new Error("User Already Exist!");
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
			const { password: pass, ...userWithoutPassword } = newUser._doc;
			res.status(200).send(userWithoutPassword);
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
};

export const signin = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			throw new Error("All fields are required");
		}
		const user1 = await User.findOne({ email });
		if (!user1) {
			throw new Error("User not found");
		}
		const matchedPassword = await bcrypt.compare(password, user1.password);
		if (!matchedPassword) {
			throw new Error("Invalid Credentials");
		}
		const { password: pass, ...userWithoutPassword } = user1._doc;
		const token = jwt.sign({ _id: user1._id }, process.env.JWT_SECRET, {
			expiresIn: "15d",
		});
		res.cookie("token", token, {
			httpOnly: true,
		});
		res.status(200).send(userWithoutPassword);
	} catch (error) {
		res.status(400).send("ERROR : " + error.message);
	}
};

export const signout = async (req, res) => {
	try {
		res.cookie("token", null);
		res.status(200).send("Logout Successful");
	} catch (error) {
		res.status(400).send("ERROR : " + error.message);
	}
};
