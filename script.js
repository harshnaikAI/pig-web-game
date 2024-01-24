"use-strict";

/* variables  */

const dice0 = document.querySelector(".dice--0");

const dice1 = document.querySelector(".dice--1");

const dice = document.querySelector(".dice");

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");

const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");

document.querySelector(".dice--0").classList.add("hidden");

dice.classList.add("hidden");

// intial-conditions

score0El.textContent = 0;
score1El.textContent = 0;
dice0.classList.remove("dice--1");

let game = true;

let player = 0;
let currentScore = 0;

let scores = [0, 0];

let playerSwitch = function () {
  currentScore = 0;
  document.getElementById(`current--${player}`).textContent = currentScore;

  if (player == 1) {
    dice0.classList.remove("dice--1");
    dice0.classList.add("dice--0");
  } else {
    dice0.classList.add("dice--1");
    dice0.classList.remove("dice--0");
    // dice0.classList.add("dice--1");
  }
  document
    .querySelector(`.player--${player}`)
    .classList.remove("player--active");
  player = player === 0 ? 1 : 0;
  document.querySelector(`.player--${player}`).classList.add("player--active");
};

/* Roll dice  */

btnRoll.addEventListener("click", function () {
  if (game) {
    dice0.classList.remove("hidden");
    dice.classList.remove("hidden");
    const roll = Math.trunc(Math.random() * 6) + 1;
    dice0.src = `imgs/dice-${roll}.png`;
    /* media querry */
    dice.src = `imgs/dice-${roll}.png`;

    /* add it in current score */

    if (roll !== 1) {
      currentScore += roll;

      document.getElementById(`current--${player}`).textContent = currentScore;
    } else {
      playerSwitch();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (game) {
    scores[player] += currentScore;
    document.getElementById(`score--${player}`).textContent = scores[player];
    if (scores[player] >= 20) {
      document
        .querySelector(`.player--${player}`)
        .classList.add("player--winner");
      game = false;
    } else {
      playerSwitch();
    }
  }
});

btnNew.addEventListener("click", function () {
  game = true;

  score0El.textContent = 0;
  score1El.textContent = 0;

  scores = [0, 0];
  currentScore = 0;
  // dice0.classList.add("hidden");
  // dice1.classList.add("hidden");

  document.querySelector(`.dice--${player}`).classList.add("hidden");
  dice.classList.add("hidden");
  document
    .querySelector(`.player--${player}`)
    .classList.remove("player--active");

  document.querySelector(`.player--${0}`).classList.add("player--active");

  document.querySelector(`.player--${1}`).classList.remove("player--active");

  document.querySelector(`#current--${player}`).textContent = 0;

  document
    .querySelector(`.player--${player}`)
    .classList.remove("player--winner");

  document.querySelector(`.dice--${player}`).classList.add("dice--0");
  dice0.classList.remove("dice--1");

  player = 0;
});
