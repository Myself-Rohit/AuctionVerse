import React, { useState } from "react";
import "../styles/SignUp.css";
import { Link } from "react-router-dom";
function signup() {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<div className="signup-page">
			<form className="form">
				<h1>Create Your Account</h1>
				<div>
					<label htmlFor="userName">User Name:</label>
					<input name="userName" placeholder="User Name" type="text" />
				</div>
				<div>
					<label htmlFor="email">Email:</label>
					<input name="email" placeholder="example@gmail.com" type="email" />
				</div>
				<div>
					<label htmlFor="password">Password:</label>
					<div className="pass-div">
						<input
							name="password"
							placeholder="password"
							type={showPassword ? "text" : "password"}
							autoComplete="none"
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
					Already have an account?{" "}
					<Link className="navigte" to="/signin">
						Sign In
					</Link>
				</p>
				<button type="submit">SignUp</button>
			</form>
		</div>
	);
}

export default signup;
