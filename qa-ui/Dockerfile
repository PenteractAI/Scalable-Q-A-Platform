FROM node:lts-alpine3.17

EXPOSE 3000

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY *.json ./

RUN npm cache clean --force && npm install --force

COPY . .

CMD [ "npx", "astro", "dev" ]