#stage1
FROM node:16 as builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --silent
RUN npm install -g typescript
COPY . .
RUN npm run build

LABEL "com.mae.nft-api"="NFT Collection API"
LABEL maintainer="eduardoh.holzmann@vaster.com"
LABEL version="0.1"

#ARG PORT
#ARG NODE_ENV
#ARG MONGO_URL

#stage 2
FROM node:14-alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --silent --production
COPY --from=builder /usr/app/dist ./dist
EXPOSE $PORT
CMD node dist/index.js
