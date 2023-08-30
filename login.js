document.addEventListener("DOMContentLoaded", function() {
    var loginForm = document.querySelector(".login-form");
    var usernameField = document.getElementById("username");
    var passwordField = document.getElementById("password");
    var registerButton = document.querySelector(".register-button"); // Modificado
  
    loginForm.addEventListener("submit", function(event) {
      event.preventDefault();
  
      var usernameValue = usernameField.value;
      var passwordValue = passwordField.value;
  
      if (usernameValue === "" || passwordValue === "") {
        alert("Por favor, completa todos los campos.");
      } else {
        if (usernameValue === "luis" && passwordValue === "123") {
          alert("Inicio de sesión exitoso");
          window.location.href = "./graficos.html"; // Redirige a la página "graficos.html"
        } else {
          alert("Credenciales incorrectas. Intenta de nuevo.");
        }
      }
    });
  
    // Redirige a registro.html cuando se hace clic en el botón "Registro"
    registerButton.addEventListener("click", function() {
      window.location.href = "./registro.html"; // Redirige a la página "registro.html"
    });
  });
  