(() => {
  const $ = document.querySelector.bind(document);

  let timeRotate = 7000; // 7 seconds
  let currentRotate = 0;
  let isRotating = false;
  let userVouchers = 0; // Variable to keep track of user's vouchers
  let userPoints = 0; // Variable to keep track of user's points
  let spinsRemaining = 5; // Number of spins allowed per day
  const spinsKey = 'dailySpins'; // Key for storing spins in localStorage
  const lastSpinKey = 'lastSpinTime'; // Key for storing the timestamp of the last spin

  const wheel = $('.wheel');
  const btnWheel = $('.btn--wheel');
  const modal = $('#popupModal');
  const modalMessage = $('#modalMessage');
  const voucherCountDisplay = $('.wheelvoucher'); // Use the class to select the element
  const pointsDisplay = $('.points'); // Add a class to select the points element
  const limitDisplay = $('.limitwheel'); // Add a class to select the limit element

  //=====< List of prizes including vouchers and points >=====
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

  //=====< Number of prizes >=====
  const size = listGift.length;

  //=====< Angle measurement of one prize on the circle >=====
  const rotate = 360 / size;

  //=====< Angle needed to create the tilt, 90 degrees minus the angle one prize occupies >=====
  const skewY = 90 - rotate;

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

  /********** Start function **********/
  const start = () => {
    const currentTime = new Date().getTime();
    const lastSpinTime = parseInt(localStorage.getItem(lastSpinKey), 10) || 0;
    const timeDifference = currentTime - lastSpinTime;
  
    if (spinsRemaining > 0) {
      isRotating = true;
      const random = Math.random();
      const gift = getGift(random);
      currentRotate += 360 * 10;
      rotateWheel(currentRotate, gift.index);
      showGift(gift);
      updateSpinCount();
    } else if (timeDifference >= 24 * 60 * 60 * 1000) { // 24 hours in milliseconds
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

  /********** Rotate wheel function **********/
  const rotateWheel = (currentRotate, index) => {
    $('.wheel').style.transform = `rotate(${
      currentRotate - index * rotate - rotate / 2
    }deg)`;
  };

  /********** Get prize function **********/
  const getGift = randomNumber => {
    let currentPercent = 0;
    let list = [];

    listGift.forEach((item, index) => {
      currentPercent += item.percent;

      if (randomNumber <= currentPercent) {
        list.push({ ...item, index });
      }
    });

    return list[0];
  };

  /********** Show prize on the screen function **********/
  const showGift = gift => {
    let timer = setTimeout(() => {
      isRotating = false;

      if (gift.type === 'none') {
        openModal('Better Luck Next Time');
      } 
      else if (gift.type === 'points') {
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

  /********** Open modal function **********/
  const openModal = message => {
    modalMessage.textContent = 'Congratulations !! You got ' + message;
    modal.style.display = 'block';
  };

  /********** Update points count on the page **********/
  const updatePointsCount = () => {
    pointsDisplay.textContent = `Total Points: ${userPoints}`;
  };

  /********** Update spin count **********/
  const updateSpinCount = () => {
    spinsRemaining--;
    localStorage.setItem(spinsKey, spinsRemaining);
    localStorage.setItem(lastSpinKey, new Date().getTime());
    updateLimitDisplay();
  };

  /********** Update limit display on the page **********/
  const updateLimitDisplay = () => {
    limitDisplay.textContent = `Total Spins Left: ${spinsRemaining}`;
  };

  /********** Check spin count on page load **********/
  const checkSpinCount = () => {
    const storedSpins = localStorage.getItem(spinsKey);
    if (storedSpins !== null) {
      spinsRemaining = parseInt(storedSpins, 10);
    } else {
      localStorage.setItem(spinsKey, spinsRemaining);
    }
    updateLimitDisplay();
  };

  /********** Initialize spin count on page load **********/
  const initializeSpinCount = () => {
    const storedSpins = localStorage.getItem(spinsKey);
    if (storedSpins === null) {
      localStorage.setItem(spinsKey, spinsRemaining);
    }
  };

  // Call the function to initialize spin count on page load
  initializeSpinCount();

  /********** Event listener for the start button **********/
  btnWheel.addEventListener('click', () => {
    !isRotating && start();
  });

  /********** Close modal function **********/
  window.closeModal = function () {
    modal.style.display = 'none';
    // Additional logic when closing the modal if needed
    // ...
  };

  /********** Check spin count on page load **********/
  checkSpinCount();
  initializeSpinCount();
})();
