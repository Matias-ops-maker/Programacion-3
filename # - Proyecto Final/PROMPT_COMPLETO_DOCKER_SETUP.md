# 🚀 **COMANDOS DOCKER - PASO A PASO EJECUTADOS**

## 📋 **Contexto**

Secuencia exacta de comandos para configurar y ejecutar el proyecto Docker Full Stack después de hacer `git clone`. Todos los archivos Docker ya están en el repositorio.

---

## 🛠️ **COMANDOS EN ORDEN EJECUTADO**

### **Paso 1: Preparación Inicial**

```powershell
# Navegar al directorio del proyecto
cd "C:\Users\User\Desktop\completo\Programacion-3\# - Proyecto Final"

# Verificar que Docker esté funcionando
docker --version
docker-compose --version

# Limpiar cualquier configuración anterior (opcional)
docker-compose down -v
docker system prune -f
```

### **Paso 2: Construcción de Imágenes**

```powershell
# Construir todas las imágenes definidas en docker-compose.yml
docker-compose build

# Verificar que las imágenes se construyeron correctamente
docker images | findstr proyectofinal
```

**Resultado esperado:**

```
proyectofinal-backend    latest
proyectofinal-frontend   latest
```

### **Paso 3: Verificación de Archivos Docker**

```powershell
# Verificar que existen los archivos necesarios
dir docker-compose.yml
dir .env
dir .dockerignore
dir backend\Dockerfile.dev
dir frontend\Dockerfile.dev
```

### **Paso 4: Ejecución Paso a Paso (Método Seguro)**

```powershell
# 1. Iniciar base de datos primero
docker-compose up database -d

# 2. Verificar que la base de datos esté funcionando
docker-compose ps

# 3. Iniciar backend (espera automáticamente a que DB esté lista)
docker-compose up backend -d

# 4. Verificar backend
docker-compose ps

# 5. Iniciar frontend
docker-compose up frontend -d

# 6. Verificar estado final
docker-compose ps
```

**Estado esperado final:**

```
NAME                IMAGE                    STATUS
proyecto_backend    proyectofinal-backend    Up X minutes (healthy)
proyecto_database   postgres:15-alpine       Up X minutes (healthy)
proyecto_frontend   proyectofinal-frontend   Up X minutes (healthy)
```

### **Paso 5: Verificación de Funcionamiento**

```powershell
# Verificar logs de cada servicio
docker-compose logs database --tail=10
docker-compose logs backend --tail=10
docker-compose logs frontend --tail=10

# Probar endpoints
curl http://localhost:3001/health
curl http://localhost:3000

# Ver logs en tiempo real (opcional)
docker-compose logs -f
```

### **Paso 6: Acceso a las URLs**

```powershell
# Abrir en navegador o verificar:
# Frontend: http://localhost:3000
# Backend Health: http://localhost:3001/health
# API: http://localhost:3001/api
```

---

## 🚨 **RESOLUCIÓN DE PROBLEMAS EJECUTADA**

### **Problema 1: Error de File Sharing (Windows)**

```powershell
# Si aparece: "user declined directory sharing"
# Comando temporal para verificar sin volúmenes:
docker run --name test-postgres -e POSTGRES_DB=test -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin123 -p 5433:5432 -d postgres:15-alpine

# Limpiar prueba
docker stop test-postgres
docker rm test-postgres
```

**Solución aplicada:**

- Comentar temporalmente volúmenes de código en `docker-compose.yml`
- Configurar File Sharing en Docker Desktop
- Descomentar volúmenes después

### **Problema 2: Puerto en Uso**

```powershell
# Verificar qué usa el puerto
netstat -ano | findstr :3000

# Parar todos los contenedores
docker-compose down
```

### **Problema 3: Base de Datos no Conecta**

```powershell
# Reiniciar servicios en orden
docker-compose restart database
timeout /t 10
docker-compose restart backend
```

---

## ⚡ **MÉTODO RÁPIDO (Una Vez Verificado)**

```powershell
# Después de que todo funcione, usar comando único:
docker-compose up -d

# Verificar
docker-compose ps

# Ver logs si hay problemas
docker-compose logs -f
```

---

## 🛠️ **COMANDOS DE GESTIÓN DIARIA**

### **Iniciar Desarrollo**

```powershell
docker-compose up -d
```

### **Ver Estado**

```powershell
docker-compose ps
```

### **Ver Logs**

```powershell
# Todos los servicios
docker-compose logs -f

# Un servicio específico
docker-compose logs backend -f
```

### **Parar Todo**

```powershell
docker-compose down
```

### **Reiniciar un Servicio**

```powershell
docker-compose restart backend
```

### **Reconstruir Después de Cambios**

```powershell
docker-compose build backend
docker-compose up backend -d
```

### **Limpiar Completamente**

```powershell
docker-compose down -v
docker system prune -f
```

---

## 📊 **COMANDOS DE VERIFICACIÓN**

### **Health Checks**

```powershell
# Backend
curl http://localhost:3001/health

# Frontend (debe cargar sin errores)
curl http://localhost:3000
```

### **Acceso a Contenedores**

```powershell
# Entrar al backend
docker-compose exec backend sh

# Entrar a la base de datos
docker-compose exec database psql -U app_user -d app_database

# Ver variables de entorno
docker-compose exec backend env
```

### **Monitoreo de Recursos**

```powershell
# Ver uso de recursos
docker stats

# Ver imágenes
docker images

# Ver volúmenes
docker volume ls
```

---

## 🎯 **SECUENCIA PARA NUEVA PERSONA**

**Después de `git clone`:**

```powershell
# 1. Ir al directorio
cd "ruta-del-proyecto"

# 2. Verificar Docker
docker --version

# 3. Construir
docker-compose build

# 4. Ejecutar
docker-compose up -d

# 5. Verificar
docker-compose ps

# 6. Probar URLs:
# - http://localhost:3000 (Frontend)
# - http://localhost:3001/health (Backend)
```

**Si hay problemas:**

```powershell
# Ver logs
docker-compose logs

# Reiniciar
docker-compose restart

# Último recurso
docker-compose down -v
docker-compose up -d
```

---

## ✅ **COMANDOS EJECUTADOS CON ÉXITO**

1. ✅ `docker-compose build` - Construyó imágenes (Backend: 89s, Frontend: 26s)
2. ✅ `docker-compose up database -d` - Base de datos funcionando
3. ✅ `docker-compose up backend -d` - Backend conectado a DB
4. ✅ `docker-compose up frontend -d` - Frontend funcionando
5. ✅ `docker-compose ps` - Todos los servicios healthy
6. ✅ `curl http://localhost:3001/health` - Backend respondiendo
7. ✅ URLs verificadas en navegador

---

## 🚀 **RESULTADO FINAL**

**Servicios funcionando:**

- PostgreSQL 15 (Puerto 5432)
- Backend Node.js (Puerto 3001)
- Frontend React (Puerto 3000)

**URLs operativas:**

- http://localhost:3000 ← Frontend
- http://localhost:3001/health ← Backend Health
- http://localhost:3001/api ← API REST

**¡Proyecto Docker completamente funcional!** 🎉
