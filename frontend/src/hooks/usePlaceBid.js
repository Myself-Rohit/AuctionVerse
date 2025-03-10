import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const usePlaceBid = () => {
	const [loading, setLoading] = useState(false);
	const placeBid = async (bid, itemId) => {
		try {
			setLoading(true);
			const res = await axios.post(
				`https://auction-verse-sage.vercel.app/api/auction/bid/${itemId}`,
				{ bid },
				{
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
					},
				}
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
