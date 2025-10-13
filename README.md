
# Cifras y Letras

> Pequeña aplicación web estática para practicar manipulación del DOM en JavaScript: introduce letras en inputs y muestra/valida el resultado.

Descripción
-----------

Proyecto demo y educativo que muestra una interfaz muy sencilla para introducir letras (un carácter por campo) y validar/mostrar el resultado mediante JavaScript. Está pensado para compartirse públicamente como un demo alojado en GitHub Pages y para servir como ejemplo de buenas prácticas: estructura clara, README informativo y despliegue rápido.

Estructura del proyecto
-----------------------

```
index.html
assets/
	css/
		style.css
	js/
		script.js
	resources/
		palabras.txt
README.md
```

Archivos importantes
- `index.html`: página principal. Contiene los inputs, botones y el contenedor de resultado.
- `assets/css/style.css`: estilos de la página.
- `assets/js/script.js`: lógica del frontend (captura de eventos, validación y renderizado de resultados).
- `assets/resources/palabras.txt`: lista de palabras que el script puede utilizar (según implementación).

Demo público
-----------

La idea es exponer este proyecto como un demo en GitHub Pages para que cualquiera pueda ver y probar la aplicación desde el navegador sin instalar nada.

![Demo screenshot](./assets/resources/demo-screenshot.png)

Requisitos
----------

- Navegador moderno (Chrome, Edge, Firefox, Safari).
- No necesita servidor ni dependencias para abrir la página; sin embargo, servirla con un servidor estático evita problemas con rutas relativas.

Servir localmente (PowerShell en Windows)
---------------------------------------

Abre PowerShell en la carpeta del proyecto y usa una de las siguientes opciones:

1) Usando Python 3 (muy recomendado si lo tienes instalado):

```powershell
# Inicia un servidor en http://localhost:8000
python -m http.server 8000
```

2) Usando Node.js con `http-server` (si tienes Node.js):

```powershell
# Si no tienes http-server instalado:
npm install -g http-server
# Inicia el servidor en http://localhost:8080
http-server -p 8080
```

3) Opción rápida con PowerShell/.NET (si `dotnet` está instalado):

```powershell
# Instala y ejecuta dotnet-serve (si no está instalado)
dotnet tool install --global dotnet-serve -v q; dotnet-serve -p 5000
```

Después de ejecutar cualquiera de los comandos, abre la URL indicada en tu navegador.

Uso
---

1. Abre la página (`index.html` o la URL del servidor local).
2. Introduce una letra por input (o ajusta según la UX del proyecto).
3. Haz clic en "Enviar" para que el script valide y muestre el resultado en el contenedor con id `result`.
4. Haz clic en "Limpiar" para vaciar los inputs.


Contribuir
----------

1. Fork del repositorio.
2. Crea una rama con tu cambio: `git checkout -b feat-mi-cambio`.
3. Haz commits claros y abre un Pull Request describiendo lo añadido o corregido.
