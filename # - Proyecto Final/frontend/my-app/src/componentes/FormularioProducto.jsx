import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import "./styles/FormularioProducto.css";

const FormularioProducto = ({
  isOpen,
  onClose,
  onSubmit,
  producto = null,
  categorias = [],
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    nombre: "",
    categoria_id: "",
    cantidad: "",
    precio: "",
    estado: "activo",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (producto) {
      setFormData({
        nombre: producto.nombre || "",
        categoria_id: producto.categoria_id || "",
        cantidad: producto.cantidad?.toString() || "",
        precio: producto.precio?.toString() || "",
        estado: producto.estado || "activo",
      });
    } else {
      setFormData({
        nombre: "",
        categoria_id: "",
        cantidad: "",
        precio: "",
        estado: "activo",
      });
    }
    setErrors({});
  }, [producto, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre del producto es obligatorio";
    }

    if (!formData.cantidad || formData.cantidad < 0) {
      newErrors.cantidad =
        "La cantidad debe ser un número válido mayor o igual a 0";
    }

    if (!formData.precio || formData.precio <= 0) {
      newErrors.precio = "El precio debe ser un número mayor a 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const dataToSubmit = {
      ...formData,
      cantidad: parseInt(formData.cantidad),
      precio: parseFloat(formData.precio),
      categoria_id: formData.categoria_id
        ? parseInt(formData.categoria_id)
        : null,
    };

    console.log("Datos enviados del formulario:", dataToSubmit);
    onSubmit(dataToSubmit);
  };

  const handleClose = () => {
    setFormData({
      nombre: "",
      categoria_id: "",
      cantidad: "",
      precio: "",
      estado: "activo",
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      showFooter={false}
      maxWidth="600px"
    >
      <div className="formulario-producto">
        <h2 className="formulario-titulo">
          {producto ? "Editar Producto" : "Agregar Nuevo Producto"}
        </h2>

        <form onSubmit={handleSubmit} className="formulario">
          <div className="campo-grupo">
            <label htmlFor="nombre" className="campo-label">
              Nombre del Producto *
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`campo-input ${errors.nombre ? "error" : ""}`}
              placeholder="Ingrese el nombre del producto"
              disabled={loading}
            />
            {errors.nombre && (
              <span className="error-mensaje">{errors.nombre}</span>
            )}
          </div>

          <div className="campo-grupo">
            <label htmlFor="categoria_id" className="campo-label">
              Categoría
            </label>
            <select
              id="categoria_id"
              name="categoria_id"
              value={formData.categoria_id}
              onChange={handleChange}
              className="campo-select"
              disabled={loading}
            >
              <option value="">Seleccionar categoría</option>
              {categorias.map((categoria, index) => (
                <option
                  key={categoria.id || index}
                  value={categoria.id || categoria.nombre || categoria}
                >
                  {categoria.nombre || categoria}
                </option>
              ))}
            </select>
          </div>

          <div className="campos-fila">
            <div className="campo-grupo">
              <label htmlFor="cantidad" className="campo-label">
                Cantidad *
              </label>
              <input
                type="number"
                id="cantidad"
                name="cantidad"
                value={formData.cantidad}
                onChange={handleChange}
                className={`campo-input ${errors.cantidad ? "error" : ""}`}
                placeholder="0"
                min="0"
                disabled={loading}
              />
              {errors.cantidad && (
                <span className="error-mensaje">{errors.cantidad}</span>
              )}
            </div>

            <div className="campo-grupo">
              <label htmlFor="precio" className="campo-label">
                Precio *
              </label>
              <input
                type="number"
                id="precio"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                className={`campo-input ${errors.precio ? "error" : ""}`}
                placeholder="0.00"
                min="0"
                step="0.01"
                disabled={loading}
              />
              {errors.precio && (
                <span className="error-mensaje">{errors.precio}</span>
              )}
            </div>
          </div>

          <div className="campo-grupo">
            <label htmlFor="estado" className="campo-label">
              Estado
            </label>
            <select
              id="estado"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="campo-select"
              disabled={loading}
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>

          <div className="formulario-acciones">
            <button
              type="button"
              onClick={handleClose}
              className="boton-cancelar"
              disabled={loading}
            >
              Cancelar
            </button>
            <button type="submit" className="boton-guardar" disabled={loading}>
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  {producto ? "Actualizando..." : "Guardando..."}
                </>
              ) : producto ? (
                "Actualizar Producto"
              ) : (
                "Guardar Producto"
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default FormularioProducto;
