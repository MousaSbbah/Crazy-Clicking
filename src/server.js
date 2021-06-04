'use strict';

const express = require('express');
require('dotenv').config();
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.static('./public'));
app.get('/start', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log('A user has connected');
  socket.on('disconnect', () => {
    console.log('A user has disconnected.');
  });
  socket.on('startGame', function () {
    io.emit('upScreen');
  });
  socket.on('selectShape', (data) => {
    io.emit('start',data);
  });
  socket.on('catched', (data) => {
    io.emit('hide',data);
  });
  socket.on('createFirstShape', (data) => {
    io.emit('renderFirstShape',data);
  });
  socket.on('addTowShape', (data) => {
    io.emit('renderNewShapes',data);
  });
});

/////////////////////////
function start(port) {

  server.listen(port, () => {
    console.log(`::::: Up  on PORT ${port} :::::`);
  });
}
module.exports={
  server,start
}
