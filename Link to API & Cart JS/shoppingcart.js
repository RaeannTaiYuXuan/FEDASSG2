document.addEventListener('DOMContentLoaded', function () {
    loadCartState();
    displayUserPoints();

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

}


function displayUserPoints() {
    var userPointsDisplay = document.getElementsByClassName('stat-number')[0];
    if (userPointsDisplay) {
        var points = localStorage.getItem("user-Points") || '100';
        userPointsDisplay.textContent = points;
    } else {
        console.error('User points display element not found.');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    
    displayUserPoints();


});


// function to upload voucher when redeem 
// Add an event listener to the redemption links
document.getElementById('redemptionOptions').addEventListener('click', function (event) {
    event.preventDefault();
    var redeemLink = event.target;
    if (redeemLink.classList.contains('redeemVoucherLink')) {
        var pointsRequired = parseInt(redeemLink.getAttribute('data-points'));
        redeemVoucher(pointsRequired);
    }
});

// Function to redeem voucher
async function redeemVoucher(pointsRequired) {
    var userPoints = parseInt(localStorage.getItem("user-Points")) || 0;

    if (userPoints >= pointsRequired) {
        // Deduct points from the user's total
        var updatedPoints = userPoints - pointsRequired;
        localStorage.setItem('user-Points', updatedPoints);
        displayUserPoints(); // Update the points display on the page

        // Deduct points from the user-Points in the database
        var userName = localStorage.getItem('user-Name');
        try {
            await updateUserPoints(-pointsRequired, userName); // Use negative points to deduct
        } catch (error) {
            console.error('Error deducting points from the database:', error);
            openModal('There was an issue deducting points. Please try again.');
            return;
        }

        // Retrieve and update the voucher count from localStorage
        var voucherCount = parseInt(localStorage.getItem('voucherCount')) || 0;
        voucherCount++;
        localStorage.setItem('voucherCount', voucherCount);

        // Update the voucher count on the page
        document.getElementById('voucherContainer').textContent = voucherCount;

        openModal(`Voucher redeemed successfully!`);
    } else {
        openModal('Insufficient points to redeem this voucher.');
    }
}


// Modify your login logic to include the following code
var voucherCount = parseInt(localStorage.getItem('voucherCount')) || 0;
document.getElementById('voucherContainer').textContent = voucherCount;

