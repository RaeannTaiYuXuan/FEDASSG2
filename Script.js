// Select the header, hamburger button, and close menu button elements
const header = document.querySelector("header");
const hamburgerBtn = document.querySelector("#hamburger-btn");
const closeMenuBtn = document.querySelector("#close-menu-btn");

// Toggle mobile menu on hamburger button click
hamburgerBtn.addEventListener("click", () => header.classList.toggle("show-mobile-menu"));
// This line adds a click event listener to the hamburger button.
// When the button is clicked, it toggles the 'show-mobile-menu' class on the header element.

// Close mobile menu on close button click
closeMenuBtn.addEventListener("click", () => hamburgerBtn.click());
// This line adds a click event listener to the close menu button.
// When the button is clicked, it programmatically triggers a click on the hamburger button.

// end of menu button 




// Select relevant HTML elements for image filtering
function filterImages(category) {
    // Get all elements with the class 'item'
    const items = document.querySelectorAll('.card');

    // Loop through each item
    items.forEach(item => {
        // Get the value of the 'data-name' attribute of the current item
        const dataCategory = item.getAttribute('data-name');

        // Check if the category is 'all' or matches the data-category of the item
        if (category === 'all' || dataCategory === category) {
            // Display the item
            item.style.display = 'block';
        } else {
            // Hide the item
            item.style.display = 'none';
        }
    });
}


// end of filter gallery

window.addEventListener("load", function () {
  // Set a timeout function to execute after 2000 milliseconds (2 seconds)
  setTimeout(function () {
      // Open the popup
      openPopup();
  }, 2000);
});

// Add a click event listener to the element with id 'close'
document.querySelector("#close").addEventListener("click", function () {
  // Close the popup when the 'close' element is clicked
  closePopup();
});

// Function to open the popup
function openPopup() {
  document.querySelector(".popup").style.display = "block";
}

// Function to close the popup
function closePopup() {
  document.querySelector(".popup").style.display = "none";
}



// slideshow
let slideIndex = 1;
showSlides(slideIndex);

function plusSlide(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(function () {
    plusSlide(1); // Change to the next slide every 2 seconds
  }, 10000);
}

function prevSlide() {
  plusSlide(-1);
}

function nextSlide() {
  plusSlide(1);
}

// Start automatic slideshow
showSlides(slideIndex);



// scrolling and nav bar become white
window.addEventListener('scroll', function() {
  var navbar = document.querySelector('.navbar');
  // You may want to check for a specific scroll position, e.g., 50 pixels down from the top
  if (window.scrollY > 0) {
    navbar.style.backgroundColor = "#fff"; // Change to white background
    // Change the color of all nav items to black
    navbar.querySelectorAll('a').forEach(function(link) {
      link.style.color = "black";
    });
  } else {
    navbar.style.backgroundColor = "transparent"; // Change back to transparent
    // Change the color of all nav items back to white or the original color
    navbar.querySelectorAll('a').forEach(function(link) {
      link.style.color = "white";
    });
  }
});




// this is for the shopping cart thingy
// shoppingcart.js







// ... (other functions remain unchanged)



// end of filter gallery
// Script.js

 


 