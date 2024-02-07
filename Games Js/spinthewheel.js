(() => { // Self-invoking anonymous function to encapsulate variables and functions

  // Shortcut for document.querySelector
  const $ = document.querySelector.bind(document);

  // Time in milliseconds for one rotation (7 seconds)
  let timeRotate = 7000;

  // Current rotation angle of the wheel
  let currentRotate = 0;

  // Flag to track if the wheel is currently rotating
  let isRotating = false;

  // Variable to keep track of user's vouchers
  let userVouchers = 0;

  // Variable to keep track of user's points
  let userPoints = 0;

  // Number of spins allowed per day
  let spinsRemaining = 5;

  // Key for storing spins in localStorage
  const spinsKey = 'dailySpins';

  // Key for storing the timestamp of the last spin
  const lastSpinKey = 'lastSpinTime';

  // DOM elements selection
  const wheel = $('.wheel'); // Wheel element
  const btnWheel = $('.btn--wheel'); // Button to spin the wheel
  const modal = $('#popupModal'); // Modal element
  const modalMessage = $('#modalMessage'); // Message in the modal
  const voucherCountDisplay = $('.wheelvoucher'); // Display for user's vouchers
  const pointsDisplay = $('.points'); // Display for user's points
  const limitDisplay = $('.limitwheel'); // Display for remaining spins

  // List of prizes including vouchers and points
  const listGift = [
    { text: '100 points', percent: 10 / 100, type: 'points' },
    { text: '20 points', percent: 10 / 100, type: 'points' },
    { text: '1 points', percent: 5 / 100, type: 'points' },
    { text: '10 points', percent: 5 / 100, type: 'points' },
    { text: '50 points', percent: 5 / 100, type: 'points' },
    { text: '30 points ', percent: 40 / 100, type: 'points' },
    { text: '120 points', percent: 10 / 100, type: 'points' },
    { text: 'NA', percent: 20 / 100, type: 'none' },
  ];


  // Number of prizes
  const size = listGift.length;

  // Angle measurement of one prize on the circle
  const rotate = 360 / size;

  // Angle needed to create the tilt, 90 degrees minus the angle one prize occupies
  const skewY = 90 - rotate;

  // Generate the wheel with prizes
  listGift.map((item, index) => {
    const elm = document.createElement('li');
    elm.classList.add('wheel-prize');
    elm.style.transform = `rotate(${rotate * index}deg) skewY(-${skewY}deg)`;

    if (index % 2 == 0) {
      elm.innerHTML = `<p style="transform: skewY(${skewY}deg) rotate(${rotate / 2}deg);" class="text text-1">
      <b>${item.text}</b>
    </p>`;
    } else {
      elm.innerHTML = `<p style="transform: skewY(${skewY}deg) rotate(${rotate / 2}deg);" class="text text-2">
    <b>${item.text}</b>
    </p>`;
    }

    wheel.appendChild(elm);
  });

  // Function to start spinning the wheel
  const start = () => {
    // Get current time
    const currentTime = new Date().getTime();

    // Get the timestamp of the last spin from localStorage or default to 0
    const lastSpinTime = parseInt(localStorage.getItem(lastSpinKey), 10) || 0;

    // Calculate the time difference between the current time and the last spin time
    const timeDifference = currentTime - lastSpinTime;

    // Check if spins are remaining for the day
    if (spinsRemaining > 0) {
      isRotating = true;
      const random = Math.random();
      const gift = getGift(random);
      currentRotate += 360 * 10;
      rotateWheel(currentRotate, gift.index);
      showGift(gift);
      updateSpinCount();
    } else if (timeDifference >= 24 * 60 * 60 * 1000) { // Check if a day has passed since the last spin
      // Reset daily spin count and allow a new set of spins
      spinsRemaining = 5;
      updateLimitDisplay();

      // Proceed with the spin
      isRotating = true;
      const random = Math.random();
      const gift = getGift(random);
      currentRotate += 360 * 10;
      rotateWheel(currentRotate, gift.index);
      showGift(gift);
      updateSpinCount();
    } else {
      // Calculate remaining time until the next spin is allowed
      const remainingTime = formatRemainingTime(24 * 60 * 60 * 1000 - timeDifference);
      openModal(`You must wait ${remainingTime} before spinning again.`);
    }
  };

  // Function to format remaining time in hours and minutes
  const formatRemainingTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / (60 * 60 * 1000));
    const minutes = Math.floor((milliseconds % (60 * 60 * 1000)) / (60 * 1000));
    return `${hours} hours and ${minutes} minutes`;
  };

  // Function to rotate the wheel
  const rotateWheel = (currentRotate, index) => {
    $('.wheel').style.transform = `rotate(${currentRotate - index * rotate - rotate / 2
      }deg)`;
  };

  // Function to select a prize based on a random number
  const getGift = randomNumber => {
    let currentPercent = 0;
    let list = [];

    // Iterate through the list of gifts and calculate cumulative percentages
    listGift.forEach((item, index) => {
      currentPercent += item.percent;

      // If the random number falls within the current percentage, add the gift to the list
      if (randomNumber <= currentPercent) {
        list.push({ ...item, index });
      }
    });

    // Return the selected gift
    return list[0];
  };

  // Function to show the selected gift
  const showGift = gift => {
    let timer = setTimeout(() => {
      isRotating = false;

      // Check the type of the gift
      if (gift.type === 'none') {
        openModal('Better Luck Next Time');
      } else if (gift.type === 'points') {
        // If the user gets points, update the points count
        userPoints += parseInt(gift.text) || 0; // Convert text to a number, default to 0 if not a valid number
        updatePointsCount();

        // Update points in the database
        const userName = localStorage.getItem("user-Name");
        updateUserPoints(parseInt(gift.text) || 0, userName);
      }

      openModal(gift.text);
      clearTimeout(timer);
    }, timeRotate);
  };

  // Function to open the modal
  const openModal = message => {
    modalMessage.textContent = 'Congratulations !! You got ' + message;
    modal.style.display = 'block';
  };

  // Function to update the points count on the page
  const updatePointsCount = () => {
    pointsDisplay.textContent = `Total Points: ${userPoints}`;
  };

  // Function to update the spin count
  const updateSpinCount = () => {
    spinsRemaining--;
    localStorage.setItem(spinsKey, spinsRemaining);
    localStorage.setItem(lastSpinKey, new Date().getTime());
    updateLimitDisplay();
  };

  // Function to update the remaining spins display on the page
  const updateLimitDisplay = () => {
    limitDisplay.textContent = `Total Spins Left: ${spinsRemaining}`;
  };

  // Function to check the spin count on page load
  const checkSpinCount = () => {
    const storedSpins = localStorage.getItem(spinsKey);
    if (storedSpins !== null) {
      spinsRemaining = parseInt(storedSpins, 10);
    } else {
      localStorage.setItem(spinsKey, spinsRemaining);
    }
    updateLimitDisplay();
  };

  // Function to initialize the spin count on page load
  const initializeSpinCount = () => {
    const storedSpins = localStorage.getItem(spinsKey);
    if (storedSpins === null) {
      localStorage.setItem(spinsKey, spinsRemaining);
    }
  };

  // Call the function to initialize spin count on page load
  initializeSpinCount();

  // Event listener for the start button
  btnWheel.addEventListener('click', () => {
    !isRotating && start();
  });

  // Close modal function
  window.closeModal = function () {
    modal.style.display = 'none';
    
  };

  // Check spin count on page load
  checkSpinCount();
})();
