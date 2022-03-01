FROM node:14-alpine
RUN apk update && apk upgrade && apk add --no-cache git

WORKDIR /usr/src/app
COPY package.json .
RUN yarn install
COPY . .
RUN yarn run build
EXPOSE 3001
CMD ["node", "dist/app.js"]
