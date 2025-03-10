import { useState } from "react";
import "../styles/header.css";
import { Link } from "react-router";
import { useAuthContext } from "../context/AuthContext";
import useLogut from "../hooks/useLogout.js";
function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { authUser } = useAuthContext();
	const { logout } = useLogut();
	const handleLogout = () => {
		setIsMenuOpen(!isMenuOpen);
		logout();
	};
	return (
		<nav className="header">
			<Link className="logo" to="/">
				AUCTIONVESE
			</Link>
			<span className="grow"></span>

			<img
				id="menu-btn"
				alt="menu"
				onClick={() => setIsMenuOpen(!isMenuOpen)}
				src="https://img.icons8.com/?size=100&id=OTxpMqWbm71F&format=png&color=4bcf39"
			/>

			<ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
				<Link
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					className="nav-item"
					to="/dashboard"
				>
					Dashboard
				</Link>
				<Link
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					className="nav-item"
					to="/postAuction"
				>
					Post Auction
				</Link>
				{authUser ? (
					<Link
						onClick={handleLogout}
						id="logout-btn"
						className="nav-item "
						to="/signin"
					>
						Logout
					</Link>
				) : (
					<>
						<Link
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							id="signin-btn"
							className="nav-item "
							to="/signin"
						>
							SignIn
						</Link>
						<Link
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							id="signup-btn"
							className="nav-item "
							to="/signup"
						>
							SignUp
						</Link>
					</>
				)}
			</ul>
		</nav>
	);
}

export default Header;
