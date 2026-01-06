# 📊 Pipeline ETL & Dashboard Financiero Profesional

Proyecto integral que automatiza la ingesta de datos desde archivos PDF hacia una base de datos MySQL, exponiendo la información mediante una API segura en NestJS y un Dashboard interactivo en Vue 3.

## 🚀 Guía de Instalación y Despliegue

### 1. Requisitos Previos
* Node.js (v20 o superior)
* MySQL Server (v8.0+)
* Archivo fuente data.pdf ubicado en la carpeta /data

### 2. Base de Datos
Acceda a su terminal de MySQL o herramienta de gestión y ejecute el siguiente comando para crear el esquema inicial:

CREATE DATABASE practica_db;

### 3. Configuración del Backend
1. cd backend
2. npm install
3. npm run start:dev

### 4. Configuración del Frontend
1. cd frontend
2. npm install
3. npm run dev

## 📋 Estructura de Datos y Normalización
El sistema cumple con la estructura requerida para la tabla `records`:
* sourceId: Identificador único extraído del PDF (usado para upsert/idempotencia).
* date: Normalizado a formato YYYY-MM-DD.
* category: Mapeo de categorías estandarizadas.
* amount: Conversión a decimal (remoción de símbolos y separadores).
* status: Normalizado a valores estándar (activo/pendiente/completado).

## 🔄 Flujo ETL Implementado
1. [Extract]: Lectura de data.pdf mediante pdf-parse.
2. [Normalize]: Procesamiento mediante Regex para limpieza de strings, fechas y montos.
3. [Load]: Ingesta automática en MySQL con lógica de upsert por sourceId para evitar duplicidad.

## 🔐 Credenciales de Acceso (Prueba)
* Usuario: matias@test.com
* Contraseña: 123456

## 🛠️ Tecnologías
* Backend: NestJS, TypeORM, TypeScript.
* Frontend: Vue 3, Vuetify 3, Pinia, Axios.
* DB: MySQL 8.0.

---
Autor: Matias Ampuero
