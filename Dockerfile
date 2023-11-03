FROM node:20-alpine3.17
WORKDIR /app
COPY . .
RUN npm install
RUN npx prisma migrate dev --name init   
RUN npm run build
CMD [ "node", "dist/main.js" ]
