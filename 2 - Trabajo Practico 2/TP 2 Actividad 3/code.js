const parrafos = document.getElementsByClassName('parrafo')
const btnResaltar = document.getElementById('btnResaltar')
const btnOcultar = document.getElementById('btnOcultar')

btnResaltar.addEventListener("click", () => {
    for (let p of parrafos) {
        p.classList.add('resaltado');
    }
})

btnOcultar.addEventListener("click", () => {
    for (let p of parrafos) {
        p.classList.toggle('oculto');
    }
})