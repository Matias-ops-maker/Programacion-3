import React, { useState, useEffect } from "react";
import "../componentes/styles/Inventario.css"; 
import MenuInteractivo from "../componentes/MenuInteractivo";
import DashboardInventario from "../componentes/DashboardInventario";
import FormularioProducto from "../componentes/FormularioProducto";
import Notificacion from "../componentes/Notificacion";
import useProductos from "../hooks/useProductos";

const Inventario = () => {
  const {
    productos,
    loading,
    error,
    ultimosProductos,
    productosMasVendidos,
    productosSinStock,
    categorias,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    cargarProductos,
    setError
  } = useProductos();

  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 12;
  const [colapsado, setColapsado] = useState(false);
  
  // Estados para modales y formularios
  const [modalFormulario, setModalFormulario] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [loadingAccion, setLoadingAccion] = useState(false);
  
  // Estados para notificaciones
  const [notificacion, setNotificacion] = useState({
    visible: false,
    tipo: '',
    mensaje: ''
  });

  // Estado para mostrar/ocultar dashboard
  const [mostrarDashboard, setMostrarDashboard] = useState(true);

  // Mostrar notificación
  const mostrarNotificacion = (tipo, mensaje) => {
    setNotificacion({
      visible: true,
      tipo,
      mensaje
    });
  };

  // Cerrar notificación
  const cerrarNotificacion = () => {
    setNotificacion(prev => ({
      ...prev,
      visible: false
    }));
  };

  // Filtrar productos
  const productosFiltrados = productos.filter((producto) => {
    const coincideCategoria = filtroCategoria 
      ? (producto.categoria === filtroCategoria)
      : true;
    
    const coincideEstado = filtroEstado 
      ? (producto.estado === filtroEstado)
      : true;
    
    const coincideBusqueda = producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    
    return coincideCategoria && coincideEstado && coincideBusqueda;
  });

  // Paginación
  const indexUltimoElemento = paginaActual * elementosPorPagina;
  const indexPrimerElemento = indexUltimoElemento - elementosPorPagina;
  const productosPaginados = productosFiltrados.slice(indexPrimerElemento, indexUltimoElemento);
  const totalPaginas = Math.ceil(productosFiltrados.length / elementosPorPagina);

  const cambiarPagina = (numero) => {
    setPaginaActual(numero);
  };

  // Obtener categorías únicas para el filtro
  const categoriasUnicas = [...new Set(productos.map(p => p.categoria).filter(Boolean))];

  // Abrir modal para agregar producto
  const abrirModalAgregar = () => {
    setProductoEditando(null);
    setModalFormulario(true);
  };

  // Abrir modal para editar producto
  const abrirModalEditar = (producto) => {
    setProductoEditando(producto);
    setModalFormulario(true);
  };

  // Cerrar modal
  const cerrarModal = () => {
    setModalFormulario(false);
    setProductoEditando(null);
  };

  // Manejar envío del formulario
  const manejarEnvioFormulario = async (datosProducto) => {
    setLoadingAccion(true);
    try {
      if (productoEditando) {
        await actualizarProducto(productoEditando.id, datosProducto);
        mostrarNotificacion('success', 'Producto actualizado exitosamente');
      } else {
        await crearProducto(datosProducto);
        mostrarNotificacion('success', 'Producto creado exitosamente');
      }
      cerrarModal();
    } catch (error) {
      mostrarNotificacion('error', error.message || 'Error al guardar el producto');
    } finally {
      setLoadingAccion(false);
    }
  };

  // Manejar eliminación
  const manejarEliminar = async (id, nombre) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar "${nombre}"?`)) {
      try {
        await eliminarProducto(id);
        mostrarNotificacion('success', 'Producto eliminado exitosamente');
      } catch (error) {
        mostrarNotificacion('error', error.message || 'Error al eliminar el producto');
      }
    }
  };

  // Formatear fecha
  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  // Formatear precio
  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(precio);
  };

  // Obtener clase de estado del stock
  const obtenerClaseStock = (cantidad) => {
    if (cantidad === 0) return 'sin-stock';
    if (cantidad < 5) return 'bajo-stock';
    return 'stock-ok';
  };

  // Obtener texto del estado del stock
  const obtenerTextoStock = (cantidad) => {
    if (cantidad === 0) return 'Sin stock';
    if (cantidad < 5) return 'Bajo stock';
    return 'Disponible';
  };

  // Resetear página al cambiar filtros
  useEffect(() => {
    setPaginaActual(1);
  }, [filtroCategoria, filtroEstado, busqueda]);

  // Mostrar error si hay alguno
  useEffect(() => {
    if (error) {
      mostrarNotificacion('error', error);
      setError(null);
    }
  }, [error, setError]);

  return (
    <>
      <MenuInteractivo colapsado={colapsado} setColapsado={setColapsado}/>
      <div className={`main-content ${colapsado ? "colapsado" : "no-colapsado"}`}> 
        <div className="inventario-header">
          <h1 className="ventas-titulo">Inventario de Productos</h1>
          <button 
            className="boton-toggle-dashboard"
            onClick={() => setMostrarDashboard(!mostrarDashboard)}
          >
            <i className={`fa-solid ${mostrarDashboard ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            {mostrarDashboard ? 'Ocultar Dashboard' : 'Mostrar Dashboard'}
          </button>
        </div>

        {/* Dashboard */}
        {mostrarDashboard && (
          <DashboardInventario
            ultimosProductos={ultimosProductos}
            productosMasVendidos={productosMasVendidos}
            productosSinStock={productosSinStock}
            totalProductos={productos.length}
            loading={loading}
          />
        )}

        {/* Controles y filtros */}
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
              {categoriasUnicas.map((categoria, i) => (
                <option key={i} value={categoria}>{categoria}</option>
              ))}
            </select>
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="select-filtro"
            >
              <option value="">Todos los estados</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>

          <button 
            className="boton-agregar"
            onClick={abrirModalAgregar}
            disabled={loading}
          >
            <i className="fa-solid fa-plus"></i>
            Agregar Producto
          </button>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="loading-container">
            <i className="fa-solid fa-spinner fa-spin"></i>
            <span>Cargando productos...</span>
          </div>
        )}

        {/* Tabla de productos */}
        {!loading && (
          <>
            {productosFiltrados.length === 0 ? (
              <div className="sin-productos">
                <i className="fa-solid fa-box-open"></i>
                <p>No se encontraron productos que coincidan con los filtros.</p>
                <button 
                  className="boton-agregar"
                  onClick={abrirModalAgregar}
                >
                  Agregar primer producto
                </button>
              </div>
            ) : (
              <>
                <div className="tabla-container">
                  <table className="tabla-ventas">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Stock</th>
                        <th>Precio</th>
                        <th>Estado</th>
                        <th>Estado Stock</th>
                        <th>Fecha Ingreso</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productosPaginados.map((producto) => (
                        <tr key={producto.id}>
                          <td>{producto.id}</td>
                          <td className="producto-nombre-cell">
                            {producto.nombre}
                          </td>
                          <td>{producto.categoria || "Sin categoría"}</td>
                          <td className="stock-cell">
                            <span className={`stock-badge ${obtenerClaseStock(producto.cantidad)}`}>
                              {producto.cantidad}
                            </span>
                          </td>
                          <td className="precio-cell">
                            {formatearPrecio(producto.precio)}
                          </td>
                          <td>
                            <span className={`estado-badge ${producto.estado}`}>
                              {producto.estado === 'activo' ? 'Activo' : 'Inactivo'}
                            </span>
                          </td>
                          <td>
                            <span className={`stock-estado ${obtenerClaseStock(producto.cantidad)}`}>
                              {obtenerTextoStock(producto.cantidad)}
                            </span>
                          </td>
                          <td>{formatearFecha(producto.fecha_de_ingreso)}</td>
                          <td className="botones-fila">
                            <button
                              onClick={() => abrirModalEditar(producto)}
                              className="boton-editar"
                              title="Editar"
                              disabled={loading}
                            >
                              <i className="fa-solid fa-pencil"></i>
                            </button>
                            <button
                              onClick={() => manejarEliminar(producto.id, producto.nombre)}
                              className="boton-eliminar"
                              title="Eliminar"
                              disabled={loading}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Paginación */}
                {totalPaginas > 1 && (
                  <div className="paginacion">
                    <button
                      onClick={() => cambiarPagina(paginaActual - 1)}
                      disabled={paginaActual === 1}
                      className="boton-paginacion"
                    >
                      <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    
                    {[...Array(totalPaginas)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => cambiarPagina(i + 1)}
                        className={`boton-paginacion ${paginaActual === i + 1 ? "pagina-activa" : ""}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => cambiarPagina(paginaActual + 1)}
                      disabled={paginaActual === totalPaginas}
                      className="boton-paginacion"
                    >
                      <i className="fa-solid fa-chevron-right"></i>
                    </button>
                  </div>
                )}

                {/* Info de paginación */}
                <div className="info-paginacion">
                  Mostrando {indexPrimerElemento + 1} - {Math.min(indexUltimoElemento, productosFiltrados.length)} de {productosFiltrados.length} productos
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Modal del formulario */}
      <FormularioProducto
        isOpen={modalFormulario}
        onClose={cerrarModal}
        onSubmit={manejarEnvioFormulario}
        producto={productoEditando}
        categorias={categorias}
        loading={loadingAccion}
      />

      {/* Notificaciones */}
      <Notificacion
        tipo={notificacion.tipo}
        mensaje={notificacion.mensaje}
        visible={notificacion.visible}
        onClose={cerrarNotificacion}
      />
    </>
  );
};

export default Inventario;
