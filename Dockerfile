FROM node:18-alpine

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
