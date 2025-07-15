import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles/Interactivo.css";

const MenuInteractivo = ({ colapsado, setColapsado }) => {
  const location = useLocation();

  // Función para manejar clicks en los links del sidebar
  const handleLinkClick = (targetPath) => {
    const isMobile = window.innerWidth <= 630;

    // Si estamos en móviles y hacemos click en el mismo link donde ya estamos
    if (isMobile && location.pathname === targetPath && !colapsado) {
      setColapsado(true);
    }
  };

  // Efecto que se ejecuta cuando cambia la ruta (después de navegar)
  useEffect(() => {
    const isMobile = window.innerWidth <= 630;

    // Solo en móviles Y solo si el sidebar estaba expandido
    // Y solo si realmente cambió la ubicación (navegación)
    if (isMobile && !colapsado) {
      // Pequeño delay para permitir que el toggle manual funcione
      const timer = setTimeout(() => {
        setColapsado(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return (
    <aside className={`sidebar ${colapsado ? "colapsado" : ""}`}>
      <div className="sidebar_header">
        <button
          className="menu_toggle"
          onClick={() => setColapsado(!colapsado)}
        >
          {colapsado ? (
            <i className="fa-solid fa-arrow-right"></i>
          ) : (
            <i className="fa-solid fa-xmark"></i>
          )}
        </button>
      </div>

      <nav className="sidebar_nav">
        <ul className="sidebar_ul">
          <li className="sidebar_li">
            <Link
              to="/principal"
              className="sidebar_link"
              onClick={() => handleLinkClick("/principal")}
            >
              <span className="sidebar_icon">
                <i className="fa-solid fa-house"></i>
              </span>
              {!colapsado && <span className="sidebar_text">Inicio</span>}
            </Link>
          </li>
          <li className="sidebar_li">
            <Link
              to="/ventas"
              className="sidebar_link"
              onClick={() => handleLinkClick("/ventas")}
            >
              <span className="sidebar_icon">
                <i className="fa-solid fa-money-bill"></i>
              </span>
              {!colapsado && <span className="sidebar_text">Ventas</span>}
            </Link>
          </li>
          <li className="sidebar_li">
            <Link
              to="/categorias"
              className="sidebar_link"
              onClick={() => handleLinkClick("/categorias")}
            >
              <span className="sidebar_icon">
                <i className="fa-solid fa-table-list"></i>
              </span>
              {!colapsado && <span className="sidebar_text">Categorias</span>}
            </Link>
          </li>

          <li className="sidebar_li">
            <Link
              to="/inventario"
              className="sidebar_link"
              onClick={() => handleLinkClick("/inventario")}
            >
              <span className="sidebar_icon">
                <i className="fa-solid fa-box"></i>
              </span>
              {!colapsado && <span className="sidebar_text">Inventario</span>}
            </Link>
          </li>
        </ul>
      </nav>
      <div className="sidebar_micuenta">
        <Link
          to="/micuenta"
          className="sidebar_link"
          onClick={() => handleLinkClick("/micuenta")}
        >
          <span className="sidebar_icon">
            <i className="fa-solid fa-circle-user"></i>
          </span>
          {!colapsado && <span className="sidebar_text">Mi cuenta</span>}
        </Link>
      </div>
    </aside>
  );
};

export default MenuInteractivo;
