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
      <h3>🏆 Top 5 Categorías Más Vendidas</h3>
      <ul>
        {categoriasVendidas.map((categoria, index) => (
          <li key={categoria.id}>
            {index + 1}. {categoria.nombre} -{" "}
            {categoria.cantidad_categoria_vendida} ventas
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopCategorias;
