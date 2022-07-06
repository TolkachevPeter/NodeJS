FROM node:16-alpine as builder

# building server for example, simple server
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# run app
FROM node:16-alpine

RUN apk --update add --no-cache rsync bash

WORKDIR /app
COPY ./package*.json ./
RUN npm install --only=production
COPY --from=builder /app/dist ./dist

EXPOSE 5000

CMD [ "npm", "run" ]
