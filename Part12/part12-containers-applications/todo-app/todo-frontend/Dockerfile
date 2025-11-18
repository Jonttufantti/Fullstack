
#FROM node:20 AS test-stage

#WORKDIR /usr/src/app

#COPY package*.json ./

#RUN npm ci

#COPY . .

#RUN npm test


# Build stage

FROM node:20 AS build-stage

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

ENV VITE_BACKEND_URL=http://localhost:8080/api

RUN npm run build

# Production stage

FROM nginx:alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

#FROM node:20

#WORKDIR /usr/src/app

#COPY package*.json ./

#RUN npm ci

#COPY . .

#EXPOSE 5173

#CMD ["npm", "run", "dev", "--", "--host"]