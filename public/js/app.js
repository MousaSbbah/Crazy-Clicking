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
// up screen handler
// select shape emitter
// start the game handler
// render first image
//Catch Shape Functionality
// Hide the clicked image event handler
// render new shape Handler
// render shapes functionality
function rendershape(location) {
  console.log(selected_shape);
  const shape = document.createElement('div');
  shape.classList.add('shape');
  shape.style.top = `${location.y}px`;
  shape.style.left = `${location.x}px`;
  shape.innerHTML = `<img style="transform: rotate(${
    Math.random() * 360
  }deg)" src="${selected_shape.src}" alt="${selected_shape.alt}" />`;
  shape.addEventListener('click', () => {
    socket.emit('catched', { x: shape.style.left, y: shape.style.top });
  });
  game_container.appendChild(shape);
}
// Helper Functions

function getRandomLocation() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;
  return { x, y };
}

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
