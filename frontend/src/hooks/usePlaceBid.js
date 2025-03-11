import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const usePlaceBid = () => {
	const [loading, setLoading] = useState(false);
	const placeBid = async (bid, itemId) => {
		try {
			setLoading(true);
			const res = await axios.post(
				`${import.meta.env.VITE_API_URL}/api/auction/bid/${itemId}`,
				{ bid },
				{ withCredentials: true }
			);
			if (res.data) {
				console.log(res.data);
				toast.success("Bid Successful");
			}
		} catch (error) {
			toast.error(
				error?.response?.data || error?.message || "failed to place Bid !"
			);
		} finally {
			setLoading(false);
		}
	};
	return { loading, placeBid };
};
export default usePlaceBid;
