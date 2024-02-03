document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "65bd0b1da15ddef163c3c658";


   
    
  
    document.getElementById("contact-submit").addEventListener("click", function (e) {
        e.preventDefault();
  
        let userName = document.getElementById("user-Name").value;
        let userEmail = document.getElementById("user-Email").value;
        let userPwd = document.getElementById("user-Pwd").value;
        let userPoints = 0; //by default because theu sign up 
       
  
        let jsondata = {
            "user-Name": userName,
            "user-Email": userEmail,
            "user-Pwd": userPwd,
            "user-Points": userPoints,
            
        };
  
  
        localStorage.setItem('user-Email', userEmail);
        
  
        let settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsondata),
            beforeSend: function () {
                document.getElementById("contact-submit").disabled = true;
            }
        };
  
        fetch("https://saturdayuser-aae1.restdb.io/rest/customerdetails", settings)
            .then(response => response.json())
            .then(data => {
                console.log(data);

                const userPoints = data.points !== undefined ? data.points : 0;
                localStorage.setItem("userName", userName);
                localStorage.setItem("userEmail", userEmail);
                localStorage.setItem("userPwd", userPwd);
                localStorage.setItem("userPoints", userPoints);

  
                // Display alert and redirect to login page
                alert("Account created successfully! You will be redirected to the login page.");
                window.location.href = 'login.html'; // Replace 'login.html' with your actual login page
            })
            .catch(error => {
                console.error('Error creating account:', error);
                alert("Failed to create account. Please try again.");
            })
            .finally(() => {
                document.getElementById("contact-submit").disabled = false;
                document.getElementById("add-contact-form").reset();
            });
    });
  });
  
  // for login
  document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "65bd0b1da15ddef163c3c658";

    function isLoggedIn() {
        // Check if the user is logged in based on the presence of a token
        return localStorage.getItem('isLoggedIn') === 'true';
    }

    // Function to update the navbar based on login state
    function updateNavbarBasedOnLogin() {
        const isLoggedInUser = isLoggedIn();
        const loginButton = document.getElementById('navbar-login');
        const signupButton = document.getElementById('navbar-signup');
        const gamesMenuItem = document.getElementById('gamestoearn');
        const accountIcon = document.getElementById('navbar-account');

        loginButton.style.padding = "3px";
        signupButton.style.padding = "3px";

        if (!isLoggedInUser) {
            // Hide login and signup buttons
            if (loginButton) loginButton.style.display = 'block';
            if (signupButton) signupButton.style.display = 'block';

            // Show the games menu item and account icon
            if (gamesMenuItem) gamesMenuItem.style.display = 'none';
            if (accountIcon) accountIcon.style.display = 'none';
        } else {
            // Show login and signup buttons
            if (loginButton) loginButton.style.display = 'none';
            if (signupButton) signupButton.style.display = 'none';

            // Hide the games menu item and account icon
            if (gamesMenuItem) gamesMenuItem.style.display = 'block';
            if (accountIcon) accountIcon.style.display = 'block';

            gamesMenuItem.style.padding = "3px";
            accountIcon.style.padding = "3px";
            let navbar = document.getElementsByClassName("menu-links");

        }
    }

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

    updateUsernameOnAccountPage();

    // Optional: Logout functionality
    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('user-Name');
            localStorage.removeItem('user-Email');
            
            updateNavbarBasedOnLogin(); // Update navbar to reflect logged out state
            window.location.href = 'index.html'; // Redirect to home page or login page
        });
    }

    updateNavbarBasedOnLogin();

    // Login functionality
    const loginButton = document.getElementById("login-submit");
    if (loginButton) {
        loginButton.addEventListener("click", function (e) {
            e.preventDefault();

            let userName = document.getElementById("user-Name").value;
            let userPwd = document.getElementById("user-Pwd").value;

            // Disable the login button
            document.getElementById("login-submit").disabled = true;

            let url = `https://saturdayuser-aae1.restdb.io/rest/customerdetails?q={"user-Name": "${encodeURIComponent(userName)}", "user-Pwd": "${encodeURIComponent(userPwd)}"}`;

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

                const user = data[0];
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('user-Name', user["user-Name"]);
                console.log('Set user name:', localStorage.getItem('user-Name'));
                localStorage.setItem('user-Email', user["user-Email"]);
                localStorage.setItem("userPoints", user.userPoints); 
                localStorage.setItem("user-Pwd",user["user-Pwd"]);


                    updateUsernameOnAccountPage();

                    window.location.href = 'index.html';
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
                document.getElementById("login-submit").disabled = false;
                document.getElementById("login-form").reset();
            });
        });
    }
    

});




