# node:16.18
FROM node:18.16.0
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

CMD [ "node", "build/index.js" ]

EXPOSE 5000
