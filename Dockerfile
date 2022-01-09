FROM node:16.13-alpine3.15

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install -g nodemon

COPY . .

EXPOSE ${PORT}

CMD ["npm", "start"]