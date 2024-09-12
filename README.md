# Proyecto NOC

## **Node dev env**

1. Clonar el archivo env.template a .env
2. Configurar las variables de entorno
3. Ejecutar el comando

```
npm install
```

4. Levantar las bases de datos (Docker)

```
docker compose up -d
```

5. Ejecutar el comando necesario

```
PORT=3000
MAILER_EMAIL=jhustyn7@gmail.com
MAILER_SECRET_KEY=123456
PROD=true
```

## **Comando para la ejecucion**

### Testing

```
npm run test
npm run test:watch
```

### Modo Desarrollo

```
npm run dev
```

### Crear Bundle

```
npm run build
```

### Ejecutar Aplicacion

```
npm start
```
