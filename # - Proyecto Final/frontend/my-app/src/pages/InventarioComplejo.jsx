import React, { useState, useEffect } from "react";
import "../componentes/styles/Inventario.css"; 
import MenuInteractivo from "../componentes/MenuInteractivo";
import FormularioProducto from "../componentes/FormularioProducto";
import Notificacion from "../componentes/Notificacion";
import useProductos from "../hooks/useProductos";

const Inventario = () => {
  const {
    productos,
    loading,
    error,
    categorias,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    setError
  } = useProductos();

  const [filtroCategoria, setFiltroCategoria] = useState("");
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

  // Filtrar productos (usando los estilos originales)
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

  // Categorías únicas (usando formato original)
  const categoriasUnicas = [...new Set(productos.map(p => p.categoria || "General"))];

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

  // Manejar eliminación (conexión backend pero conservar estilo original)
  const handleEliminar = async (id) => {
    const producto = productos.find(p => p.id === id);
    const nombreProducto = producto ? producto.nombre : 'este producto';
    
    if (window.confirm(`¿Seguro que quieres eliminar "${nombreProducto}"?`)) {
      try {
        await eliminarProducto(id);
        mostrarNotificacion('success', 'Producto eliminado exitosamente');
      } catch (error) {
        mostrarNotificacion('error', error.message || 'Error al eliminar el producto');
      }
    }
  };

  // Mostrar error solo para problemas reales de conexión/servidor
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

          <button 
            className="boton-agregar" 
            onClick={abrirModalAgregar}
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Agregar Producto'}
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#7f8c8d' }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '0.5rem' }}></i>
            Cargando productos...
          </div>
        ) : productos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#7f8c8d' }}>
            <i className="fa-solid fa-box-open" style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}></i>
            <h3 style={{ margin: '1rem 0', color: '#2c3e50' }}>No hay productos cargados</h3>
            <p style={{ marginBottom: '2rem' }}>Comienza agregando tu primer producto al inventario</p>
            <button 
              className="boton-agregar"
              onClick={abrirModalAgregar}
              style={{ fontSize: '1rem', padding: '12px 24px' }}
            >
              <i className="fa-solid fa-plus" style={{ marginRight: '0.5rem' }}></i>
              Agregar Primer Producto
            </button>
          </div>
        ) : productosFiltrados.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#7f8c8d' }}>
            <i className="fa-solid fa-search" style={{ fontSize: '2rem', marginBottom: '1rem', display: 'block' }}></i>
            <p>No se encontraron productos que coincidan con los filtros aplicados.</p>
            <button 
              style={{ background: 'none', border: 'none', color: '#3498db', textDecoration: 'underline', cursor: 'pointer', marginTop: '1rem' }}
              onClick={() => {
                setBusqueda('');
                setFiltroCategoria('');
              }}
            >
              Limpiar filtros
            </button>
          </div>
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
                    <td>{new Date(producto.fecha_de_ingreso || Date.now()).toLocaleDateString()}</td>
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
                        onClick={() => handleEliminar(producto.id)}
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
