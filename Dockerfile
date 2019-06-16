FROM node:lts-alpine
RUN apk update && \
    apk upgrade && \
    apk add --upgrade --no-cache alpine-sdk python
