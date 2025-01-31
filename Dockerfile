FROM node:18-alpine

WORKDIR /app
COPY package.json yarn.lock postcss.config.js tailwind.config.js vite.config.ts ./
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 5173

CMD ["yarn", "preview", "--host"]
