FROM node:18.16.0-alpine3.18

WORKDIR /app

# Throw-away build stage to reduce size of final image
FROM base as build

RUN apk update
RUN apk --no-cache --update add build-base
RUN apk add --no-cache ffmpeg
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

COPY package*.json .
RUN npm ci --include=dev

COPY --link . .

RUN npm run build
# Remove development dependencies
RUN npm prune --omit=dev


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "npm", "run", "start" ]
