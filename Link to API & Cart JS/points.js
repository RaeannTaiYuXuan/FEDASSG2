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

     // Hide shopping cart and checkout button
     document.getElementById('shopping-cart').style.display = 'none';
     document.getElementById('checkout').style.display = 'none';
 
     // Show Lottie animation
     document.getElementById('hiddencart').style.display = 'block';
     

     



 
     // Play Lottie animation
     var lottiePlayer = document.querySelector('dotlottie-player');
     lottiePlayer.play();
 

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

function displayUserPoints() {
    var userPointsDisplay = document.getElementsByClassName('stat-number')[0];
    if (userPointsDisplay) {
        var points = localStorage.getItem("user-Points") || '100';
        userPointsDisplay.textContent = points;
    } else {
        console.error('User points display element not found.');
    }
}






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




