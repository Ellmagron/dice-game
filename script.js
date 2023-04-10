'use strict';

//Selecionando os elementos de pontução
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let score, currentScore, activePlayer, playing

//Ininciado as condições
const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true; // definindo uma variavel de estado para controlar o jogo
  
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0
  current1El.textContent = 0


  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

};

init()

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; // resetando a pontução para 0 do jogador ativo no momento, antes de fazer a troca
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //fazendo a troca do jogador
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Funcionalidade de jogada
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Gerar uma jogada aleatória do dado
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2.Exibir o dado
    diceEl.classList.remove('hidden');
    diceEl.src = `img/dice-${dice}.png`;

    //3. Checar se a jogada é 1: verdadeiro, troca para o próximo jogador
    if (dice !== 1) {
      //Adicione valor do dado na pontuação atual
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Troque para o próximo jogador
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.Adicionando pontuação atual na pontuação total do jogador ativo
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    //2. verificando se a pontual do jogador ativo é >= 100
    if (score[activePlayer] >= 100) {
      //Terminando o jogo
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner'); //Adiconando um classe para o jogador que vencer
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //3. Trocando para o próximo jogador
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init)
