FROM node:20

WORKDIR /app

COPY package*.json ./

RUN run npm install

COPY . .

CMD npm