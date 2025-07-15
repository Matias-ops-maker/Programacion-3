import React, { useState, useEffect } from "react";
import "./styles/Notificaciones.css";

const Notificacion = ({ tipo, mensaje, visible, onClose }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className={`notificacion ${tipo}`}>
      <div className="notificacion-contenido">
        <span className="notificacion-icono">
          {tipo === "success" ? "✓" : tipo === "error" ? "✗" : "ⓘ"}
        </span>
        <span className="notificacion-mensaje">{mensaje}</span>
        <button className="notificacion-cerrar" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
};

export const useNotificaciones = () => {
  const [notificacion, setNotificacion] = useState({
    visible: false,
    tipo: "info",
    mensaje: "",
  });

  const mostrarNotificacion = (tipo, mensaje) => {
    setNotificacion({
      visible: true,
      tipo,
      mensaje,
    });
  };

  const ocultarNotificacion = () => {
    setNotificacion((prev) => ({ ...prev, visible: false }));
  };

  const mostrarExito = (mensaje) => mostrarNotificacion("success", mensaje);
  const mostrarError = (mensaje) => mostrarNotificacion("error", mensaje);
  const mostrarInfo = (mensaje) => mostrarNotificacion("info", mensaje);

  const NotificacionComponent = () => (
    <Notificacion
      tipo={notificacion.tipo}
      mensaje={notificacion.mensaje}
      visible={notificacion.visible}
      onClose={ocultarNotificacion}
    />
  );

  return {
    mostrarExito,
    mostrarError,
    mostrarInfo,
    NotificacionComponent,
  };
};

export default Notificacion;
