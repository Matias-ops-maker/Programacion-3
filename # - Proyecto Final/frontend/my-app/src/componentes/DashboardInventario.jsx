import React from "react";
import "./styles/DashboardInventario.css";

const DashboardInventario = ({
  ultimosProductos = [],
  productosMasVendidos = [],
  productosSinStock = [],
  totalProductos = 0,
  loading = false,
}) => {
  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
    }).format(precio);
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="dashboard-inventario">
        <div className="dashboard-loading">
          <i className="fa-solid fa-spinner fa-spin"></i>
          <span>Cargando dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-inventario">
      {/* Resumen general */}
      <div className="dashboard-resumen">
        <div className="resumen-card">
          <div className="resumen-icono productos-total">
            <i className="fa-solid fa-boxes-stacked"></i>
          </div>
          <div className="resumen-contenido">
            <h3>{totalProductos}</h3>
            <p>Total Productos</p>
          </div>
        </div>

        <div className="resumen-card">
          <div className="resumen-icono productos-vendidos">
            <i className="fa-solid fa-chart-line"></i>
          </div>
          <div className="resumen-contenido">
            <h3>{productosMasVendidos.length}</h3>
            <p>Productos Top</p>
          </div>
        </div>

        <div className="resumen-card">
          <div className="resumen-icono productos-sin-stock">
            <i className="fa-solid fa-triangle-exclamation"></i>
          </div>
          <div className="resumen-contenido">
            <h3>{productosSinStock.length}</h3>
            <p>Sin Stock</p>
          </div>
        </div>
      </div>

      {/* Widgets */}
      <div className="dashboard-widgets">
        {/* Últimos productos */}
        <div className="widget">
          <div className="widget-header">
            <h3>
              <i className="fa-solid fa-clock"></i>
              Últimos Productos Agregados
            </h3>
          </div>
          <div className="widget-content">
            {ultimosProductos.length === 0 ? (
              <p className="widget-vacio">No hay productos recientes</p>
            ) : (
              <ul className="productos-lista">
                {ultimosProductos.map((producto) => (
                  <li key={producto.id} className="producto-item">
                    <div className="producto-info">
                      <span className="producto-nombre">{producto.nombre}</span>
                      <span className="producto-categoria">
                        {producto.categoria || "Sin categoría"}
                      </span>
                    </div>
                    <div className="producto-detalles">
                      <span className="producto-precio">
                        {formatearPrecio(producto.precio)}
                      </span>
                      <span className="producto-fecha">
                        {formatearFecha(producto.fecha_de_ingreso)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Productos más vendidos */}
        <div className="widget">
          <div className="widget-header">
            <h3>
              <i className="fa-solid fa-fire"></i>
              Productos Más Vendidos
            </h3>
          </div>
          <div className="widget-content">
            {productosMasVendidos.length === 0 ? (
              <p className="widget-vacio">No hay datos de ventas</p>
            ) : (
              <ul className="productos-lista">
                {productosMasVendidos.map((producto, index) => (
                  <li key={producto.id} className="producto-item ranking">
                    <div className="ranking-numero">#{index + 1}</div>
                    <div className="producto-info">
                      <span className="producto-nombre">{producto.nombre}</span>
                      <span className="producto-categoria">
                        {producto.categoria || "Sin categoría"}
                      </span>
                    </div>
                    <div className="producto-detalles">
                      <span className="producto-vendido">
                        {producto.total_vendido} vendidos
                      </span>
                      <span className="producto-precio">
                        {formatearPrecio(producto.precio)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Productos sin stock */}
        <div className="widget alerta">
          <div className="widget-header">
            <h3>
              <i className="fa-solid fa-triangle-exclamation"></i>
              Productos Sin Stock
            </h3>
          </div>
          <div className="widget-content">
            {productosSinStock.length === 0 ? (
              <p className="widget-vacio exito">
                ¡Todos los productos tienen stock!
              </p>
            ) : (
              <ul className="productos-lista">
                {productosSinStock.map((producto) => (
                  <li key={producto.id} className="producto-item sin-stock">
                    <div className="producto-info">
                      <span className="producto-nombre">{producto.nombre}</span>
                      <span className="producto-categoria">
                        {producto.categoria || "Sin categoría"}
                      </span>
                    </div>
                    <div className="producto-detalles">
                      <span className="producto-precio">
                        {formatearPrecio(producto.precio)}
                      </span>
                      <span className="stock-cero">Stock: 0</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardInventario;
