import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import MenuInteractivo from "../componentes/MenuInteractivo";
import "../componentes/styles/MiCuenta.css";

const MiCuenta = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [colapsado, setColapsado] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="mi-cuenta-container">
        <p>Cargando datos del usuario...</p>
      </div>
    );
  }

  // Debug: mostrar en consola los datos del usuario
  console.log("Datos del usuario en Mi Cuenta:", user);

  return (
    <>
      <MenuInteractivo colapsado={colapsado} setColapsado={setColapsado} />
      <main className={`mi-cuenta-main ${colapsado ? "colapsado" : "no-colapsado"}`}>
        <div className="micuenta-container">
          <div className="header-micuenta">
            <h1>Mi Cuenta</h1>
          </div>

          <div className="datos-usuario">
            <div className="campo-info">
              <label>Nombre:</label>
              <p className="valor-campo">{user.nombre || "No especificado"}</p>
            </div>

            <div className="campo-info">
              <label>Email:</label>
              <p className="valor-campo">{user.email || "No especificado"}</p>
            </div>

            <div className="campo-info">
              <label>Teléfono:</label>
              <p className="valor-campo">
                {user.telefono || "No especificado"}
              </p>
            </div>
          </div>

          <div className="acciones-cuenta">
            <button className="btn-logout" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default MiCuenta;
