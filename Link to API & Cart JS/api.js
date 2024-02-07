// When the DOM content is loaded, execute the following code
document.addEventListener("DOMContentLoaded", function () {
    // Define API key for making requests
    const APIKEY = "65bd0b1da15ddef163c3c658";

    // Event listener for form submission when creating a new account
    document.getElementById("contact-submit").addEventListener("click", function (e) {
        e.preventDefault(); // Prevent default form submission behavior

        // Get user input values
        let userName = document.getElementById("user-Name").value;
        let userEmail = document.getElementById("user-Email").value;
        let userPwd = document.getElementById("user-Pwd").value;
        let userPoints = 100; // Set default points for new users

        // Prepare data to be sent as JSON
        let jsondata = {
            "user-Name": userName,
            "user-Email": userEmail,
            "user-Pwd": userPwd,
            "user-Points": userPoints,
        };

        // Store user email in local storage for future use
        localStorage.setItem('user-Email', userEmail);

        // Define settings for the fetch request
        let settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsondata),
            // Disable submit button before sending the request
            beforeSend: function () {
                document.getElementById("contact-submit").disabled = true;
            }
        };

        // Send POST request to create a new user account
        fetch("https://saturdayuser-aae1.restdb.io/rest/customerdetails", settings)
            .then(response => response.json())
            .then(data => {
                console.log(data);

                // Update user points if available
                const userPoints = data.points !== undefined ? data.points : 0;

                // Store user details in local storage
                localStorage.setItem("userName", userName);
                localStorage.setItem("userEmail", userEmail);
                localStorage.setItem("userPwd", userPwd);
                localStorage.setItem("userPoints", userPoints);

                // Display success message and redirect to login page
                alert("Account created successfully! You will be redirected to the login page.");
                window.location.href = 'login.html'; // Redirect to login page
            })
            .catch(error => {
                console.error('Error creating account:', error);
                alert("Failed to create account. Please try again.");
            })
            .finally(() => {
                // Enable submit button and reset form after request completes
                document.getElementById("contact-submit").disabled = false;
                document.getElementById("add-contact-form").reset();
            });
    });
});

// Functionality related to login
document.addEventListener("DOMContentLoaded", function () {
    // Define API key for making requests
    const APIKEY = "65bd0b1da15ddef163c3c658";

    // Function to check if the user is logged in
    function isLoggedIn() {
        return localStorage.getItem('isLoggedIn') === 'true';
    }

    // Function to update navbar based on login state
    function updateNavbarBasedOnLogin() {
        const isLoggedInUser = isLoggedIn();
        const loginButton = document.getElementById('navbar-login'); //to get the values from the html page
        const signupButton = document.getElementById('navbar-signup');
        const gamesMenuItem = document.getElementById('gamestoearn');
        const accountIcon = document.getElementById('navbar-account');

        loginButton.style.padding = "3px";
        signupButton.style.padding = "3px";

        if (!isLoggedInUser) { //this to show or hide the button all when user is not loggedIn
            // Show login and signup buttons
            if (loginButton) loginButton.style.display = 'block';
            if (signupButton) signupButton.style.display = 'block';

            // Hide games menu item and account icon
            if (gamesMenuItem) gamesMenuItem.style.display = 'none';
            if (accountIcon) accountIcon.style.display = 'none';
        }

        else {  //when we loggedin thn will show or hide the icons and all
            // Hide login and signup buttons
            if (loginButton) loginButton.style.display = 'none';
            if (signupButton) signupButton.style.display = 'none';

            // Show games menu item and account icon
            if (gamesMenuItem) gamesMenuItem.style.display = 'block';
            if (accountIcon) accountIcon.style.display = 'block';

            gamesMenuItem.style.padding = "3px";
            accountIcon.style.padding = "3px";
            let navbar = document.getElementsByClassName("menu-links");
        }
    }

    // Function to update username on account page
    function updateUsernameOnAccountPage() {
        const username = localStorage.getItem('user-Name');
        const email = localStorage.getItem('user-Email');
        const userNameElement = document.querySelector('.user-name');
        const userEmailElement = document.querySelector('.user-email');

        if (userNameElement) {
            userNameElement.textContent = username || 'Guest';
        }

        if (userEmailElement) {
            userEmailElement.textContent = email || 'email address';
        }
    }

    updateUsernameOnAccountPage(); // Update username on account page

    // Optional: Logout functionality
    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            // Clear user data from local storage
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('user-Name');
            localStorage.removeItem('user-Email');
            localStorage.removeItem('user-Points');
            localStorage.removeItem('voucherCount');
            localStorage.removeItem('lastPlayTimestamp');
            localStorage.removeItem('dailySpins');

            localStorage.removeItem('startOverCount');
            localStorage.removeItem('lastStartOver');


            updateNavbarBasedOnLogin(); // Update navbar to reflect logged out state
            window.location.href = 'index.html'; // Redirect to home page or login page
        });
    }

    updateNavbarBasedOnLogin(); // Update navbar based on login state

    // Login functionality
    const loginButton = document.getElementById("login-submit");
    if (loginButton) {
        loginButton.addEventListener("click", function (e) {
            e.preventDefault(); // Prevent default form submission behavior

            // Get user input values
            let userName = document.getElementById("user-Name").value;
            let userPwd = document.getElementById("user-Pwd").value;

            // Disable login button
            document.getElementById("login-submit").disabled = true;

            // Construct URL for fetching user data based on username and password
            let url = `https://saturdayuser-aae1.restdb.io/rest/customerdetails?q={"user-Name": "${encodeURIComponent(userName)}", "user-Pwd": "${encodeURIComponent(userPwd)}"}`;

            // Send GET request to validate user credentials
            fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": APIKEY,
                    "Cache-Control": "no-cache"
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);

                    if (data.length > 0) {
                        // Successful login
                        alert("Login successful! Redirecting to the home page.");

                        // Store user data in local storage
                        const user = data[0];
                        localStorage.setItem('isLoggedIn', 'true');
                        localStorage.setItem('user-Name', user["user-Name"]);
                        localStorage.setItem('user-Email', user["user-Email"]);
                        localStorage.setItem("userPoints", user.userPoints);
                        localStorage.setItem("user-Pwd", user["user-Pwd"]);

                        updateUsernameOnAccountPage(); // Update username on account page

                        window.location.href = 'index.html'; // Redirect to home page
                    } else {
                        // Login failed
                        alert("Invalid username or password. Please try again.");
                    }
                })
                .catch(error => {
                    console.error('Error during login:', error);
                    alert("Failed to login. Please try again.");
                })
                .finally(() => {
                    // Enable login button and reset form after request completes
                    document.getElementById("login-submit").disabled = false;
                    document.getElementById("login-form").reset();
                });
        });
    }
});
