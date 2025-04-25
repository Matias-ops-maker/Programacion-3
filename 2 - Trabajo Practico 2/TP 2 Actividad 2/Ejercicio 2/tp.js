//EJERCICIO 2
function agregar(){
    var contenidoagregado = document.getElementById('text').value;
    if(contenidoagregado.trim() !==""){//verifica que haya algo escrito
        var nuevoLI = document.createElement('li');
        nuevoLI.textContent = contenidoagregado + " ";
        var nuevoBoton = document.createElement('button');
        nuevoBoton.textContent = "Eliminar";
        nuevoBoton.onclick=function(){//Elimina el item
            nuevoLI.remove();
        };
        nuevoLI.appendChild(nuevoBoton);
        var lista = document.getElementById('lista');
        lista.appendChild(nuevoLI);
        document.getElementById('text').value="";
    }else{
        alert("No se ingreso ningun valor");
    }
}