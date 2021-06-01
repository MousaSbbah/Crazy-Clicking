'use strict';
const screens = document.querySelectorAll('.screen');
const choose_insect_btns = document.querySelectorAll('.choose-insect-btn');
const start_btn = document.getElementById('start-btn');
const game_container = document.getElementById('game-container');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const message = document.getElementById('message');

let seconds = 0;
let score = 0;
let selected_insect = 0;

start_btn.addEventListener('click', () => {
  screens[0].classList.add('up');
});

choose_insect_btns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img');
    const src = btn.querySelector('src');
    const alt = btn.querySelector('alt');
    selected_insect = {
      src,
      alt,
    };
    screens[1].classList.add('up');
    setTimeout(createInsect, 1000);
    startGame();
  });
});

function createInsect() {
  const insect = document.createElement('div');
  insect.classList.add('insect');
  const { x, y } = getRandomLocation();
  insect.style.top=`${y}px`;
  insect.style.left=`${x}px`;
  insect.innerHTML=`<img style="transform:rotate(${Math.random()*360} deg)" src="${selected_insect.src}" alt="${selected_insect.alt}" />`
}
function getRandomLocation() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;
  return {x, y};
}

