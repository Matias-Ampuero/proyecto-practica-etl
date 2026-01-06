# 📊 Pipeline ETL - Ingesta de Datos Financieros

Proyecto integral de ingesta de datos (ETL) desde archivos PDF hacia MySQL, con una API en NestJS y un Dashboard interactivo en Vue 3 + Vuetify.

## 🔐 Credenciales de Acceso (Prueba)

Para revisar la plataforma, utiliza las siguientes credenciales en la pantalla de inicio de sesión:

* **Usuario:** `matias@test.com`
* **Contraseña:** `123456`

---

## 🛠️ Tecnologías y Arquitectura

### Backend (NestJS)
* **ETL Engine:** Procesamiento automático de `data.pdf` al arrancar la aplicación (`OnModuleInit`).
* **Extracción:** Uso de Expresiones Regulares (Regex) para parsear facturas con formato `INV-YYYY-XXX`.
* **Persistencia:** TypeORM con driver MySQL para el almacenamiento de `financial_data`.
* **Seguridad:** Autenticación Passport-JWT para proteger los endpoints de consulta.

### Frontend (Vue 3)
* **UI Framework:** Vuetify 3 con diseño responsivo y componentes de Material Design.
* **State Management:** Pinia para la gestión del estado de autenticación y token JWT.
* **HTTP Client:** Axios con interceptores para inyectar automáticamente el token en los encabezados.

---

## 📋 Requisitos del Sistema

* **Node.js:** v20 o superior.
* **Base de Datos:** MySQL 8.0.
* **Archivo de Origen:** El archivo `data.pdf` debe estar presente en la carpeta `/data`.

---

## ⚙️ Configuración e Instalación

### 1. Base de Datos
Crea la base de datos y la tabla necesaria en tu servidor MySQL local:

```sql
CREATE DATABASE practica_db;
USE practica_db;

CREATE TABLE financial_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date VARCHAR(50),
    category VARCHAR(255),
    amount DECIMAL(10, 2),
    description TEXT
);
2. Backend
Bash

cd backend
npm install
npm run start:dev
Al iniciar, verás en consola el mensaje de confirmación de la carga del ETL.

3. Frontend
Bash

cd frontend
npm install
npm run dev
👤 Autor
Matias Ampuero - Desarrollador del proyecto.