FROM node:18.16.0-alpine3.18

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN tsc

CMD ["node", "./dist/src/index.js"]