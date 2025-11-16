FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV VITE_BACKEND_URL=http://localhost:3000

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]