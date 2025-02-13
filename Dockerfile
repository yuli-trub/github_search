FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG REACT_APP_GITHUB_API_KEY
ENV REACT_APP_GITHUB_API_KEY=$REACT_APP_GITHUB_API_KEY

RUN npm run build

RUN npm install -g serve

EXPOSE 80

CMD ["serve", "-s", "build", "-l", "80"]