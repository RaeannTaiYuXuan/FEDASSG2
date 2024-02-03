document.addEventListener('DOMContentLoaded', function () {
    displayUserPoints();
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
    imageElement.style.width = '50px';
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
    var itemName = row.cells[1].textContent;
    removeFromLocalStorage(itemName);
    row.remove();
    updateCartTotals();
}

function getCartItems() {
    var cartItems = localStorage.getItem('cart');
    return cartItems ? JSON.parse(cartItems) : [];
}

function removeFromLocalStorage(itemName) {
    var cartItems = localStorage.getItem('cart');
    var items = cartItems ? JSON.parse(cartItems) : [];

    var index = items.findIndex(function (item) {
        return item.name === itemName;
    });

    if (index !== -1) {
        items.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(items));
    }
}

function addToCart(name, price, image) {
    var item = { name: name, price: price, image: image, quantity: 1 };
    var cartItems = localStorage.getItem('cart');
    var items = cartItems ? JSON.parse(cartItems) : [];

    var existingItem = items.find(function (existingItem) {
        return existingItem.name === item.name;
    });

    if (existingItem) {
        existingItem.quantity++;
    } else {
        items.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(items));
}



function redirect() {
    window.location.href = 'index.html';
}

function calculateTotalCost(items) {
    var total = 0;
    items.forEach(function (item) {
        total += item.price * item.quantity;
    });
    return total.toFixed(2);
}

function resetShoppingCart() {
    document.getElementById("carttable").innerHTML = "";
    document.getElementById("itemsquantity").innerText = "0";
    document.getElementById("total").innerText = "0";
}

function clearCart() {
    localStorage.removeItem('cart');
    updateCartTable();
    updateCartTotals();
}

function updateCartTable() {
    var cartTable = document.getElementById('carttable');
    while (cartTable.firstChild) {
        cartTable.removeChild(cartTable.firstChild);
    }
    loadCartState();
}


//start of checkout

function updatePointsInLocalStorage(points) {
    var currentPoints = parseInt(localStorage.getItem('user-Points') || '0');
    var newPointsTotal = currentPoints + points;
    localStorage.setItem('user-Points', newPointsTotal.toString());
}

function openModal(message) {
    var modal = document.getElementById('popupModal');
    var modalMessage = document.getElementById('modalMessage');
    modalMessage.textContent = message;
    modal.style.display = 'block';
}

function closeModal() {
    var modal = document.getElementById('popupModal');
    modal.style.display = 'none';
    redirect();
}


function displayUserPoints() {
    var userPointsDisplay = document.getElementsByClassName('stat-label');
    var points = localStorage.getItem('user-Points') || '0';
    userPointsDisplay.textContent = `${points}`;
}


//start of the api (hope it works)
// Checkout event listener
document.getElementById('checkout').addEventListener('click', async function () {
    var isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    var userName = localStorage.getItem('user-Name');
    var cartItems = getCartItems();

    if (!isLoggedIn || !userName) {
        openModal('Please log in before checking out.');
        return;
    }

    if (cartItems.length === 0) {
        openModal('The cart is empty. Add items before checking out.');
        return;
    }

    var totalCost = calculateTotalCost(cartItems);
    var pointsEarned = totalCost * 10; // $1 = 10 points

    try {
        await updateUserPoints(pointsEarned, userName);
        openModal(`You earned ${pointsEarned} points for this purchase!`);
        clearCart();
    } catch (error) {
        console.error('Error during checkout:', error);
        openModal('There was an issue during the checkout process. Please try again.');
    }
});

// Function to update user points in the database
async function updateUserPoints(pointsEarned, userName) {
    const userEmail = localStorage.getItem("user-Email");
    const userPwd = localStorage.getItem("user-Pwd");

    const APIKEY = "65bd0b1da15ddef163c3c658";
    const queryURL = `https://saturdayuser-aae1.restdb.io/rest/customerdetails?q={"user-Name": "${userName}"}`;

    const getUserResponse = await fetch(queryURL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": APIKEY
        }
    });

    const users = await getUserResponse.json();

    if (users.length > 0) {
        const user = users[0];
        const updatedPoints = (user['user-Points'] || 0) + pointsEarned;

        const updateURL = `https://saturdayuser-aae1.restdb.io/rest/customerdetails/${user._id}`;

        

        const updateResponse = await fetch(updateURL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY
            },
            body: JSON.stringify({
                "user-Name": userName,
                "user-Email": userEmail,
                "user-Pwd": userPwd,
                "user-Points": updatedPoints
            })
            
        });

        if (!updateResponse.ok) {
            throw new Error(`HTTP error! status: ${updateResponse.status}`);
        }

        const updatedUser = await updateResponse.json();
        console.log("Points updated:", updatedUser);

        // Update local storage
        localStorage.setItem('user-Points', updatedUser['user-Points']);
        displayUserPoints(); // Update the points display on the page
    } else {
        throw new Error('User not found.');
    }
}
