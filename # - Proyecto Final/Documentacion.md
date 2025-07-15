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
