# API REST Express + MongoDB (Usuarios y Productos)

Este proyecto implementa una API RESTful con **Node.js + Express + MongoDB**, incluyendo autenticación JWT, control de roles y rutas protegidas.

## 🚀 Características

- **Autenticación JWT** con registro y login.
- **Autorización por roles** (`admin`, `staff`, `user`).
- Gestión de **usuarios**:
  - Registro, login.
  - Perfil propio (`GET /usuarios/me`, `PATCH /usuarios/me`).
  - CRUD completo solo para `admin`/`staff`.
  - Búsqueda por nombre sin tildes (`/usuarios/by-name/:nombre`).
- Gestión de **productos**:
  - Listado y búsqueda públicos.
  - Crear, actualizar y eliminar solo para `admin`/`staff`.
- Seguridad con **Helmet, CORS, Rate Limit y bcryptjs**.
- Documentación de pruebas en `manual_pruebas_headers_roles.md`.

---

## 📂 Estructura de carpetas

```
src/
 ├── app.js                 # Configuración de Express
 ├── server.js              # Punto de entrada
 ├── lib/
 │    └── jwt.js            # Helpers de JWT
 ├── middlewares/
 │    └── auth.js           # requireAuth, requireRole, etc.
 ├── models/
 │    ├── User.js           # Modelo Usuario (con normalización)
 │    └── Product.js        # Modelo Producto
 ├── controllers/
 │    ├── auth.controller.js
 │    ├── usuarios.controller.js
 │    └── productController.js
 └── routes/
      ├── auth.routes.js
      ├── users.routes.js
      └── products.routes.js
```

---

## ⚙️ Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tuusuario/serverOne.git
   cd serverOne
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Crear archivo `.env` en la raíz:
   ```ini
   PORT=3000
   MONGODB_URI=mongodb://usuario:clave@127.0.0.1:27017/Tienda?authSource=admin
   JWT_SECRET=super-secreto
   JWT_EXPIRES=1h
   ```

---

## ▶️ Ejecución

### Modo desarrollo
```bash
npm run dev
```

### Producción
```bash
npm start
```

---

## 🧪 Endpoints principales

### Autenticación
- `POST /auth/register` → Registro de usuario.
- `POST /auth/login` → Login y entrega de token.

### Usuarios
- `GET /usuarios/me` → Perfil propio (**token requerido**).
- `PATCH /usuarios/me` → Actualizar perfil propio.
- `GET /usuarios/by-name/:nombre` → Buscar por nombre (ignora tildes).
- `GET /usuarios` → Listar usuarios (**solo admin/staff**).
- `PUT /usuarios/:id` → Actualizar usuario (**solo admin/staff**).
- `DELETE /usuarios/:id` → Eliminar usuario (**solo admin/staff**).

### Productos
- `GET /productos` → Listar todos los productos.
- `GET /productos/:nombre` → Obtener producto por nombre.
- `POST /productos` → Crear producto (**solo admin/staff**).
- `PUT /productos/:nombre` → Actualizar producto (**solo admin/staff**).
- `DELETE /productos/:nombre` → Eliminar producto (**solo admin/staff**).

### Healthcheck
- `GET /health` → Estado del servidor.

---

## 📖 Documentación de pruebas

En el archivo [`manual_pruebas_headers_roles.md`](manual_pruebas_headers_roles.md) encontrarás:
- Headers requeridos.
- Ejemplos de **body JSON**.
- Respuestas esperadas.
- Ejemplos de `curl`.

---

## 🔒 Seguridad

- **Passwords** encriptadas con bcryptjs.
- **JWT** firmados con secreto desde `.env`.
- **Helmet** para cabeceras HTTP seguras.
- **CORS** configurado para orígenes confiables.
- **Rate limiting** en `/auth/login`.

---

## 👨‍🏫 Uso en clase

1. Explica las **diferencias entre autenticación y autorización**.
2. Muestra cómo funciona el **header Authorization: Bearer <token>**.
3. Demuestra que un usuario normal no puede crear productos, pero un admin sí.
4. Usa el endpoint `/usuarios/by-name` para enseñar cómo normalizar cadenas sin tildes.
5. Haz pruebas en Postman o con los ejemplos `curl`.

---

## 📌 Notas

- Antes de usar en producción, desactiva `mongoose.set('autoIndex', false)` y maneja índices vía migraciones.
- Recuerda usar **tokens cortos** (`JWT_EXPIRES=1h`) y refrescarlos si es necesario.
- Configura CORS con dominios específicos en producción.
