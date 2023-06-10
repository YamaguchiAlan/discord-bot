FROM node:18.16.0-alpine3.18

WORKDIR /app
RUN apk update
RUN apk --no-cache --update add build-base
RUN apk add --no-cache ffmpeg
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools
COPY package*.json .
RUN npm install -g npm@latest
RUN npm install && npm install typescript
COPY . .
RUN npm run build
COPY .env ./dist/
WORKDIR ./dist

CMD ["node", "./src/index.js"]
