let palabras = [];
const regex = /^[A-ZÑ]$/;
const mensajeError = document.querySelector(".error-message");

let arrayInputs = document.querySelectorAll(".inputs input");
let botonEnviar = document.getElementById("enviar");
let divResultado = document.getElementById("result");
let botonLimpiar = document.getElementById("reset");

async function cargarDiccionario() {
  const res = await fetch("./assets/resources/palabras.txt");
  const txt = await res.text();
  palabras = txt
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  console.log("📘 Diccionario cargado:", palabras.length, "palabras");
}

function normalizar(s) {
  return s
    .toUpperCase()
    .replace(/[ÁÀÂÄ]/g, "A")
    .replace(/[ÉÈÊË]/g, "E")
    .replace(/[ÍÌÎÏ]/g, "I")
    .replace(/[ÓÒÔÖ]/g, "O")
    .replace(/[ÚÙÛÜ]/g, "U");
}

function contarLetras(cad) {
  const cnt = {};
  for (const ch of cad) {
    if (ch === "\r" || ch === "\n" || ch === " ") continue;
    cnt[ch] = (cnt[ch] || 0) + 1;
  }
  return cnt;
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

function enviarLetras() {
  if (!palabras.length) {
    console.warn("Diccionario no cargado todavía.");
    mensajeError.textContent =
      "El diccionario aún se está cargando. Intenta de nuevo.";
    return;
  }

  let todosValidos = true;
  let letrasRaw = "";

  arrayInputs.forEach((input) => {
    const esValido = validarInput(input);
    letrasRaw += input.value.toUpperCase();
    if (!esValido) todosValidos = false;
  });

  if (!todosValidos) {
    mensajeError.textContent =
      "Hay valores inválidos (solo letras A–Z y Ñ) o campos vacíos";
    return;
  }

  mensajeError.textContent = "";

  const letrasDisponibles = normalizar(letrasRaw);
  const disponibles = contarLetras(letrasDisponibles);

  const resultado = palabras.filter((w) => {
    const wTrim = w.trim();
    if (!wTrim) return false;
    const wNorm = normalizar(wTrim);
    if (wNorm.length < 5) return false;
    const cuenta = contarLetras(wNorm);
    return Object.entries(cuenta).every(
      ([letra, cantidad]) =>
        disponibles[letra] && cantidad <= disponibles[letra]
    );
  });

  agregarResultado(resultado, letrasDisponibles);
}

function agregarResultado(resultado, letrasDisponibles) {
  divResultado.innerHTML = "";

  const titulo = document.createElement("h2");
  titulo.textContent = `Resultados para letras: ${letrasDisponibles}`;
  divResultado.appendChild(titulo);

  if (resultado.length === 0) {
    const sinRes = document.createElement("p");
    sinRes.textContent = "No se encontraron palabras con esas letras.";
    divResultado.appendChild(sinRes);
    return;
  }

  let ultimaCantidadLetras = 0;

  resultado.sort((a, b) => b.length - a.length);

  resultado.forEach((palabra) => {
    let cantidadLetrasActuales = palabra.length;

    if (ultimaCantidadLetras !== cantidadLetrasActuales) {
      const tituloCantidadLetras = document.createElement("h3");
      tituloCantidadLetras.textContent = `Palabras con ${palabra.length} letras:`;
      tituloCantidadLetras.style.marginTop = "1em";
      divResultado.appendChild(tituloCantidadLetras);
    }

    ultimaCantidadLetras = cantidadLetrasActuales;

    const parrafoPalabra = document.createElement("p");
    parrafoPalabra.textContent = palabra.toUpperCase();
    parrafoPalabra.classList.add("palabra");
    divResultado.appendChild(parrafoPalabra);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function limpiarInputs() {
  arrayInputs.forEach((input) => (input.value = ""));
  divResultado.innerHTML = "";
}

cargarDiccionario();
botonEnviar.addEventListener("click", enviarLetras);
botonLimpiar.addEventListener("click", limpiarInputs);
arrayInputs.forEach((input, index) => {
  input.addEventListener("input", function () {
    if (this.value.length === 1) {
      if (index < arrayInputs.length - 1) {
        arrayInputs[index + 1].focus();
      }
    }
  });
});
