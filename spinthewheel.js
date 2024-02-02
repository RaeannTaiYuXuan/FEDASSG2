(() => {
    const $ = document.querySelector.bind(document);
  
    let timeRotate = 7000; // 7 seconds
    let currentRotate = 0;
    let isRotating = false;
    let userVouchers = 0; // Variable to keep track of user's vouchers
    let userPoints = 0; // Variable to keep track of user's points
    let spinsRemaining = 20; // Number of spins allowed per day
    const spinsKey = 'dailySpins'; // Key for storing spins in localStorage
  
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
        text: '100',
        percent: 10 / 100,
        type: 'points', // Type for points
      },
      {
        text: '10% OFF',
        percent: 10 / 100,
        type: 'voucher', // Type for voucher
      },
      {
        text: '1',
        percent: 5 / 100,
        type: 'points', // Type for points
      },
      {
        text: '$10 OFF min.spend $80',
        percent: 5 / 100,
        type: 'voucher', // Type for voucher
      },
      {
        text: '50',
        percent: 5 / 100,
        type: 'points', // Type for points
      },
      {
        text: '50% OFF ',
        percent: 40 / 100,
        type: 'voucher', // Type for voucher
      },
      {
        text: '$5 OFF',
        percent: 10 / 100,
        type: 'voucher', // Type for voucher
      },
      {
        text: '10',
        percent: 20 / 100,
        type: 'points', // Type for points
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
      if (spinsRemaining > 0) {
        isRotating = true;
        const random = Math.random();
        const gift = getGift(random);
        currentRotate += 360 * 10;
        rotateWheel(currentRotate, gift.index);
        showGift(gift);
        updateSpinCount();
      } else {
        alert('You have reached the daily spin limit. Come back tomorrow!');
      }
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
  
        if (gift.type === 'voucher') {
          // If the user gets a voucher, update the voucher count
          userVouchers++;
          updateVoucherCount();
        } else if (gift.type === 'points') {
          // If the user gets points, update the points count
          userPoints += parseInt(gift.text) || 0; // Convert text to a number, default to 0 if not a valid number
          updatePointsCount();
        }
  
        openModal(gift.text);
        clearTimeout(timer);
      }, timeRotate);
    };
  
    /********** Open modal function **********/
    const openModal = message => {
      modalMessage.textContent = "Congratulations !! You got " + message;
      modal.style.display = 'block';
    };
  
    /********** Update voucher count on the page **********/
    const updateVoucherCount = () => {
      voucherCountDisplay.textContent = `Total Voucher: ${userVouchers}`;
    };
  
    /********** Update points count on the page **********/
    const updatePointsCount = () => {
      pointsDisplay.textContent = `Total Points: ${userPoints}`;
    };
  
    /********** Update spin count **********/
    const updateSpinCount = () => {
      spinsRemaining--;
      localStorage.setItem(spinsKey, spinsRemaining);
      updateLimitDisplay();
    };
  
    /********** Update limit display on the page **********/
    // const updateLimitDisplay = () => {
    //   limitDisplay.textContent = `Total Spins Left: ${spinsRemaining}`;
    // };
  
    /********** Check spin count on page load **********/
    // const checkSpinCount = () => {
    //   const storedSpins = localStorage.getItem(spinsKey);
    //   if (storedSpins !== null) {
    //     spinsRemaining = parseInt(storedSpins, 10);
    //   } else {
    //     localStorage.setItem(spinsKey, spinsRemaining);
    //   }
    //   updateLimitDisplay();
    // };
  
    // // Call the function to check spin count on page load
    // checkSpinCount();
  
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

    
  
  })();


  