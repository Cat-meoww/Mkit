FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV PORT 80

EXPOSE 80

ENTRYPOINT [ "npm", "run" , "preview"]