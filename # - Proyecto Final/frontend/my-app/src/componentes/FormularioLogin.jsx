import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "../componentes/styles/Formulario.css";

const FormularioLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const { login, error, loading, clearError, isAuthenticated } = useAuth();
  const [submitError, setSubmitError] = useState("");

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || "/principal";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Limpiar errores cuando el componente se monta
  useEffect(() => {
    clearError();
    setSubmitError("");
  }, [clearError]);

  const onSubmit = async (data) => {
    setSubmitError("");
    clearError();

    const result = await login(data.email, data.password);

    if (result.success) {
      const from = location.state?.from?.pathname || "/principal";
      navigate(from, { replace: true });
      reset();
    } else {
      setSubmitError(result.error);
    }
  };

  return (
    <main className="formulario_main">
      <div className="formulario">
        <h1 className="formulario_titulo">Iniciar sesión</h1>

        {(error || submitError) && (
          <div className="formulario_error_general">{error || submitError}</div>
        )}

        <form className="formulario_form" onSubmit={handleSubmit(onSubmit)}>
          <label className="formulario_label">Email</label>
          <input
            className="formulario_input"
            type="email"
            {...register("email", {
              required: "El email es obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido",
              },
            })}
          />
          {errors.email && (
            <p className="formulario_error">{errors.email.message}</p>
          )}

          <label className="formulario_label">Contraseña</label>
          <input
            className="formulario_input"
            type="password"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
          />
          {errors.password && (
            <p className="formulario_error">{errors.password.message}</p>
          )}

          <button
            className="formulario_button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Iniciando sesión..." : "Ingresar"}
          </button>
        </form>

        <div className="formulario_footer">
          <p>
            ¿No tenés cuenta?{" "}
            <button className="formulario_link" onClick={() => navigate("/")}>
              Registrarme
            </button>
          </p>
        </div>
      </div>
    </main>
  );
};

export default FormularioLogin;
