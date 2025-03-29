import { Server } from "socket.io";

export const initializeSocket = (server) => {
	const io = new Server(server, {
		cors: {
			origin: "http://localhost:5173",
		},
	});

	io.on("connection", (socket) => {
		console.log("connected", socket.id);
		socket.on("placeBid", (data) => {
			io.emit("sendData", {
				...data,
				currentBid: data?.bid,
			});
		});
		socket.on("disconnect", () => {});
	});
};
