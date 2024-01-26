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

// Execute the following code when the window has fully loaded
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





document.addEventListener('DOMContentLoaded', function () {
  // Get all elements with the class 'add-to-cart-button'
  var addToCartButtons = document.querySelectorAll('.add-to-cart-button');

  // Add click event listener to each 'Add to Cart' button
  addToCartButtons.forEach(function (button) {
      button.addEventListener('click', function (event) {
          // Prevent the default behavior of the anchor tag
          event.preventDefault();

          // Get the product name, price, and image from the clicked button's data attributes
          var productName = button.getAttribute('data-name');
          var productPrice = parseFloat(button.getAttribute('data-price'));
          var productImage = button.getAttribute('data-image');

          // Call a function to add the item to the shopping cart
          addToCart(productName, productPrice, productImage);

          
      });
      loadCartState();
  });

});

function loadCartState() {
  var savedCart = localStorage.getItem('cart');
  if (savedCart) {
      var items = JSON.parse(savedCart);
      items.forEach(function(item) {
          addToCart(item.name, item.price, item.image, item.quantity);
      });
  }
}

function addToCart(name, price, image) {
  var newRow = document.createElement('tr');

  // Image cell
  var imageCell = document.createElement('td');
  var imageElement = document.createElement('img');
  imageElement.src = image;
  imageElement.alt = name;
  imageElement.style.width = '50px'; // Adjust the image size as needed
  imageCell.appendChild(imageElement);

  // Name cell
  var nameCell = document.createElement('td');
  nameCell.textContent = name;

  // Price cell
  var priceCell = document.createElement('td');
  priceCell.textContent = '$' + price.toFixed(2);

  // Quantity cell
  var quantityCell = document.createElement('td');
  var quantity = 1;
  quantityCell.textContent = quantity;

  // Increment cell
  var incrementCell = createQuantityButton('+', function() {
      quantity++;
      quantityCell.textContent = quantity;
      updateCartTotals();
  });

  // Decrement cell
  var decrementCell = createQuantityButton('-', function() {
      if (quantity > 1) {
          quantity--;
          quantityCell.textContent = quantity;
          updateCartTotals();
      }
  });

  // Delete cell
  var deleteCell = document.createElement('td');
  var deleteButton = document.createElement('button');
  deleteButton.textContent = 'Remove';
  deleteButton.addEventListener('click', function() {
      deleteCartItem(newRow);
  });
  deleteCell.appendChild(deleteButton);

  // Append cells to the new row
  newRow.appendChild(imageCell);
  newRow.appendChild(nameCell);
  newRow.appendChild(priceCell);
  newRow.appendChild(quantityCell);
  newRow.appendChild(incrementCell);
  newRow.appendChild(decrementCell);
  newRow.appendChild(deleteCell);

  // Append the new row to the cart items table body
  document.getElementById('carttable').appendChild(newRow);

  // Update the total price in the shopping cart
  updateCartTotals();
}

// Function to create quantity buttons
function createQuantityButton(text, clickHandler) {
  var cell = document.createElement('td');
  var button = document.createElement('button');
  button.textContent = text;
  button.addEventListener('click', clickHandler);
  cell.appendChild(button);
  return cell;
}

// Function to update cart totals
function updateCartTotals() {
  var items = document.querySelectorAll('#carttable tr');
  var total = 0;
  var itemCount = 0;

  items.forEach(function(item) {
      var price = parseFloat(item.cells[2].textContent.replace('$', ''));
      var quantity = parseInt(item.cells[3].textContent);
      total += price * quantity;
      itemCount += quantity;
  });

  document.getElementById('itemsquantity').textContent = itemCount;
  document.getElementById('total').textContent = total.toFixed(2);
}

// Function to delete a cart item
function deleteCartItem(row) {
  row.remove();
  updateCartTotals();
}

// Function to empty the cart
function emptyCart() {
  document.getElementById('carttable').innerHTML = '';
  updateCartTotals();
}

// end of filter gallery
// Script.js

// FOR API
document.addEventListener("DOMContentLoaded", function () {
  const APIKEY = "65b241fe7307821d4f6708b6";
  //getContacts();
  //document.getElementById("update-contact-container").style.display = "none";
  //document.getElementById("add-update-msg").style.display = "none";

  //[STEP 1]: Create our submit form listener
  document.getElementById("contact-submit").addEventListener("click", function (e) {
    // Prevent default action of the button 
    e.preventDefault();

    let userName = document.getElementById("user-Name").value;
    let userEmail = document.getElementById("user-Email").value;
    let userPwd = document.getElementById("user-Pwd").value;
    

    //[STEP 3]: Get form values when the user clicks on send
    // Adapted from restdb API
    let jsondata = {
      "user-Name": userName,
      "user-Email": userEmail,
      "user-Pwd": userPwd,
    };

    //[STEP 4]: Create our AJAX settings. Take note of API key
    let settings = {
      method: "POST", //[cher] we will use post to send info
      headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
      },
      body: JSON.stringify(jsondata),
      beforeSend: function () {
        //@TODO use loading bar instead
        // Disable our button or show loading bar
        document.getElementById("contact-submit").disabled = true;
        
      }
    }

    //[STEP 5]: Send our AJAX request over to the DB and print response of the RESTDB storage to console.
    fetch("https://fedassg2-9396.restdb.io/rest/accountdetails", settings)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        document.getElementById("contact-submit").disabled = false;
        //@TODO update frontend UI 
       //document.getElementById("add-update-msg").style.display = "block";
        //setTimeout(function () {
          //document.getElementById("add-update-msg").style.display = "none";
        //}, 3000);
        // Update our table 
        //getContacts();
        // Clear our form using the form ID and triggering its reset feature
        document.getElementById("add-contact-form").reset();
      });
  });

});
 
 