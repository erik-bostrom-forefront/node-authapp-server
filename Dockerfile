FROM node:current-alpine
WORKDIR /usr/app
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh
RUN npm install -g nodemon jest
COPY package.json .
RUN npm install --quiet
COPY . .