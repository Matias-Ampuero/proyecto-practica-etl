# 📊 Pipeline ETL & Dashboard Financiero Profesional

Proyecto integral que automatiza la ingesta de datos desde archivos PDF hacia una base de datos MySQL, exponiendo la información mediante una API segura en NestJS y un Dashboard interactivo en Vue 3.

## 🚀 Guía de Instalación y Despliegue

### 1. Requisitos Previos
* Node.js (v20 o superior)
* MySQL Server (v8.0+)
* Archivo fuente data.pdf ubicado en la carpeta /data

### 2. Base de Datos
Acceda a su terminal de MySQL o herramienta de gestión y ejecute el siguiente comando:

CREATE DATABASE practica_db;

### 3. Configuración del Backend
1. cd backend
2. npm install
3. npm run start:dev

### 4. Configuración del Frontend
1. cd frontend
2. npm install
3. npm run dev

## 🔐 Credenciales de Acceso (Prueba)
* Usuario: matias@test.com
* Contraseña: 123456

## 🛠️ Funcionalidades del Proyecto
* Motor ETL: Procesamiento automático de documentos PDF mediante Expresiones Regulares (Regex).
* Gestión de Registros (CRUD): Interfaz completa para Visualizar, Crear, Editar y Eliminar registros.
* Seguridad: Rutas protegidas mediante autenticación JWT.
* Dashboard Moderno: Diseño responsivo con barra lateral y barra de herramientas utilizando Vuetify.

---
Autor: Matias Ampuero
