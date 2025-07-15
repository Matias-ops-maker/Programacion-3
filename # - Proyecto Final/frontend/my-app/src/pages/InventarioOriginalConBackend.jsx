import React, { useEffect, useState } from "react";
import "../componentes/styles/Inventario.css";
import MenuInteractivo from "../componentes/MenuInteractivo";
import useProductos from "../hooks/useProductos";

const Inventario = () => {
  const {
    productos: productosBackend,
    loading,
    error,
    eliminarProducto,
  } = useProductos();

  const [productos, setProductos] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 12;
  const [colapsado, setColapsado] = useState(false);

  // Actualizar productos locales cuando lleguen del backend
  useEffect(() => {
    if (productosBackend && productosBackend.length > 0) {
      // Mapear los datos del backend al formato esperado por la UI original
      const productosFormateados = productosBackend.map((producto) => ({
        id: producto.id,
        nombre: producto.nombre,
        categoria: producto.categoria,
        cantidad: producto.cantidad,
        precio: producto.precio,
        fechaIngreso: new Date(producto.fecha_de_ingreso)
          .toISOString()
          .split("T")[0],
      }));
      setProductos(productosFormateados);
    } else if (!loading && productosBackend) {
      // Si no está cargando y hay respuesta del backend (aunque sea array vacío)
      setProductos([]);
    }
  }, [productosBackend, loading]);

  const productosFiltrados = productos.filter((producto) => {
    const coincideCategoria = filtroCategoria
      ? (producto.categoria || "General") === filtroCategoria
      : true;
    const coincideBusqueda = producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  const indexUltimoElemento = paginaActual * elementosPorPagina;
  const indexPrimerElemento = indexUltimoElemento - elementosPorPagina;
  const productosPaginados = productosFiltrados.slice(
    indexPrimerElemento,
    indexUltimoElemento
  );
  const totalPaginas = Math.ceil(
    productosFiltrados.length / elementosPorPagina
  );

  const cambiarPagina = (numero) => {
    setPaginaActual(numero);
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este producto?")) {
      try {
        await eliminarProducto(id);
        // Los productos se actualizarán automáticamente por el hook
      } catch (error) {
        alert("Error al eliminar el producto: " + error.message);
      }
    }
  };

  const categoriasUnicas = [
    ...new Set(productos.map((p) => p.categoria || "General")),
  ];

  // Mostrar loading
  if (loading) {
    return (
      <>
        <MenuInteractivo colapsado={colapsado} setColapsado={setColapsado} />
        <div
          className={`main-content ${colapsado ? "colapsado" : "no-colapsado"}`}
        >
          <h1 className="ventas-titulo">Inventario de Productos</h1>
          <p>Cargando productos...</p>
        </div>
      </>
    );
  }

  // Mostrar error de conexión
  if (error) {
    return (
      <>
        <MenuInteractivo colapsado={colapsado} setColapsado={setColapsado} />
        <div
          className={`main-content ${colapsado ? "colapsado" : "no-colapsado"}`}
        >
          <h1 className="ventas-titulo">Inventario de Productos</h1>
          <p style={{ color: "#c0392b" }}>Error: {error}</p>
          <button onClick={() => window.location.reload()}>Reintentar</button>
        </div>
      </>
    );
  }

  return (
    <>
      <MenuInteractivo colapsado={colapsado} setColapsado={setColapsado} />
      <div
        className={`main-content ${colapsado ? "colapsado" : "no-colapsado"}`}
      >
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
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <button className="boton-agregar">Agregar Producto</button>
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
                    <td
                      style={{
                        color: producto.cantidad < 5 ? "#c0392b" : "#27ae60",
                      }}
                    >
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
