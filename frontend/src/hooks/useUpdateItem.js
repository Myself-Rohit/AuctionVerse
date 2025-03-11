import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useUpdateItem = () => {
	const [loading, setLoading] = useState(false);

	const updateItem = async (formData, itemId) => {
		setLoading(true);
		try {
			if (!formData.closingTime) {
				throw new Error("All fields required!");
			}
			const date = new Date(formData.closingTime).toISOString();
			const res = await axios.patch(
				`${import.meta.env.VITE_API_URL}/api/auction/update/${itemId}`,
				{ ...formData, closingTime: date },
				{ withCredentials: true }
			);
			if (res.data) {
				toast.success("Auction item updated");
			}
		} catch (error) {
			toast.error(
				error?.response?.data ||
					error?.message ||
					"failed to update auction item"
			);
		} finally {
			setLoading(false);
		}
	};
	return { loading, updateItem };
};
export default useUpdateItem;
