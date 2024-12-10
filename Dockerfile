FROM node:lts-slim

ADD . /app

WORKDIR /app
RUN npm i -D
RUN npm run build

ENV PORT=8080
ENTRYPOINT [ "node", "--env-file=.env",  "build" ]

