import { useState, useEffect, useCallback } from "react";
import categoriaService from "../services/categoriaService";

export const useCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargarCategorias = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const categoriasData = await categoriaService.obtenerTodasLasCategorias();
      setCategorias(categoriasData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const crearCategoria = async (categoria) => {
    setLoading(true);
    setError(null);
    try {
      const nuevaCategoria = await categoriaService.crearCategoria(categoria);
      setCategorias((prev) => [...prev, nuevaCategoria]);
      return nuevaCategoria;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const actualizarCategoria = async (id, categoria) => {
    setLoading(true);
    setError(null);
    try {
      await categoriaService.actualizarCategoria(id, categoria);
      setCategorias((prev) =>
        prev.map((cat) => (cat.id === id ? { ...cat, ...categoria } : cat))
      );
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const eliminarCategoria = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await categoriaService.eliminarCategoria(id);
      setCategorias((prev) => prev.filter((cat) => cat.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, [cargarCategorias]);

  return {
    categorias,
    loading,
    error,
    cargarCategorias,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria,
  };
};

export const useCategoriasVendidas = () => {
  const [categoriasVendidas, setCategoriasVendidas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargarCategoriasVendidas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await categoriaService.obtenerCategoriasMasVendidas();
      setCategoriasVendidas(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarCategoriasVendidas();
  }, [cargarCategoriasVendidas]);

  return {
    categoriasVendidas,
    loading,
    error,
    cargarCategoriasVendidas,
  };
};
