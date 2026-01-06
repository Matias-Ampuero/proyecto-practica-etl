# 📊 Sistema de Ingesta y Visualización Financiera (ETL)

Proyecto integral que implementa un pipeline de datos desde archivos PDF hasta una interfaz web moderna, cumpliendo con estándares de seguridad y diseño responsivo.

## 🚀 Funcionalidades Cumplidas

### 🔐 Autenticación y Seguridad
* **Login JWT:** Interfaz de acceso protegida con validación de credenciales.
* **Gestión de Sesión:** Uso de Pinia Store para el manejo del estado de autenticación y LocalStorage para persistencia del token.
* **Interceptores Axios:** Configuración global para adjuntar encabezados de autorización y manejo automático de errores 401.

### 🔄 Pipeline ETL (Backend)
* **Extracción:** Lectura de datos desde PDF usando Regex para parsing de facturas.
* **Carga:** Ingesta de 195 registros en base de datos MySQL mediante TypeORM.
* **API REST:** Endpoints optimizados en NestJS para la consulta de datos protegidos.

### 🖥️ Interfaz de Usuario (Frontend)
* **Vuetify 3:** Implementación de componentes de alta calidad y diseño responsivo.
* **Data Table:** Visualización avanzada de registros financieros con formato de moneda y chips de colores dinámicos.
* **UX/UI:** Diseño con barra de herramientas, acceso rápido y flujo de navegación intuitivo.

## 🛠️ Stack Tecnológico
* **Frontend:** Vue 3 (Composition API), Vuetify 3, Pinia, Axios.
* **Backend:** NestJS, TypeORM, MySQL, JWT.
* **Herramientas:** TypeScript, PDF-Parse, Git.