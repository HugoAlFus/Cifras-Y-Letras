let palabras = [];
const regex = /^[A-ZÑ]$/;
const mensajeError = document.querySelector(".error-message");

let arrayInputs = document.querySelectorAll(".inputs input");
let botonEnviar = document.getElementById("enviar");

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
    if (wNorm.length <= 5) return false;
    const cuenta = contarLetras(wNorm);
    return Object.entries(cuenta).every(
      ([letra, cantidad]) =>
        disponibles[letra] && cantidad <= disponibles[letra]
    );
  });

  console.log(`Letras disponibles: ${letrasDisponibles}`);
  console.log(`Palabras posibles (>5 letras): ${resultado.length}`);
  console.log(resultado.slice(0, 200));
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

function contarLetras(cad) {
  const cnt = {};
  for (const ch of cad) {
    if (ch === "\r" || ch === "\n" || ch === " ") continue;
    cnt[ch] = (cnt[ch] || 0) + 1;
  }
  return cnt;
}

async function cargarDiccionario() {
  const res = await fetch("./assets/resources/palabras.txt");
  const txt = await res.text();
  palabras = txt
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  console.log("Diccionario cargado:", palabras.length, "palabras");
}

cargarDiccionario();

function normalizar(s) {
  // Normaliza Unicode y elimina marcas diacríticas (acentos)
  // Resultado en mayúsculas para comparar con tus inputs
  return s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "") // elimina diacríticos
    .toUpperCase();
}

botonEnviar.addEventListener("click", enviarLetras);
