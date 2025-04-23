// const arreglo = [{'texto':'sadasd'},{}];

// document.addEventListener('DOMContentLoaded', () => {
//     const headerTemplate = document.getElementById('header-template');
//     const header = document.getElementById('header');

//     const links=[
//         {}
//     ]

//     if (header && headerTemplate) {
//         const headerClone = headerTemplate.content.cloneNode(true);
//         header.appendChild(headerClone);
//     }
// })

document.addEventListener("DOMContentLoaded", () => {
  const headerTemplate = document.getElementById("header-template");
  const header = document.getElementById("header");

  const navLinks = [
    { href: "./pages/contacto.html", text: "Contacto" },
    { href: "./pages/galeria.html", text: "Galería" },
    { href: "./pages/servicios.html", text: "Servicios" },
  ];

  

  if (header && headerTemplate) {
    navLinks.forEach(linkData => {
    const headerClone = headerTemplate.content.cloneNode(true);
    headerClone.

    header.appendChild(headerClone);
    })
    
  }
});
