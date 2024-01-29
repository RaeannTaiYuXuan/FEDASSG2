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

      // Display a modal with a voucher message
      openModal("Congratulations! You've won a voucher!");
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


function shuffleCard() {
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
}

shuffleCard();

refreshBtn.addEventListener("click", shuffleCard);

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});

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
  
  
