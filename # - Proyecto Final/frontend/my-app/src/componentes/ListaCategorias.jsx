import React, { useState } from "react";
import Loading from "./Loading";
import Modal from "./Modal";
import "./styles/ListaCategorias.css";

const ListaCategorias = ({
  categorias,
  loading,
  onEdit,
  onDelete,
  onRefresh,
}) => {
  const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);
  const [eliminando, setEliminando] = useState(false);

  const handleEliminarClick = (categoria) => {
    setCategoriaAEliminar(categoria);
  };

  const handleConfirmarEliminacion = async () => {
    if (!categoriaAEliminar) return;

    setEliminando(true);
    try {
      await onDelete(categoriaAEliminar.id);
      setCategoriaAEliminar(null);
    } catch (error) {
      console.error("Error al eliminar:", error);
    } finally {
      setEliminando(false);
    }
  };

  const handleCancelarEliminacion = () => {
    setCategoriaAEliminar(null);
  };

  if (loading) {
    return <Loading mensaje="Cargando categorías..." />;
  }

  if (!categorias || categorias.length === 0) {
    return (
      <div className="lista-vacia">
        <div className="lista-vacia-icono">📁</div>
        <h3>No hay categorías</h3>
        <p>No se encontraron categorías en el sistema.</p>
        <button onClick={onRefresh} className="btn btn-primary">
          Actualizar
        </button>
      </div>
    );
  }

  return (
    <div className="lista-categorias">
      <div className="lista-header">
        <h3>Categorías ({categorias.length})</h3>
        <button
          onClick={onRefresh}
          className="btn btn-outline"
          title="Actualizar"
        >
          🔄
        </button>
      </div>

      <div className="tabla-container">
        <table className="tabla-categorias">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Ventas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td className="celda-id">{categoria.id}</td>
                <td className="celda-nombre">
                  <strong>{categoria.nombre}</strong>
                </td>
                <td className="celda-descripcion">
                  {categoria.descripcion || (
                    <span className="texto-muted">Sin descripción</span>
                  )}
                </td>
                <td className="celda-ventas">
                  <span className="badge-ventas">
                    {categoria.cantidad_categoria_vendida || 0}
                  </span>
                </td>
                <td className="celda-acciones">
                  <div className="acciones-group">
                    <button
                      onClick={() => onEdit(categoria)}
                      className="btn-accion btn-editar"
                      title="Editar categoría"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleEliminarClick(categoria)}
                      className="btn-accion btn-eliminar"
                      title="Eliminar categoría"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={!!categoriaAEliminar}
        onClose={handleCancelarEliminacion}
        onConfirm={handleConfirmarEliminacion}
        titulo="Confirmar eliminación"
        mensaje={`¿Estás seguro de que deseas eliminar la categoría "${categoriaAEliminar?.nombre}"? Esta acción no se puede deshacer.`}
        confirmText={eliminando ? "Eliminando..." : "Eliminar"}
        cancelText="Cancelar"
        type="danger"
      />
    </div>
  );
};

export default ListaCategorias;
