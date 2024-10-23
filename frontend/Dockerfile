FROM node:18
USER root

WORKDIR /app

RUN npm config set strict-ssl false
RUN npm install
RUN npm install react-router-dom
EXPOSE 3000
