FROM node:16-alpine3.14 as build
WORKDIR /app

RUN npm i typescript -g
COPY . .

RUN npm i --legacy-peer-deps
RUN npm run esbuild:prod

# Empaquetas la APP (Aquí queda la aplicacion para desplegarla)
FROM node:16-alpine3.14 as bundle
WORKDIR /app

COPY --from=build /app* ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/bundle ./bundle
COPY --from=build /app/src/Core/Migrations ./Migrations
COPY --from=build /app/src/Core/Seeder ./Seeder
COPY --from=build /app/src/Server/Config/Sequelize ./Config

RUN rm -rf ./src

EXPOSE 3001

CMD ["node", "./bundle/index.js" ]
