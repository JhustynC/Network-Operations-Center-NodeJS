
# 1. Dependencias
FROM node:21-alpine3.19 as deps
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install


# 2. Builder - Construye la aplicación
FROM node:21-alpine3.19 as builder
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
# Generar cliente de Prisma
RUN npx prisma generate
RUN npm run build


# 3. Dependencias de Producción
FROM node:21-alpine3.19 as prod-deps
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --prod
# Necesitamos generar el cliente de prisma también para las dependencias de producción
COPY prisma ./prisma
RUN npx prisma generate


# 4. Runner - Ejecutar la app
FROM node:21-alpine3.19 as runner
WORKDIR /usr/src/app

COPY --from=prod-deps /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma

# Copiar archivos estáticos si los hubiera (opcional)
# COPY --from=builder /usr/src/app/public ./public

ENV NODE_ENV=production

# Crear directorio de logs y asignar permisos al usuario 'node'
RUN mkdir -p logs
RUN chown -R node:node logs

USER node

CMD [ "node", "dist/app.js" ]
