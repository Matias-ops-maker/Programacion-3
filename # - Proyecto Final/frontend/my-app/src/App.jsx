import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./componentes/ProtectedRoute.jsx";
import "./App.css";

import FormularioLogin from "./componentes/FormularioLogin";
import FormularioRegistro from "./componentes/FormularioRegistro";
import Principal from "./pages/Principal";
import Inventario from "./pages/Inventario";
import Ventas from "./pages/Ventas";
import Categorias from "./pages/Categorias";
import MiCuenta from "./pages/MiCuenta";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<FormularioRegistro />} />
          <Route path="/login" element={<FormularioLogin />} />
          <Route
            path="/principal"
            element={
              <ProtectedRoute>
                <Principal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inventario"
            element={
              <ProtectedRoute>
                <Inventario />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ventas"
            element={
              <ProtectedRoute>
                <Ventas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categorias"
            element={
              <ProtectedRoute>
                <Categorias />
              </ProtectedRoute>
            }
          />
          <Route
            path="/micuenta"
            element={
              <ProtectedRoute>
                <MiCuenta />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
