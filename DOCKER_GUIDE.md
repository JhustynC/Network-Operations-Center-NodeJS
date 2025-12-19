# Guía de Dockerización App NOC

Esta guía detalla los pasos realizados para contenerizar la aplicación Node.js, incluyendo sus bases de datos (MongoDB y PostgreSQL), y cómo desplegar la imagen en Docker Hub.

## 1. Preparación del Entorno (`.dockerignore`)
Creamos el archivo `.dockerignore` para evitar copiar archivos innecesarios al contenedor, optimizando la construcción y seguridad.

**Archivo:** `.dockerignore`
```text
node_modules
dist
coverage
logs
.env
.git
...
```

## 2. Creación del Dockerfile (Multi-Stage Build)
Diseñamos un `Dockerfile` optimizado en 4 etapas para reducir el tamaño de la imagen final y garantizar seguridad.

**Archivo:** `Dockerfile`
- **Stage 1 (deps):** Instala todas las dependencias (`npm install`).
- **Stage 2 (builder):** Genera el cliente de Prisma y compila TypeScript a JavaScript (`npm run build`).
- **Stage 3 (prod-deps):** Instala solo dependencias de producción y regenera el cliente de Prisma.
- **Stage 4 (runner):** Imagen final (Alpine Linux). Copia solo lo necesario (`dist`, `node_modules`, `prisma`) y configura permisos para el usuario no-root `node`.

> **Nota:** Se añadieron permisos explícitos para crear la carpeta de logs:
> `RUN mkdir -p logs && chown -R node:node logs`

## 3. Orquestación Local (`docker-compose.yml`)
Configuramos `docker-compose.yml` para levantar todo el entorno de desarrollo localmente.

**Servicios incluidos:**
1.  **mongo-db:** Base de datos MongoDB.
2.  **postgres-db:** Base de datos PostgreSQL.
3.  **noc-app:** Nuestra aplicación (construida desde el código local `build: .`).

**Configuración clave:**
- Inyección de variables de entorno desde el archivo `.env`.
- Definición de redes para que la app vea a las bases de datos como `mongo-db` y `postgres-db`.

### Comandos de Desarrollo
```bash
# Iniciar todo (reconstruyendo si hay cambios)
docker-compose up --build

# Ver logs
docker-compose logs -f noc-app

# Detener todo
docker-compose down
```

## 4. Despliegue a Docker Hub
Subimos la imagen pre-construida a un registro público para poder desplegarla en cualquier servidor sin necesidad del código fuente.

### Pasos realizados:
1.  **Login:** `docker login` (usando Access Token).
2.  **Build:** `docker build -t tu_usuario/noc-app:1.0.0 .`
3.  **Push:** `docker push tu_usuario/noc-app:1.0.0`

## 5. Ejecución en Producción (`docker-compose.prod.yml`)
Creamos un archivo específico para desplegar usando la imagen de la nube.

**Diferencia principal:**
En lugar de `build: .`, usamos:
```yaml
noc-app:
  image: tu_usuario/noc-app:1.0.0
```

### Cómo ejecutar en otro servidor/PC:
1.  Copiar `docker-compose.prod.yml`.
2.  Crear un archivo `.env` con las claves de producción.
3.  Ejecutar:
    ```bash
    docker-compose -f docker-compose.prod.yml up
    ```

---

