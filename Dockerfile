FROM node:18-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY .env.production /usr/src/app

RUN npm install --registry=https://registry.npm.taobao.org

COPY . /usr/src/app

CMD [ "npm", "run", "start:prod" ]
