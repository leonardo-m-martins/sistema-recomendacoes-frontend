# Etapa 1: Build da aplicação
FROM node:22-alpine AS build

WORKDIR /app

# Copia package.json e package-lock.json (ou yarn.lock)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Build para produção
RUN npm run build

# Etapa 2: Servir os arquivos estáticos com nginx
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Remove configuração padrão (opcional)
RUN rm /etc/nginx/conf.d/default.conf

# Copia configuração customizada para SPA
COPY nginx.conf /etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
