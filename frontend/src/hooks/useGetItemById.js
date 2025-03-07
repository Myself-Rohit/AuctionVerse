import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useGetItemById = (itemId) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(null);
	const getAuctionItems = async () => {
		setLoading(true);
		try {
			const res = await axios.get(
				`http://localhost:3000/api/auction/${itemId}`
			);
			if (res.data) {
				setData(res.data);
			}
		} catch (error) {
			toast.error(error?.response?.message || "failed to get auction items!");
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		getAuctionItems();
	}, []);
	return { loading, data };
};

export default useGetItemById;
