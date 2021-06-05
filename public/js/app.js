'use strict';

const screens = document.querySelectorAll('.screen');
const choose_shape_btns = document.querySelectorAll('.choose-shape-btn');
const start_btn = document.getElementById('start-btn');
const create_btn = document.getElementById('create-btn');
const join_btn = document.getElementById('join-btn');
const game_container = document.getElementById('game-container');
const timeEl = document.getElementById('time');
const scores = document.querySelectorAll('.scoretext');

const shapesContainer = document.getElementById('shapesContainer')

const form = document.getElementById('form')


const message = document.getElementById( 'message' );
const player = document.getElementById( 'player' );
let seconds = 0;
let allScore = [0, 0, 0];
let selected_shape = {};
let data = { allScore: allScore, allShapes: [] };
// eslint-disable-next-line no-undef
let socket = io.connect( 'https://crazy-clicking.herokuapp.com' ); // connect to server

create_btn.addEventListener( 'click', ( event ) => {
  let id = generateString( 7 );
  alert( id );
} );
join_btn.addEventListener( 'click', ( event ) => {
  event.preventDefault();

  const textInput = document.getElementById('roomId');
  socket.emit('join', textInput.value);
  const waitingForPlayers = document.createElement ('p');
  waitingForPlayers.textContent = `you are in Room : ${textInput.value}`;
  form.appendChild (waitingForPlayers);

});

// up screen handler
socket.on( 'upScreen', ( data ) => {
  console.log( data );
  screens[0].classList.add( 'up' );
} );

// socket.on('test', (id) => {
//   player.innerHTML =
//     player.innerHTML.length < 5 ? player.innerHTML : `Player ${id}`;
// });
socket.on( 'setId', ( id ) => {
  for ( let i = 0; i < scores.length; i++ ) {
    scores[i].id = id[i];
  }
} );
// select shape emitter
choose_shape_btns.forEach( ( btn ) => {
  btn.addEventListener( 'click', () => {
    const img = btn.querySelector( 'img' );
    const src = img.getAttribute( 'src' );
    const alt = img.getAttribute( 'alt' );
    selected_shape = {
      src,
      alt,
    };
    socket.emit( 'selectShape', selected_shape );
  } );
} );
// start the game handler
socket.on( 'start', ( data ) => {
  selected_shape = data.data;
  screens[1].classList.add( 'up' );
  const location = getRandomLocation();
  socket.emit( 'createFirstShape', location );
  startGame( data.id );
} );
// render first image
socket.on( 'renderFirstShape', ( location ) => {
  rendershape( location );
} );
socket.on( 'renderData', ( payload ) => {
  if ( payload.allShapes.length > 0 ) {
    screens[1].classList.add( 'up' );
    let imageS = payload.allShapes[0].inner.split( '"' );
    let source = imageS[3];
    let alt = imageS[5];
    selected_shape = { src: source, alt: alt };

    payload.allShapes.forEach( ( img ) => {
      let str2 = img.location.split( ';' );
      str2.pop();
      let y = str2[0].split( '' ).splice( 5, 7 ).join( '' );
      let x = str2[1].split( '' ).splice( 7, 7 ).join( '' );

      const shape = document.createElement( 'div' );
      shape.classList.add( 'shape' );
      shape.style.top = `${y}px`;
      shape.style.left = `${x}px`;
      shape.innerHTML = img.inner;

      shape.addEventListener('click', () => {
        socket.emit('catched', { x: shape.style.left, y: shape.style.top });
      });
      shapesContainer.appendChild(shape);
    });

  }
  allScore = payload.allScore;
} );
//Catch Shape Functionality
function catchshape( shape, id ) {
  increaseScore( id );
  shape.classList.add( 'caught' );
  setTimeout( () => shape.remove(), 2000 );
  const newLocation = getRandomLocation();
  socket.emit( 'addTowShape', newLocation );
}
// Hide the clicked image event handler
socket.on( 'hide', function ( data ) {
  const allshape = document.querySelectorAll( '.shape' );
  allshape.forEach( ( shape ) => {
    if (
      shape.style.top === data.location.y &&
      shape.style.left === data.location.x
    ) {
      catchshape( shape, data.id );
    }
  } );
} );
// render new shape Handler
socket.on( 'renderNewShapes', ( location ) => {
  setTimeout( () => {
    rendershape( location );
  }, 1500 );
} );
// render shapes functionality
function rendershape( location ) {
  const shape = document.createElement( 'div' );
  shape.classList.add( 'shape' );
  shape.style.top = `${location.y}px`;
  shape.style.left = `${location.x}px`;
  shape.innerHTML = `<img style="transform: rotate(${
    Math.random() * 360
  }deg)" src="${selected_shape.src}" alt="${selected_shape.alt}" />`;

  shape.addEventListener('click', () => {
    socket.emit('catched', { x: shape.style.left, y: shape.style.top });
  });
  shapesContainer.appendChild(shape);

}
// Helper Functions

function getRandomLocation() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const x = Math.random() * ( width - 200 ) + 100;
  const y = Math.random() * ( height - 200 ) + 100;

  return { x, y };
}

function startGame( id ) {
  setInterval( increaseTime, 1000 );
  updateData( id );
}

function increaseTime() {
  let m = Math.floor( seconds / 60 );
  let s = seconds % 60;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  timeEl.innerHTML = `Time: ${m}:${s}`;
  seconds++;
}

function increaseScore( id ) {
  scores.forEach( ( score, index ) => {
    if ( score.id === id ) {
      allScore[index]++;
      score.innerHTML = `Player ${index + 1} : ${allScore[index]}`;
      if ( allScore[index] > 19 ) {
        message.innerHTML = `Player ${index + 1} WIN `;
        message.classList.add( 'visible' );
      }
    }
  } );
}
function updateData( id ) {
  setInterval( () => {
    const nodess = document.querySelectorAll( '.shape' );
    let newArr = [];
    nodess.forEach( ( node ) => {
      const lll = {
        inner: node.innerHTML,
        location: node.style.cssText,
      };
      newArr.push( lll );
    } );
    data.allShapes = newArr;
    data.allScore = allScore;
    data.id=id;
    socket.emit( 'updateData', data );
  }, 500 );
}
const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString( length ) {
  let result = ' ';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt( Math.floor( Math.random() * charactersLength ) );
  }

  return result;
}


