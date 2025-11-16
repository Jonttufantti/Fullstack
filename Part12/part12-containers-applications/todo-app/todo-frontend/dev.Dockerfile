
FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

ENV VITE_BACKEND_URL=http://localhost:3000

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]