# 📚 Documentación del Proyecto Final

## 👥 Integrantes
- **Perez Daniele, Matias Sebastian**
- **Sandoval Sirimarco, Lautaro Agustin**
- **Lopez, Ignacio Martin**
- **Aispuro, Francisco**
- **Paez, Nicolas Agustin**

---

## 🚀 Proyecto Implementado
El proyecto consiste en una aplicación web completa que incluye un backend desarrollado en Node.js y un frontend implementado con React. La aplicación permite realizar operaciones CRUD, autenticación de usuarios, y pruebas de conectividad con una base de datos PostgreSQL.

---

## 🛠️ Stack Utilizado
- **Backend**: Node.js, Express
- **Base de Datos**: PostgreSQL
- **ORM**: Sequelize
- **Frontend**: React, Vite
- **Contenedores**: Docker
- **Servidor Web**: Nginx

---

## 💻 Interfaz
La interfaz del proyecto está diseñada para ser intuitiva y moderna, utilizando React para la creación de componentes dinámicos y Vite para la configuración del entorno de desarrollo.

---

## 📖 Instrucciones de Uso

### 1. Configuración Inicial
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Matias-ops-maker/Programacion-3.git
   ```
2. Navegar al directorio del proyecto:
   ```bash
   cd Programacion-3/Proyecto_Final
   ```
3. Configurar las variables de entorno en un archivo `.env`:
   ```bash
   API_URL=http://localhost:3001/api
   BASE_URL=http://localhost:3001
   ```

### 2. Levantar el Proyecto
1. Construir y levantar los contenedores con Docker:
   ```bash
   docker-compose up --build
   ```
2. Acceder al frontend en el navegador:
   ```
   http://localhost:3000
   ```
3. Acceder al backend:
   ```
   http://localhost:3001
   ```

### 3. Probar la API
Utilizar la guía de testing disponible en `API_test.md` para probar los endpoints del backend.

---

## 📂 Estructura del Repositorio

```
Proyecto_Final/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── migrations/
│   ├── models/
│   ├── routes/
│   ├── tests/
│   ├── utils/
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   ├── package.json
│   ├── server.js
├── database/
│   ├── init.sql
├── docs/
├── frontend/
│   ├── my-app/
│   ├── vite.config.js
├── nginx/
│   ├── nginx.conf
├── pgadmin/
│   ├── Dockerfile
│   ├── servers.json
├── scripts/
│   ├── setup-test.sh
│   ├── cleanup-test.sh
├── docker-compose.yml
├── README.md
```

---

## 📝 Notas
Para más detalles sobre el uso de la API, consultar el archivo `API_test.md` incluido en el repositorio.

---

# 📚 Documentación del Proyecto Final

## 🛠️ Requisitos Previos

1. **Docker**: Asegúrate de tener Docker instalado en tu sistema.
2. **Node.js**: Instala Node.js para ejecutar scripts locales si es necesario.
3. **Git**: Clona el repositorio utilizando Git.

---

## 🚀 Pasos para Ejecutar el Proyecto

### 1. Clonar el Repositorio
```bash
git clone https://github.com/Matias-ops-maker/Programacion-3.git
```

### 2. Configurar las Variables de Entorno
Crea un archivo `.env` en el directorio raíz del proyecto y define las siguientes variables:
```env
POSTGRES_DB=app_database
POSTGRES_USER=app_user
POSTGRES_PASSWORD=app_password
NODE_ENV=development
PORT=3001
DB_HOST=database
DB_PORT=5432
DB_NAME=app_database
DB_USER=app_user
DB_PASSWORD=app_password
JWT_SECRET=mi_jwt_secret_super_seguro_para_desarrollo_2024
CORS_ORIGIN=http://localhost:3000
REACT_APP_API_URL=http://localhost:3001/api
VITE_API_URL=http://localhost:3001/api
REACT_APP_ENV=development
```

### 3. Construir y Levantar los Contenedores
Ejecuta el siguiente comando para construir y levantar los contenedores:
```bash
docker-compose up --build
```

### 4. Acceder a la Aplicación
- **Frontend**: Abre tu navegador y accede a `http://localhost:3000`.
- **Backend**: La API estará disponible en `http://localhost:3001/api`.

---

## 🧪 Pruebas

### Pruebas Unitarias
Ejecuta las pruebas unitarias del backend:
```bash
npm test
```

### Pruebas de Integración
Utiliza herramientas como Postman para probar los endpoints de la API.

---

## 📂 Estructura del Proyecto

### Backend
- **Controladores**: Lógica de negocio.
- **Modelos**: Representación de datos.
- **Rutas**: Definición de endpoints.

### Frontend
- **Componentes**: Elementos reutilizables.
- **Vistas**: Páginas principales.

---

## 🛠️ Solución de Problemas

### Error: "Port already in use"
Asegúrate de que los puertos 3000 y 3001 no estén siendo utilizados por otros procesos.

### Error: "Database connection failed"
Verifica que las variables de entorno para la base de datos estén configuradas correctamente.

---
