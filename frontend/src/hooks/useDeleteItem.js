import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useDeleteItem = () => {
	const [loading, setLoading] = useState(false);

	const deleteItem = async (itemId) => {
		setLoading(true);
		try {
			const res = await axios.delete(
				`${import.meta.env.VITE_API_URL}/api/auction/remove/${itemId}`,
				{ withCredentials: true }
			);
			if (res.data) {
				toast.success("Auction item deleted");
			}
		} catch (error) {
			toast.error(
				error?.response?.data ||
					error?.message ||
					"failed to delete auction item"
			);
		} finally {
			setLoading(false);
		}
	};
	return { loading, deleteItem };
};
export default useDeleteItem;
