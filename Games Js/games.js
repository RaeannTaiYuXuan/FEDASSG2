// getting the value from the html class name 
const cards = document.querySelectorAll(".memory-card"), // Selecting all elements with the class "memory-card"
timeTag = document.querySelector(".game-time b"), // Selecting the time tag
flipsTag = document.querySelector(".game-flips b"), // Selecting the flips tag
refreshBtn = document.querySelector(".game-refresh-button"); // Selecting the refresh button

// declaring 
let maxTime = 40; // Maximum time for the game
let timeLeft = maxTime; // Remaining time
let flips = 0; // Number of flips
let matchedCard = 0; // Number of matched cards
let disableDeck = false; // Flag to disable deck
let isPlaying = false; // Flag to check if the game is in progress
let cardOne, cardTwo, timer; // Variables to store flipped cards and timer
let totalPoints = 0; // Total points earned
const maxRefreshes = 3; // Maximum number of refreshes allowed
let remainingRefreshes = maxRefreshes; // Remaining refreshes

// list of random points 
const listGift = [ // Array containing objects with points/voucher information
  {
    text: '100',
    percent: 10 / 100,
    type: 'points',
  },
  {
    text: '25',
    percent: 10 / 100,
    type: 'points',
  },
  {
    text: '1',
    percent: 5 / 100,
    type: 'points',
  },
  {
    text: '35',
    percent: 5 / 100,
    type: 'points',
  },
  {
    text: '50',
    percent: 5 / 100,
    type: 'points',
  },
  {
    text: '70 ',
    percent: 40 / 100,
    type: 'points',
  },
  {
    text: '2',
    percent: 10 / 100,
    type: 'voucher',
  },
  {
    text: '10',
    percent: 20 / 100,
    type: 'points',
  },
];

// Function to choose a random gift and update total points display
function chooseRandomGift() {
  const randomIndex = Math.floor(Math.random() * listGift.length); // Generating a random index
  const randomGift = listGift[randomIndex]; // Getting a random gift object

  randomGift.type === 'points' // Checking if it's a points gift
  totalPoints += parseInt(randomGift.text); // Adding points to total

  updateTotalDisplay(); // Updating total points display

  return randomGift; // Returning the chosen gift
}

// Function to update total points display
function updateTotalDisplay() {
  const pointsDisplay = document.querySelector('.memorypoints'); // Selecting points display element
  pointsDisplay.textContent = `Total Points: ${totalPoints}`; // Updating points display
}

// Local storage key for last play timestamp
const lastPlayKey = 'lastPlayTimestamp';

// Function to initialize the timer
function initTimer() {
  if (timeLeft <= 0) { // If time is up
    return clearInterval(timer); // Clear timer
  }
  timeLeft--; // Decrease time left
  timeTag.innerText = timeLeft; // Update time display
}

// Function to flip a card when clicked
function flipCard({ target: clickedCard }) {
  if (!isPlaying) { // If game is not already in progress
    isPlaying = true; // Start the game
    timer = setInterval(initTimer, 1000); // Start the timer
  }
  if (clickedCard !== cardOne && !disableDeck && timeLeft > 0) { // If the clicked card is not already flipped and deck is enabled
    flips++; // Increase flips count
    flipsTag.innerText = flips; // Update flips display
    clickedCard.classList.add("flip"); // Flip the clicked card
    if (!cardOne) { // If cardOne is not set
      return (cardOne = clickedCard); // Set cardOne to clicked card
    }
    cardTwo = clickedCard; // Set cardTwo to clicked card
    disableDeck = true; // Disable the deck temporarily
    let cardOneImg = cardOne.querySelector(".back-view img").src, // Get image source of cardOne
      cardTwoImg = cardTwo.querySelector(".back-view img").src; // Get image source of cardTwo
    matchCards(cardOneImg, cardTwoImg); // Match the cards
  }
}

// Function to match cards and handle actions
function matchCards(img1, img2) {
  if (img1 === img2) { // If images match
    matchedCard++; // Increase matched cards count

    if (matchedCard === 6) { // If all cards are matched
      clearInterval(timer); // Stop the timer

      // Choose a random gift
      const randomGift = chooseRandomGift();

      // Display a modal with the random reward message
      openModal(`Congratulations! You've won: ${randomGift.text}`);
    }

    // Remove event listeners from matched cards
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = ""; // Reset cardOne and cardTwo
    disableDeck = false; // Enable the deck
  } else { // If images don't match
    setTimeout(() => {
      cardOne.classList.add("shake"); // Add shake effect to cardOne
      cardTwo.classList.add("shake"); // Add shake effect to cardTwo
    }, 400);

    setTimeout(() => {
      cardOne.classList.remove("shake", "flip"); // Remove shake and flip classes from cardOne
      cardTwo.classList.remove("shake", "flip"); // Remove shake and flip classes from cardTwo
      cardOne = cardTwo = ""; // Reset cardOne and cardTwo
      disableDeck = false; // Enable the deck
    }, 1200);
  }
}

// Function to shuffle cards
async function shuffleCard() {
  const currentTimeStamp = Date.now(); // Get current timestamp
  const lastPlayTimestamp = parseInt(localStorage.getItem(lastPlayKey) || 0); // Get last play timestamp from local storage

  if (remainingRefreshes > 0 && currentTimeStamp - lastPlayTimestamp >= 24 * 60 * 60 * 1000) { // If there are remaining refreshes and enough time has passed since last play
    timeLeft = maxTime; // Reset time left
    flips = matchedCard = 0; // Reset flips and matched cards
    cardOne = cardTwo = ""; // Reset cardOne and cardTwo
    clearInterval(timer); // Clear the timer
    timeTag.innerText = timeLeft; // Update time display
    flipsTag.innerText = flips; // Update flips display
    disableDeck = isPlaying = false; // Enable deck and set game status to not playing

    let arr = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]; // Array to store card numbers
    arr.sort(() => (Math.random() > 0.5 ? 1 : -1)); // Shuffle the array

    // Loop through cards and reset them
    cards.forEach((card, index) => {
      card.classList.remove("flip"); // Remove flip class from card
      let imgTag = card.querySelector(".back-view img"); // Get image tag of card
      setTimeout(() => {
        imgTag.src = `images/img-${arr[index]}.png`; // Set image source of card
      }, 500);
      card.addEventListener("click", flipCard); // Add click event listener to card
    });

    remainingRefreshes--; // Decrease remaining refreshes
    updateRefreshesDisplay(); // Update refreshes display

    if (remainingRefreshes === 0) { // If no remaining refreshes
      openModal('You have reached the maximum number of refreshes. Please come back tomorrow'); // Display modal informing about maximum refreshes
      console.log('You have reached the maximum number of refreshes.');

      // Update the last play timestamp
      localStorage.setItem(lastPlayKey, currentTimeStamp);

      const userName = localStorage.getItem('user-Name'); // Get username from local storage
      try {
        await updateUserPoints(totalPoints, userName); // Update user points
      } catch (error) {
        console.error('Error updating points:', error); // Log error if updating points fails
      }

      // Update displays after the points have been updated
      updateTotalDisplay(); // Update total points display
      updateRefreshesDisplay(); // Update refreshes display
    }
  } else { // If not enough time has passed since last play
    const timeUntilNextPlay = Math.ceil((lastPlayTimestamp + 24 * 60 * 60 * 1000 - currentTimeStamp) / (60 * 1000)); // Calculate time until next play
    openModal(`You must wait ${timeUntilNextPlay} minutes before playing again.`); // Display modal with waiting message
    console.log(`You must wait ${timeUntilNextPlay} minutes before playing again.`);
  }
}

shuffleCard(); // Shuffle cards initially

refreshBtn.addEventListener("click", shuffleCard); // Add click event listener to refresh button

cards.forEach((card) => {
  card.addEventListener("click", flipCard); // Add click event listener to each card
});

// Function to display remaining refreshes
function updateRefreshesDisplay() {
  const refreshesDisplay = document.querySelector('.remaining-refreshes'); // Select refreshes display element
  refreshesDisplay.textContent = `Remaining Refreshes: ${remainingRefreshes}`; // Update refreshes display
}

// Function to open modal (popup)
function openModal(message) {
  const modal = document.getElementById("popupModal"); // Select modal element
  const modalMessage = document.getElementById("modalMessage"); // Select modal message element
  modalMessage.textContent = message; // Set modal message
  modal.style.display = "block"; // Display modal
}

// Function to close modal
function closeModal() {
  const modal = document.getElementById("popupModal"); // Select modal element
  modal.style.display = "none"; // Hide modal
}

// Function to handle timer when all cards are matched
function initTimer() {
  if (timeLeft <= 0) { // If time is up
    clearInterval(timer); // Clear timer

    // Add a small delay before displaying the modal
    setTimeout(() => {
      // Check if all cards are flipped
      if (matchedCard === 6) { // If all cards are matched
        // Display a modal with a voucher message
        openModal("Congratulations! You've won a voucher!");
      } else {
        // Display a modal with no gifts message
        openModal("Sorry, no gifts for you this time. Try again!");
      }
    }, 500);
  } else {
    timeLeft--; // Decrease time left
    timeTag.innerText = timeLeft; // Update time display
  }
}
