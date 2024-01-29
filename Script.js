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




// this is for the shopping cart thingy
// shoppingcart.js

document.addEventListener('DOMContentLoaded', function () {
  loadCartState();
});

function loadCartState() {
  var items = getCartItems();
  items.forEach(function (item) {
    renderCartItem(item);
  });
  updateCartTotals();
}

function renderCartItem(item) {
  var newRow = document.createElement('tr');
  var imageCell = document.createElement('td');
  var imageElement = document.createElement('img');
  imageElement.src = item.image;
  imageElement.alt = item.name;
  imageElement.style.width = '50px'; // Adjust the image size as needed
  imageCell.appendChild(imageElement);

  var nameCell = document.createElement('td');
  nameCell.textContent = item.name;

  var priceCell = document.createElement('td');
  priceCell.textContent = '$' + item.price.toFixed(2);

  var quantityCell = document.createElement('td');
  quantityCell.textContent = item.quantity;

  var incrementCell = createQuantityButton('+', function () {
    item.quantity++;
    quantityCell.textContent = item.quantity;
    updateCartTotals();
  });

  var decrementCell = createQuantityButton('-', function () {
    if (item.quantity > 1) {
      item.quantity--;
      quantityCell.textContent = item.quantity;
      updateCartTotals();
    }
  });

  var deleteCell = document.createElement('td');
  var deleteButton = document.createElement('button');
  deleteButton.textContent = 'Remove';
  deleteButton.addEventListener('click', function () {
    deleteCartItem(newRow);
  });
  deleteCell.appendChild(deleteButton);

  newRow.appendChild(imageCell);
  newRow.appendChild(nameCell);
  newRow.appendChild(priceCell);
  newRow.appendChild(quantityCell);
  newRow.appendChild(incrementCell);
  newRow.appendChild(decrementCell);
  newRow.appendChild(deleteCell);

  document.getElementById('carttable').appendChild(newRow);
}

function updateCartTotals() {
  var items = document.querySelectorAll('#carttable tr');
  var total = 0;
  var itemCount = 0;

  items.forEach(function (item) {
    var price = parseFloat(item.cells[2].textContent.replace('$', ''));
    var quantity = parseInt(item.cells[3].textContent);
    total += price * quantity;
    itemCount += quantity;
  });

  document.getElementById('itemsquantity').textContent = itemCount;
  document.getElementById('total').textContent = total.toFixed(2);
}

function createQuantityButton(text, clickHandler) {
  var cell = document.createElement('td');
  var button = document.createElement('button');
  button.textContent = text;
  button.addEventListener('click', clickHandler);
  cell.appendChild(button);
  return cell;
}

function deleteCartItem(row) {
  var itemName = row.cells[1].textContent; // Assuming the name is in the second cell
  removeFromLocalStorage(itemName);

  // Remove the row from the table
  row.remove();

  // Update cart totals after removing the item
  updateCartTotals();
}

function getCartItems() {
  var cartItems = localStorage.getItem('cart');
  return cartItems ? JSON.parse(cartItems) : [];
}

function removeFromLocalStorage(itemName) {
  // Retrieve existing cart items from localStorage
  var cartItems = localStorage.getItem('cart');
  var items = cartItems ? JSON.parse(cartItems) : [];

  // Find the index of the item to remove
  var index = items.findIndex(function (item) {
    return item.name === itemName;
  });

  // If the item is found, remove it from the array
  if (index !== -1) {
    items.splice(index, 1);

    // Save the updated items to localStorage
    localStorage.setItem('cart', JSON.stringify(items));
  }
}

function addToCart(name, price, image) {
  var item = { name: name, price: price, image: image, quantity: 1 };

  // Retrieve existing cart items from localStorage
  var cartItems = localStorage.getItem('cart');
  var items = cartItems ? JSON.parse(cartItems) : [];

  // Check if the item is already in the cart
  var existingItem = items.find(function (existingItem) {
      return existingItem.name === item.name;
  });

  if (existingItem) {
      // If the item is already in the cart, just increment its quantity
      existingItem.quantity++;
  } else {
      // If the item is not in the cart, add it to the items array
      items.push(item);
  }

  // Save the updated items to localStorage
  localStorage.setItem('cart', JSON.stringify(items));
}

document.getElementById('checkout').addEventListener('click', function () {
  // Get the cart items from local storage
  var cartItems = getCartItems();

  // Check if the cart is not empty
  if (cartItems.length > 0) {
    alert("Log in Now to get 100 points ")

    var totalCost = calculateTotalCost(cartItems);
    alert('Total Cost:', totalCost);

    // Optionally, clear the cart after checkout
    clearCart();
  } else {
    // Display a message to the user that the cart is empty or handle the checkout of an empty cart
    alert('The cart is empty. Cannot proceed with checkout.');
  }
});

function calculateTotalCost(items) {
  // Calculate the total cost based on the items in the cart
  var total = 0;
  items.forEach(function (item) {
    total += item.price * item.quantity;
  });
  return total.toFixed(2);
}

function clearCart() {
  // Clear the cart in both the table and local storage
  localStorage.removeItem('cart');
  updateCartTable(); // Assuming you have a function to update the cart table visually
  updateCartTotals(); // Update cart totals after clearing the cart
}

// Assuming you have a function to update the cart table visually
function updateCartTable() {
  var cartTable = document.getElementById('carttable');
  // Remove all rows from the table
  while (cartTable.firstChild) {
    cartTable.removeChild(cartTable.firstChild);
  }

  // Reload the cart state after clearing the table
  loadCartState();
}





// ... (other functions remain unchanged)



// end of filter gallery
// Script.js

 


 