import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.SERVER_PORT;

const app = express();
const server = createServer(app);

const io = new Server(server, {
	cors: {
		origin: "*", //All origin
	}
});


//Socket.io Code
io.on("connection", (socket) => {
	console.log(`User Connected. Id: ${socket.id}`);
});


server.listen(port, ()=>{
	console.log(`Server is running on port ${port}`);
});