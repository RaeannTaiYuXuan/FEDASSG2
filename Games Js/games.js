// for games de , if not very messy 

const cards = document.querySelectorAll(".memory-card"),
  timeTag = document.querySelector(".game-time b"),
  flipsTag = document.querySelector(".game-flips b"),
  refreshBtn = document.querySelector(".game-refresh-button");

let maxTime = 40;
let timeLeft = maxTime;
let flips = 0;
let matchedCard = 0;
let disableDeck = false;
let isPlaying = false;
let cardOne, cardTwo, timer;
let totalPoints = 0;


const maxRefreshes = 3; // Change this to your desired limit
let remainingRefreshes = maxRefreshes;


const listGift = [
  {
    text: '100',
    percent: 10 / 100,
    type: 'points', // Type for points
  },
  {
    text: '25',
    percent: 10 / 100,
    type: 'points', // Type for voucher
  },
  {
    text: '1',
    percent: 5 / 100,
    type: 'points', // Type for points
  },
  {
    text: '35',
    percent: 5 / 100,
    type: 'points', // Type for voucher
  },
  {
    text: '50',
    percent: 5 / 100,
    type: 'points', // Type for points
  },
  {
    text: '70 ',
    percent: 40 / 100,
    type: 'points', // Type for voucher
  },
  {
    text: '2',
    percent: 10 / 100,
    type: 'voucher', // Type for voucher
  },
  {
    text: '10',
    percent: 20 / 100,
    type: 'points', // Type for points
  },
];

function chooseRandomGift() {
  const randomIndex = Math.floor(Math.random() * listGift.length);
  const randomGift = listGift[randomIndex];

  randomGift.type === 'points'
  totalPoints += parseInt(randomGift.text);
  

  updateTotalDisplay();

  return randomGift;
}

function updateTotalDisplay() {
  
  const pointsDisplay = document.querySelector('.memorypoints');
  pointsDisplay.textContent = `Total Points: ${totalPoints}`;
}

const lastPlayKey = 'lastPlayTimestamp';



function initTimer() {
  if (timeLeft <= 0) {
    return clearInterval(timer);
  }
  timeLeft--;
  timeTag.innerText = timeLeft;
}

function flipCard({ target: clickedCard }) {
  if (!isPlaying) {
    isPlaying = true;
    timer = setInterval(initTimer, 1000);
  }
  if (clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
    flips++;
    flipsTag.innerText = flips;
    clickedCard.classList.add("flip");
    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector(".back-view img").src,
      cardTwoImg = cardTwo.querySelector(".back-view img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}

// Modify the matchCards function
function matchCards(img1, img2) {
  if (img1 === img2) {
    matchedCard++;

    // Check if all cards are matched
    if (matchedCard === 6) {
      clearInterval(timer);

      // Choose a random gift
      const randomGift = chooseRandomGift();

      // Display a modal with the random reward message
      openModal(`Congratulations! You've won: ${randomGift.text}`);
    }

    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    disableDeck = false;
  } else {
    setTimeout(() => {
      cardOne.classList.add("shake");
      cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
      cardOne.classList.remove("shake", "flip");
      cardTwo.classList.remove("shake", "flip");
      cardOne = cardTwo = "";
      disableDeck = false;
    }, 1200);
  }
}


async function shuffleCard() {
  const currentTimeStamp = Date.now();
  const lastPlayTimestamp = parseInt(localStorage.getItem(lastPlayKey) || 0);

  if (remainingRefreshes > 0 && currentTimeStamp - lastPlayTimestamp >= 24 * 60 * 60 * 1000) {
    timeLeft = maxTime;
    flips = matchedCard = 0;
    cardOne = cardTwo = "";
    clearInterval(timer);
    timeTag.innerText = timeLeft;
    flipsTag.innerText = flips;
    disableDeck = isPlaying = false;

    let arr = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
    arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

    cards.forEach((card, index) => {
      card.classList.remove("flip");
      let imgTag = card.querySelector(".back-view img");
      setTimeout(() => {
        imgTag.src = `images/img-${arr[index]}.png`;
      }, 500);
      card.addEventListener("click", flipCard);
    });

    remainingRefreshes--;
    updateRefreshesDisplay();

    if (remainingRefreshes === 0) {
      openModal('You have reached the maximum number of refreshes. Please come back after 24 hours.');
      console.log('You have reached the maximum number of refreshes.');

      // Update the last play timestamp
      localStorage.setItem(lastPlayKey, currentTimeStamp);

      const userName = localStorage.getItem('user-Name'); // Replace with actual username
      try {
        await updateUserPoints(totalPoints, userName);
      } catch (error) {
        console.error('Error updating points:', error);
      }

      // Update displays after the points have been updated
      updateTotalDisplay();
      updateRefreshesDisplay();
    }
  } else {
    const timeUntilNextPlay = Math.ceil((lastPlayTimestamp + 24 * 60 * 60 * 1000 - currentTimeStamp) / (60 * 1000));
    openModal(`You must wait ${timeUntilNextPlay} minutes before playing again.`);
    console.log(`You must wait ${timeUntilNextPlay} minutes before playing again.`);
  }
}

shuffleCard();

refreshBtn.addEventListener("click", shuffleCard);

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});


function updateRefreshesDisplay() {
  const refreshesDisplay = document.querySelector('.remaining-refreshes');
  refreshesDisplay.textContent = `Remaining Refreshes: ${remainingRefreshes}`;
}

// Add this function at the end of your JavaScript
function openModal(message) {
    const modal = document.getElementById("popupModal");
    const modalMessage = document.getElementById("modalMessage");
    modalMessage.textContent = message;
    modal.style.display = "block";
  }
  
  function closeModal() {
    const modal = document.getElementById("popupModal");
    modal.style.display = "none";
  }
  
  // Modify the initTimer function
  // Modify the initTimer function
function initTimer() {
    if (timeLeft <= 0) {
      clearInterval(timer);
  
      // Add a small delay before displaying the modal
      setTimeout(() => {
        // Check if all cards are flipped
        if (matchedCard === 6) {
          // Display a modal with a voucher message
          openModal("Congratulations! You've won a voucher!");
        } else {
          // Display a modal with no gifts message
          openModal("Sorry, no gifts for you this time. Try again!");
        }
      }, 500); // Adjust the delay as needed
    } else {
      timeLeft--;
      timeTag.innerText = timeLeft;
    }
  }
  
  