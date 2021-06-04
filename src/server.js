"use strict";

const express = require("express");
require("dotenv").config();
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("./public"));
app.get("/start", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
io.on("connection", function (socket) {
  console.log("A user has connected");
  socket.on("disconnect", () => {
    console.log("A user has disconnected.");
  });
  let idd;
  socket.on("join", function (id) {
    let users=[];
    let room = io.sockets.adapter.rooms.get(id);
    let checkSize =  room ? room.size : 0;
    idd = id ;
    users.push(id);
    if (checkSize < 3) {
      socket.join(id);
      io.to(id).emit("setId",socket.id);
      if (checkSize === 2) {
        console.log("33333333333333333");
        io.to(id).emit("upScreen");
      }
    }

    // console.log(Object.values(room).length)
    io.to(id).emit("test", socket.id);
  });
  socket.on("selectShape", (data) => {
    console.log(idd);
    io.to(idd).emit("start", data);
  });
  socket.on("catched", (data) => {
    socket.id
    io.to(idd).emit("hide", data);
  });
  socket.on("createFirstShape", (data) => {
    io.to(idd).emit("renderFirstShape", data);
  });
  socket.on("addTowShape", (data) => {
    io.to(idd).emit("renderNewShapes", data);
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
