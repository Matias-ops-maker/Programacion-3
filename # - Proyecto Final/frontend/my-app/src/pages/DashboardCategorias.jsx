import React, { useState } from "react";
import MenuInteractivo from "../componentes/MenuInteractivo";
import TopCategorias from "../componentes/TopCategorias";
import "../componentes/styles/Dashboard.css";

const DashboardCategorias = () => {
  const [colapsado, setColapsado] = useState(false);

  return (
    <>
      <MenuInteractivo colapsado={colapsado} setColapsado={setColapsado} />
      <div
        className={`main-content ${colapsado ? "colapsado" : "no-colapsado"}`}
      >
        <div className="dashboard-container">
          <div className="dashboard-header">
            <h1 className="dashboard-titulo">📊 Dashboard de Categorías</h1>
            <p className="dashboard-subtitulo">
              Visualiza las estadísticas y categorías más populares
            </p>
          </div>

          <div className="dashboard-content">
            <TopCategorias />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardCategorias;
