FROM node
MAINTAINER Mario Terán
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD npm start