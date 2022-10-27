FROM node:alpine

WORKDIR /app

COPY package*.json ./

COPY ./ ./

RUN yarn install

EXPOSE 3000

CMD ["yarn", "start"]