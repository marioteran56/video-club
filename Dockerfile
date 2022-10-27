FROM node
MAINTAINER Mario Alberto Teran Acosta
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD npm start