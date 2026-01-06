# Backend - Procesador ETL de PDF

Este sistema lee archivos PDF, procesa la información y guarda los datos en una base de datos MySQL.

## Tecnologías
- NestJS
- TypeScript
- MySQL (TypeORM)
- pdf-parse

## Requisitos
- MySQL Server corriendo.
- Base de datos llamada: practica_db

## Instalación
cd backend
npm install

## Configuración DB (src/app.module.ts)
- Host: localhost
- Puerto: 3306
- Usuario: root
- Password: (vacío)
- DB: practica_db

## Ejecución
npm run start:dev

## Endpoints
GET /records