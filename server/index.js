import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import dotenv from "dotenv";
import { generateRandomNumber } from "./lib/utils.js";
dotenv.config();
const port = process.env.SERVER_PORT;

let gameObj = {
  current: "pX",
  room: null,
  pX: null,
  pO: null,
  pX_name: null,
  pO_name: null,
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

let activeGames = {};

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

  socket.emit("board-init", gameObj.board);

  socket.on("create-room", (name) => {
    let roomId = generateRandomNumber();

    while (activeGames[roomId]) {
      roomId = generateRandomNumber();
    }

    activeGames[roomId] = {
      ...gameObj,
      room: roomId,
      pX: socket.id,
      pX_name: name,
    };

    socket.join(roomId);
    console.log(`${name}: ${socket.id} created room ${roomId}`);
    io.to(roomId).emit("room-created", roomId);
  });

  socket.on("join-room", (roomId, name) => {
    if (!activeGames[roomId].pX || !activeGames[roomId].pO) {
      if (activeGames[roomId].room) {
        activeGames[roomId].pO = socket.id;
        activeGames[roomId].pO_name = name;
        socket.join(roomId);
        console.log(`${name}: ${socket.id} joined room ${roomId}`);
        io.to(roomId).emit("player-update", activeGames[roomId].pX_name, activeGames[roomId].pO_name, activeGames[roomId].current);
      }
    }
  });

  socket.on("move", (index, roomId) => {
    let game = activeGames[roomId];

    if (socket.id == game[game.current]) {
      game.board[index] = game.current.charAt(1);
      game.current = game.current == "pO" ? "pX" : "pO";
      activeGames[roomId] = game;
      io.to(roomId).emit("board-update", activeGames[roomId].board);
      io.to(roomId).emit('update-turn', activeGames[roomId].current)
    }
  
  });

  socket.on("clearBoard", (roomId) => {
    gameObj = {
      ...activeGames[roomId],
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
    };
    activeGames[roomId] = gameObj;
    io.to(roomId).emit("board-update", activeGames[roomId].board);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
