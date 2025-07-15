import React, { useState, useEffect } from "react";
import { useProductosParaVentas } from "../hooks/useVentas";
import "./styles/FormularioVenta.css";
import Loading from "./Loading";
import Notificacion from "./Notificacion";

const FormularioVenta = ({
  onVentaCreada,
  onVentaActualizada,
  onCerrar,
  ventaParaEditar = null,
}) => {
  const [venta, setVenta] = useState({
    producto_id: "",
    categoria_id: "",
    cantidad_vendida_producto: "",
    producto_precio: "",
    cantidad_vendida_precio: "",
  });

  const [errores, setErrores] = useState({});
  const [loading, setLoading] = useState(false);
  const [notificacion, setNotificacion] = useState({
    mostrar: false,
    mensaje: "",
    tipo: "",
  });
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const {
    productos,
    categorias,
    loading: loadingData,
    error: errorData,
    obtenerProductoPorId,
    buscarCategoriaIdPorNombre,
  } = useProductosParaVentas();

  // Validar formulario
  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!venta.producto_id) {
      nuevosErrores.producto_id = "Debe seleccionar un producto";
    }

    if (
      !venta.cantidad_vendida_producto ||
      venta.cantidad_vendida_producto <= 0
    ) {
      nuevosErrores.cantidad_vendida_producto =
        "La cantidad debe ser mayor a 0";
    }

    if (
      productoSeleccionado &&
      venta.cantidad_vendida_producto > productoSeleccionado.cantidad
    ) {
      nuevosErrores.cantidad_vendida_producto = `Stock insuficiente. Disponible: ${productoSeleccionado.cantidad}`;
    }

    // Validar que el producto tenga una categoría válida
    if (
      venta.producto_id &&
      (!venta.categoria_id ||
        venta.categoria_id === "0" ||
        venta.categoria_id === "")
    ) {
      nuevosErrores.categoria_id =
        "No se pudo determinar la categoría del producto seleccionado";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Manejar cambio de producto
  const handleProductoChange = async (e) => {
    const productoId = e.target.value;
    console.log("🔍 Producto seleccionado ID:", productoId);

    // Limpiar el formulario cuando no hay producto seleccionado
    setVenta((prev) => ({
      ...prev,
      producto_id: productoId,
      categoria_id: "",
      producto_precio: "",
      cantidad_vendida_precio: "",
    }));

    if (productoId) {
      try {
        const producto = await obtenerProductoPorId(productoId);
        console.log("🔍 Producto obtenido del backend:", producto);

        if (producto) {
          setProductoSeleccionado(producto);
          console.log("🔍 Producto obtenido:", producto);
          console.log("🔍 producto.categoria:", producto.categoria);
          console.log("🔍 producto.categoria_id:", producto.categoria_id);
          console.log("🔍 Categorías disponibles para búsqueda:", categorias);

          let categoriaId = null;
          let nombreCategoria = null;

          // Buscar el nombre de la categoría en el producto
          if (producto.categoria && typeof producto.categoria === "string") {
            nombreCategoria = producto.categoria;
            console.log(
              "✅ Encontrado nombre de categoría en producto.categoria:",
              nombreCategoria
            );
          } else if (
            producto.categoria_id &&
            typeof producto.categoria_id === "string" &&
            isNaN(Number(producto.categoria_id))
          ) {
            nombreCategoria = producto.categoria_id;
            console.log(
              "✅ Encontrado nombre de categoría en producto.categoria_id:",
              nombreCategoria
            );
          }

          // Si tenemos un nombre de categoría, buscar su ID
          if (nombreCategoria) {
            console.log("🔍 Buscando ID para la categoría:", nombreCategoria);
            categoriaId = buscarCategoriaIdPorNombre(nombreCategoria);
            console.log("🔍 ID encontrado:", categoriaId);
          }
          // Si categoria_id es un número válido, usarlo directamente
          else if (
            typeof producto.categoria_id === "number" &&
            producto.categoria_id > 0
          ) {
            categoriaId = producto.categoria_id;
            console.log(
              "✅ Usando categoria_id numérico directo:",
              categoriaId
            );
          }
          // Si categoria_id es un string numérico válido
          else if (
            typeof producto.categoria_id === "string" &&
            !isNaN(Number(producto.categoria_id)) &&
            Number(producto.categoria_id) > 0
          ) {
            categoriaId = Number(producto.categoria_id);
            console.log("✅ Convirtiendo string numérico a ID:", categoriaId);
          }

          console.log("🔍 categoriaId final calculado:", categoriaId);

          if (!categoriaId || categoriaId === 0) {
            console.log(
              "⚠️ ADVERTENCIA: No se pudo determinar una categoría válida"
            );
            console.log("⚠️ Producto categoria:", producto.categoria);
            console.log("⚠️ Producto categoria_id:", producto.categoria_id);
            console.log(
              "⚠️ Categorías disponibles:",
              categorias.map((c) => ({ id: c.id, nombre: c.nombre }))
            );
            setNotificacion({
              mostrar: true,
              mensaje: `Advertencia: No se pudo encontrar el ID para la categoría "${
                nombreCategoria || producto.categoria_id || "desconocida"
              }"`,
              tipo: "warning",
            });
          }

          // Asignar los valores del producto al formulario
          setVenta((prev) => {
            const nuevoEstado = {
              ...prev,
              categoria_id: categoriaId ? categoriaId.toString() : "",
              producto_precio: producto.precio?.toString() || "",
            };
            console.log("🔍 Nuevo estado del formulario:", nuevoEstado);
            return nuevoEstado;
          });
        } else {
          console.log("❌ No se obtuvo el producto del backend");
        }
      } catch (error) {
        console.error("❌ Error al obtener producto:", error);
        setNotificacion({
          mostrar: true,
          mensaje: "Error al cargar información del producto",
          tipo: "error",
        });
      }
    } else {
      setProductoSeleccionado(null);
    }
  };

  // Calcular precio total cuando cambia la cantidad o precio
  useEffect(() => {
    console.log("🔢 useEffect cálculo disparado");
    console.log(
      "🔢 cantidad_vendida_producto:",
      venta.cantidad_vendida_producto,
      typeof venta.cantidad_vendida_producto
    );
    console.log(
      "🔢 producto_precio:",
      venta.producto_precio,
      typeof venta.producto_precio
    );

    const cantidad = parseFloat(venta.cantidad_vendida_producto);
    const precio = parseFloat(venta.producto_precio);

    console.log("🔢 Cantidad parseada:", cantidad, "isNaN:", isNaN(cantidad));
    console.log("🔢 Precio parseado:", precio, "isNaN:", isNaN(precio));

    // Solo calcular si tenemos tanto cantidad como precio válidos
    if (cantidad > 0 && precio > 0) {
      const total = cantidad * precio;
      const totalFormateado = total.toFixed(2);

      console.log("🔢 Total calculado:", totalFormateado);
      console.log(
        "🔢 Total actual en formulario:",
        venta.cantidad_vendida_precio
      );

      // Solo actualizar si el valor actual es diferente (evitar loops infinitos)
      if (venta.cantidad_vendida_precio !== totalFormateado) {
        console.log("🔢 Actualizando total en formulario");
        setVenta((prev) => ({
          ...prev,
          cantidad_vendida_precio: totalFormateado,
        }));
      } else {
        console.log("🔢 Total ya está actualizado, no se modifica");
      }
    } else {
      console.log("🔢 No se puede calcular: cantidad o precio inválidos");
    }
  }, [venta.cantidad_vendida_producto, venta.producto_precio]);

  // Manejar cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenta((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errores[name]) {
      setErrores((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    setLoading(true);
    try {
      // Preparar datos para envío con valores por defecto robustos
      const ventaData = {
        producto_id: parseInt(venta.producto_id),
        categoria_id:
          parseInt(venta.categoria_id) ||
          parseInt(productoSeleccionado?.categoria_id) ||
          0,
        cantidad_vendida_producto: parseInt(venta.cantidad_vendida_producto),
        producto_precio:
          parseFloat(venta.producto_precio) ||
          parseFloat(productoSeleccionado?.precio) ||
          0,
        cantidad_vendida_precio:
          parseFloat(venta.cantidad_vendida_precio) ||
          parseInt(venta.cantidad_vendida_producto) *
            parseFloat(
              venta.producto_precio || productoSeleccionado?.precio || 0
            ),
      };

      // Validación mínima
      if (!ventaData.producto_id || !ventaData.cantidad_vendida_producto) {
        throw new Error(
          "Faltan datos básicos: producto y cantidad son requeridos."
        );
      }

      if (ventaParaEditar) {
        // Estamos editando
        await onVentaActualizada(ventaParaEditar.id, ventaData);
        setNotificacion({
          mostrar: true,
          mensaje: "Venta actualizada exitosamente",
          tipo: "exito",
        });
      } else {
        // Estamos creando
        await onVentaCreada(ventaData);
        setNotificacion({
          mostrar: true,
          mensaje: "Venta registrada exitosamente",
          tipo: "exito",
        });
      }

      // Resetear formulario solo si estamos creando
      if (!ventaParaEditar) {
        setVenta({
          producto_id: "",
          categoria_id: "",
          cantidad_vendida_producto: "",
          producto_precio: "",
          cantidad_vendida_precio: "",
        });
        setProductoSeleccionado(null);
      }

      setTimeout(() => {
        setNotificacion({ mostrar: false, mensaje: "", tipo: "" });
        if (onCerrar) onCerrar();
      }, 2000);
    } catch (error) {
      setNotificacion({
        mostrar: true,
        mensaje:
          error.message ||
          `Error al ${ventaParaEditar ? "actualizar" : "registrar"} la venta`,
        tipo: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos cuando se está editando
  useEffect(() => {
    console.log("📝 useEffect disparado - ventaParaEditar:", ventaParaEditar);

    if (ventaParaEditar) {
      console.log("📝 Cargando datos para editar venta:", ventaParaEditar);

      setVenta({
        producto_id: ventaParaEditar.producto_id?.toString() || "",
        categoria_id: ventaParaEditar.categoria_id?.toString() || "",
        cantidad_vendida_producto:
          ventaParaEditar.cantidad_vendida_producto?.toString() || "",
        producto_precio: ventaParaEditar.producto_precio?.toString() || "",
        cantidad_vendida_precio:
          ventaParaEditar.cantidad_vendida_precio?.toString() || "",
      });

      console.log("📝 Estado de venta configurado para edición");

      // Si ya tenemos el producto_id, cargar los datos del producto
      if (ventaParaEditar.producto_id) {
        console.log(
          "📝 Cargando datos del producto para edición:",
          ventaParaEditar.producto_id
        );
        obtenerProductoPorId(ventaParaEditar.producto_id)
          .then((producto) => {
            if (producto) {
              console.log("📝 Producto cargado para edición:", producto);
              setProductoSeleccionado(producto);
            } else {
              console.log("❌ No se pudo cargar el producto para edición");
            }
          })
          .catch((error) => {
            console.error("❌ Error al cargar producto para edición:", error);
          });
      }
    } else {
      // Limpiar formulario cuando no estamos editando
      console.log("📝 Limpiando formulario - no hay venta para editar");
      setVenta({
        producto_id: "",
        categoria_id: "",
        cantidad_vendida_producto: "",
        producto_precio: "",
        cantidad_vendida_precio: "",
      });
      setProductoSeleccionado(null);
    }
  }, [ventaParaEditar, obtenerProductoPorId]);

  if (loadingData) {
    return <Loading />;
  }

  if (errorData) {
    return (
      <div className="form-container">
        <div className="error-message">Error al cargar datos: {errorData}</div>
      </div>
    );
  }

  return (
    <div className="formulario-venta">
      <h2 className="formulario-venta-titulo">
        {ventaParaEditar ? "Editar Venta" : "Registrar Nueva Venta"}
      </h2>

      <form onSubmit={handleSubmit} className="formulario">
        {/* Selector de Producto */}
        <div className="campo-grupo">
          <label htmlFor="producto_id" className="campo-label">
            Producto *
          </label>
          <select
            id="producto_id"
            name="producto_id"
            value={venta.producto_id}
            onChange={handleProductoChange}
            className={`campo-select ${errores.producto_id ? "error" : ""}`}
            disabled={loading}
          >
            <option value="">Seleccionar producto...</option>
            {productos.map((producto) => (
              <option key={producto.id} value={producto.id}>
                {producto.nombre} - Stock: {producto.cantidad} - $
                {producto.precio}
              </option>
            ))}
          </select>
          {errores.producto_id && (
            <span className="error-mensaje">{errores.producto_id}</span>
          )}
        </div>

        {/* Información del producto seleccionado */}
        {productoSeleccionado && (
          <div className="producto-info">
            <h4>Información del Producto</h4>
            <p>
              <strong>Producto:</strong> {productoSeleccionado.nombre}
            </p>
            <p>
              <strong>Stock disponible:</strong> {productoSeleccionado.cantidad}{" "}
              unidades
            </p>
            <p>
              <strong>Precio unitario:</strong> ${productoSeleccionado.precio}
            </p>
            <p>
              <strong>Categoría (nombre):</strong>{" "}
              {productoSeleccionado.categoria ||
                productoSeleccionado.categoria_id ||
                "Sin categoría"}
            </p>
            <p>
              <strong>Categoría ID (calculado):</strong>{" "}
              {venta.categoria_id || "No determinado"}
            </p>
            {(!venta.categoria_id || venta.categoria_id === "0") && (
              <p className="error-mensaje">
                ⚠️ Este producto no tiene una categoría válida
              </p>
            )}
          </div>
        )}

        {/* Error de categoría */}
        {errores.categoria_id && (
          <div className="error-mensaje">{errores.categoria_id}</div>
        )}

        {/* Cantidad a vender */}
        <div className="campo-grupo">
          <label htmlFor="cantidad_vendida_producto" className="campo-label">
            Cantidad a vender *
          </label>
          <input
            type="number"
            id="cantidad_vendida_producto"
            name="cantidad_vendida_producto"
            value={venta.cantidad_vendida_producto}
            onChange={handleChange}
            className={`campo-input ${
              errores.cantidad_vendida_producto ? "error" : ""
            }`}
            placeholder="Ingrese la cantidad"
            min="1"
            max={productoSeleccionado?.cantidad || 999}
            disabled={loading}
          />
          {errores.cantidad_vendida_producto && (
            <span className="error-mensaje">
              {errores.cantidad_vendida_producto}
            </span>
          )}
        </div>

        {/* Precio unitario (solo lectura) */}
        <div className="campo-grupo">
          <label htmlFor="producto_precio" className="campo-label">
            Precio unitario
          </label>
          <input
            type="number"
            id="producto_precio"
            name="producto_precio"
            value={venta.producto_precio}
            className="campo-input"
            placeholder="Se completará automáticamente"
            step="0.01"
            readOnly
          />
        </div>

        {/* Total de la venta */}
        {venta.cantidad_vendida_precio && (
          <div className="total-venta">
            <h3>Total de la venta: ${venta.cantidad_vendida_precio}</h3>
          </div>
        )}

        {/* Botones */}
        <div className="formulario-acciones">
          <button
            type="button"
            onClick={onCerrar}
            className="boton-cancelar"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="boton-guardar"
            disabled={
              loading || !venta.producto_id || !venta.cantidad_vendida_producto
            }
          >
            {loading
              ? ventaParaEditar
                ? "Actualizando..."
                : "Registrando..."
              : ventaParaEditar
              ? "Actualizar Venta"
              : "Registrar Venta"}
          </button>
        </div>
      </form>

      {notificacion.mostrar && (
        <Notificacion
          mensaje={notificacion.mensaje}
          tipo={notificacion.tipo}
          onClose={() =>
            setNotificacion({ mostrar: false, mensaje: "", tipo: "" })
          }
        />
      )}
    </div>
  );
};

export default FormularioVenta;
