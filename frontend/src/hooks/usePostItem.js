import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const usePostItem = () => {
	const [loading, setLoading] = useState(false);
	const postItem = async (formData) => {
		setLoading(true);
		try {
			const res = await axios.post(
				`http://localhost:3000/api/auction/create`,
				formData,
				{ withCredentials: true }
			);
			if (res.data) {
				toast.success("Auction item created");
			}
		} catch (error) {
			console.log("err:", error);
			toast.error("failed to create auction item");
		} finally {
			setLoading(false);
		}
	};
	return { loading, postItem };
};
export default usePostItem;
