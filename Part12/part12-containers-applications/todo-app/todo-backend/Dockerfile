FROM node:20
EXPOSE 3000
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm ci --omit=dev
USER node
CMD ["npm", "start"]
