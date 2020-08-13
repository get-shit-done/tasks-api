FROM node:14.7-slim as base
ENV NODE_ENV=production

# add tini
ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

EXPOSE 3005
WORKDIR /app
COPY package*.json ./

RUN npm ci \
  && npm cache clean --force
ENV PATH /app/node_modules/.bin:$PATH



FROM base as dev
ENV NODE_ENV=development
RUN npm install --only=development
CMD [ "ts-node-dev", "server.ts" ]



FROM dev as test
COPY . .
# run audits and tests



FROM test as pre-prod
RUN tsc
# remove files, clean up for prod


FROM base as prod
COPY --from=pre-prod /app/public /app
CMD [ "node", "server.js" ]
