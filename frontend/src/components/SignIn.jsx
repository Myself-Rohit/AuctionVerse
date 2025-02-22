import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import "../styles/signup.css";
function signIn() {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({});
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const isValidData = () => {
		if (!formData.email || !formData.password) {
			setError("email and password are required");
			return false;
		}
		return true;
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!isValidData()) return;

		try {
			const res = await axios.post("http://localhost:5173/signin", formData);
			localStorage.setItem("authToken", JSON.stringify(formData));
			alert("Signin successful!");
			navigate("/dashboard");
		} catch (err) {
			setError(err?.message || "Signup failed. Please try again.");
		}
	};
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	return (
		<div className="signup-page">
			{error && <p className="error">{error}</p>}
			<form onSubmit={handleSubmit} className="form">
				<h1>Login Your Account</h1>

				<div>
					<label htmlFor="email">Email:</label>
					<input
						name="email"
						placeholder="example@gmail.com"
						type="email"
						onChange={(e) => handleChange(e)}
					/>
				</div>
				<div>
					<label htmlFor="password">Password:</label>
					<div className="pass-div">
						<input
							name="password"
							placeholder="password"
							type={showPassword ? "text" : "password"}
							autoComplete="none"
							onChange={(e) => handleChange(e)}
						/>
						<span
							className="toggle-password"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? (
								<img src="https://cdn0.iconfinder.com/data/icons/e-commerce-297/3600/46-64.png" />
							) : (
								<img src="https://cdn1.iconfinder.com/data/icons/user-interface-5-basic-outline/24/close_eye__eye_close_eye_password_hidden-64.png" />
							)}
						</span>
					</div>
				</div>
				<p>
					Don't have an account?{" "}
					<Link className="navigate" to="/signup">
						Sign Up
					</Link>
				</p>
				<button type="submit">SignIn</button>
			</form>
		</div>
	);
}

export default signIn;
