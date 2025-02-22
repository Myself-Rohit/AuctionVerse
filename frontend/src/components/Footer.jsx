import React from "react";
import "../styles/footer.css";
function Footer() {
	return (
		<div className="footer">
			<img src="/logo.png" alt="logo" className="logo" />
			<div>
				<p>&copy; 2025 AuctionVerse. All rights reserved.</p>
				<p>Welcome to the best place to buy and sell items through auctions!</p>
			</div>
		</div>
	);
}

export default Footer;
