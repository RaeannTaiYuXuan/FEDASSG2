const words = ['loafers', 'stilettos', 'flats', 'sandals'];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessed = [];
let mistakes = 0;
let wordStatus = '';
let maxTime = 30;
let timeLeft = maxTime;
let timer;

function initTimer() {
  if (timeLeft <= 0) {
    clearInterval(timer);

    setTimeout(() => {
      if (!wordStatus.includes('_')) {
        openModal("Congratulations! You've won a voucher!");
      } else {
        openModal("Sorry, no gifts for you this time. Try again!");
      }
    }, 500);
  } else {
    timeLeft--;
    document.getElementById('timeTag').innerText = "Time Left: " + timeLeft;
  }
}

function startTimer() {
  if (!timer) {
    timer = setInterval(initTimer, 1000);
  }
}

function resetGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  mistakes = 0;
  guessed = [];
  timeLeft = maxTime;
  clearInterval(timer);
  document.getElementById('timeTag').innerText = "Time Left: " + timeLeft; // Reset the timer display
  document.getElementById('keyboard').innerHTML = '';
  wordStatus = selectedWord.split('').map(letter => '_').join(' ');
  document.getElementById('wordToGuess').innerHTML = wordStatus;
  document.getElementById('message').innerHTML = '';
  generateKeyboard();
  drawHangman();
  startTimer(); // Start the timer again after resetting
}

function generateKeyboard() {
  const buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `<button
      class="btn btn-lg btn-primary m-2"
      id='${letter}'
      onClick="handleGuess('${letter}')"
    >
      ${letter}
    </button>`).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
  if (guessed.indexOf(chosenLetter) === -1) {
    guessed.push(chosenLetter);
    document.getElementById(chosenLetter).setAttribute('disabled', true);
    startTimer();

    if (selectedWord.indexOf(chosenLetter) >= 0) {
      guessedWord();
      checkIfGameWon();
    } else {
      mistakes++;
      updateHangmanPicture();
      checkIfGameLost();
    }
  }
}

function guessedWord() {
  wordStatus = selectedWord.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : "_ ")).join('');
  document.getElementById('wordToGuess').innerHTML = wordStatus;
}

function checkIfGameWon() {
  if (!wordStatus.includes('_')) {
    document.getElementById('keyboard').innerHTML = 'You Won!!!';
    clearInterval(timer);
    openModal("Congratulations! You've won the game!");
  }
}

function checkIfGameLost() {
  if (mistakes === 6) {
    document.getElementById('wordToGuess').innerHTML = 'The answer was: ' + selectedWord;
    document.getElementById('keyboard').innerHTML = 'You Lost!!!';
    clearInterval(timer);
    openModal("Sorry, you lost the game. The word was: " + selectedWord);
  }
}

function updateHangmanPicture() {
  document.getElementById('mistakes').textContent = `Mistakes: ${mistakes}`;
}

function openModal(message) {
  document.getElementById('modalMessage').innerText = message;
  document.getElementById('popupModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('popupModal').style.display = 'none';
}

document.getElementById('reset').addEventListener('click', resetGame);

generateKeyboard();
resetGame();
