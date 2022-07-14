'use strict';

let name1 = document.querySelector('#name--0');
let name2 = document.getElementById('name--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const displayScore1 = document.querySelector('#score--0');
const displayScore2 = document.querySelector('#score--1');
const displayCurrentScore1 = document.querySelector('#current--0');
const displayCurrentScore2 = document.querySelector('#current--1');
const displayDice = document.querySelector('.dice');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');

let scores, currentScore, activePlayer, playing;

// starting conditions

const init = function () {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  name1.textContent = prompt('Player 1:');
  name2.textContent = prompt('Player 2:');
  displayCurrentScore1.textContent = 0;
  displayCurrentScore2.textContent = 0;
  displayScore1.textContent = 0;
  displayScore2.textContent = 0;

  displayDice.classList.add('hidden');
  player0.classList.remove(`player--winner`);
  player1.classList.remove(`player--winner`);
  player0.classList.add(`player--active`);
  player1.classList.remove(`player--active`);
};

init();

const switchPLayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

const playerWin = function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
};

// Rolling dice functionality
btnRollDice.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    displayDice.classList.remove('hidden');
    displayDice.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // Add dice to current score
    } else {
      switchPLayer();
      scores[activePlayer] += currentScore;
      document.querySelector(`#score--${activePlayer}`).textContent =
        scores[activePlayer];
    }
  }
});

// Hold button
btnHold.addEventListener(`click`, function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      playerWin();
      displayDice.classList.add('hidden');
      document.querySelector(`#current--${activePlayer}`).textContent = 0;
    } else {
      switchPLayer();
    }
  }
});

// New game button
btnNewGame.addEventListener(`click`, init);
