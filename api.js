document.addEventListener("DOMContentLoaded", function () {
  const APIKEY = "65b241fe7307821d4f6708b6";

  document.getElementById("contact-submit").addEventListener("click", function (e) {
      e.preventDefault();

      let userName = document.getElementById("user-Name").value;
      let userEmail = document.getElementById("user-Email").value;
      let userPwd = document.getElementById("user-Pwd").value;

      let jsondata = {
          "user-Name": userName,
          "user-Email": userEmail,
          "user-Pwd": userPwd,
      };

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
