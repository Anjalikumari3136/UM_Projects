const emojis = ['🐶','🐱','🦊','🐻','🐼','🐨','🦁','🐷'];
let cards = [...emojis, ...emojis]; 

let flippedCards = [];
let matchedCount = 0;
let moves = 0;
let timer = 0;
let interval = null;
let gameStarted = false;

const board = document.getElementById('gameBoard');
const moveCounter = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
const message = document.getElementById('message');
const newGameBtn = document.getElementById('newGameBtn');

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startTimer() {
  interval = setInterval(() => {
    timer++;
    timerDisplay.textContent = timer;
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
}

function resetGame() {
  flippedCards = [];
  matchedCount = 0;
  moves = 0;
  timer = 0;
  gameStarted = false;
  moveCounter.textContent = moves;
  timerDisplay.textContent = timer;
  message.classList.add('hidden');
  stopTimer();
  board.innerHTML = '';

  let shuffled = shuffle([...cards]);
  shuffled.forEach(emoji => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">${emoji}</div>
        <div class="card-back">?</div>
      </div>
    `;

    card.addEventListener('click', handleCardClick);
    board.appendChild(card);
  });
}

function handleCardClick(e) {
  const card = e.currentTarget;
  if (!gameStarted) {
    gameStarted = true;
    startTimer();
  }

  if (
    card.classList.contains('flipped') ||
    flippedCards.length === 2
  ) return;

  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    moves++;
    moveCounter.textContent = moves;

    const [first, second] = flippedCards;

    setTimeout(() => {
      if (first.dataset.emoji === second.dataset.emoji) {
        first.classList.add('matched');
        second.classList.add('matched');
        flippedCards = [];
        matchedCount++;
        if (matchedCount === emojis.length) {
          stopTimer();
          message.classList.remove('hidden');
        }
      } else {
        first.classList.add('shake');
        second.classList.add('shake');
        setTimeout(() => {
          first.classList.remove('flipped', 'shake');
          second.classList.remove('flipped', 'shake');
          flippedCards = [];
        }, 600);
      }
    }, 500);
  }
}

newGameBtn.addEventListener('click', resetGame);
resetGame(); 
