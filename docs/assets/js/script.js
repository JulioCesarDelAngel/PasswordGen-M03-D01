// Código de asignación
var generateBtn = document.querySelector("#generate");

// Escriba la contraseña en la entrada #password
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Agregar oyente de eventos para generar el botón
generateBtn.addEventListener("click", writePassword);
