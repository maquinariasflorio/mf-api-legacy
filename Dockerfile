FROM node:16-alpine3.12 As development

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --production=false

COPY . .

RUN yarn run build

FROM node:16-alpine3.12 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --production=true

COPY . .

COPY --from=development /usr/src/app/dist ./dist

ENV HOST 0.0.0.0
EXPOSE 80

RUN npm install -g migrate-mongo

CMD ["yarn", "start:prod"]