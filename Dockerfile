FROM node:12.8.0-alpine
RUN apk update && \
    apk upgrade && \
    apk add --upgrade --no-cache alpine-sdk python
