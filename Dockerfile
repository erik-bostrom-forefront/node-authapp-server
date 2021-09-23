FROM node:current-alpine
WORKDIR /usr/app
RUN npm install -g nodemon
COPY package.json .
RUN npm install --quiet
COPY . .