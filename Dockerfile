FROM node:16.17

WORKDIR /app

COPY package*.json .

RUN npm install

COPY ./prisma .

COPY ./tailwind.config.js .

COPY ./src ./src

RUN npx prisma generate

EXPOSE 4000

CMD ["npm", "run", "dev"]