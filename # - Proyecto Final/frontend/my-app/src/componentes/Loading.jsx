import React from "react";
import "./styles/Loading.css";

const Loading = ({ mensaje = "Cargando...", size = "medium" }) => {
  return (
    <div className="loading-container">
      <div className={`loading-spinner ${size}`}></div>
      <p className="loading-mensaje">{mensaje}</p>
    </div>
  );
};

export default Loading;
