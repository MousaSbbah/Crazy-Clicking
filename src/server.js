"use strict";

const express = require("express");
require("dotenv").config();
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
let allData = [];
let rooms = [];
let GameData = { allScore: [0, 0, 0], allShapes: [] };
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
io.on("connection", function (socket) {
  console.log("A user has connected");
  socket.on("disconnect", () => {
    console.log("A user has disconnected.");
  });
  let idd;
  socket.on("join", async function (id) {
    let room = io.sockets.adapter.rooms.get(id);
    let checkSize = room ? room.size : 0;
    idd = id;
    if (checkSize < 3) {
      let users = [];
      socket.join(id);
      if (!rooms.includes(idd)) {
        rooms.push(idd);
        allData.push(GameData);
      }

      const clientsInRoom = await io.sockets.adapter.sockets(new Set([id]));
      clientsInRoom.forEach((val) => {
        users.push(val);
      });

      io.to(id).emit("setId", users);
      if (checkSize === 2) {
        io.to(idd).emit("upScreen");
        io.to(socket.id).emit("renderData", allData[rooms.indexOf(idd)]);
      }
    }
  });

  socket.on("selectShape", (data) => {
    io.to(idd).emit("start", { data: data, id: idd });
  });
  socket.on("updateData", (data) => {
    allData[rooms.indexOf(data.id)] = data;
  });

  socket.on("catched", (data) => {
    io.to(idd).emit("hide", { location: data, id: socket.id });
    io.to(socket.id).emit("renderPlayer", socket.id);
  });
  socket.on("createFirstShape", (data) => {
    io.to(idd).emit("renderFirstShape", data);
  });
  socket.on("addTowShape", (data) => {
    io.to(idd).emit("renderNewShapes", data);
  });
  socket.on("stop", () => {
    socket.removeAllListeners("catched");
  });
});

/////////////////////////

function start(port) {
  server.listen(port, () => {
    console.log(`::::: Up  on PORT ${port} :::::`);
  });
}
module.exports = {
  server,
  start,
};
