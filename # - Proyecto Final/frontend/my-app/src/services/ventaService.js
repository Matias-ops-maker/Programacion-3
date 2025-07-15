const API_BASE_URL = "http://localhost:3001/api"; // Cambia el puerto si es necesario

class VentaService {
  /**
   * Obtiene todas las ventas
   */
  async obtenerTodasLasVentas() {
    try {
      const response = await fetch(`${API_BASE_URL}/ventas`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const data = await response.json();
      return data.ventas || [];
    } catch (error) {
      console.error("Error al obtener ventas:", error);

      if (error.name === "TypeError" || error.message.includes("fetch")) {
        throw new Error(
          "No se pudo conectar con el servidor. Verifica que esté ejecutándose en localhost:3001"
        );
      }

      throw new Error(`Error del servidor: ${error.message}`);
    }
  }

  /**
   * Obtiene las últimas 5 ventas
   */
  async obtenerUltimasVentas() {
    try {
      const response = await fetch(`${API_BASE_URL}/ventas/ultimas`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error HTTP! status: ${response.status}`);
      }

      const data = await response.json();
      return data.ventas || [];
    } catch (error) {
      console.error("Error al obtener últimas ventas:", error);
      throw error;
    }
  }

  /**
   * Crea una nueva venta
   */
  async crearVenta(venta) {
    try {
      // Mapear los datos al formato esperado por el backend
      const ventaParaBackend = {
        producto_id: venta.producto_id,
        categoria_id: venta.categoria_id,
        cantidad_vendida_producto: venta.cantidad_vendida_producto,
        producto_precio: venta.producto_precio,
        cantidad_vendida_precio: venta.cantidad_vendida_precio,
      };

      console.log("📤 Enviando venta al backend:", ventaParaBackend);

      const response = await fetch(`${API_BASE_URL}/ventas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(ventaParaBackend),
      });

      console.log("📥 Status de respuesta:", response.status);

      if (!response.ok) {
        let errorMessage = `Error del servidor: ${response.status}`;
        try {
          const errorData = await response.json();
          console.log("❌ Error del backend:", errorData);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (jsonError) {
          console.log("❌ Error al parsear respuesta del backend");
          // Si no se puede parsear la respuesta, usar un mensaje más descriptivo
          if (response.status === 400) {
            errorMessage =
              "Datos inválidos en la solicitud. Verifica que el producto existe y los datos están completos.";
          } else if (response.status === 500) {
            errorMessage =
              "Error interno del servidor. Contacta al administrador.";
          } else if (response.status === 0) {
            errorMessage =
              "No se pudo conectar con el servidor. Verifica que esté ejecutándose.";
          }
        }
        throw new Error(errorMessage);
      }

      // Verificar si hay contenido en la respuesta
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log("✅ Venta creada exitosamente:", data);
        return data;
      } else {
        console.log("✅ Venta creada (respuesta sin JSON)");
        return { message: "Venta registrada exitosamente" };
      }
    } catch (error) {
      console.error("❌ Error al registrar venta:", error);

      // Mejorar mensajes de error para el usuario
      if (error.name === "TypeError" || error.message.includes("fetch")) {
        throw new Error(
          "No se pudo conectar con el servidor. Verifica que esté ejecutándose en localhost:3001"
        );
      }

      throw error;
    }
  }

  /**
   * Actualiza una venta existente
   */
  async actualizarVenta(id, venta) {
    try {
      console.log("🔄 Iniciando actualización de venta con ID:", id);
      console.log("🔄 Datos originales recibidos:", venta);

      // Mapear los datos al formato esperado por el backend
      const ventaParaBackend = {
        producto_id: venta.producto_id,
        categoria_id: venta.categoria_id,
        cantidad_vendida_producto: venta.cantidad_vendida_producto,
        producto_precio: venta.producto_precio,
        cantidad_vendida_precio: venta.cantidad_vendida_precio,
      };

      console.log("🔄 Datos mapeados para el backend:", ventaParaBackend);

      const response = await fetch(`${API_BASE_URL}/ventas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(ventaParaBackend),
      });

      console.log("🔄 Status de respuesta de actualización:", response.status);

      if (!response.ok) {
        let errorMessage = `Error HTTP! status: ${response.status}`;
        try {
          const errorData = await response.json();
          console.log("❌ Error del backend al actualizar:", errorData);
          errorMessage = errorData.message || errorMessage;
        } catch (jsonError) {
          console.log("❌ Error al parsear JSON del error:", jsonError);
        }
        throw new Error(errorMessage);
      }

      // Verificar si hay contenido en la respuesta
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log("✅ Venta actualizada exitosamente:", data);
        return data;
      } else {
        console.log("✅ Venta actualizada (respuesta sin JSON)");
        return { message: "Venta actualizada exitosamente" };
      }
    } catch (error) {
      console.error("❌ Error al actualizar venta:", error);
      throw error;
    }
  }

  /**
   * Elimina una venta
   */
  async eliminarVenta(id) {
    try {
      console.log("🗑️ Iniciando eliminación de venta con ID:", id);

      const response = await fetch(`${API_BASE_URL}/ventas/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      console.log("🗑️ Status de respuesta de eliminación:", response.status);

      if (!response.ok) {
        let errorMessage = `Error HTTP! status: ${response.status}`;
        try {
          const errorData = await response.json();
          console.log("❌ Error del backend al eliminar:", errorData);
          errorMessage = errorData.message || errorMessage;
        } catch (jsonError) {
          console.log("❌ Error al parsear JSON del error:", jsonError);
        }
        throw new Error(errorMessage);
      }

      console.log("✅ Venta eliminada exitosamente");
      return { message: "Venta eliminada exitosamente" };
    } catch (error) {
      console.error("❌ Error al eliminar venta:", error);
      throw error;
    }
  }

  /**
   * Obtiene una venta por ID
   */
  async obtenerVentaPorId(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/ventas/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Venta no encontrada");
        }
        throw new Error(`Error HTTP! status: ${response.status}`);
      }

      const data = await response.json();
      return data.venta;
    } catch (error) {
      console.error("Error al obtener venta:", error);
      throw error;
    }
  }

  /**
   * Obtiene estadísticas de ventas
   */
  async obtenerEstadisticasVentas() {
    try {
      const [ventas, ultimasVentas] = await Promise.all([
        this.obtenerTodasLasVentas(),
        this.obtenerUltimasVentas(),
      ]);

      // Calcular estadísticas básicas
      const totalVentas = ventas.length;
      const totalIngresos = ventas.reduce(
        (sum, venta) => sum + (venta.cantidad_vendida_precio || 0),
        0
      );
      const ventasHoy = ventas.filter((venta) => {
        const fechaVenta = new Date(venta.fecha);
        const hoy = new Date();
        return fechaVenta.toDateString() === hoy.toDateString();
      }).length;

      return {
        totalVentas,
        totalIngresos,
        ventasHoy,
        ultimasVentas,
      };
    } catch (error) {
      console.error("Error al obtener estadísticas de ventas:", error);
      throw error;
    }
  }
}

export default new VentaService();
