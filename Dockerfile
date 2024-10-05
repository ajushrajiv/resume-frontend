FROM node:22.8.0-alpine

WORKDIR /usr/src/app

RUN apk update && \
    apk add --no-cache \
    bash \
    curl \
    git \
    openssh-client && \
    rm -rf /var/cache/apk/*

RUN bash --version && \
    curl --version && \
    git --version && \
    ssh -V && \
    node -v && \
    npm -v

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
