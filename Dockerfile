FROM node:20-alpine

WORKDIR /app

COPY ./package.json ./package.json 
COPY ./package-lock.json ./package-lock.json

RUN npm install

COPY . .

ENV DATABASE_URL="postgresql://postgres:postgres@localhost:5433/postgres"

EXPOSE 3000


RUN npx prisma generate

RUN npm run build

CMD ["npm", "run", "dev:docker"]
