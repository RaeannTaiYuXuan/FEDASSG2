document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "65b241fe7307821d4f6708b6";


   
    
  
    document.getElementById("contact-submit").addEventListener("click", function (e) {
        e.preventDefault();
  
        let userName = document.getElementById("user-Name").value;
        let userEmail = document.getElementById("user-Email").value;
        let userPwd = document.getElementById("user-Pwd").value;
        let userPoints = 100; //by default because theu sign up 
       
  
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
  
        fetch("https://fedassg2-9396.restdb.io/rest/accountdetails", settings)
            .then(response => response.json())
            .then(data => {
                console.log(data);
  
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
    const APIKEY = "65b241fe7307821d4f6708b6";

    function saveToken(token, userEmail,userName,userPoints) {
        // Save the token and email to localStorage
        localStorage.setItem('userToken', token);
        localStorage.setItem('user-Email', userEmail);
        localStorage.setItem('user-Name',userName);
        localStorage.setItem('user-Points',userPoints);
    }
    

    function isLoggedIn() {
        // Check if the user is logged in based on the presence of a token
        return localStorage.getItem('isLoggedIn') === 'true' && localStorage.getItem('userToken');
    }

    // Function to update the navbar based on login state
    function updateNavbarBasedOnLogin() {
        const isLoggedInUser = isLoggedIn();
        const loginButton = document.getElementById('navbar-login');
        const signupButton = document.getElementById('navbar-signup');
        const gamesMenuItem = document.getElementById('gamestoearn');
        const accountIcon = document.getElementById('navbar-account');

        if (!isLoggedInUser) {
            // Hide login and signup buttons
            if (loginButton) loginButton.style.display = 'block';
            if (signupButton) signupButton.style.display = 'block';

            loginButton.style.padding = "3px";
            signupButton.style.padding = "3px";

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
            navbar.style.margin = "10px";
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
        localStorage.removeItem('userToken');
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

            let url = `https://fedassg2-9396.restdb.io/rest/accountdetails?q={"user-Name": "${encodeURIComponent(userName)}", "user-Pwd": "${encodeURIComponent(userPwd)}"}`;

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

                    // Assuming the server responds with a token upon successful login
                    const token = data[0].token;
                    const userEmail = data[0]["user-Email"];
                    const userName = data[0]["user-Name"];
                    const userPoints = data[0]['user-Points']; // Change this according to your server response

                    saveToken(token, userEmail,userName,userPoints);
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('user-Name', userName);
                    localStorage.setItem('user-Email',userEmail);
                    localStorage.setItem('user-Points',userPoints);


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

