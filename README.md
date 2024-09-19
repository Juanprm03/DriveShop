# DriveShop
Este proyecto es una aplicación web de ecommerce para un concesionario de Vehiculos. La aplicación está construida utilizando Node.js con Express para el backend, MongoDB como base de datos, y Astro con React y Tailwind CSS para el frontend.

## Tecnologías Utilizadas

- **Backend**: Node.js, Express
- **Base de Datos**: MongoDB
- **Frontend**: Astro, React, Tailwind CSS

## Arquitectura

### Descripción de Componentes Clave:
### Backend:
- **Controladores**: Manejan la lógica de negocio y las operaciones CRUD.
- **Modelos**: Definen la estructura de los datos en MongoDB.
- **Rutas**: Definen los endpoints de la API y los métodos HTTP asociados.
  
**Frontend**
- **Componentes**: Elementos reutilizables de la interfaz de usuario construidos con React.
- **Layouts**: Plantillas de diseño de páginas en Astro.
- **Páginas**: Vistas de la aplicación que combinan componentes y layouts.

## Instalación

### Pasos de Instalación

1. Clona el repositorio:
 Clona el repositorio de DriveShop desde GitHub a tu máquina local:

```bash
git clone https://github.com/Juanprm03/DriveShop.git
cd DriveShop
```

2.Construir el proyecto en Docker, utiliza el comando:
```bash
docker-compose up --build
```
