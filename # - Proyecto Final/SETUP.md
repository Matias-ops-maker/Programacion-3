# 🚀 GUÍA DE INSTALACIÓN Y EJECUCIÓN - PROYECTO FINAL

## 📋 REQUISITOS PREVIOS

Antes de comenzar, asegúrate de tener instalado:

- **Docker Desktop**: [Descargar aquí](https://www.docker.com/products/docker-desktop/)
- **Git**: [Descargar aquí](https://git-scm.com/)
- **Node.js 18+** (opcional, para desarrollo local): [Descargar aquí](https://nodejs.org/)

## 🛠️ INSTALACIÓN PASO A PASO

### **Paso 1: Clonar el repositorio**

```bash
git clone [URL_DEL_REPOSITORIO]
cd proyecto-final
```

### **Paso 2: Configurar variables de entorno**

```bash
# El archivo .env ya está configurado para desarrollo
# No necesitas modificar nada para empezar
```

### **Paso 3: Construir y ejecutar con Docker**

```bash
# Construir todas las imágenes
docker-compose build

# Ejecutar todos los servicios
docker-compose up
```

**¡Listo!** El proyecto estará disponible en:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **Base de datos**: localhost:5432
- **pgAdmin**: http://localhost:5050 (admin@proyecto.com / admin123)
- **Nginx Proxy**: http://localhost

---

## 🔧 COMANDOS ÚTILES

### **Gestión de contenedores**

```bash
# Ver estado de los servicios
docker-compose ps

# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend

# Detener servicios
docker-compose down

# Detener y limpiar volúmenes
docker-compose down -v
```

### **Desarrollo y debugging**

```bash
# Reconstruir un servicio específico
docker-compose build backend
docker-compose build frontend

# Reiniciar un servicio específico
docker-compose restart backend
docker-compose restart frontend

# Acceder al shell de un contenedor
docker-compose exec backend sh
docker-compose exec frontend sh

# Ejecutar comandos en el backend
docker-compose exec backend npm install nueva-dependencia
docker-compose exec backend npm run migrate

# Ejecutar comandos en el frontend
docker-compose exec frontend npm install nueva-dependencia
```

### **Base de datos**

```bash
# Acceder a PostgreSQL CLI
docker-compose exec database psql -U app_user -d app_database

# Hacer backup de la base de datos
docker-compose exec database pg_dump -U app_user app_database > backup.sql

# Restaurar backup
docker-compose exec -T database psql -U app_user -d app_database < backup.sql
```

---

## 🔄 DESARROLLO CON HOT RELOAD

El proyecto está configurado para detectar cambios automáticamente:

### **Backend (Express)**

- ✅ Cambios en archivos `.js` → Reinicio automático con nodemon
- ✅ Nuevas dependencias → Requiere `docker-compose restart backend`

### **Frontend (React + Vite)**

- ✅ Cambios en archivos `.jsx`, `.js`, `.css` → Recarga automática
- ✅ Nuevas dependencias → Requiere `docker-compose restart frontend`

### **Base de datos**

- ✅ Datos persistentes con volúmenes Docker
- ✅ Scripts de inicialización en `database/init.sql`

---

## ⚠️ RESOLUCIÓN DE PROBLEMAS

### **Error: Puerto ya en uso**

```bash
# Verificar puertos ocupados
netstat -an | findstr :3000
netstat -an | findstr :3001

# Cambiar puertos en docker-compose.yml si es necesario
```

### **Error: Contenedores no se conectan**

```bash
# Reiniciar Docker Desktop
# Limpiar caché de Docker
docker system prune -f

# Reconstruir desde cero
docker-compose down -v --rmi all
docker-compose build --no-cache
docker-compose up
```

### **Error: Frontend muestra pantalla en blanco**

```bash
# Ver logs del frontend
docker-compose logs -f frontend

# Verificar que el backend esté corriendo
curl http://localhost:3001/health

# Reiniciar frontend
docker-compose restart frontend
```

### **Error: Base de datos no conecta**

```bash
# Verificar salud de la base de datos
docker-compose exec database pg_isready -U app_user -d app_database

# Ver logs de PostgreSQL
docker-compose logs database

# Limpiar volúmenes y reiniciar
docker-compose down -v
docker-compose up
```

---

## 📂 ESTRUCTURA DEL PROYECTO

```
proyecto-final/
├── 📄 docker-compose.yml          # Orquestación de servicios
├── 📄 .env                        # Variables de entorno
├── 📄 .dockerignore               # Archivos excluidos de Docker
├── 📄 SETUP.md                    # Esta guía
│
├── 🔧 backend/
│   ├── 📄 Dockerfile.dev          # Imagen Docker para desarrollo
│   ├── 📄 package.json            # Dependencias de Express
│   ├── 📄 server.js               # Servidor principal
│   ├── 📁 config/                 # Configuración de Sequelize
│   ├── 📁 models/                 # Modelos de base de datos
│   ├── 📁 routes/                 # Rutas del API
│   └── 📁 controllers/            # Lógica de negocio
│
├── ⚛️ frontend/
│   ├── 📄 Dockerfile.dev          # Imagen Docker para desarrollo
│   └── 📁 my-app/
│       ├── 📄 package.json        # Dependencias de React
│       ├── 📄 vite.config.js      # Configuración de Vite
│       └── 📁 src/                # Código fuente React
│
├── 📊 database/
│   └── 📄 init.sql                # Script de inicialización
│
└── 🔗 nginx/
    └── 📄 nginx.conf              # Configuración del proxy
```

---

## 🎯 ACCESOS RÁPIDOS

| Servicio          | URL                          | Credenciales                  |
| ----------------- | ---------------------------- | ----------------------------- |
| **Frontend**      | http://localhost:3000        | -                             |
| **Backend API**   | http://localhost:3001/api    | -                             |
| **Health Check**  | http://localhost:3001/health | -                             |
| **pgAdmin**       | http://localhost:5050        | admin@proyecto.com / admin123 |
| **Base de datos** | localhost:5432               | app_user / app_password       |

---

## 📞 SOPORTE

Si encuentras problemas:

1. Revisa los logs: `docker-compose logs -f`
2. Verifica el estado: `docker-compose ps`
3. Consulta esta guía de resolución de problemas
4. Reinicia los servicios: `docker-compose restart`

¡El proyecto está listo para desarrollo! 🚀
