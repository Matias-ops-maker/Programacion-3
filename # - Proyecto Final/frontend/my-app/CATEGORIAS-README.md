# 🏷️ Módulo de Categorías - Documentación

## 📋 Descripción General

El módulo de categorías es una implementación completa para gestionar categorías de productos en una aplicación de e-commerce. Está construido con **React** y utiliza **fetch nativo** para la comunicación con el backend.

## 🚀 Características Principales

- ✅ **CRUD Completo**: Crear, leer, actualizar y eliminar categorías
- ✅ **Dashboard de Estadísticas**: Top 5 categorías más vendidas
- ✅ **Interfaz Moderna**: Diseño responsive y user-friendly
- ✅ **Manejo de Estados**: Loading, errores y datos con hooks personalizados
- ✅ **Notificaciones**: Sistema de toast para feedback al usuario
- ✅ **Validación de Formularios**: Validación client-side completa
- ✅ **Confirmación de Acciones**: Modal para confirmar eliminaciones
- ✅ **Arquitectura Escalable**: Servicios, hooks y contextos separados

## 🏗️ Arquitectura

```
src/
├── services/
│   └── categoriaService.js         # Servicio API con fetch
├── hooks/
│   └── useCategorias.js           # Hook para manejo de estado
├── context/
│   └── CategoriasContext.jsx      # Contexto global (opcional)
├── componentes/
│   ├── FormularioCategoria.jsx    # Formulario crear/editar
│   ├── ListaCategorias.jsx        # Tabla de categorías
│   ├── TopCategorias.jsx          # Dashboard estadísticas
│   ├── Loading.jsx                # Componente de carga
│   ├── Modal.jsx                  # Modal de confirmación
│   ├── Notificacion.jsx           # Sistema de notificaciones
│   └── styles/                    # Archivos CSS
└── pages/
    ├── Categorias.jsx             # Página principal
    └── DashboardCategorias.jsx    # Dashboard separado
```

## 🔧 API Endpoints

El módulo se conecta a los siguientes endpoints del backend:

| Método | Endpoint                       | Descripción                   |
| ------ | ------------------------------ | ----------------------------- |
| GET    | `/api/categorias`              | Obtener todas las categorías  |
| GET    | `/api/categorias/:id`          | Obtener categoría por ID      |
| POST   | `/api/categorias`              | Crear nueva categoría         |
| PUT    | `/api/categorias/:id`          | Actualizar categoría          |
| DELETE | `/api/categorias/:id`          | Eliminar categoría            |
| GET    | `/api/categorias/mas-vendidas` | Top 5 categorías más vendidas |

## 📦 Instalación y Uso

### 1. Configurar el Backend

Asegúrate de que tu backend esté corriendo en `http://localhost:3001` con CORS configurado para `http://localhost:3000`.

### 2. Importar en tu Aplicación

```jsx
// En App.jsx - Las rutas ya están configuradas
import Categorias from "./pages/Categorias";

// En tu router
<Route
  path="/categorias"
  element={
    <ProtectedRoute>
      <Categorias />
    </ProtectedRoute>
  }
/>;
```

### 3. Usar el Hook de Categorías

```jsx
import { useCategorias } from "../hooks/useCategorias";

const MiComponente = () => {
  const {
    categorias,
    loading,
    error,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria,
  } = useCategorias();

  // Tu lógica aquí...
};
```

### 4. Usar el Servicio Directamente

```jsx
import categoriaService from "../services/categoriaService";

// Crear categoría
const nuevaCategoria = await categoriaService.crearCategoria({
  nombre: "Electronics",
  descripcion: "Electronic devices",
});

// Obtener todas
const categorias = await categoriaService.obtenerTodasLasCategorias();
```

## 🎨 Componentes Principales

### 📋 ListaCategorias

Muestra todas las categorías en formato tabla con:

- Paginación automática
- Acciones de editar/eliminar
- Estado de carga
- Mensajes de estado vacío

### 📝 FormularioCategoria

Formulario para crear/editar categorías con:

- Validación en tiempo real
- Contadores de caracteres
- Manejo de errores
- Estados de loading

### 📊 TopCategorias

Dashboard que muestra:

- Top 5 categorías más vendidas
- Barras de progreso animadas
- Estadísticas de ventas
- Diseño de ranking visual

### 🔔 Sistema de Notificaciones

- Notificaciones toast automáticas
- Tipos: éxito, error, información
- Auto-dismiss configurable
- Diseño responsive

## 🛠️ Personalización

### Cambiar URL del API

```javascript
// En categoriaService.js
const API_BASE_URL = "http://tu-dominio.com/api";
```

### Personalizar Estilos

Los estilos están separados en archivos CSS individuales:

- `Categorias.css` - Página principal
- `ListaCategorias.css` - Tabla de categorías
- `FormularioCategoria.css` - Formulario
- `TopCategorias.css` - Dashboard
- `Modal.css` - Modales
- `Notificaciones.css` - Sistema de notificaciones

### Agregar Validaciones

```javascript
// En FormularioCategoria.jsx
const validateForm = () => {
  const newErrors = {};

  // Agregar tus validaciones aquí
  if (formData.nombre.length < 3) {
    newErrors.nombre = "Mínimo 3 caracteres";
  }

  return Object.keys(newErrors).length === 0;
};
```

## 🔍 Manejo de Errores

El módulo incluye manejo completo de errores:

```javascript
// Errores HTTP del servidor
if (!response.ok) {
  throw new Error(`Error HTTP! status: ${response.status}`);
}

// Errores de red
catch (error) {
  console.error('Error al obtener categorías:', error);
  throw new Error('No se pudieron cargar las categorías.');
}
```

## 📱 Responsive Design

- **Desktop**: Tabla completa con todas las columnas
- **Tablet**: Tabla condensada con acciones verticales
- **Mobile**: Oculta columnas menos importantes, botones full-width

## 🚀 Próximas Mejoras

- [ ] Búsqueda y filtros avanzados
- [ ] Exportación a CSV/Excel
- [ ] Drag & drop para reordenar
- [ ] Vista de cards alternativa
- [ ] Bulk operations (selección múltiple)
- [ ] Historial de cambios
- [ ] Cache con localStorage

## 🐛 Troubleshooting

### Error de CORS

```
Access to fetch at 'http://localhost:3001/api/categorias' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solución**: Configurar CORS en el backend para permitir `http://localhost:3000`

### Error 404 en endpoints

```
HTTP error! status: 404
```

**Solución**: Verificar que el backend esté corriendo y los endpoints estén disponibles

### Error de red

```
Failed to fetch
```

**Solución**: Verificar conexión y que el backend esté accesible en `http://localhost:3001`

## 📞 Soporte

Si tienes problemas o preguntas:

1. Revisa la consola del navegador para errores detallados
2. Verifica que el backend esté corriendo correctamente
3. Confirma que los endpoints responden con los formatos JSON esperados

---

**Desarrollado con ❤️ usando React + Fetch nativo**
