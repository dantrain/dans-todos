FROM node:12-alpine AS build
WORKDIR /app
COPY . .
RUN apk --no-cache add git
RUN yarn install --ignore-scripts
ENV PORT 80
RUN yarn build

FROM node:12-alpine
WORKDIR /app
COPY --from=build /app .
ENV NODE_ENV production
CMD node build/server.js
