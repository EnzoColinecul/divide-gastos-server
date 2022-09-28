FROM node:16.17-alpine3.15

RUN mkdir -p /usr/src/server

WORKDIR /usr/src/server

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]