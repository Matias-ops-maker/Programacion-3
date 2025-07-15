import React, { useEffect, useState } from "react";
import "../componentes/styles/InventarioNuevo.css";
import MenuInteractivo from "../componentes/MenuInteractivo";
import FormularioProducto from "../componentes/FormularioProducto";
import Notificacion from "../componentes/Notificacion";
import useProductos from "../hooks/useProductos";

const Inventario = () => {
  const {
    productos: productosBackend,
    loading,
    error,
    eliminarProducto,
    crearProducto,
    actualizarProducto,
    categorias,
  } = useProductos();

  const [productos, setProductos] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 12;
  const [colapsado, setColapsado] = useState(false);

  // Estados para modales y formularios
  const [modalFormularioOpen, setModalFormularioOpen] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [notificacion, setNotificacion] = useState(null);
  const [loadingForm, setLoadingForm] = useState(false);

  // Actualizar productos cuando lleguen del backend
  useEffect(() => {
    if (productosBackend && productosBackend.length > 0) {
      // Mapear los datos del backend al formato esperado
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
        mostrarNotificacion("Producto eliminado exitosamente", "success");
      } catch (error) {
        mostrarNotificacion(
          "Error al eliminar el producto: " + error.message,
          "error"
        );
      }
    }
  };

  // Funciones para el modal y formulario
  const abrirModalAgregar = () => {
    setProductoEditando(null);
    setModalFormularioOpen(true);
  };

  const abrirModalEditar = (producto) => {
    // Encontrar el ID de la categoría basándose en el nombre
    const categoriaEncontrada = categorias.find(
      (cat) => (cat.nombre || cat) === producto.categoria
    );

    const productoParaEditar = {
      ...producto,
      categoria_id: categoriaEncontrada
        ? categoriaEncontrada.id || categoriaEncontrada
        : "",
    };

    console.log("Producto original:", producto);
    console.log("Producto para editar:", productoParaEditar);
    console.log("Categorías disponibles:", categorias);

    setProductoEditando(productoParaEditar);
    setModalFormularioOpen(true);
  };

  const cerrarModal = () => {
    setModalFormularioOpen(false);
    setProductoEditando(null);
  };

  const manejarGuardarProducto = async (datosProducto) => {
    setLoadingForm(true);
    try {
      if (productoEditando) {
        // Actualizar producto existente
        await actualizarProducto(productoEditando.id, datosProducto);
        mostrarNotificacion("Producto actualizado exitosamente", "success");
      } else {
        // Crear nuevo producto
        await crearProducto(datosProducto);
        mostrarNotificacion("Producto creado exitosamente", "success");
      }
      cerrarModal();
    } catch (error) {
      mostrarNotificacion(
        "Error al guardar el producto: " + error.message,
        "error"
      );
    } finally {
      setLoadingForm(false);
    }
  };

  const mostrarNotificacion = (mensaje, tipo) => {
    setNotificacion({ mensaje, tipo });
    setTimeout(() => setNotificacion(null), 4000);
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
          <div className="inventario-container">
            <h1 className="ventas-titulo">Inventario de Productos</h1>
            <p>Cargando productos...</p>
          </div>
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
          <div className="inventario-container">
            <h1 className="ventas-titulo">Inventario de Productos</h1>
            <div
              style={{
                padding: "10px",
                backgroundColor: "#f8d7da",
                color: "#721c24",
                borderRadius: "5px",
                marginBottom: "20px",
              }}
            >
              Error: {error}
            </div>
            <button onClick={() => window.location.reload()}>Reintentar</button>
          </div>
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
        <div className="inventario-container">
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

            <button className="boton-agregar" onClick={abrirModalAgregar}>
              Agregar Producto
            </button>
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
                          onClick={() => abrirModalEditar(producto)}
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
                </tbody>{" "}
              </table>

              {totalPaginas > 1 && (
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
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal para agregar/editar producto */}
      <FormularioProducto
        isOpen={modalFormularioOpen}
        onClose={cerrarModal}
        onSubmit={manejarGuardarProducto}
        producto={productoEditando}
        categorias={categorias}
        loading={loadingForm}
      />

      {/* Notificación */}
      {notificacion && (
        <Notificacion
          mensaje={notificacion.mensaje}
          tipo={notificacion.tipo}
          visible={true}
          onClose={() => setNotificacion(null)}
        />
      )}
    </>
  );
};

export default Inventario;
