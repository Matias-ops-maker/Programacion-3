import React, { useState, useEffect } from "react";
import { useVentas } from "../hooks/useVentas";
import productoService from "../services/productoService";
import "../componentes/styles/DashboardVentas.css";
import Loading from "./Loading";
import Notificacion from "./Notificacion";

const DashboardVentas = () => {
  const { obtenerEstadisticas, obtenerUltimasVentas } = useVentas();
  const [estadisticas, setEstadisticas] = useState(null);
  const [ultimasVentas, setUltimasVentas] = useState([]);
  const [productosMasVendidos, setProductosMasVendidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notificacion, setNotificacion] = useState({
    mostrar: false,
    mensaje: "",
    tipo: "",
  });

  // Cargar datos del dashboard
  const cargarDatosDashboard = async () => {
    setLoading(true);
    try {
      const [estadisticasData, ultimasVentasData, productosMasVendidosData] =
        await Promise.all([
          obtenerEstadisticas(),
          obtenerUltimasVentas(),
          productoService.obtenerProductosMasVendidos(),
        ]);

      setEstadisticas(estadisticasData);
      setUltimasVentas(ultimasVentasData);
      setProductosMasVendidos(productosMasVendidosData);
    } catch (error) {
      console.error("Error al cargar datos del dashboard:", error);
      setNotificacion({
        mostrar: true,
        mensaje: "Error al cargar datos del dashboard",
        tipo: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatosDashboard();
  }, []);

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
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard de Ventas</h1>
        <button onClick={cargarDatosDashboard} className="btn-refresh">
          🔄 Actualizar
        </button>
      </div>

      {/* Tarjetas de estadísticas principales */}
      <div className="stats-grid">
        <div className="stat-card ventas">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Total de Ventas</h3>
            <p className="stat-number">{estadisticas?.totalVentas || 0}</p>
            <span className="stat-label">ventas realizadas</span>
          </div>
        </div>

        <div className="stat-card ingresos">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Ingresos Totales</h3>
            <p className="stat-number">
              {formatearPrecio(estadisticas?.totalIngresos || 0)}
            </p>
            <span className="stat-label">en ventas</span>
          </div>
        </div>

        <div className="stat-card hoy">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>Ventas de Hoy</h3>
            <p className="stat-number">{estadisticas?.ventasHoy || 0}</p>
            <span className="stat-label">ventas hoy</span>
          </div>
        </div>

        <div className="stat-card promedio">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3>Promedio por Venta</h3>
            <p className="stat-number">
              {estadisticas?.totalVentas > 0
                ? formatearPrecio(
                    estadisticas.totalIngresos / estadisticas.totalVentas
                  )
                : formatearPrecio(0)}
            </p>
            <span className="stat-label">promedio</span>
          </div>
        </div>
      </div>

      {/* Sección de contenido principal */}
      <div className="dashboard-content">
        {/* Últimas ventas */}
        <div className="dashboard-section">
          <h2 className="section-title">Últimas Ventas</h2>
          <div className="ultimas-ventas">
            {ultimasVentas.length === 0 ? (
              <div className="empty-state">
                <p>No hay ventas registradas</p>
              </div>
            ) : (
              <div className="ventas-list">
                {ultimasVentas.map((venta, index) => (
                  <div key={venta.id || index} className="venta-item">
                    <div className="venta-info">
                      <h4 className="venta-producto">{venta.producto}</h4>
                      <p className="venta-categoria">{venta.categoria}</p>
                      <div className="venta-detalles">
                        <span className="venta-cantidad">
                          Cantidad: {venta.cantidad_vendida_producto}
                        </span>
                        <span className="venta-fecha">
                          {formatearFecha(venta.fecha)}
                        </span>
                      </div>
                    </div>
                    <div className="venta-total">
                      {formatearPrecio(venta.cantidad_vendida_precio)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Productos más vendidos */}
        <div className="dashboard-section">
          <h2 className="section-title">Productos Más Vendidos</h2>
          <div className="productos-mas-vendidos">
            {productosMasVendidos.length === 0 ? (
              <div className="empty-state">
                <p>No hay datos de productos vendidos</p>
              </div>
            ) : (
              <div className="productos-list">
                {productosMasVendidos.slice(0, 5).map((producto, index) => (
                  <div key={producto.id || index} className="producto-item">
                    <div className="producto-position">#{index + 1}</div>
                    <div className="producto-info">
                      <h4 className="producto-nombre">{producto.nombre}</h4>
                      <p className="producto-categoria">{producto.categoria}</p>
                      <div className="producto-stats">
                        <span className="producto-stock">
                          Stock: {producto.cantidad}
                        </span>
                        <span className="producto-precio">
                          {formatearPrecio(producto.precio)}
                        </span>
                      </div>
                    </div>
                    <div className="producto-vendidos">
                      <span className="vendidos-numero">
                        {producto.total_vendido || 0}
                      </span>
                      <span className="vendidos-label">vendidos</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Gráfico de tendencia (placeholder) */}
      <div className="dashboard-section chart-section">
        <h2 className="section-title">Tendencia de Ventas</h2>
        <div className="chart-placeholder">
          <div className="chart-content">
            <p>📊 Gráfico de tendencias</p>
            <p>Próximamente se agregará un gráfico interactivo</p>
          </div>
        </div>
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

export default DashboardVentas;
