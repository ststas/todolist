
FROM node:18-alpine

WORKDIR /backend

COPY package*.json ./

RUN npm ci --only=production --no-audit --prefer-offline

COPY . .

CMD ["node", "app.js"]

EXPOSE 3002
