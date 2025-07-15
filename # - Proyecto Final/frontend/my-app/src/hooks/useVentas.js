import { useState, useEffect, useCallback } from "react";
import ventaService from "../services/ventaService";
import productoService from "../services/productoService";

export const useVentas = () => {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar todas las ventas
  const cargarVentas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const ventasData = await ventaService.obtenerTodasLasVentas();
      setVentas(ventasData);
    } catch (err) {
      setError(err.message);
      console.error("Error al cargar ventas:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear nueva venta
  const crearVenta = async (ventaData) => {
    setLoading(true);
    setError(null);
    try {
      const nuevaVenta = await ventaService.crearVenta(ventaData);
      await cargarVentas(); // Recargar ventas después de crear
      return nuevaVenta;
    } catch (err) {
      setError(err.message);
      console.error("Error al crear venta:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar venta existente
  const actualizarVenta = async (id, ventaData) => {
    console.log(
      "🔄 [useVentas] Iniciando actualización de venta:",
      id,
      ventaData
    );
    setLoading(true);
    setError(null);
    try {
      const ventaActualizada = await ventaService.actualizarVenta(
        id,
        ventaData
      );
      console.log(
        "🔄 [useVentas] Venta actualizada exitosamente:",
        ventaActualizada
      );
      await cargarVentas(); // Recargar ventas después de actualizar
      return ventaActualizada;
    } catch (err) {
      console.error("❌ [useVentas] Error al actualizar venta:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar venta
  const eliminarVenta = async (id) => {
    console.log("🗑️ [useVentas] Iniciando eliminación de venta:", id);
    setLoading(true);
    setError(null);
    try {
      const resultado = await ventaService.eliminarVenta(id);
      console.log("🗑️ [useVentas] Venta eliminada exitosamente:", resultado);
      await cargarVentas(); // Recargar ventas después de eliminar
      return resultado;
    } catch (err) {
      console.error("❌ [useVentas] Error al eliminar venta:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Obtener venta por ID
  const obtenerVentaPorId = async (id) => {
    try {
      return await ventaService.obtenerVentaPorId(id);
    } catch (err) {
      setError(err.message);
      console.error("Error al obtener venta:", err);
      return null;
    }
  };

  // Obtener últimas ventas
  const obtenerUltimasVentas = async () => {
    try {
      return await ventaService.obtenerUltimasVentas();
    } catch (err) {
      setError(err.message);
      console.error("Error al obtener últimas ventas:", err);
      return [];
    }
  };

  // Obtener estadísticas
  const obtenerEstadisticas = async () => {
    try {
      return await ventaService.obtenerEstadisticasVentas();
    } catch (err) {
      setError(err.message);
      console.error("Error al obtener estadísticas:", err);
      return null;
    }
  };

  useEffect(() => {
    cargarVentas();
  }, [cargarVentas]);

  return {
    ventas,
    loading,
    error,
    cargarVentas,
    crearVenta,
    actualizarVenta,
    eliminarVenta,
    obtenerVentaPorId,
    obtenerUltimasVentas,
    obtenerEstadisticas,
    setError,
  };
};

export const useProductosParaVentas = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar productos y categorías para formulario de ventas
  const cargarDatos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [productosData, categoriasData] = await Promise.all([
        productoService.obtenerTodosLosProductos(),
        productoService.obtenerTodasLasCategorias(),
      ]);

      console.log("📦 Productos cargados:", productosData);
      console.log("📂 Categorías cargadas:", categoriasData);
      console.log("📂 Estructura de primera categoría:", categoriasData[0]);

      // Verificar qué productos tienen categoria_id válido
      const productosConCategoria = productosData.filter(
        (p) => p.categoria_id && p.categoria_id > 0
      );
      const productosSinCategoria = productosData.filter(
        (p) => !p.categoria_id || p.categoria_id === 0
      );

      console.log(
        "✅ Productos con categoría válida:",
        productosConCategoria.length
      );
      console.log(
        "❌ Productos sin categoría:",
        productosSinCategoria.length,
        productosSinCategoria
      );

      setProductos(productosData);
      setCategorias(categoriasData);
    } catch (err) {
      setError(err.message);
      console.error("Error al cargar datos para ventas:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener producto por ID
  const obtenerProductoPorId = async (id) => {
    try {
      return await productoService.obtenerProductoPorId(id);
    } catch (err) {
      setError(err.message);
      console.error("Error al obtener producto:", err);
      return null;
    }
  };

  // Buscar categoría por nombre y devolver su ID
  const buscarCategoriaIdPorNombre = (nombreCategoria) => {
    console.log("🔍 [buscarCategoriaIdPorNombre] Iniciando búsqueda");
    console.log(
      "🔍 [buscarCategoriaIdPorNombre] Nombre a buscar:",
      nombreCategoria
    );
    console.log(
      "🔍 [buscarCategoriaIdPorNombre] Tipo:",
      typeof nombreCategoria
    );
    console.log(
      "🔍 [buscarCategoriaIdPorNombre] Categorías disponibles:",
      categorias
    );
    console.log(
      "🔍 [buscarCategoriaIdPorNombre] Cantidad de categorías:",
      categorias.length
    );

    if (!nombreCategoria || !categorias.length) {
      console.log(
        "❌ [buscarCategoriaIdPorNombre] No hay nombre de categoría o categorías cargadas"
      );
      return null;
    }

    // Normalizar el nombre de búsqueda
    const nombreNormalizado = nombreCategoria.toString().trim().toLowerCase();
    console.log(
      "🔍 [buscarCategoriaIdPorNombre] Nombre normalizado:",
      nombreNormalizado
    );

    // Mostrar todas las categorías disponibles para debug
    categorias.forEach((cat, index) => {
      console.log(`🔍 [buscarCategoriaIdPorNombre] Categoría ${index}:`, {
        id: cat.id,
        nombre: cat.nombre,
        nombreNormalizado: cat.nombre
          ? cat.nombre.toString().trim().toLowerCase()
          : "undefined",
      });
    });

    // Buscar por coincidencia exacta
    let categoriaEncontrada = categorias.find((cat) => {
      const nombreCat = cat.nombre
        ? cat.nombre.toString().trim().toLowerCase()
        : "";
      const coincide = nombreCat === nombreNormalizado;
      console.log(
        `🔍 [buscarCategoriaIdPorNombre] Comparando "${nombreNormalizado}" === "${nombreCat}": ${coincide}`
      );
      return coincide;
    });

    if (!categoriaEncontrada) {
      // Buscar por coincidencia parcial
      console.log(
        "🔍 [buscarCategoriaIdPorNombre] No encontrada coincidencia exacta, buscando parcial..."
      );
      categoriaEncontrada = categorias.find((cat) => {
        const nombreCat = cat.nombre
          ? cat.nombre.toString().trim().toLowerCase()
          : "";
        const coincideParcial =
          nombreCat.includes(nombreNormalizado) ||
          nombreNormalizado.includes(nombreCat);
        if (coincideParcial) {
          console.log(
            `🔍 [buscarCategoriaIdPorNombre] Coincidencia parcial encontrada: "${nombreCat}" con "${nombreNormalizado}"`
          );
        }
        return coincideParcial;
      });
    }

    if (categoriaEncontrada) {
      console.log(
        "✅ [buscarCategoriaIdPorNombre] Categoría encontrada:",
        categoriaEncontrada
      );
      console.log(
        "✅ [buscarCategoriaIdPorNombre] ID:",
        categoriaEncontrada.id
      );
      return categoriaEncontrada.id;
    } else {
      console.log(
        "❌ [buscarCategoriaIdPorNombre] No se encontró categoría con nombre:",
        nombreCategoria
      );
      console.log(
        "❌ [buscarCategoriaIdPorNombre] Nombres disponibles:",
        categorias.map((c) => c.nombre)
      );
      return null;
    }
  };

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  return {
    productos,
    categorias,
    loading,
    error,
    cargarDatos,
    obtenerProductoPorId,
    buscarCategoriaIdPorNombre,
    setError,
  };
};
