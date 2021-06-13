FROM node:14.7-slim as base
LABEL org.opencontainers.image.authors=vincentbollaert@gmail.com
LABEL org.opencontainers.image.title="get-shit-done backend"
LABEL org.opencontainers.image.licenses=MIT
LABEL com.bretfisher.nodeversion=$NODE_VERSION

ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

ENV NODE_ENV=production
EXPOSE 3005
WORKDIR /app
COPY package*.json ./
COPY config.env ./
RUN npm ci && npm cache clean --force
ENV PATH /app/node_modules/.bin:$PATH



FROM base as dev
ENV NODE_ENV=development
RUN npm install --only=development
CMD [ "ts-node-dev", "server.ts" ]



FROM dev as test
COPY . .
# run audits and tests



FROM test as pre-prod
COPY tsconfig.json ./
RUN tsc
RUN rm ./tsconfig.json && rm ./build/*.map


FROM base as prod
COPY --from=pre-prod /app/build /app
CMD [ "node", "server.js" ]
