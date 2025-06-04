# Documentación del Sistema de Gestión de Clínica

## Índice

1. [Introducción](#introducción)
2. [Configuración](#configuración)
3. [Modelos](#modelos)
4. [Controladores](#controladores)
5. [Rutas](#rutas)
6. [Vistas](#vistas)
7. [Características principales](#características-principales)
8. [Guía de uso](#guía-de-uso)
9. [Dependencias](#dependencias)

## Introducción

El Sistema de Gestión de Clínica es una aplicación web desarrollada con Node.js y Express que permite administrar pacientes y turnos de una clínica médica. La aplicación utiliza un patrón MVC (Modelo-Vista-Controlador) con soporte para diferentes motores de plantillas (EJS, PUG) y permite almacenar datos utilizando tanto modelos mock (en memoria) como SQLite a través de Sequelize.

## Configuración

El proyecto utiliza variables de entorno para configuración. Estas se definen en el archivo `.env`:

```
PORT=3000               # Puerto del servidor
HOST=http://localhost   # Host para acceso
TEMPLATE=ejs            # Motor de plantillas (ejs o pug)
```

El servidor se inicializa en `index.js` y se configura en `server.js`, donde se definen middleware, rutas y motor de plantillas.

## Modelos

### Entidades

1. **Identificador** (`identificador.entity.js`): Clase base que proporciona una propiedad ID a las entidades.

2. **Paciente** (`paciente.entity.js`): Entidad para la gestión de pacientes.

   - Propiedades: id, dni, nombre, apellido, email

3. **Turno** (`turno.entity.js`): Entidad para la gestión de turnos médicos.
   - Propiedades: id, fecha, hora, idPaciente, medico

### Modelos Mock (en memoria)

1. **PacientesModel** (`pacientes.models.js`): Gestiona la colección de pacientes en memoria.

   - Métodos: list(), create(), update(), delete()

2. **TurnosModel** (`turnos.models.js`): Gestiona la colección de turnos en memoria.
   - Métodos: list(), create(), update(), delete(), searchByIdPaciente()

### Modelos SQLite (Sequelize)

El proyecto incluye configuración para usar SQLite a través de Sequelize, permitiendo una fácil migración de datos en memoria a una base de datos relacional.

## Controladores

### API

1. **PacientesController** (`pacientes.controller.js`): Maneja las operaciones CRUD para pacientes.

   - Métodos: list(), create(), update(), delete()

2. **TurnosController** (`turnos.controller.js`): Maneja las operaciones CRUD para turnos.
   - Métodos: list(), create(), update(), delete(), searchByIdPaciente()

### Home

**HomeController** (`home.controller.js`): Renderiza la vista principal.

## Rutas

1. **Home Routes** (`home.routes.js`): Ruta principal que maneja la renderización de la interfaz.

   - `GET /`: Renderiza la página principal

2. **Pacientes Routes** (`pacientes.route.js`): Rutas para la API de pacientes.

   - `GET /api/v1/pacientes`: Lista todos los pacientes
   - `POST /api/v1/pacientes`: Crea un nuevo paciente
   - `PUT /api/v1/pacientes/:id`: Actualiza un paciente existente
   - `DELETE /api/v1/pacientes/:id`: Elimina un paciente

3. **Turnos Routes** (`turnos.route.js`): Rutas para la API de turnos.
   - `GET /api/v1/turnos`: Lista todos los turnos
   - `POST /api/v1/turnos`: Crea un nuevo turno
   - `PUT /api/v1/turnos/:id`: Actualiza un turno existente
   - `DELETE /api/v1/turnos/:id`: Elimina un turno
   - `GET /api/v1/turnos/:idPaciente`: Lista los turnos de un paciente específico

## Vistas

El proyecto soporta dos motores de plantillas:

1. **EJS** (`/src/views/ejs/index.ejs`): Vista principal en formato EJS.
2. **PUG** (`/src/views/pug/index.pug`): Vista principal en formato PUG.

La vista principal muestra un sistema de gestión con dos secciones principales:

- Gestión de pacientes (formulario para crear/editar y tabla de listado)
- Gestión de turnos (formulario para crear/editar y tabla de listado con filtro por paciente)

## Características Principales

1. **Gestión de Pacientes**

   - Crear, leer, actualizar y eliminar pacientes
   - Validar datos de pacientes
   - Listar todos los pacientes

2. **Gestión de Turnos**

   - Crear, leer, actualizar y eliminar turnos
   - Asignar turnos a pacientes
   - Filtrar turnos por paciente

3. **Arquitectura**
   - Patrón MVC (Modelo-Vista-Controlador)
   - API RESTful para operaciones CRUD
   - Soporte para múltiples motores de plantillas
   - Estructura modular para fácil mantenimiento

## Guía de Uso

### Instalación y Ejecución

1. Clonar el repositorio
2. Instalar dependencias: `npm install`
3. Configurar variables de entorno en `.env`
4. Iniciar el servidor: `npm run dev`
5. Acceder a la aplicación en `http://localhost:3000`

### Uso de la Interfaz

1. **Gestión de Pacientes**:

   - Usar el formulario superior para crear o editar pacientes
   - La tabla muestra los pacientes existentes con opciones para editar o eliminar
   - Al hacer clic en "Editar", los datos se cargan en el formulario

2. **Gestión de Turnos**:
   - Seleccionar un paciente de la lista desplegable
   - Elegir fecha y hora para el turno
   - La tabla muestra los turnos existentes con opciones para editar o eliminar
   - Usar el filtro para ver sólo los turnos de un paciente específico

## Dependencias

- **express**: Framework web para Node.js
- **dotenv**: Manejo de variables de entorno
- **ejs**: Motor de plantillas EJS
- **pug**: Motor de plantillas PUG
- **morgan**: Logger de solicitudes HTTP
- **sequelize**: ORM para bases de datos relacionales
- **sqlite3**: Driver de SQLite para Node.js

---

_Documentación preparada para el Trabajo Práctico 3 de Base de Datos II_
