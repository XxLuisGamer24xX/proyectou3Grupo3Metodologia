document.addEventListener("DOMContentLoaded", function() {
    var loginForm = document.querySelector(".login-form");
    var usernameField = document.getElementById("username");
    var passwordField = document.getElementById("password");
    var emailField = document.getElementById("email");
    var registerButton = document.getElementById("register-button"); // Agregado
  
    loginForm.addEventListener("submit", function(event) {
      event.preventDefault();
  
      var usernameValue = usernameField.value;
      var passwordValue = passwordField.value;
      var emailValue = emailField.value;
  
      if (usernameValue === "" || passwordValue === "" || emailValue === "") {
        alert("Por favor, completa todos los campos.");
      } else {
        if (isValidEmail(emailValue)) {
          alert("Registro exitoso");
          window.location.href = "./index.html"; // Redirige a la página "login.html"
        } else {
          alert("Correo electrónico inválido. Ingresa un correo válido.");
        }
      }
    });
  
    // Redirige a registro.html cuando se hace clic en el botón "Registro"
    registerButton.addEventListener("click", function() {
      window.location.href = "./registro.html"; // Redirige a la página "registro.html"
    });
  
    function isValidEmail(email) {
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    }
  });
  