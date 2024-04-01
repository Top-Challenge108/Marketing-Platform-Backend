FROM node:18.16.0 As development

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install -g @nestjs/cli
RUN yarn
COPY . .
RUN yarn build
EXPOSE 3000

CMD ["node", "dist/main"]
