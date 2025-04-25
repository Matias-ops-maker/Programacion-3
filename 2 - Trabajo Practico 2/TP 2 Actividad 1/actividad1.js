// Seleccionar el título y cambiar su texto
const tituloPrincipal = document.getElementById("tituloPrincipal");
tituloPrincipal.textContent = "¡Título Modificado!";

// Seleccionar los párrafos y cambiar su color
const parrafos = document.getElementsByClassName("parrafo");
for (let parrafo of parrafos) {
    parrafo.style.color = "blue";
}

// Seleccionar los elementos <li> y agregar texto al final
const elementosLi = document.querySelectorAll("#contenedor ul li");
elementosLi.forEach((elemento, indice) => {
    elemento.textContent += ` - Ítem ${indice + 1}`;
});