FROM node:16 AS build
COPY . .
RUN apk --no-cache add git
RUN yarn install --frozen-lockfile --ignore-scripts
ENV PORT 80
RUN yarn build

FROM node:16
COPY --from=build package.json yarn.lock schema.prisma ./
COPY --from=build build/ build/
RUN apk --no-cache add git
RUN yarn install --frozen-lockfile --production
EXPOSE 80
CMD yarn start:prod
