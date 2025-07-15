/**
 * Script de pruebas manuales para el módulo de categorías
 * Ejecutar desde la consola del navegador para probar la integración
 */

// Configuración de prueba
const API_BASE_URL = "http://localhost:3001/api";

// Función helper para hacer requests
const testRequest = async (url, options = {}) => {
  try {
    console.log(`🚀 Probando: ${options.method || "GET"} ${url}`);
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      ...options,
    });

    console.log(`📊 Status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;
    console.log(`✅ Respuesta:`, data);
    return data;
  } catch (error) {
    console.error(`❌ Error:`, error.message);
    throw error;
  }
};

// Pruebas del API
const runAPITests = async () => {
  console.log("🧪 INICIANDO PRUEBAS DEL API DE CATEGORÍAS");
  console.log("================================================");

  try {
    // 1. Obtener todas las categorías
    console.log("\n1️⃣ Probando: Obtener todas las categorías");
    const categorias = await testRequest(`${API_BASE_URL}/categorias`);

    // 2. Crear nueva categoría
    console.log("\n2️⃣ Probando: Crear nueva categoría");
    const nuevaCategoria = await testRequest(`${API_BASE_URL}/categorias`, {
      method: "POST",
      body: JSON.stringify({
        nombre: "Categoría de Prueba",
        descripcion: "Esta es una categoría creada para testing",
      }),
    });

    const categoriaId = nuevaCategoria?.id;

    if (categoriaId) {
      // 3. Obtener categoría por ID
      console.log("\n3️⃣ Probando: Obtener categoría por ID");
      await testRequest(`${API_BASE_URL}/categorias/${categoriaId}`);

      // 4. Actualizar categoría
      console.log("\n4️⃣ Probando: Actualizar categoría");
      await testRequest(`${API_BASE_URL}/categorias/${categoriaId}`, {
        method: "PUT",
        body: JSON.stringify({
          nombre: "Categoría Actualizada",
          descripcion: "Descripción actualizada para testing",
        }),
      });

      // 5. Eliminar categoría
      console.log("\n5️⃣ Probando: Eliminar categoría");
      await testRequest(`${API_BASE_URL}/categorias/${categoriaId}`, {
        method: "DELETE",
      });
    }

    // 6. Obtener categorías más vendidas
    console.log("\n6️⃣ Probando: Obtener categorías más vendidas");
    await testRequest(`${API_BASE_URL}/categorias/mas-vendidas`);

    console.log("\n🎉 TODAS LAS PRUEBAS COMPLETADAS EXITOSAMENTE");
  } catch (error) {
    console.error("\n💥 ERROR EN LAS PRUEBAS:", error.message);
    console.log("\n🔍 Posibles causas:");
    console.log("   - El backend no está corriendo en http://localhost:3001");
    console.log("   - CORS no está configurado correctamente");
    console.log("   - Los endpoints no están implementados");
    console.log("   - Hay un error en la base de datos");
  }
};

// Pruebas de los componentes React (ejecutar en consola del navegador)
const testReactComponents = () => {
  console.log("🔧 PRUEBAS DE COMPONENTES REACT");
  console.log("================================");

  // Verificar que los servicios estén disponibles
  if (typeof window !== "undefined") {
    console.log("✅ Entorno del navegador detectado");

    // Verificar que React esté cargado
    if (window.React) {
      console.log("✅ React está cargado");
    } else {
      console.log("❌ React no está disponible");
    }

    // Verificar que los servicios estén importados
    console.log("📋 Para probar los componentes:");
    console.log("1. Navega a /categorias en tu aplicación");
    console.log("2. Abre DevTools y ve a la pestaña Components");
    console.log("3. Busca el componente Categorias");
    console.log("4. Verifica que los hooks useCategorias tengan datos");
  } else {
    console.log("❌ No estás en un entorno de navegador");
  }
};

// Función para verificar el estado del backend
const checkBackendHealth = async () => {
  console.log("🏥 VERIFICACIÓN DE SALUD DEL BACKEND");
  console.log("=====================================");

  try {
    // Verificar conectividad básica
    const response = await fetch(`${API_BASE_URL}/categorias`, {
      method: "HEAD",
      credentials: "include",
    });

    if (response.ok) {
      console.log("✅ Backend accesible");
      console.log(`📡 CORS headers:`, [...response.headers.entries()]);
    } else {
      console.log(`❌ Backend responde con error: ${response.status}`);
    }
  } catch (error) {
    console.log("❌ No se puede conectar al backend");
    console.log("🔍 Verifica que esté corriendo en http://localhost:3001");
  }
};

// Exportar funciones para uso manual
if (typeof window !== "undefined") {
  window.testCategorias = {
    runAPITests,
    testReactComponents,
    checkBackendHealth,
    testRequest,
  };

  console.log("🎯 HERRAMIENTAS DE TESTING CARGADAS");
  console.log("====================================");
  console.log("Ejecuta en la consola:");
  console.log("• testCategorias.checkBackendHealth() - Verificar backend");
  console.log("• testCategorias.runAPITests() - Probar todos los endpoints");
  console.log("• testCategorias.testReactComponents() - Info de componentes");
  console.log("");
  console.log("💡 También puedes ejecutar pruebas individuales:");
  console.log(
    '• testCategorias.testRequest("http://localhost:3001/api/categorias")'
  );
}

export { runAPITests, testReactComponents, checkBackendHealth, testRequest };
