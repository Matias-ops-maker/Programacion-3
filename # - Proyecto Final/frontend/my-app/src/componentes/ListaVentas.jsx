import React, { useState, useEffect, useMemo } from "react";
import { useVentas } from "../hooks/useVentas";
import "../componentes/styles/ListaCategorias.css";
import Loading from "./Loading";
import Notificacion from "./Notificacion";

const ListaVentas = ({ onNuevaVenta }) => {
  const { ventas, loading, error } = useVentas();
  const [filtros, setFiltros] = useState({
    busqueda: "",
    fechaInicio: "",
    fechaFin: "",
    ordenPor: "fecha",
  });
  const [notificacion, setNotificacion] = useState({
    mostrar: false,
    mensaje: "",
    tipo: "",
  });

  // Filtrar y ordenar ventas
  const ventasFiltradas = useMemo(() => {
    let ventasParaFiltrar = [...ventas];

    // Filtro por búsqueda
    if (filtros.busqueda) {
      const busqueda = filtros.busqueda.toLowerCase();
      ventasParaFiltrar = ventasParaFiltrar.filter(
        (venta) =>
          venta.producto?.toLowerCase().includes(busqueda) ||
          venta.categoria?.toLowerCase().includes(busqueda)
      );
    }

    // Filtro por fecha
    if (filtros.fechaInicio) {
      const fechaInicio = new Date(filtros.fechaInicio);
      ventasParaFiltrar = ventasParaFiltrar.filter(
        (venta) => new Date(venta.fecha) >= fechaInicio
      );
    }

    if (filtros.fechaFin) {
      const fechaFin = new Date(filtros.fechaFin);
      fechaFin.setHours(23, 59, 59, 999); // Final del día
      ventasParaFiltrar = ventasParaFiltrar.filter(
        (venta) => new Date(venta.fecha) <= fechaFin
      );
    }

    // Ordenar
    ventasParaFiltrar.sort((a, b) => {
      switch (filtros.ordenPor) {
        case "fecha":
          return new Date(b.fecha) - new Date(a.fecha);
        case "producto":
          return a.producto.localeCompare(b.producto);
        case "categoria":
          return a.categoria.localeCompare(b.categoria);
        case "cantidad":
          return b.cantidad_vendida_producto - a.cantidad_vendida_producto;
        case "total":
          return b.cantidad_vendida_precio - a.cantidad_vendida_precio;
        default:
          return 0;
      }
    });

    return ventasParaFiltrar;
  }, [ventas, filtros]);

  // Calcular estadísticas
  const estadisticas = useMemo(() => {
    const totalVentas = ventasFiltradas.length;
    const totalIngresos = ventasFiltradas.reduce(
      (sum, venta) => sum + (venta.cantidad_vendida_precio || 0),
      0
    );
    const totalProductosVendidos = ventasFiltradas.reduce(
      (sum, venta) => sum + (venta.cantidad_vendida_producto || 0),
      0
    );

    return {
      totalVentas,
      totalIngresos,
      totalProductosVendidos,
    };
  }, [ventasFiltradas]);

  // Manejar cambios en filtros
  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Limpiar filtros
  const limpiarFiltros = () => {
    setFiltros({
      busqueda: "",
      fechaInicio: "",
      fechaFin: "",
      ordenPor: "fecha",
    });
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

  // Formatear precio
  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(precio);
  };

  useEffect(() => {
    if (error) {
      setNotificacion({
        mostrar: true,
        mensaje: error,
        tipo: "error",
      });
    }
  }, [error]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="lista-container">
      <div className="lista-header">
        <h2 className="lista-title">Gestión de Ventas</h2>
        <button onClick={onNuevaVenta} className="btn-nuevo">
          + Nueva Venta
        </button>
      </div>

      {/* Estadísticas */}
      <div className="estadisticas-grid">
        <div className="estadistica-card">
          <h3>Total Ventas</h3>
          <p className="estadistica-numero">{estadisticas.totalVentas}</p>
        </div>
        <div className="estadistica-card">
          <h3>Productos Vendidos</h3>
          <p className="estadistica-numero">
            {estadisticas.totalProductosVendidos}
          </p>
        </div>
        <div className="estadistica-card">
          <h3>Ingresos Totales</h3>
          <p className="estadistica-numero">
            {formatearPrecio(estadisticas.totalIngresos)}
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="filtros-container">
        <div className="filtros-grid">
          <div className="filtro-group">
            <label htmlFor="busqueda">Buscar:</label>
            <input
              type="text"
              id="busqueda"
              name="busqueda"
              value={filtros.busqueda}
              onChange={handleFiltroChange}
              placeholder="Buscar por producto o categoría..."
              className="filtro-input"
            />
          </div>

          <div className="filtro-group">
            <label htmlFor="fechaInicio">Fecha desde:</label>
            <input
              type="date"
              id="fechaInicio"
              name="fechaInicio"
              value={filtros.fechaInicio}
              onChange={handleFiltroChange}
              className="filtro-input"
            />
          </div>

          <div className="filtro-group">
            <label htmlFor="fechaFin">Fecha hasta:</label>
            <input
              type="date"
              id="fechaFin"
              name="fechaFin"
              value={filtros.fechaFin}
              onChange={handleFiltroChange}
              className="filtro-input"
            />
          </div>

          <div className="filtro-group">
            <label htmlFor="ordenPor">Ordenar por:</label>
            <select
              id="ordenPor"
              name="ordenPor"
              value={filtros.ordenPor}
              onChange={handleFiltroChange}
              className="filtro-input"
            >
              <option value="fecha">Fecha (más reciente)</option>
              <option value="producto">Producto (A-Z)</option>
              <option value="categoria">Categoría (A-Z)</option>
              <option value="cantidad">Cantidad vendida</option>
              <option value="total">Total de venta</option>
            </select>
          </div>

          <div className="filtro-group">
            <button onClick={limpiarFiltros} className="btn-limpiar">
              Limpiar Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Lista de ventas */}
      <div className="lista-content">
        {ventasFiltradas.length === 0 ? (
          <div className="empty-state">
            <p>No se encontraron ventas que coincidan con los filtros.</p>
          </div>
        ) : (
          <div className="tabla-container">
            <table className="tabla-ventas">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th>Cantidad</th>
                  <th>Precio Unit.</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {ventasFiltradas.map((venta, index) => (
                  <tr key={venta.id || index} className="tabla-fila">
                    <td className="fecha-cell">
                      {formatearFecha(venta.fecha)}
                    </td>
                    <td className="producto-cell">
                      <strong>{venta.producto}</strong>
                    </td>
                    <td className="categoria-cell">
                      <span className="categoria-tag">{venta.categoria}</span>
                    </td>
                    <td className="cantidad-cell">
                      {venta.cantidad_vendida_producto}
                    </td>
                    <td className="precio-cell">
                      {formatearPrecio(venta.producto_precio)}
                    </td>
                    <td className="total-cell">
                      <strong>
                        {formatearPrecio(venta.cantidad_vendida_precio)}
                      </strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

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
  );
};

export default ListaVentas;
