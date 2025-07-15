import React, { useEffect, useState } from "react";
import "../componentes/styles/Ventas.css";
import MenuInteractivo from "../componentes/MenuInteractivo";
import FormularioVenta from "../componentes/FormularioVenta";
import Modal from "../componentes/Modal";
import { useVentas } from "../hooks/useVentas";
import Loading from "../componentes/Loading";
import Notificacion from "../componentes/Notificacion";

const Ventas = () => {
  const { ventas, loading, error, crearVenta, actualizarVenta, eliminarVenta } =
    useVentas();
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 10;
  const [colapsado, setColapsado] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [notificacion, setNotificacion] = useState({
    mostrar: false,
    mensaje: "",
    tipo: "",
  });
  const [ventaParaEditar, setVentaParaEditar] = useState(null);

  // Filtrar ventas
  const ventasFiltradas = ventas.filter((venta) => {
    const coincideCategoria = filtroCategoria
      ? venta.categoria === filtroCategoria
      : true;
    const coincideBusqueda =
      venta.producto?.toLowerCase().includes(busqueda.toLowerCase()) ||
      venta.categoria?.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  // Paginación
  const indexUltimoElemento = paginaActual * elementosPorPagina;
  const indexPrimerElemento = indexUltimoElemento - elementosPorPagina;
  const ventasPaginadas = ventasFiltradas.slice(
    indexPrimerElemento,
    indexUltimoElemento
  );
  const totalPaginas = Math.ceil(ventasFiltradas.length / elementosPorPagina);

  const cambiarPagina = (numero) => {
    setPaginaActual(numero);
  };

  // Manejar nueva venta
  const handleAgregarVenta = () => {
    setVentaParaEditar(null); // Asegurar que no hay venta para editar
    setMostrarModal(true);
  };

  // Manejar creación de venta
  const handleVentaCreada = async (ventaData) => {
    try {
      await crearVenta(ventaData);
      setMostrarModal(false);
      setNotificacion({
        mostrar: true,
        mensaje: "Venta registrada exitosamente",
        tipo: "exito",
      });
      // Las ventas se actualizarán automáticamente gracias al hook
    } catch (error) {
      setNotificacion({
        mostrar: true,
        mensaje: error.message || "Error al registrar la venta",
        tipo: "error",
      });
    }
  };

  // Manejar edición de venta
  const handleEditarVenta = (venta) => {
    console.log("📝 Iniciando edición de venta:", venta);
    setVentaParaEditar(venta);
    setMostrarModal(true);
    console.log("📝 Modal abierto para edición");
  };

  // Manejar actualización de venta
  const handleVentaActualizada = async (id, ventaData) => {
    try {
      await actualizarVenta(id, ventaData);
      setMostrarModal(false);
      setVentaParaEditar(null);
      setNotificacion({
        mostrar: true,
        mensaje: "Venta actualizada exitosamente",
        tipo: "exito",
      });
    } catch (error) {
      setNotificacion({
        mostrar: true,
        mensaje: error.message || "Error al actualizar la venta",
        tipo: "error",
      });
    }
  };

  // Manejar eliminación de venta
  const handleEliminarVenta = async (id) => {
    console.log("🗑️ Intentando eliminar venta con ID:", id);

    if (window.confirm("¿Estás seguro de que quieres eliminar esta venta?")) {
      console.log("🗑️ Usuario confirmó eliminación");
      try {
        await eliminarVenta(id);
        console.log("🗑️ Venta eliminada exitosamente");
        setNotificacion({
          mostrar: true,
          mensaje: "Venta eliminada exitosamente",
          tipo: "exito",
        });
      } catch (error) {
        console.error("❌ Error al eliminar venta:", error);
        setNotificacion({
          mostrar: true,
          mensaje: error.message || "Error al eliminar la venta",
          tipo: "error",
        });
      }
    } else {
      console.log("🗑️ Usuario canceló la eliminación");
    }
  };

  // Cerrar modal
  const handleCerrarModal = () => {
    setMostrarModal(false);
    setVentaParaEditar(null);
  };

  // Formatear precio
  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(precio);
  };

  // Formatear fecha
  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Obtener categorías únicas
  const categoriasUnicas = [...new Set(ventas.map((venta) => venta.categoria))];

  // Mostrar errores
  useEffect(() => {
    if (error) {
      setNotificacion({
        mostrar: true,
        mensaje: error,
        tipo: "error",
      });
    }
  }, [error]);

  return (
    <>
      <MenuInteractivo colapsado={colapsado} setColapsado={setColapsado} />
      <div
        className={`main-content ${colapsado ? "colapsado" : "no-colapsado"}`}
      >
        <div className="ventas-container">
          <h1 className="ventas-titulo">Historial de Ventas</h1>

          <div className="acciones-superiores">
            <div className="acciones-grupo-input-filtro">
              <input
                type="text"
                placeholder="Buscar producto o categoría..."
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
                {categoriasUnicas.map((categoria, index) => (
                  <option key={index} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
            </div>
            <button className="boton-agregar" onClick={handleAgregarVenta}>
              Agregar Venta
            </button>
          </div>

          {loading ? (
            <Loading />
          ) : ventasFiltradas.length === 0 ? (
            <p>No hay ventas registradas.</p>
          ) : (
            <>
              <table className="tabla-ventas">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Cantidad vendida</th>
                    <th>Precio unitario</th>
                    <th>Total venta</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {ventasPaginadas.map((venta, index) => (
                    <tr key={venta.id || index}>
                      <td>{formatearFecha(venta.fecha)}</td>
                      <td>{venta.producto}</td>
                      <td>{venta.categoria}</td>
                      <td>{venta.cantidad_vendida_producto}</td>
                      <td>{formatearPrecio(venta.producto_precio)}</td>
                      <td>{formatearPrecio(venta.cantidad_vendida_precio)}</td>
                      <td>
                        <div className="botones-fila">
                          <button
                            onClick={() => handleEditarVenta(venta)}
                            className="boton-editar"
                            title="Editar venta"
                          >
                            <i className="fa-solid fa-pencil"></i>
                          </button>
                          <button
                            onClick={() => handleEliminarVenta(venta.id)}
                            className="boton-eliminar"
                            title="Eliminar venta"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {totalPaginas > 1 && (
                <div className="paginacion">
                  {[...Array(totalPaginas)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => cambiarPagina(index + 1)}
                      className={
                        paginaActual === index + 1 ? "pagina-activa" : ""
                      }
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Modal para crear nueva venta */}
          {mostrarModal && (
            <Modal
              isOpen={mostrarModal}
              onClose={handleCerrarModal}
              showFooter={false}
              maxWidth="700px"
            >
              <FormularioVenta
                onVentaCreada={handleVentaCreada}
                onCerrar={handleCerrarModal}
                ventaParaEditar={ventaParaEditar}
                onVentaActualizada={handleVentaActualizada}
              />
            </Modal>
          )}

          {/* Notificaciones */}
          {notificacion.mostrar && (
            <Notificacion
              mensaje={notificacion.mensaje}
              tipo={notificacion.tipo}
              onClose={() =>
                setNotificacion({ mostrar: false, mensaje: "", tipo: "" })
              }
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Ventas;
