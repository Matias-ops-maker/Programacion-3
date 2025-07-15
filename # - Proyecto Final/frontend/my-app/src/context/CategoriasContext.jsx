import React, { createContext, useContext, useReducer, useEffect } from "react";
import categoriaService from "../services/categoriaService";

// Estado inicial
const initialState = {
  categorias: [],
  categoriasVendidas: [],
  loading: false,
  error: null,
  lastUpdate: null,
};

// Tipos de acciones
const ACTIONS = {
  SET_LOADING: "SET_LOADING",
  SET_CATEGORIAS: "SET_CATEGORIAS",
  SET_CATEGORIAS_VENDIDAS: "SET_CATEGORIAS_VENDIDAS",
  SET_ERROR: "SET_ERROR",
  ADD_CATEGORIA: "ADD_CATEGORIA",
  UPDATE_CATEGORIA: "UPDATE_CATEGORIA",
  DELETE_CATEGORIA: "DELETE_CATEGORIA",
  CLEAR_ERROR: "CLEAR_ERROR",
};

// Reducer
const categoriasReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };

    case ACTIONS.SET_CATEGORIAS:
      return {
        ...state,
        categorias: action.payload,
        lastUpdate: new Date().toISOString(),
        error: null,
      };

    case ACTIONS.SET_CATEGORIAS_VENDIDAS:
      return {
        ...state,
        categoriasVendidas: action.payload,
        error: null,
      };

    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };

    case ACTIONS.ADD_CATEGORIA:
      return {
        ...state,
        categorias: [...state.categorias, action.payload],
        error: null,
      };

    case ACTIONS.UPDATE_CATEGORIA:
      return {
        ...state,
        categorias: state.categorias.map((cat) =>
          cat.id === action.payload.id
            ? { ...cat, ...action.payload.data }
            : cat
        ),
        error: null,
      };

    case ACTIONS.DELETE_CATEGORIA:
      return {
        ...state,
        categorias: state.categorias.filter((cat) => cat.id !== action.payload),
        error: null,
      };

    case ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

// Contexto
const CategoriasContext = createContext();

// Provider
export const CategoriasProvider = ({ children }) => {
  const [state, dispatch] = useReducer(categoriasReducer, initialState);

  // Cargar categorías
  const cargarCategorias = async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const categorias = await categoriaService.obtenerTodasLasCategorias();
      dispatch({ type: ACTIONS.SET_CATEGORIAS, payload: categorias });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  // Cargar categorías más vendidas
  const cargarCategoriasVendidas = async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const categoriasVendidas =
        await categoriaService.obtenerCategoriasMasVendidas();
      dispatch({
        type: ACTIONS.SET_CATEGORIAS_VENDIDAS,
        payload: categoriasVendidas,
      });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  // Crear categoría
  const crearCategoria = async (categoria) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const nuevaCategoria = await categoriaService.crearCategoria(categoria);
      dispatch({ type: ACTIONS.ADD_CATEGORIA, payload: nuevaCategoria });
      return nuevaCategoria;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  // Actualizar categoría
  const actualizarCategoria = async (id, categoria) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      await categoriaService.actualizarCategoria(id, categoria);
      dispatch({
        type: ACTIONS.UPDATE_CATEGORIA,
        payload: { id, data: categoria },
      });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  // Eliminar categoría
  const eliminarCategoria = async (id) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      await categoriaService.eliminarCategoria(id);
      dispatch({ type: ACTIONS.DELETE_CATEGORIA, payload: id });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  // Limpiar error
  const limpiarError = () => {
    dispatch({ type: ACTIONS.CLEAR_ERROR });
  };

  // Cargar datos iniciales
  useEffect(() => {
    cargarCategorias();
  }, []);

  const value = {
    ...state,
    cargarCategorias,
    cargarCategoriasVendidas,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria,
    limpiarError,
  };

  return (
    <CategoriasContext.Provider value={value}>
      {children}
    </CategoriasContext.Provider>
  );
};

// Hook personalizado
export const useCategoriasContext = () => {
  const context = useContext(CategoriasContext);
  if (!context) {
    throw new Error(
      "useCategoriasContext debe usarse dentro de CategoriasProvider"
    );
  }
  return context;
};

export default CategoriasContext;
