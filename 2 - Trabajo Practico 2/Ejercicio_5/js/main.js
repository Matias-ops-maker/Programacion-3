const formulario = document.getElementById("formulario");

const name = document.getElementById("name");
const email = document.getElementById("email");
const edad = document.getElementById("edad");

const errorName = document.getElementById("errorName");
const errorEmail = document.getElementById("errorEmail");
const errorEdad = document.getElementById("errorEdad");


const enviar = document.getElementById("enviar");

enviar.addEventListener("click", (e) => {
    e.preventDefault();

    const nameIngresado = name.value;
    const emailIngresado = email.value;
    const edadIngresada = edad.value;
    const emailCorrecto = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    errorName.textContent = "";
    errorEmail.textContent = "";
    errorEdad.textContent = "";

    if (nameIngresado == "") {
        errorName.textContent = "El nombre no puede estar vacío";
    } else if (emailIngresado == "" || !emailCorrecto.test(emailIngresado)) {
        errorEmail.textContent = "El email no puede estar vacío y tiene que ser valido";
    } else if (edadIngresada == "" || edadIngresada < 18) {
        errorEdad.textContent = "La edad no puede estar vacía y tiene que ser mayor a 18";
    } else {
        alert("Formulario enviado correctamente");
        formulario.reset();
    };
});