import React from "react";
import { useCategoriasVendidas } from "../hooks/useCategorias";
import Loading from "./Loading";
import "./styles/TopCategorias.css";

const TopCategorias = () => {
  const { categoriasVendidas, loading, error, cargarCategoriasVendidas } =
    useCategoriasVendidas();

  if (loading) {
    return (
      <div className="top-categorias">
        <div className="top-categorias-header">
          <h3>🏆 Top 5 Categorías Más Vendidas</h3>
        </div>
        <Loading mensaje="Cargando estadísticas..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="top-categorias">
        <div className="top-categorias-header">
          <h3>🏆 Top 5 Categorías Más Vendidas</h3>
        </div>
        <div className="error-container">
          <p className="error-text">❌ {error}</p>
          <button
            onClick={cargarCategoriasVendidas}
            className="btn btn-primary"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!categoriasVendidas || categoriasVendidas.length === 0) {
    return (
      <div className="top-categorias">
        <div className="top-categorias-header">
          <h3>🏆 Top 5 Categorías Más Vendidas</h3>
        </div>
        <div className="sin-datos">
          <p>📊 No hay datos de ventas disponibles</p>
          <button
            onClick={cargarCategoriasVendidas}
            className="btn btn-outline"
          >
            Actualizar
          </button>
        </div>
      </div>
    );
  }

  const maxVentas = Math.max(
    ...categoriasVendidas.map((cat) => cat.cantidad_categoria_vendida || 0)
  );

  return (
    <div className="top-categorias">
      <div className="top-categorias-header">
        <h3>🏆 Top 5 Categorías Más Vendidas</h3>
        <button
          onClick={cargarCategoriasVendidas}
          className="btn-refresh"
          title="Actualizar"
        >
          🔄
        </button>
      </div>

      <div className="categorias-ranking">
        {categoriasVendidas.map((categoria, index) => {
          const porcentaje =
            maxVentas > 0
              ? (categoria.cantidad_categoria_vendida / maxVentas) * 100
              : 0;
          const medals = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣"];

          return (
            <div key={categoria.id} className="categoria-rank-item">
              <div className="rank-info">
                <span className="rank-medal">{medals[index]}</span>
                <div className="rank-details">
                  <h4 className="categoria-nombre">{categoria.nombre}</h4>
                  <p className="categoria-descripcion">
                    {categoria.descripcion || "Sin descripción"}
                  </p>
                </div>
              </div>

              <div className="rank-stats">
                <div className="stat-item">
                  <span className="stat-label">Vendidas</span>
                  <span className="stat-value">
                    {categoria.cantidad_categoria_vendida || 0}
                  </span>
                </div>
                {categoria.total_vendido && (
                  <div className="stat-item">
                    <span className="stat-label">Total</span>
                    <span className="stat-value">
                      ${categoria.total_vendido.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${porcentaje}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopCategorias;
