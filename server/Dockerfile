FROM node:alpine

WORKDIR /app

COPY package*.json ./

COPY ./ ./

RUN npm i --silent

COPY . .

EXPOSE 3001

CMD ["npm", "start"]