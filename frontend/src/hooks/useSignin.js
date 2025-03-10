import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext.jsx";
const useSignin = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();
	const navigate = useNavigate();

	const signin = async (formData) => {
		try {
			setLoading(true);
			const res = await axios.post(
				"https://auction-verse-sage.vercel.app/api/auth/signin",
				formData,
				{
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (res.data) {
				localStorage.setItem("currentUser", JSON.stringify(res.data));
				toast.success("Signin successful!");
				navigate("/dashboard");
				setAuthUser(res.data);
			}
		} catch (err) {
			toast.error(err?.response?.data || "Signin failed! Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return { loading, signin };
};
export default useSignin;
