FROM node:16.6.0-slim
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm ci --only=production
USER node
CMD ["node", "index.js"]