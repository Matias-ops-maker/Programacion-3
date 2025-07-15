import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import "./styles/FormularioCategoria.css";

const FormularioCategoria = ({
  categoria = null,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (categoria) {
      setFormData({
        nombre: categoria.nombre || "",
        descripcion: categoria.descripcion || "",
      });
    } else {
      setFormData({
        nombre: "",
        descripcion: "",
      });
    }
    setErrors({});
  }, [categoria]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    } else if (formData.nombre.trim().length < 2) {
      newErrors.nombre = "El nombre debe tener al menos 2 caracteres";
    } else if (formData.nombre.trim().length > 50) {
      newErrors.nombre = "El nombre no puede tener más de 50 caracteres";
    }

    if (formData.descripcion && formData.descripcion.length > 200) {
      newErrors.descripcion =
        "La descripción no puede tener más de 200 caracteres";
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
    if (validateForm()) {
      onSubmit({
        nombre: formData.nombre.trim(),
        descripcion: formData.descripcion.trim(),
      });
    }
  };

  return (
    <div className="formulario-categoria">
      <div className="formulario-header">
        <h3>{categoria ? "Editar Categoría" : "Nueva Categoría"}</h3>
      </div>

      <form onSubmit={handleSubmit} className="formulario-form">
        <div className="form-group">
          <label htmlFor="nombre" className="form-label">
            Nombre *
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={`form-input ${errors.nombre ? "error" : ""}`}
            placeholder="Ingresa el nombre de la categoría"
            disabled={loading}
            maxLength={50}
          />
          {errors.nombre && (
            <span className="error-message">{errors.nombre}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="descripcion" className="form-label">
            Descripción
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className={`form-textarea ${errors.descripcion ? "error" : ""}`}
            placeholder="Describe la categoría (opcional)"
            disabled={loading}
            rows={3}
            maxLength={200}
          />
          {errors.descripcion && (
            <span className="error-message">{errors.descripcion}</span>
          )}
          <small className="char-counter">
            {formData.descripcion.length}/200
          </small>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            disabled={loading}
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <div className="loading-inline">
                <Loading size="small" />
                Guardando...
              </div>
            ) : categoria ? (
              "Actualizar"
            ) : (
              "Crear"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioCategoria;
