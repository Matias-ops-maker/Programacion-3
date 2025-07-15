import React, { useEffect, useState } from "react";
import "../componentes/styles/Inventario.css"; 
import MenuInteractivo from "../componentes/MenuInteractivo";

const Inventario = () => {
  const [productos, setProductos] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 12;
  const [colapsado, setColapsado] = useState(false);

  useEffect(() => {
    const simulacionProductos = [
      { id: 1, nombre: "Mouse Gamer RGB", categoria: "Accesorios", cantidad: 24, precio: 50, fechaIngreso: "2024-05-01" },
      { id: 2, nombre: "Teclado Mecánico", categoria: "Accesorios", cantidad: 3, precio: 100, fechaIngreso: "2024-05-02" },
      { id: 3, nombre: "Monitor 24” Full HD", categoria: "Monitores", cantidad: 0, precio: 200, fechaIngreso: "2024-04-15" },
      { id: 4, nombre: "Parlantes Bluetooth", categoria: null, cantidad: 12, precio: 150, fechaIngreso: "2024-04-18" },
      { id: 5, nombre: "Gabinete Gamer", categoria: "Accesorios", cantidad: 8, precio: 80, fechaIngreso: "2024-04-20" },
      { id: 6, nombre: "Procesador Intel Core i7", categoria: "Componentes", cantidad: 5, precio: 300, fechaIngreso: "2024-05-03" },
      { id: 7, nombre: "Memoria RAM 16GB", categoria: "Componentes", cantidad: 10, precio: 120, fechaIngreso: "2024-05-04" },
      { id: 8, nombre: "Disco Duro 1TB", categoria: "Componentes", cantidad: 2, precio: 150, fechaIngreso: "2024-04-25" },
      { id: 9, nombre: "Tarjeta de Video NVIDIA", categoria: "Componentes", cantidad: 0, precio: 400, fechaIngreso: "2024-05-01" },
      { id: 10, nombre: "Tarjeta de Video AMD", categoria: "Componentes", cantidad: 5, precio: 350, fechaIngreso: "2024-04-30" },
      { id: 11, nombre: "Tarjeta de Video Intel", categoria: "Componentes", cantidad: 3, precio: 300, fechaIngreso: "2024-04-28" },
      { id: 12, nombre: "Gabinete Gamer", categoria: "Accesorios", cantidad: 8, precio: 80, fechaIngreso: "2024-05-05" },
      { id: 13, nombre: "Gabinete Gamer", categoria: "Accesorios", cantidad: 8, precio: 80, fechaIngreso: "2024-05-06" },
    ];
    setProductos(simulacionProductos);
  }, []);

  const productosFiltrados = productos.filter((producto) => {
    const coincideCategoria = filtroCategoria ? (producto.categoria || "General") === filtroCategoria : true;
    const coincideBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  const indexUltimoElemento = paginaActual * elementosPorPagina;
  const indexPrimerElemento = indexUltimoElemento - elementosPorPagina;
  const productosPaginados = productosFiltrados.slice(indexPrimerElemento, indexUltimoElemento);
  const totalPaginas = Math.ceil(productosFiltrados.length / elementosPorPagina);

  const cambiarPagina = (numero) => {
    setPaginaActual(numero);
  };

  const handleEliminar = (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este producto?")) {
      const nuevosProductos = productos.filter((prod) => prod.id !== id);
      setProductos(nuevosProductos);
    }
  };
  const categoriasUnicas = [...new Set(productos.map(p => p.categoria || "General"))];

  return (
    <>
      <MenuInteractivo colapsado={colapsado} setColapsado={setColapsado}/>
      <div className={`main-content ${colapsado ? "colapsado" : "no-colapsado"}`}> 
        <h1 className="ventas-titulo">Inventario de Productos</h1>

        <div className="acciones-superiores">
          <div className="acciones-grupo-input-filtro">
            <input
              type="text"
              placeholder="Buscar producto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="input-buscador"
            />
            <select
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
              className="select-filtro"
            >
              <option value="">Todas las categorías</option>
              {categoriasUnicas.map((cat, i) => (
                <option key={i} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <button className="boton-agregar" >Agregar Producto</button>
        </div>

        {productosFiltrados.length === 0 ? (
          <p>No hay productos registrados.</p>
        ) : (
          <>
            <table className="tabla-ventas">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Estado</th>
                  <th>Fecha de ingreso</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productosPaginados.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.id}</td>
                    <td>{producto.nombre}</td>
                    <td>{producto.categoria || "General"}</td>
                    <td>{producto.cantidad}</td>
                    <td>${producto.precio}</td>
                    <td style={{ color: producto.cantidad < 5 ? "#c0392b" : "#27ae60" }}>
                      {producto.cantidad < 5 ? "Bajo stock" : "OK"}
                    </td>
                    <td>{producto.fechaIngreso}</td>
                    <td className="botones-fila">
                      <button
                        onClick={() => alert("Editar " + producto.nombre)}
                        className="boton-editar"
                        title="Editar"
                      >
                        <i className="fa-solid fa-pencil"></i>
                      </button>
                      <button
                        onClick={() => handleEliminar(producto.id)}
                        className="boton-eliminar"
                        title="Eliminar"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="paginacion">
              {[...Array(totalPaginas)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => cambiarPagina(i + 1)}
                  className={paginaActual === i + 1 ? "pagina-activa" : ""}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Inventario;
