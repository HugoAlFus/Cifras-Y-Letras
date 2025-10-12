const regex = /^[A-ZÑ]$/;
const mensajeError = document.querySelector(".error-message");

let arrayInputs = document.querySelectorAll(".inputs input");
let botonEnviar = document.getElementById("enviar");

function enviarLetras() {
  let todosValidos = true;

  arrayInputs.forEach((input) => {
    const esValido = validarInput(input);
    if (!esValido) todosValidos = false;
  });

  if (todosValidos) {
    console.log("✅ Todos los valores son correctos");
    mensajeError.textContent = "";
  } else {
    console.log("❌ Hay errores en algunos campos");
    mensajeError.textContent =
      "Hay valores inválidos (solo se admiten letras, acentos tampoco) o campos vacíos";
  }
}

function validarInput(input) {
  const valor = input.value.toUpperCase();
  input.value = valor;

  if (valor === "" || !regex.test(valor)) {
    input.classList.add("error");
    return false;
  } else {
    input.classList.remove("error");
    return true;
  }
}

botonEnviar.addEventListener("click", enviarLetras);
