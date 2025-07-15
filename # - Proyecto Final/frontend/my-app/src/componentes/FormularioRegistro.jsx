import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "../componentes/styles/Formulario.css";

const FormularioRegistro = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm();

  const navigate = useNavigate();
  const {
    register: registerUser,
    error,
    loading,
    clearError,
    isAuthenticated,
  } = useAuth();
  const [submitError, setSubmitError] = useState("");

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/principal", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Limpiar errores cuando el componente se monta
  useEffect(() => {
    clearError();
    setSubmitError("");
  }, [clearError]);

  const password = watch("password");

  const onSubmit = async (data) => {
    setSubmitError("");
    clearError();

    // Mapear los campos del formulario al modelo de la API
    const userData = {
      nombre: data.name,
      telefono: data.phone,
      email: data.email,
      password: data.password,
    };

    const result = await registerUser(userData);

    if (result.success) {
      navigate("/principal", { replace: true });
      reset();
    } else {
      setSubmitError(result.error);
    }
  };

  return (
    <main className="formulario_main">
      <div className="formulario">
        <h1 className="formulario_titulo">
          Crea tu cuenta y gestiona tu Stock
        </h1>

        {(error || submitError) && (
          <div className="formulario_error_general">{error || submitError}</div>
        )}

        <form className="formulario_form" onSubmit={handleSubmit(onSubmit)}>
          <label className="formulario_label">Nombre del negocio</label>
          <input
            className="formulario_input"
            type="text"
            {...register("name", {
              required: "El nombre es requerido",
              minLength: {
                value: 2,
                message: "El nombre debe tener al menos 2 caracteres",
              },
            })}
          />
          {errors.name && (
            <p className="formulario_error">{errors.name.message}</p>
          )}

          <label className="formulario_label">
            Teléfono de persona encargada
          </label>
          <input
            className="formulario_input"
            type="tel"
            {...register("phone", {
              required: "El teléfono es requerido",
              pattern: {
                value: /^[\d\s\-\+\(\)]+$/,
                message: "Formato de teléfono inválido",
              },
            })}
            placeholder="+54 9 11 1234 5678"
          />
          {errors.phone && (
            <p className="formulario_error">{errors.phone.message}</p>
          )}

          <label className="formulario_label">E-mail de contacto</label>
          <input
            className="formulario_input"
            type="email"
            {...register("email", {
              required: "El email es requerido",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido",
              },
            })}
          />
          {errors.email && (
            <p className="formulario_error">{errors.email.message}</p>
          )}

          <label className="formulario_label">Contraseña para tu cuenta</label>
          <input
            className="formulario_input"
            type="password"
            {...register("password", {
              required: "La contraseña es requerida",
              minLength: {
                value: 8,
                message: "Debe contener mínimo 8 caracteres",
              },
            })}
          />
          {errors.password && (
            <p className="formulario_error">{errors.password.message}</p>
          )}

          <label className="formulario_label">Confirmar contraseña</label>
          <input
            className="formulario_input"
            type="password"
            {...register("confirmPassword", {
              required: "Confirma tu contraseña",
              validate: (value) =>
                value === password || "Las contraseñas no coinciden",
            })}
          />
          {errors.confirmPassword && (
            <p className="formulario_error">{errors.confirmPassword.message}</p>
          )}

          <button
            className="formulario_button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrarme"}
          </button>
        </form>

        <div className="formulario_footer">
          <p>
            ¿Ya tenés cuenta?{" "}
            <button
              className="formulario_link"
              type="button"
              onClick={() => navigate("/login")}
            >
              Ingresar
            </button>
          </p>
        </div>
      </div>
    </main>
  );
};

export default FormularioRegistro;
