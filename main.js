const alfabeto = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
const input = document.querySelector(".encryptor__input");
const result = document.querySelector(".encryptor__output");
const range = document.querySelector("#encryptor__range");
const formulario = document.querySelector("#encryptor__form");
const btnCopy = document.querySelector(".btn-copy");

// Actualizar el número del desplazamiento dinámicamente
range.addEventListener("input", () => {
  let output = range.nextElementSibling;
  output.value = range.value;
});

shifMessage = () => {
  const wordArray = [...input.value.toUpperCase()];
  printChar(0, wordArray);
};

function printChar(currentIndex, wordArray) {
  if (wordArray.length === 0) {
    btnCopy.classList.remove("btn-copy--active");
    return;
  }
  if (currentIndex === wordArray.length) {
    toggleCopyIconOnHover();
    btnCopy.classList.add("btn-copy--active");
    return;
  }

  input.value = input.value.substring(1);
  const span = document.createElement("span");
  result.appendChild(span);

  animationChar(span).then(() => {
    const charSinCodificar = wordArray[currentIndex];
    const charCodificada =
      alfabeto[
        (alfabeto.indexOf(charSinCodificar) + parseInt(range.value)) %
          alfabeto.length
      ];
    // Si el carácter está en el alfabeto, lo cifra, si no, lo deja igual
    span.innerHTML = alfabeto.includes(charSinCodificar)
      ? charCodificada
      : charSinCodificar;
    printChar(currentIndex + 1, wordArray);
  });
}
// Simulación de animación antes de mostrar la letra cifrada
function animationChar(span) {
  let cambiosDeLetras = 0;
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      span.innerHTML = alfabeto[Math.floor(Math.random() * alfabeto.length)];
      cambiosDeLetras++;
      if (cambiosDeLetras === 3) {
        clearInterval(interval);
        resolve();
      }
    }, 10);
  });
}
// Iniciar encriptación al enviar el formulario
function startEncryptor(e) {
  e.preventDefault();
  result.innerHTML = "";
  shifMessage();
}

formulario.addEventListener("submit", startEncryptor);

btnCopy.addEventListener("click", () => {
  const icon = btnCopy.children[0];
  if (icon.classList.contains("bx-copy")) {
    icon.classList.remove("bx-copy");
    icon.classList.add("bx-check");
  }
  copyText();
  isTouch();
});
// Copiar texto al portapapeles
function copyText() {
  const text = result.textContent;
  navigator.clipboard.writeText(text);
}
// Cambiar icono al hacer clic en copiar
function toggleCopyIconOnHover() {
  const icon = btnCopy.children[0];
  icon.classList.replace("bx-check", "bx-copy");
}
// Restablecer icono al pasar el mouse
btnCopy.addEventListener("mouseenter", toggleCopyIconOnHover);

function isTouch() {
  if (navigator.maxTouchPoints) {
    setTimeout(toggleCopyIconOnHover, 2000);
  }
}
