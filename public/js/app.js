'use strict';

const screens = document.querySelectorAll('.screen');
const choose_shape_btns = document.querySelectorAll('.choose-shape-btn');
const start_btn = document.getElementById('start-btn');
const game_container = document.getElementById('game-container');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const message = document.getElementById('message');

let seconds = 0;
let score = 0;
let selected_shape = {};
// eslint-disable-next-line no-undef
let socket = io.connect('http://localhost:3050'); // connect to server

// start button emitter
start_btn.addEventListener('click', () => {
  socket.emit('startGame');
});
// up screen handler
socket.on('upScreen', () => {
  screens[0].classList.add('up');
});
// select shape emitter
choose_shape_btns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img');
    const src = img.getAttribute('src');
    const alt = img.getAttribute('alt');
    selected_shape = {
      src,
      alt,
    };
    socket.emit('selectShape');
  });
});
// start the game handler
socket.on('start', () => {
  screens[1].classList.add('up');
  const location = getRandomLocation();
  socket.emit('createFirstShape', location);
  startGame();
});
// render first image
//Catch Shape Functionality
// Hide the clicked image event handler
// render new shape Handler
// render shapes functionality
// Helper Functions
function startGame() {
  setInterval(increaseTime, 1000);
}

function increaseTime() {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  timeEl.innerHTML = `Time: ${m}:${s}`;
  seconds++;
}

function increaseScore() {
  score++;
  if (score > 19) {
    message.classList.add('visible');
  }
  scoreEl.innerHTML = `score: ${score}`;
}
