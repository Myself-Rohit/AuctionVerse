import mongoose from "mongoose";

const connectToDB = async () => {
	await mongoose.connect(process.env.MONGODB_URI);
};

export default connectToDB;
