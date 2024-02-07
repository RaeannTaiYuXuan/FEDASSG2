
const wordsAndHints = [
  { word: 'loafers', hint: 'Comfortable shoes often worn casually.' },
  { word: 'stilettos', hint: 'High-heeled shoes with a thin, tall heel.' },
  { word: 'flats', hint: 'Shoes with no heel or a very low heel.' },
  { word: 'sandals', hint: 'Open-toed shoes often worn in warm weather.' }
];

const listGift = [
  {
    text: '100 points',
    percent: 10 / 100,
    type: 'points', // Type for points
  },
  {
    text: '20 points',
    percent: 10 / 100,
    type: 'points', // Type for voucher
  },
  {
    text: '1 points',
    percent: 5 / 100,
    type: 'points', // Type for points
  },
  {
    text: '10 points',
    percent: 5 / 100,
    type: 'points', // Type for voucher
  },
  {
    text: '50 points',
    percent: 5 / 100,
    type: 'points', // Type for points
  },
  {
    text: '30 points ',
    percent: 40 / 100,
    type: 'points', // Type for voucher
  },
  {
    text: '120 points',
    percent: 10 / 100,
    type: 'points', // Type for voucher
  },
  {
    text: 'NA',
    percent: 20 / 100,
    type: 'none', // Type for points
  },
];

let selectedWord;
let hint;
let guessed = [];
let mistakes = 0;
let wordStatus = '';
let maxTime = 30;
let timeLeft = maxTime;
let timer;

function startGame() {
  resetGame();
  startTimer();
}

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
    
  }
}

function startTimer() {
  if (timer) {
    clearInterval(timer);
  }

  timer = setInterval(initTimer, 1000);
}

function resetGame() {
  selectedWord = getRandomWord();
  hint = getHintForWord(selectedWord.word);
  guessed = [];
  mistakes = 0;
  timeLeft = maxTime;
  clearInterval(timer);
  document.getElementById('timeTag').innerText = "Time Left: " + timeLeft;
  document.getElementById('keyboard').innerHTML = '';
  wordStatus = selectedWord.word.split('').map(letter => '_').join(' ');
  document.getElementById('wordToGuess').innerHTML = wordStatus;
  document.getElementById('message').innerHTML = '';
  document.getElementById('hintstyle').innerText = 'Hint: ' + hint;
  updateHangmanPicture();
  generateKeyboard();
  drawHangman();
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

    if (selectedWord.word.indexOf(chosenLetter) >= 0) {
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
  wordStatus = selectedWord.word.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : "_ ")).join('');
  document.getElementById('wordToGuess').innerHTML = wordStatus;
}

async function checkIfGameWon() {
  if (!wordStatus.includes('_')) {
    const keyboardElement = document.getElementById('keyboard');
    const messageElement = document.getElementById('message');

    keyboardElement.innerHTML = '';
    keyboardElement.classList.add('hidden');

    const randomIndex = Math.floor(Math.random() * listGift.length);
    const selectedGift = listGift[randomIndex];

    if (selectedGift.type === 'points') {
      const userName = localStorage.getItem('user-Name');
      const pointsEarned = parseInt(selectedGift.text);

      try {
        await updateUserPoints(pointsEarned, userName);
        messageElement.innerHTML = `<span class="won-message">You Won!!! ${selectedGift.text} points added to your account.</span>`;
        openModal(`Congratulations! You've won: ${selectedGift.text} points`);
      } catch (error) {
        console.error('Error updating user points:', error);
        messageElement.innerHTML = '<span class="won-message">You Won!!!</span>';
        openModal("Congratulations! You've won the game!");
      }
    } else {
      // Handle other types if needed
      messageElement.innerHTML = '<span class="won-message">You Won!!!</span>';
      openModal("Congratulations! You've won the game!");
    }

    clearInterval(timer);
  }
}



function checkIfGameLost() {
  if (mistakes === 6) {
    const gameContainer = document.getElementById('keyboard');
    const messageElement = document.getElementById('message');
    
    gameContainer.innerHTML = ''; // Replace the content or adjust as needed
    gameContainer.classList.add('hidden'); // Add the 'hidden' class to hide the container
    
    messageElement.innerHTML = '<span class="lost-message">You Lost!!!</span>';
    
    clearInterval(timer);
    openModal("Sorry, you lost the game. The word was: " + selectedWord.word);
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

function getRandomWord() {
  return wordsAndHints[Math.floor(Math.random() * wordsAndHints.length)];
}

function getHintForWord(word) {
  const wordObject = wordsAndHints.find(item => item.word === word);
  return wordObject ? wordObject.hint : '';
}

document.getElementById('reset').addEventListener('click', startGame);

startGame();