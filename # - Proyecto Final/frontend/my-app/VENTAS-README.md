# 🚀 Implementación de Funcionalidad de Ventas - Frontend (Diseño Original Mantenido)

## ✅ Archivos Creados/Modificados

### 📁 Nuevos Servicios

- `src/services/ventaService.js` - Servicio para manejar API de ventas
- `src/hooks/useVentas.js` - Hook personalizado para gestión de ventas

### 🧩 Nuevos Componentes

- `src/componentes/FormularioVenta.jsx` - Formulario para registrar ventas (modal)
- `src/components/TestConexionAPI.jsx` - Componente de prueba (temporal)

### 📄 Páginas Modificadas

- `src/pages/Ventas.jsx` - **Mantiene el diseño original** pero conectado con API
- `src/componentes/styles/Ventas.css` - **Limpiado y restaurado al diseño original**

## 🎯 **Lo que se mantuvo del diseño original:**

### ✅ **Interfaz Original Preservada**

- **Tabla tradicional** con las mismas columnas (añadida columna "Fecha")
- **Filtros originales** (búsqueda y categorías)
- **Paginación original** intacta
- **Estilos CSS originales** completamente mantenidos
- **Layout y colores** exactamente iguales

### 🔗 **Funcionalidades Agregadas Sin Cambiar Diseño:**

1. **Conexión Real con API**

   - Reemplaza datos simulados con llamadas reales al backend
   - Carga automática de ventas desde `http://localhost:3001/api/ventas`
   - Estados de carga y error apropiados

2. **Formulario de Nueva Venta** (Modal)

   - Se abre al hacer clic en "Agregar Venta"
   - Formulario inteligente con validaciones
   - Selección de productos con información automática
   - Cálculo automático de totales
   - Validación de stock disponible

3. **Datos Reales**
   - Fechas reales de las ventas
   - Productos y categorías del backend
   - Filtros funcionando con datos reales
   - Formateo de precios en euros

## 🆕 **Nuevas Funcionalidades Agregadas (CRUD Completo):**

### ✅ **Crear Ventas**

- Formulario modal con validaciones completas
- Selección inteligente de productos
- Cálculo automático de totales
- Validación de stock disponible

### ✅ **Editar Ventas**

- Botón de editar en cada fila de la tabla
- El mismo formulario se reutiliza para edición
- Carga automática de datos existentes
- Actualización en tiempo real

### ✅ **Eliminar Ventas**

- Botón de eliminar con confirmación
- Diálogo de confirmación antes de eliminar
- Actualización automática de la lista

### ✅ **Ver Ventas**

- Tabla completa con todas las ventas
- Filtros por categoría y búsqueda
- Paginación funcionando
- Formateo de fechas y precios

## 🔧 **Rutas del Backend Requeridas:**

```
GET    /api/ventas/           - Obtener todas las ventas
GET    /api/ventas/:id        - Obtener venta por ID
POST   /api/ventas/           - Crear nueva venta
PUT    /api/ventas/:id        - Actualizar venta existente
DELETE /api/ventas/:id        - Eliminar venta
GET    /api/productos/        - Obtener productos
GET    /api/categorias/       - Obtener categorías
```

## 📊 **Estructura de Datos Completa:**

**Para Editar (GET /api/ventas/:id)**:

```json
{
  "venta": {
    "id": 1,
    "producto_id": 1,
    "categoria_id": 2,
    "producto": "Nombre del producto",
    "categoria": "Nombre de la categoría",
    "cantidad_vendida_producto": 5,
    "producto_precio": 25.5,
    "cantidad_vendida_precio": 127.5,
    "fecha": "2025-01-15T10:30:00Z"
  }
}
```

**Para Actualizar (PUT /api/ventas/:id)**:

```json
{
  "producto_id": 1,
  "categoria_id": 2,
  "cantidad_vendida_producto": 3,
  "producto_precio": 15.0,
  "cantidad_vendida_precio": 45.0
}
```

## 🎯 **Cómo Usar las Nuevas Funciones:**

### **Crear Nueva Venta:**

1. Haz clic en el botón **"Agregar Venta"**
2. Selecciona un producto del dropdown
3. Ingresa la cantidad a vender
4. El precio y total se calculan automáticamente
5. Haz clic en **"Registrar Venta"**

### **Editar Venta Existente:**

1. En la tabla, haz clic en el botón **✏️ (editar)** de la venta que quieres modificar
2. Se abrirá el mismo formulario con los datos cargados
3. Modifica los campos que necesites
4. Haz clic en **"Actualizar Venta"**

### **Eliminar Venta:**

1. En la tabla, haz clic en el botón **🗑️ (eliminar)** de la venta
2. Confirma la eliminación en el diálogo que aparece
3. La venta se eliminará inmediatamente

## 🔒 **Validaciones Implementadas:**

- ✅ **Stock suficiente**: No puedes vender más de lo que hay en stock
- ✅ **Campos obligatorios**: Producto y cantidad son requeridos
- ✅ **Cantidades positivas**: Solo números mayores a 0
- ✅ **Confirmación de eliminación**: Previene eliminaciones accidentales
- ✅ **Manejo de errores**: Mensajes claros en caso de problemas

## 🎨 **Interfaz de Usuario:**

### **Tabla con Acciones:**

```
| Fecha | Producto | Categoría | Cantidad | Precio Unit. | Total | Acciones |
|-------|----------|-----------|----------|--------------|-------|----------|
| ...   | ...      | ...       | ...      | ...          | ...   | ✏️ 🗑️   |
```

### **Botones de Acción:**

- **✏️ Editar**: Abre el formulario en modo edición
- **🗑️ Eliminar**: Elimina la venta con confirmación

### **Estados del Formulario:**

- **Crear**: Título "Registrar Nueva Venta", botón "Registrar Venta"
- **Editar**: Título "Editar Venta", botón "Actualizar Venta"

## 🚨 **Manejo de Errores:**

- **Error de conexión**: Mensaje claro sobre problemas de red
- **Venta no encontrada**: Error 404 manejado apropiadamente
- **Validaciones del servidor**: Errores del backend mostrados al usuario
- **Stock insuficiente**: Validación en tiempo real

## 🛠️ Instrucciones de Uso

### 1. **Verificar Backend**

Asegúrate de que tu backend esté ejecutándose en `http://localhost:3001` con las siguientes rutas:

```
GET  /api/ventas/           - Obtener todas las ventas
POST /api/ventas/           - Crear nueva venta
GET  /api/productos/        - Obtener productos
GET  /api/categorias/       - Obtener categorías
```

### 2. **Probar Conexión** (Opcional)

Puedes temporalmente agregar el componente de prueba a tu App.jsx:

```jsx
import TestConexionAPI from "./components/TestConexionAPI";

// Agregar en tu App.jsx temporalmente
<Route path="/test-api" element={<TestConexionAPI />} />;
```

### 3. **Usar la Aplicación**

1. Ve a `/ventas` en tu aplicación
2. Verás la **misma interfaz de siempre** pero con datos reales
3. Usa el botón **"Agregar Venta"** para registrar nuevas ventas
4. Los filtros y búsqueda funcionan con los datos del backend

## 📊 **Estructura de Datos Esperada**

**Ventas (GET /api/ventas/)**:

```json
{
  "ventas": [
    {
      "id": 1,
      "producto": "Nombre del producto",
      "categoria": "Nombre de la categoría",
      "cantidad_vendida_producto": 5,
      "producto_precio": 25.5,
      "cantidad_vendida_precio": 127.5,
      "fecha": "2025-01-15T10:30:00Z"
    }
  ]
}
```

**Crear Venta (POST /api/ventas/)**:

```json
{
  "producto_id": 1,
  "categoria_id": 2,
  "cantidad_vendida_producto": 3,
  "producto_precio": 15.0,
  "cantidad_vendida_precio": 45.0
}
```

## 🎨 **Qué NO se cambió:**

- ❌ **NO** se cambió el layout principal
- ❌ **NO** se agregaron dashboards o vistas adicionales
- ❌ **NO** se modificaron los colores o fuentes
- ❌ **NO** se alteró la estructura de la tabla
- ❌ **NO** se cambiaron los botones o elementos de navegación

## 🔧 **Qué SÍ se agregó:**

- ✅ **Conexión real** con el backend
- ✅ **Formulario modal** para nuevas ventas
- ✅ **Estados de carga** discretos
- ✅ **Manejo de errores** sin alterar la UI
- ✅ **Notificaciones** sutiles
- ✅ **Formateo de fechas y precios**

## 🐛 Solución de Problemas

### Error de Conexión

```
No se pudo conectar con el servidor. Verifica que esté ejecutándose en localhost:3001
```

- Verifica que el backend esté en puerto 3001
- Revisa los logs del servidor backend
- Confirma que CORS esté configurado correctamente

### Datos No Aparecen

- Verifica el formato de respuesta de la API usando el componente de prueba
- Revisa la consola del navegador para errores
- Confirma que la estructura de datos coincida con la esperada

### Formulario No Funciona

- Verifica que existan productos en el backend
- Confirma que las categorías estén asociadas a los productos
- Revisa que el stock sea mayor a 0

## 📝 **Diferencias con la Versión Anterior:**

### Antes (Datos Simulados):

```jsx
const simulacionProductos = [
  {
    id: 1,
    nombre: "Producto 1",
    categoria: "Categoria 1",
    precio: 100,
    cantidad: 4,
  },
  // ...más datos simulados
];
```

### Ahora (Datos Reales):

```jsx
const { ventas, loading, error, crearVenta } = useVentas();
// Los datos vienen directamente del backend
```

---

✅ **¡El diseño original se mantiene intacto, solo se agregó la conectividad real con el backend!**

La interfaz luce y se comporta exactamente igual, pero ahora funciona con datos reales de tu base de datos.
