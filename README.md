# 🔨 El Morenito — Plataforma Web de Reformas y Construcción

Plataforma web integral desarrollada para **El Morenito**, empresa especializada en reformas completas, albañilería, cerrajería, carpintería e instalaciones técnicas en San Pedro del Pinatar (Murcia) y alrededores.

El proyecto cuenta con una arquitectura desacoplada: un frontend responsivo y de alto rendimiento en Vanilla HTML5/CSS3/JavaScript, junto a un backend robusto en Node.js y Express conectado a una base de datos MySQL en la nube (Clever Cloud), con autenticación segura basada en tokens JWT y panel de administración para la gestión de servicios.

---

## 🚀 Características Principales

- **Diseño Corporativo y Responsivo:** Paleta de colores profesional con navegación fija (*sticky*), footer adaptativo (*sticky footer*) y texturas de obra con transparencias sutiles.
- **Catálogo de Servicios Paginado:** Visualización en cuadrícula de 6 tarjetas por página con fotografía de obra en alta resolución, categoría, descripción técnica y enlace directo a WhatsApp.
- **Formulario de Contacto y Presupuestos:** Captura de datos de clientes con generación automática de mensajes pre-redactados para WhatsApp y enlaces a correo corporativo.
- **Autenticación Administrativa:** Sistema de login seguro con contraseñas encriptadas mediante `bcryptjs` y emisión de tokens `JSON Web Token (JWT)`.
- **Panel Administrativo (CRUD):** Vista protegida para crear nuevos trabajos y eliminar servicios existentes directamente en la base de datos de Clever Cloud.
- **Base de Datos en la Nube:** Conexión persistente mediante *connection pooling* a MySQL alojado en Clever Cloud.

---

## 🛠️ Stack Tecnológico

### Frontend
- **HTML5 Semántico** & **CSS3 Moderno** (CSS Grid, Flexbox, Variables CSS, Backdrop Filters).
- **JavaScript Moderno (ES6+):** Consumo asíncrono de API mediante `fetch`, paginación reactiva y manejo de estados locales en `localStorage`.
- **Tipografía:** Google Fonts (*Barlow* e *Inter*).

### Backend
- **Node.js** & **Express.js:** Enrutamiento RESTful modular.
- **MySQL2 / Promise Pool:** Conexión eficiente a base de datos relacional.
- **bcryptjs:** Hashing y salting de contraseñas de usuarios administradores.
- **jsonwebtoken (JWT):** Gestión y verificación de sesiones sin estado (*stateless*).
- **CORS & Dotenv:** Seguridad cruzada y gestión de variables de entorno.

### Infraestructura y Datos
- **Base de Datos:** MySQL en Clever Cloud.
- **Control de Versiones:** Git & GitHub.

---