import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const usePostItem = () => {
	const [loading, setLoading] = useState(false);
	const postItem = async (formData) => {
		setLoading(true);
		try {
			if (!formData.closingTime) {
				throw new Error("All fields required!");
			}
			const date = new Date(formData?.closingTime).toISOString();

			const res = await axios.post(
				`http://localhost:3000/api/auction/create`,
				{ ...formData, closingTime: date },
				{ withCredentials: true }
			);
			if (res.data) {
				toast.success("Auction item created");
			}
		} catch (error) {
			toast.error(
				error?.response?.data ||
					error?.message ||
					"failed to create auction item"
			);
		} finally {
			setLoading(false);
		}
	};
	return { loading, postItem };
};
export default usePostItem;
