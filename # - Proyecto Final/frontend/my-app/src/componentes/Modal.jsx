import React from "react";
import "./styles/Modal.css";

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  titulo,
  mensaje,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  type = "default", // default, danger
  children, // Nuevo prop para contenido personalizado
  showFooter = true, // Control para mostrar/ocultar footer
  maxWidth = "500px", // Control del ancho máximo
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" style={{ maxWidth }}>
        {/* Header solo si hay título */}
        {titulo && (
          <div className="modal-header">
            <h3 className="modal-titulo">{titulo}</h3>
            <button className="modal-close" onClick={onClose}>
              ×
            </button>
          </div>
        )}

        {/* Si no hay título pero queremos el botón de cerrar */}
        {!titulo && (
          <div className="modal-header-minimal">
            <button className="modal-close" onClick={onClose}>
              ×
            </button>
          </div>
        )}

        <div className="modal-body">
          {/* Si hay children, usar ese contenido, sino usar mensaje */}
          {children ? children : <p className="modal-mensaje">{mensaje}</p>}
        </div>

        {/* Footer solo si se especifica mostrarlo */}
        {showFooter && (
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              {cancelText}
            </button>
            {onConfirm && (
              <button
                className={`btn ${
                  type === "danger" ? "btn-danger" : "btn-primary"
                }`}
                onClick={onConfirm}
              >
                {confirmText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
