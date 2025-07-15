import { useState, useEffect, useCallback } from "react";
import productoService from "../services/productoService";

const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Estados para dashboard
  const [ultimosProductos, setUltimosProductos] = useState([]);
  const [productosMasVendidos, setProductosMasVendidos] = useState([]);
  const [productosSinStock, setProductosSinStock] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const cargarProductos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productoService.obtenerTodosLosProductos();
      // Si data es un array (incluso vacío), es una respuesta válida
      setProductos(Array.isArray(data) ? data : []);
    } catch (err) {
      // Solo mostrar error si hay un problema real de conexión
      setError(err.message);
      console.error("Error al cargar productos:", err);
      // En caso de error, establecer array vacío
      setProductos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const cargarCategorias = useCallback(async () => {
    try {
      const data = await productoService.obtenerTodasLasCategorias();
      setCategorias(data);
    } catch (err) {
      console.error("Error al cargar categorías:", err);
    }
  }, []);

  const cargarDashboardData = useCallback(async () => {
    try {
      const [ultimos, masVendidos, sinStock] = await Promise.all([
        productoService.obtenerUltimosProductos(),
        productoService.obtenerProductosMasVendidos(),
        productoService.obtenerProductosSinStock(),
      ]);

      setUltimosProductos(ultimos);
      setProductosMasVendidos(masVendidos);
      setProductosSinStock(sinStock);
    } catch (err) {
      console.error("Error al cargar datos del dashboard:", err);
    }
  }, []);

  const crearProducto = async (nuevoProducto) => {
    setLoading(true);
    setError(null);
    try {
      const producto = await productoService.crearProducto(nuevoProducto);
      await cargarProductos(); // Recargar la lista
      return producto;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const actualizarProducto = async (id, datosActualizados) => {
    setLoading(true);
    setError(null);
    try {
      const producto = await productoService.actualizarProducto(
        id,
        datosActualizados
      );
      await cargarProductos(); // Recargar la lista
      return producto;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const eliminarProducto = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await productoService.eliminarProducto(id);
      await cargarProductos(); // Recargar la lista
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const obtenerProductoPorId = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const producto = await productoService.obtenerProductoPorId(id);
      return producto;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
    // Solo cargar categorías básicas, sin dashboard data para evitar sobrecargar el backend
    cargarCategorias();
  }, [cargarProductos, cargarCategorias]);

  return {
    // Estados
    productos,
    loading,
    error,
    ultimosProductos,
    productosMasVendidos,
    productosSinStock,
    categorias,

    // Funciones
    cargarProductos,
    cargarCategorias,
    cargarDashboardData,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    obtenerProductoPorId,

    // Utilidades
    setError,
  };
};

export default useProductos;
