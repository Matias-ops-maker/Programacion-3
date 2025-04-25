const formulario = document.getElementById("formulario");
const tareaInput = document.getElementById("tareaInput");
const listaTareas = document.getElementById("listaTareas");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault(); //previene la accion por defecto

  const textoTarea = tareaInput.value.trim();
  if (textoTarea !== "") {
    const nuevaTarea = document.createElement("li");
    nuevaTarea.textContent = textoTarea;

    nuevaTarea.addEventListener("click", function () {
      nuevaTarea.classList.toggle("completado"); //asocia funcion de evento click al li para alternar la clase
      // nuevaTarea.classList.add("completado"); //asocia funcion de evento click al li sin alternar la clase
    });

    listaTareas.appendChild(nuevaTarea); //agrega la nueva tarea a la lista (li al ul)
    tareaInput.value = ""; //limpia el campo del input
  }
});
