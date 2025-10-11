let arrayInputs;
let botonEnviar = document.getElementById("enviar");

function enviarLetras() {
  arrayInputs = document.querySelectorAll(".inputs input");

  arrayInputs.forEach((input, index) => {
    console.log(`Input ${index + 1}:`, input.value);
  });
}

botonEnviar.addEventListener("click",enviarLetras);
