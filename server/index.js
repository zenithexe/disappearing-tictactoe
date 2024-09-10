import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.SERVER_PORT;

let obj = {
  current: "pX",
  room: null,
  pX: null,
  pO: null,
  board: {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
  },
  moves: [],
  pX_timer: "time1",
  pO_timer: "time2",
};

const app = express();
const server = createServer(app);

let count = 0;

const io = new Server(server, {
  cors: {
    origin: "*", //All origin
  },
});

//Socket.io Code
io.on("connection", (socket) => {
  console.log(`User Connected. Id: ${socket.id}`);

  socket.emit("boardInit", obj.board);

  socket.on("move", (index) => {
    
    if (socket.id == obj[obj.current]) {
		console.log('Reg')
      obj.board[index] = obj.current.charAt(1);
      obj.current = obj.current==="pO" ? "pX" : "pO";
    }

	console.log(obj)
    io.to("12345").emit("boardUpdate", obj.board);
  });

 

  socket.on("join-room", (id) => {
    if (!obj.pX || !obj.pO) {
      if (!obj.room) {
        obj.room = id;
        obj.pX = socket.id;
      } else {
        obj.pO = socket.id;
      }
      socket.join(id);
      console.log(`Socket ${socket.id} joined room ${id}`);
    }
  });

  socket.on("clearBoard", (data) => {
    obj.board = {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
      8: null,
      9: null,
    };

    io.to("12345").emit("boardUpdate", obj.board);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
