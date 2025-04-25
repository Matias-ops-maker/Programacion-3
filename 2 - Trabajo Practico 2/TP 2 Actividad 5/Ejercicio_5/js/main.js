const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function(e) {
    e.preventDefault(); // Evitar que se envie el formulario con errores

    // selecciona el input por id y selecciona lo que ingreso sin el espacio (.trim())
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const edad = parseInt(document.getElementById("edad").value.trim());

    // selecciona los span por si hay un error
    const errorName = document.getElementById("name-error");
    const errorEmail = document.getElementById("email-error");
    const errorEdad = document.getElementById("edad-error");

    // borra los mensajes que quedaron anteriormente
    errorName.textContent = "";
    errorEmail.textContent = "";
    errorEdad.textContent = "";

    // variable para saber si los campos estan correctos
    let valido = true;

    // si el nombre esta vacio
    if (name === "") {
        errorName.textContent = "El nombre es obligatorio.";
        valido = false;
    }

    // una constante para corroborar luego si el mail es formato mail
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
        errorEmail.textContent = "El correo electrónico es obligatorio.";
        valido = false;
    } else if (!emailValido.test(email)) {
        errorEmail.textContent = "El correo electrónico no es válido.";
        valido = false;
    }

    // isNaN para verificar si es un numero y que sea mayor de 18 años
    if (isNaN(edad)) {
        errorEdad.textContent = "La edad debe estar en numeros y correcta";
        valido = false;
    } else if (edad <= 18) {
        errorEdad.textContent = "La edad debe ser mayor a 18";
        valido = false;
    }

    //si todo es valido genera una alerta y lo resetea al formulario
    if (valido) {
        // si esta todo correcto por consola se muestra el nombre, mail y edad
        console.log(`Nombre: ${name}, Correo: ${email}, Edad: ${edad}`);
        alert("Formulario enviado correctamente");
        formulario.reset();
    }
});