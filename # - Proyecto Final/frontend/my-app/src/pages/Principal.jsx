import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MenuInteractivo from "../componentes/MenuInteractivo";
import "../componentes/styles/Principal.css";

const Principal = () => {
  const [producto, setProducto] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [colapsado, setColapsado] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleNavigateToInventory = () => {
    navigate("/inventario");
  };

  useEffect(() => {
    const simulacionProductos = [
      {
        id: 1,
        nombre: "Producto 1",
        categoria: "Categoria 1",
        precio: 100,
        cantidad: 4,
      },
      {
        id: 2,
        nombre: "Producto 2",
        categoria: "Categoria 2",
        precio: 200,
        cantidad: 3,
      },
      {
        id: 3,
        nombre: "Producto 3",
        categoria: "Categoria 3",
        precio: 300,
        cantidad: 30,
      },
      {
        id: 4,
        nombre: "Producto 4",
        categoria: "Categoria 4",
        precio: 400,
        cantidad: 0,
      },
      {
        id: 5,
        nombre: "Producto 5",
        categoria: "Categoria 5",
        precio: 500,
        cantidad: 50,
      },
      {
        id: 6,
        nombre: "Producto 6",
        categoria: "Categoria 1",
        precio: 150,
        cantidad: 0,
      },
      {
        id: 7,
        nombre: "Producto 7",
        categoria: "Categoria 2",
        precio: 250,
        cantidad: 10,
      },
      {
        id: 8,
        nombre: "Producto 8",
        categoria: "Categoria 3",
        precio: 350,
        cantidad: 5,
      },
    ];
    setProducto(simulacionProductos);

    const simulacionVentas = [
      { id: 101, productoId: 5, cantidad: 2, fecha: "2025-06-18" },
      { id: 102, productoId: 3, cantidad: 1, fecha: "2025-06-18" },
      { id: 103, productoId: 2, cantidad: 3, fecha: "2025-06-17" },
      { id: 104, productoId: 1, cantidad: 2, fecha: "2025-06-16" },
      { id: 105, productoId: 7, cantidad: 1, fecha: "2025-06-15" },
      { id: 106, productoId: 8, cantidad: 4, fecha: "2025-06-14" },
    ];
    setVentas(simulacionVentas);
  }, []);

  const ultimasVentas = [...ventas]
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .slice(0, 5)
    .map((v) => {
      const prod = producto.find((p) => p.id === v.productoId);
      return {
        ...v,
        nombre: prod ? prod.nombre : "Desconocido",
        precio: prod ? prod.precio : 0,
        categoria: prod ? prod.categoria : "General",
      };
    });

  const productosVendidosCount = ventas.reduce((acc, venta) => {
    acc[venta.productoId] = (acc[venta.productoId] || 0) + venta.cantidad;
    return acc;
  }, {});
  const productosMasVendidos = Object.entries(productosVendidosCount)
    .map(([id, cantidad]) => {
      const prod = producto.find((p) => p.id === +id);
      return {
        id: +id,
        nombre: prod?.nombre || "Desconocido",
        categoria: prod?.categoria || "General",
        cantidad,
      };
    })
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, 5);

  const categoriasVendidasCount = ventas.reduce((acc, venta) => {
    const prod = producto.find((p) => p.id === venta.productoId);
    const cat = prod ? prod.categoria : "General";
    acc[cat] = (acc[cat] || 0) + venta.cantidad;
    return acc;
  }, {});
  const categoriasMasVendidas = Object.entries(categoriasVendidasCount)
    .map(([categoria, cantidad]) => ({ categoria, cantidad }))
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, 5);

  const ultimosSinStock = producto
    .filter((p) => p.cantidad === 0)
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  return (
    <div className="principal-contenedor">
      <MenuInteractivo colapsado={colapsado} setColapsado={setColapsado} />

      <div
        className={`main-content ${colapsado ? "colapsado" : "no-colapsado"}`}
      >
        {/* Tarjeta Bienvenida - ancho completo */}
        <section className="tarjeta bienvenida">
          <div>
            <h1 className="principal_titulo">
              Bienvenido{user?.nombre ? `, ${user.nombre}` : ""}
            </h1>
            <h2
              className="subtitulo clickeable"
              onClick={handleNavigateToInventory}
              title="Ir a Inventario"
            >
              Control total sobre tu inventario, siempre a un click de
              distancia.
            </h2>
          </div>
          <p className="parrafo">
            Administra tu inventario, carga nuevos productos y mantén todo bajo
            control de forma sencilla y eficiente.
          </p>
        </section>

        {/* Contenedor para las secciones */}
        <div className="restantes-secciones">
          {/* Fila 1: 1/4 + 3/4 */}
          <div className="grid-dos-columnas-1-3">
            <section className="tarjeta chica">
              <h2 className="titulo-tarjeta">Últimos productos sin stock</h2>
              <div className="tabla_scroll">
                <table className="tabla">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Categoría</th>
                      <th>Precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ultimosSinStock.map((p) => (
                      <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.nombre}</td>
                        <td>{p.categoria}</td>
                        <td>${p.precio}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="tarjeta grande">
              <h2 className="titulo-tarjeta">Últimas ventas realizadas</h2>
              <div className="tabla_scroll">
                <table className="tabla">
                  <thead>
                    <tr>
                      <th>ID Venta</th>
                      <th>Producto</th>
                      <th>Categoría</th>
                      <th>Cantidad</th>
                      <th>Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ultimasVentas.map((v) => (
                      <tr key={v.id}>
                        <td>{v.id}</td>
                        <td>{v.nombre}</td>
                        <td>{v.categoria}</td>
                        <td>{v.cantidad}</td>
                        <td>{v.fecha}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Fila 2: mitad / mitad */}
          <div className="grid-dos-columnas-1-1">
            <section className="tarjeta grande orden-desktop-primero">
              <h2 className="titulo-tarjeta">Productos más vendidos</h2>
              <div className="tabla_scroll">
                <table className="tabla">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Categoría</th>
                      <th>Cantidad vendida</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productosMasVendidos.map((p) => (
                      <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.nombre}</td>
                        <td>{p.categoria}</td>
                        <td>{p.cantidad}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="tarjeta chica orden-desktop-segundo">
              <h2 className="titulo-tarjeta">Categorías más vendidas</h2>
              <div className="tabla_scroll">
                <table className="tabla">
                  <thead>
                    <tr>
                      <th>Categoría</th>
                      <th>Cantidad vendida</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoriasMasVendidas.map((c) => (
                      <tr key={c.categoria}>
                        <td>{c.categoria}</td>
                        <td>{c.cantidad}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Principal;
