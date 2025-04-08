# CarePro Backend 🚀

[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.19.2-000000?logo=express)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.7.1-47A248?logo=mongodb)](https://www.mongodb.com)
[![JWT](https://img.shields.io/badge/JWT-9.0.2-000000?logo=jsonwebtokens)](https://jwt.io)
[![License](https://img.shields.io/badge/Licencia-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Backend de CarePro: Plataforma de servicios profesionales con autenticación JWT, gestión de contratos y notificaciones por email.

---

## ✨ Características
- Registro de usuarios con confirmación por email
- Autenticación JWT con refresh tokens
- CRUD completo de servicios
- Sistema de contratación de servicios
- Mensajería entre usuarios
- Subida de imágenes de perfil
- Endpoints RESTful API

---

## 🛠️ Tecnologías
- **Runtime**: ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white)
- **Framework**: ![Express](https://img.shields.io/badge/-Express-000000?logo=express)
- **Base de Datos**: ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb)
- **Autenticación**: ![JWT](https://img.shields.io/badge/-JWT-000000?logo=jsonwebtokens)
- **Seguridad**: ![bcrypt](https://img.shields.io/badge/-bcrypt-525252)
- **Email**: ![Nodemailer](https://img.shields.io/badge/-Nodemailer-2F4F4F)
- **Testing**: ![Jest](https://img.shields.io/badge/-Jest-C21325?logo=jest)

---

## 🚀 Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/carepro-backend.git

## Instala dependencias
npm install

## Configura variables de entornio (crea un archivo .env)
PORT=3000
JWT_SECRET=tu_clave_secreta
MONGODB_URI=mongodb://localhost:27017/carepro
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_password_email
CLIENT_URL=http://localhost:3000

## Inicia el servidor 
npm run dev

## 🔑 Endpoints Principales

👤 Autenticación
Método	Endpoint	Descripción
POST	/api/auth/register	Registro de usuario
POST	/api/auth/login	Login con JWT
POST	/api/auth/logout	Cerrar sesión

🛎️ Servicios
Método	Endpoint	Descripción
POST	/api/services	Crear nuevo servicio
GET	/api/services	Obtener todos los servicios
PUT	/api/services/:id	Actualizar servicio
DELETE	/api/services/:id	Eliminar servicio

🤝 Contratos
Método	Endpoint	Descripción
POST	/api/contracts	Contratar servicio
GET	/api/contracts	Obtener contratos del usuario

📬 Mensajes
Método	Endpoint	Descripción
POST	/api/messages	Enviar mensaje

📄 Variables de Entorno
Variable	Descripción	Ejemplo
PORT	Puerto del servidor	3000
JWT_SECRET	Clave secreta para JWT	mi_clave_super_secreta
MONGODB_URI	URL de conexión a MongoDB	mongodb://localhost:27017/carepro
EMAIL_USER	Email para notificaciones	carepro.app@gmail.com
EMAIL_PASS	Contraseña del email	password123
CLIENT_URL	URL del frontend	http://localhost:3000

✨ Desarrollado por: Agustín Erimbaue
📧 Contacto: agustibernabe@gmail.com


### 🔍 Notas importantes:
1. **Configuración de Email**:
   - Usa un email real en `EMAIL_USER` y `EMAIL_PASS` (para Gmail, activa "Contraseñas de aplicación" en seguridad de Google).
2. **Seguridad**:
   - Nunca commits el archivo `.env`.
   - Usa una clave JWT compleja en producción.
3. **Base de Datos**:
   - Asegúrate de tener MongoDB instalado y corriendo.
4. **Testing**:
   - Agrega más tests según crezca el proyecto.

¡Listo para implementar! ¿Necesitas algún ajuste adicional? 😊
