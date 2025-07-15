import React, { useState } from "react";
import MenuInteractivo from "../componentes/MenuInteractivo";
import { useNotificaciones } from "../componentes/Notificacion";
import { useCategorias } from "../hooks/useCategorias";
import "../componentes/styles/Categorias.css";

const Categorias = () => {
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 8;
  const [colapsado, setColapsado] = useState(false);
  const [mostrandoFormulario, setMostrandoFormulario] = useState(false);
  const [categoriaEditando, setCategoriaEditando] = useState(null);
  const [formData, setFormData] = useState({ nombre: "", descripcion: "" });

  const {
    categorias,
    loading,
    error,
    cargarCategorias,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria,
  } = useCategorias();

  const { mostrarExito, mostrarError, NotificacionComponent } =
    useNotificaciones();

  const categoriasFiltradas = categorias.filter((categoria) =>
    categoria.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const indexUltimoElemento = paginaActual * elementosPorPagina;
  const indexPrimerElemento = indexUltimoElemento - elementosPorPagina;
  const categoriasPaginadas = categoriasFiltradas.slice(
    indexPrimerElemento,
    indexUltimoElemento
  );
  const totalPaginas = Math.ceil(
    categoriasFiltradas.length / elementosPorPagina
  );

  const cambiarPagina = (numero) => {
    setPaginaActual(numero);
  };

  const handleAgregarCategoria = () => {
    setCategoriaEditando(null);
    setFormData({ nombre: "", descripcion: "" });
    setMostrandoFormulario(true);
  };

  const handleEditarCategoria = (categoria) => {
    setCategoriaEditando(categoria);
    setFormData({
      nombre: categoria.nombre,
      descripcion: categoria.descripcion || "",
    });
    setMostrandoFormulario(true);
  };

  const handleGuardarCategoria = async (e) => {
    e.preventDefault();

    if (!formData.nombre.trim()) {
      mostrarError("El nombre es obligatorio");
      return;
    }

    try {
      if (categoriaEditando) {
        await actualizarCategoria(categoriaEditando.id, formData);
        mostrarExito("Categoría actualizada exitosamente");
      } else {
        await crearCategoria(formData);
        mostrarExito("Categoría creada exitosamente");
      }
      setMostrandoFormulario(false);
      setFormData({ nombre: "", descripcion: "" });
      setCategoriaEditando(null);
    } catch (error) {
      mostrarError(error.message);
    }
  };

  const handleEliminarCategoria = async (id) => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar esta categoría?")
    ) {
      try {
        await eliminarCategoria(id);
        mostrarExito("Categoría eliminada exitosamente");
      } catch (error) {
        mostrarError(error.message);
      }
    }
  };

  const handleCancelar = () => {
    setMostrandoFormulario(false);
    setFormData({ nombre: "", descripcion: "" });
    setCategoriaEditando(null);
  };

  return (
    <>
      <MenuInteractivo colapsado={colapsado} setColapsado={setColapsado} />
      <div
        className={`main-content ${colapsado ? "colapsado" : "no-colapsado"}`}
      >
        <div className="categorias-container">
          <h1 className="categorias-titulo">
            {mostrandoFormulario
              ? categoriaEditando
                ? "Editar Categoría"
                : "Nueva Categoría"
              : "Listado de Categorías"}
          </h1>

          {!mostrandoFormulario ? (
            <>
              {error && (
                <div
                  style={{
                    padding: "10px",
                    backgroundColor: "#f8d7da",
                    color: "#721c24",
                    borderRadius: "5px",
                    marginBottom: "20px",
                  }}
                >
                  {error}
                </div>
              )}

              <div className="acciones-superiores">
                <div className="acciones-grupo-input-filtro">
                  <input
                    type="text"
                    placeholder="Buscar categoría..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="input-buscador"
                  />
                </div>
                <button
                  className="boton-agregar"
                  onClick={handleAgregarCategoria}
                >
                  Agregar Categoría
                </button>
              </div>

              {loading ? (
                <p>Cargando categorías...</p>
              ) : categoriasFiltradas.length === 0 ? (
                <p>No hay categorías disponibles.</p>
              ) : (
                <>
                  <table className="tabla-categorias">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoriasPaginadas.map((categoria) => (
                        <tr key={categoria.id}>
                          <td>{categoria.id}</td>
                          <td>{categoria.nombre}</td>
                          <td>{categoria.descripcion || "Sin descripción"}</td>
                          <td>
                            <button
                              onClick={() => handleEditarCategoria(categoria)}
                              className="boton-editar"
                              title="Editar categoría"
                            >
                              <i className="fa-solid fa-pencil"></i>
                            </button>
                            <button
                              onClick={() =>
                                handleEliminarCategoria(categoria.id)
                              }
                              className="boton-eliminar"
                              title="Eliminar categoría"
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
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
            </>
          ) : (
            <div className="formulario-categoria-simple">
              <form onSubmit={handleGuardarCategoria}>
                <div className="form-group">
                  <label htmlFor="nombre">Nombre *</label>
                  <input
                    type="text"
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) =>
                      setFormData({ ...formData, nombre: e.target.value })
                    }
                    required
                    placeholder="Ingresa el nombre de la categoría"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="descripcion">Descripción</label>
                  <textarea
                    id="descripcion"
                    value={formData.descripcion}
                    onChange={(e) =>
                      setFormData({ ...formData, descripcion: e.target.value })
                    }
                    placeholder="Describe la categoría (opcional)"
                    rows={3}
                  />
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    onClick={handleCancelar}
                    className="btn-cancelar"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn-guardar"
                    disabled={loading}
                  >
                    {loading
                      ? "Guardando..."
                      : categoriaEditando
                      ? "Actualizar"
                      : "Crear"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
      <NotificacionComponent />
    </>
  );
};

export default Categorias;
