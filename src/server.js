"use strict";

const express = require("express");
require("dotenv").config();
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
let GameData = { allScore: [0,0,0], allShapes: [] };
app.use(express.static("./public"));
app.get("/start", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
io.on("connection", function (socket) {
  console.log("A user has connected");
  socket.on("disconnect", () => {

    console.log("A user has disconnected.");
  });
  let idd;////////////////////////// {romename : [] , roomename[],......}
  socket.on("join", async function (id) {
    let room = io.sockets.adapter.rooms.get(id);
    let checkSize =  room ? room.size : 0;
    idd = id ;
    if (checkSize < 3) {
      let users=[];
      socket.join(id);
      socket.on("updateData", (data) => {
        if(data.id === idd){
          GameData.allShapes=[];
          GameData=data;
        }else{
          GameData.allShapes=[];
        }
      });
      io.to(socket.id).emit("renderData",GameData);

      const clientsInRoom =   await io.sockets.adapter.sockets(new Set([id]));
      clientsInRoom.forEach(val=>{
        users.push(val);
      })
      

      console.log(users)
      io.to(id).emit("setId",users);
      if (checkSize === 2) {
        console.log("33333333333333333");
        io.to(idd).emit("upScreen");
        
      }
    }

    
  });
  socket.on("selectShape", (data) => {
    io.to(idd).emit("start", {data:data,id:idd});
    
  });
  
  // socket.on("updateData", (data) => {
  //   if(data.id === id)
  //   GameData=data;
  // });
  socket.on("catched", (data) => {
    io.to(idd).emit("hide", {location:data,id :socket.id});
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
