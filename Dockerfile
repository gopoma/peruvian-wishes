FROM node:18-alpine

ARG DB_SYSTEM
ARG DB_HOST
ARG DB_PORT
ARG DB_USER
ARG DB_PASSWORD
ARG DB_NAME
ARG DATABASE_URL

ENV PORT=4000

WORKDIR /app

COPY package*.json .

RUN npm install

COPY ./prisma .

RUN npx prisma generate

COPY tailwind.config.js .

COPY ./src ./src

EXPOSE ${PORT}

CMD ["npm", "run", "start"]
